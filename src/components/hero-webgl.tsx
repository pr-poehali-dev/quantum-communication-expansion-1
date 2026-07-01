import { Canvas, useFrame } from "@react-three/fiber"
import { useMemo, useRef, useState, useEffect } from "react"
import * as THREE from "three"

// Якутия: набор отрезков контура в нормализованных координатах [0..1]
// Форма грубо аппроксимирует реальный контур республики
const YAKUTIA_SEGMENTS = [
  // Нижняя граница (юг)
  [0.22, 0.78], [0.28, 0.82], [0.34, 0.84], [0.40, 0.83], [0.46, 0.85],
  [0.52, 0.83], [0.58, 0.80], [0.63, 0.78],
  // Восточная граница
  [0.63, 0.78], [0.68, 0.70], [0.72, 0.62], [0.75, 0.53], [0.77, 0.44],
  [0.78, 0.35], [0.76, 0.27], [0.73, 0.20], [0.68, 0.15], [0.62, 0.12],
  // Северная граница (арктическое побережье — изрезанная)
  [0.62, 0.12], [0.55, 0.08], [0.50, 0.10], [0.45, 0.07], [0.40, 0.10],
  [0.35, 0.08], [0.30, 0.11], [0.25, 0.09], [0.20, 0.13], [0.17, 0.18],
  // Западная граница
  [0.17, 0.18], [0.16, 0.28], [0.17, 0.38], [0.18, 0.48], [0.19, 0.58],
  [0.20, 0.68], [0.22, 0.78],
]

const Scene = () => {
  const meshRef = useRef<THREE.Mesh>(null)

  // Строим Float32Array с точками контура для шейдера (max 64 пары)
  const outlineData = useMemo(() => {
    const arr = new Float32Array(128).fill(0)
    YAKUTIA_SEGMENTS.forEach(([x, y], i) => {
      if (i < 64) { arr[i * 2] = x; arr[i * 2 + 1] = y }
    })
    return arr
  }, [])

  const material = useMemo(() => {
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `

    const fragmentShader = `
      uniform vec2 uPointer;
      uniform float uProgress;
      uniform float uTime;
      uniform vec2 uOutline[64];
      uniform int uOutlineLen;
      varying vec2 vUv;

      // ── Noise helpers ────────────────────────────────────────────────────────
      float random(vec2 st) {
        return fract(sin(dot(st, vec2(12.9898, 78.233))) * 43758.5453);
      }
      float noise(vec2 st) {
        vec2 i = floor(st); vec2 f = fract(st);
        float a = random(i), b = random(i+vec2(1,0)),
              c = random(i+vec2(0,1)), d = random(i+vec2(1,1));
        vec2 u = f*f*(3.0-2.0*f);
        return mix(a,b,u.x)+(c-a)*u.y*(1.0-u.x)+(d-b)*u.x*u.y;
      }

      // ── Point-to-segment distance ────────────────────────────────────────────
      float seg(vec2 p, vec2 a, vec2 b) {
        vec2 ab = b-a, ap = p-a;
        float t = clamp(dot(ap,ab)/dot(ab,ab), 0.0, 1.0);
        return length(ap - ab*t);
      }

      // ── Is point inside Yakutia? (ray casting) ──────────────────────────────
      bool inYakutia(vec2 p) {
        bool inside = false;
        int j = uOutlineLen - 1;
        for (int i = 0; i < 64; i++) {
          if (i >= uOutlineLen) break;
          vec2 a = uOutline[i], b = uOutline[j];
          if (((a.y > p.y) != (b.y > p.y)) &&
              (p.x < (b.x-a.x)*(p.y-a.y)/(b.y-a.y)+a.x))
            inside = !inside;
          j = i;
        }
        return inside;
      }

      // ── Border distance ──────────────────────────────────────────────────────
      float borderDist(vec2 p) {
        float d = 1e6;
        for (int i = 0; i < 63; i++) {
          if (i >= uOutlineLen - 1) break;
          d = min(d, seg(p, uOutline[i], uOutline[i+1]));
        }
        return d;
      }

      void main() {
        // Параллакс от мыши
        vec2 uv = vUv + uPointer * 0.012;

        bool inside = inYakutia(uv);
        float bd = borderDist(uv);

        // ── Базовый фон ──────────────────────────────────────────────────────
        vec3 bgColor = vec3(0.02, 0.05, 0.09);

        // ── Заливка территории ───────────────────────────────────────────────
        float territoryMask = inside ? 1.0 : 0.0;
        vec3 fillColor = mix(vec3(0.04,0.10,0.18), vec3(0.06,0.14,0.24), noise(uv*6.0));
        vec3 col = mix(bgColor, fillColor, territoryMask);

        // ── Сетка точек внутри ───────────────────────────────────────────────
        if (inside) {
          vec2 gridUv = fract(uv * 52.0);
          float dotDist = length(gridUv - 0.5);
          float dotMask = 1.0 - smoothstep(0.06, 0.12, dotDist);
          float dotBright = noise(floor(uv * 52.0) * 3.7) * 0.5 + 0.5;
          col += vec3(dotMask * dotBright * 0.18) * vec3(0.84, 0.65, 0.29);
        }

        // ── Контур — золотая светящаяся линия ───────────────────────────────
        float borderGlow = 1.0 - smoothstep(0.0, 0.018, bd);
        float borderSharp = 1.0 - smoothstep(0.0, 0.005, bd);
        col += borderGlow * 0.4 * vec3(0.84, 0.65, 0.29);
        col += borderSharp * 0.8 * vec3(1.0, 0.90, 0.60);

        // ── Горизонтальная сканирующая полоса ───────────────────────────────
        float scanY = mod(uTime * 0.18, 1.2) - 0.1;
        float scanDist = abs(uv.y - scanY);
        float scanLine = exp(-scanDist * 80.0);
        float scanFade = inside ? 1.0 : 0.15;
        col += scanLine * scanFade * 0.55 * vec3(0.84, 0.65, 0.29);

        // ── Вторая сканирующая полоса (смещённая) ───────────────────────────
        float scanY2 = mod(uTime * 0.18 + 0.6, 1.2) - 0.1;
        float scanLine2 = exp(-abs(uv.y - scanY2) * 120.0);
        col += scanLine2 * scanFade * 0.25 * vec3(0.84, 0.65, 0.29);

        // ── Пульсирующее свечение по всей территории ────────────────────────
        float pulse = sin(uTime * 1.8) * 0.5 + 0.5;
        col += territoryMask * pulse * 0.04 * vec3(0.84, 0.65, 0.29);

        // ── Точки городов ────────────────────────────────────────────────────
        // Якутск
        vec2 yakutsk = vec2(0.40, 0.70);
        float dY = length(uv - yakutsk);
        float cityPulse = sin(uTime * 3.0) * 0.5 + 0.5;
        col += (1.0 - smoothstep(0.0, 0.008, dY)) * vec3(1.0, 0.85, 0.4);
        col += (1.0 - smoothstep(0.008, 0.025 + cityPulse*0.015, dY)) * 0.3 * vec3(0.84,0.65,0.29);

        // Верхоянск
        vec2 verh = vec2(0.52, 0.35);
        float dV = length(uv - verh);
        col += (1.0 - smoothstep(0.0, 0.005, dV)) * vec3(0.85, 0.80, 0.65);

        // Среднеколымск
        vec2 sred = vec2(0.65, 0.32);
        float dS = length(uv - sred);
        col += (1.0 - smoothstep(0.0, 0.005, dS)) * vec3(0.85, 0.80, 0.65);

        // Оленёк
        vec2 olen = vec2(0.28, 0.30);
        float dO = length(uv - olen);
        col += (1.0 - smoothstep(0.0, 0.005, dO)) * vec3(0.85, 0.80, 0.65);

        // ── Реки (синие линии) ───────────────────────────────────────────────
        // Лена: вертикальная полоса ~x=0.38, от юга к северу
        float lena = abs(uv.x - (0.38 + sin(uv.y*12.0)*0.012));
        float lenaMask = inside ? 1.0 : 0.0;
        col += lenaMask * (1.0-smoothstep(0.0,0.006,lena)) * 0.6 * vec3(0.25,0.55,0.90);

        // Вилюй: горизонтально ~y=0.63
        float vilyuy = abs(uv.y - (0.63 + sin(uv.x*10.0)*0.015));
        float vilyuyMask = (inside && uv.x < 0.50) ? 1.0 : 0.0;
        col += vilyuyMask * (1.0-smoothstep(0.0,0.005,vilyuy)) * 0.5 * vec3(0.25,0.55,0.90);

        // ── Фоновый шум (зернистость) ────────────────────────────────────────
        col += (random(uv * 432.1 + uTime*0.01) - 0.5) * 0.03;

        // ── Виньетка по краям ────────────────────────────────────────────────
        vec2 vig = uv - 0.5;
        float vignette = 1.0 - dot(vig, vig) * 2.2;
        col *= clamp(vignette, 0.0, 1.0);

        gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
      }
    `

    return new THREE.ShaderMaterial({
      uniforms: {
        uPointer:    { value: new THREE.Vector2(0, 0) },
        uProgress:   { value: 0 },
        uTime:       { value: 0 },
        uOutline:    { value: outlineData },
        uOutlineLen: { value: YAKUTIA_SEGMENTS.length },
      },
      vertexShader,
      fragmentShader,
    })
  }, [outlineData])

  useFrame(({ clock, pointer }) => {
    if (material.uniforms) {
      material.uniforms.uProgress.value = Math.sin(clock.getElapsedTime() * 0.5) * 0.5 + 0.5
      material.uniforms.uPointer.value.set(pointer.x * 0.5, pointer.y * 0.5)
      material.uniforms.uTime.value = clock.getElapsedTime()
    }
  })

  return (
    <mesh ref={meshRef} scale={[2, 2, 1]} material={material}>
      <planeGeometry args={[1, 1]} />
    </mesh>
  )
}

export const Hero3DWebGL = () => {
  const titleWords = "ПАТРИОТ".split(" ")
  const subtitle = "Спортивный клуб · Турниры · Чемпионаты · Подготовка спортсменов"
  const [visibleWords, setVisibleWords] = useState(0)
  const [subtitleVisible, setSubtitleVisible] = useState(false)
  const [delays, setDelays] = useState<number[]>([])
  const [subtitleDelay, setSubtitleDelay] = useState(0)

  useEffect(() => {
    setDelays(titleWords.map(() => Math.random() * 0.07))
    setSubtitleDelay(Math.random() * 0.1)
  }, [titleWords.length])

  useEffect(() => {
    if (visibleWords < titleWords.length) {
      const timeout = setTimeout(() => setVisibleWords(visibleWords + 1), 600)
      return () => clearTimeout(timeout)
    } else {
      const timeout = setTimeout(() => setSubtitleVisible(true), 800)
      return () => clearTimeout(timeout)
    }
  }, [visibleWords, titleWords.length])

  return (
    <div className="h-screen bg-[#050608] relative overflow-hidden">
      {/* Edge fades */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#050608] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050608] to-transparent" />
        <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-[#050608] to-transparent" />
        <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-[#050608] to-transparent" />
      </div>

      {/* Text */}
      <div className="h-screen uppercase items-center w-full absolute z-[60] pointer-events-none px-10 flex justify-center flex-col">
        <div className="text-5xl md:text-7xl xl:text-8xl 2xl:text-9xl font-extrabold font-orbitron">
          <div className="flex space-x-2 lg:space-x-6 overflow-hidden text-[#d6a54a]">
            {titleWords.map((word, index) => (
              <div
                key={index}
                className={index < visibleWords ? "fade-in" : ""}
                style={{
                  animationDelay: `${index * 0.13 + (delays[index] || 0)}s`,
                  opacity: index < visibleWords ? undefined : 0,
                }}
              >
                {word}
              </div>
            ))}
          </div>
        </div>
        <div className="text-xs md:text-xl xl:text-2xl 2xl:text-3xl mt-2 overflow-hidden text-white font-bold max-w-4xl mx-auto text-center px-4">
          <div
            className={subtitleVisible ? "fade-in-subtitle" : ""}
            style={{
              animationDelay: `${titleWords.length * 0.13 + 0.2 + subtitleDelay}s`,
              opacity: subtitleVisible ? undefined : 0,
            }}
          >
            {subtitle}
          </div>
        </div>
        <div
          className={subtitleVisible ? "fade-in-subtitle mt-8 pointer-events-auto" : "mt-8 pointer-events-auto"}
          style={{ opacity: subtitleVisible ? undefined : 0 }}
        >
          <a
            href="#about"
            className="inline-block bg-[#d6a54a] hover:bg-[#c4923a] text-[#08111d] font-orbitron font-bold text-sm md:text-lg px-8 py-3 md:px-10 md:py-4 rounded-md transition-colors duration-200 uppercase tracking-wider"
          >
            Присоединиться
          </a>
        </div>
      </div>

      <Canvas
        flat
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 1] }}
        style={{ background: "#050608" }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}

export default Hero3DWebGL
