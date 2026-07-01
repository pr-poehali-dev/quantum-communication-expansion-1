import { useState, useEffect, useRef } from "react"

// Точный SVG-контур Республики Саха (Якутия)
const YAKUTIA_PATH = `
M 210,20 L 230,18 L 255,22 L 280,15 L 310,18 L 340,12 L 370,16 L 395,10 L 420,14
L 445,8 L 470,13 L 495,9 L 515,15 L 530,12 L 545,20 L 560,15 L 575,25 L 590,20
L 600,30 L 608,42 L 615,55 L 620,70 L 625,85 L 628,100 L 630,115 L 628,130
L 630,145 L 628,158 L 632,170 L 635,183 L 638,196 L 640,210 L 638,225
L 635,240 L 630,255 L 625,268 L 618,280 L 610,292 L 600,302 L 590,310
L 578,318 L 565,324 L 552,328 L 538,330 L 525,328 L 512,325
L 498,320 L 484,315 L 470,308 L 456,300 L 442,290 L 428,280
L 414,268 L 400,255 L 388,242 L 376,228 L 365,215 L 355,202
L 345,215 L 332,228 L 318,240 L 304,250 L 290,258 L 276,264
L 262,268 L 248,270 L 234,268 L 220,264 L 206,258 L 193,250
L 180,240 L 168,228 L 158,215 L 150,202 L 143,188 L 138,174
L 135,160 L 133,146 L 132,132 L 132,118 L 133,104 L 136,90
L 140,76 L 146,63 L 153,51 L 162,40 L 172,30 L 183,22 L 196,17 Z
`

// Упрощённый, более реалистичный контур Якутии (по форме с карты)
const YAKUTIA_REALISTIC = `
M 310,25
L 335,22 L 360,18 L 385,20 L 408,16 L 432,14 L 458,10 L 480,8
L 505,12 L 525,8 L 545,15 L 560,10 L 578,18 L 592,12 L 605,22
L 615,35 L 620,50 L 622,65 L 618,80 L 620,95 L 622,110
L 625,125 L 628,140 L 630,155 L 628,170 L 632,185
L 635,200 L 635,215 L 632,228 L 626,240 L 618,252
L 608,262 L 596,270 L 582,276 L 568,280 L 554,280
L 540,278 L 526,272 L 512,264 L 498,254 L 485,242
L 473,228 L 462,214 L 452,200 L 442,188
L 430,200 L 418,212 L 405,222 L 391,230
L 376,236 L 361,240 L 346,240 L 331,238
L 316,232 L 302,224 L 288,214 L 275,202
L 264,188 L 255,174 L 248,160 L 244,146
L 241,132 L 240,118 L 241,104 L 244,90
L 250,77 L 258,65 L 268,54 L 280,44
L 293,35 L 302,28 Z
`

const CITIES = [
  { x: 370, y: 210, name: "ЯКУТСК", capital: true },
  { x: 290, y: 90, name: "Вилюйск", capital: false },
  { x: 460, y: 80, name: "Верхоянск", capital: false },
  { x: 530, y: 170, name: "Усть-Нера", capital: false },
  { x: 240, y: 175, name: "Олёкминск", capital: false },
  { x: 500, y: 240, name: "Хандыга", capital: false },
  { x: 570, y: 110, name: "Среднеколымск", capital: false },
]

const RIVERS = [
  // Лена
  "M 300,60 Q 320,120 340,180 Q 360,220 370,210",
  // Вилюй
  "M 200,155 Q 240,165 290,165 Q 320,163 350,180",
  // Алдан
  "M 430,240 Q 415,225 400,210 Q 385,195 370,210",
  // Индигирка
  "M 530,60 Q 525,110 520,155 Q 515,190 530,220",
  // Колыма
  "M 585,80 Q 575,120 570,150 Q 565,180 560,210",
]

export const Hero3DWebGL = () => {
  const [titleVisible, setTitleVisible] = useState(false)
  const [subtitleVisible, setSubtitleVisible] = useState(false)
  const [btnVisible, setBtnVisible] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [pulseIndex, setPulseIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const t1 = setTimeout(() => setTitleVisible(true), 300)
    const t2 = setTimeout(() => setSubtitleVisible(true), 900)
    const t3 = setTimeout(() => setBtnVisible(true), 1400)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseIndex((i) => (i + 1) % CITIES.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  function handleMouseMove(e: React.MouseEvent) {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 15,
    })
  }

  return (
    <div
      ref={containerRef}
      className="h-screen bg-[#050608] relative overflow-hidden flex items-center"
      onMouseMove={handleMouseMove}
    >
      {/* Фоновая сетка */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "linear-gradient(#d6a54a 1px, transparent 1px), linear-gradient(90deg, #d6a54a 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }}
      />

      {/* Радиальное свечение за картой */}
      <div className="absolute inset-0 flex items-center justify-end pr-0 md:pr-8 lg:pr-0 pointer-events-none">
        <div
          className="w-[500px] h-[500px] md:w-[600px] md:h-[600px] lg:w-[700px] lg:h-[700px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #d6a54a 0%, transparent 70%)",
            transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)`,
            transition: "transform 0.3s ease-out",
          }}
        />
      </div>

      {/* SVG карта Якутии */}
      <div
        className="absolute right-[-40px] md:right-0 lg:right-[-20px] top-1/2 -translate-y-1/2 w-[380px] h-[380px] md:w-[480px] md:h-[480px] lg:w-[580px] lg:h-[580px] opacity-90"
        style={{
          transform: `translateY(-50%) translate(${mousePos.x * 0.6}px, ${mousePos.y * 0.6}px)`,
          transition: "transform 0.4s ease-out",
        }}
      >
        <svg
          viewBox="180 0 480 320"
          className="w-full h-full"
          style={{ filter: "drop-shadow(0 0 30px rgba(214,165,74,0.4))" }}
        >
          <defs>
            <linearGradient id="yakutiaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1a2d4a" />
              <stop offset="50%" stopColor="#0f1f35" />
              <stop offset="100%" stopColor="#08111d" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="softglow">
              <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Анимированный градиент-маска для "сканирования" */}
            <linearGradient id="scanGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#d6a54a" stopOpacity="0" />
              <stop offset="45%" stopColor="#d6a54a" stopOpacity="0.15" />
              <stop offset="50%" stopColor="#d6a54a" stopOpacity="0.4" />
              <stop offset="55%" stopColor="#d6a54a" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#d6a54a" stopOpacity="0" />
              <animateTransform
                attributeName="gradientTransform"
                type="translate"
                values="0 -1; 0 2"
                dur="4s"
                repeatCount="indefinite"
              />
            </linearGradient>

            <clipPath id="yakutiaClip">
              <path d={YAKUTIA_REALISTIC} />
            </clipPath>
          </defs>

          {/* Основная заливка территории */}
          <path
            d={YAKUTIA_REALISTIC}
            fill="url(#yakutiaGrad)"
            stroke="#d6a54a"
            strokeWidth="1.5"
            strokeOpacity="0.8"
            filter="url(#glow)"
          />

          {/* Сканирующий эффект */}
          <rect
            x="180" y="0" width="480" height="320"
            fill="url(#scanGrad)"
            clipPath="url(#yakutiaClip)"
          />

          {/* Точечная сетка внутри */}
          <g clipPath="url(#yakutiaClip)" opacity="0.25">
            {Array.from({ length: 15 }, (_, row) =>
              Array.from({ length: 25 }, (_, col) => (
                <circle
                  key={`${row}-${col}`}
                  cx={195 + col * 22}
                  cy={10 + row * 20}
                  r="0.8"
                  fill="#d6a54a"
                />
              ))
            )}
          </g>

          {/* Реки */}
          {RIVERS.map((d, i) => (
            <path
              key={i}
              d={d}
              fill="none"
              stroke="#4a9eff"
              strokeWidth="1.2"
              strokeOpacity="0.5"
              filter="url(#softglow)"
            />
          ))}

          {/* Города */}
          {CITIES.map((city, i) => (
            <g key={city.name}>
              {/* Пульсирующий круг */}
              {i === pulseIndex && (
                <>
                  <circle cx={city.x} cy={city.y} r="16" fill="#d6a54a" fillOpacity="0" stroke="#d6a54a" strokeOpacity="0.6" strokeWidth="1">
                    <animate attributeName="r" values="8;20;8" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="stroke-opacity" values="0.6;0;0.6" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <circle cx={city.x} cy={city.y} r="10" fill="#d6a54a" fillOpacity="0" stroke="#d6a54a" strokeOpacity="0.4" strokeWidth="1">
                    <animate attributeName="r" values="4;12;4" dur="2s" repeatCount="indefinite" begin="0.3s" />
                    <animate attributeName="stroke-opacity" values="0.4;0;0.4" dur="2s" repeatCount="indefinite" begin="0.3s" />
                  </circle>
                </>
              )}

              {/* Точка города */}
              <circle
                cx={city.x}
                cy={city.y}
                r={city.capital ? 5 : 3}
                fill={city.capital ? "#d6a54a" : "#c9d1d9"}
                filter="url(#softglow)"
              />
              {city.capital && (
                <circle cx={city.x} cy={city.y} r="8" fill="none" stroke="#d6a54a" strokeWidth="1" strokeOpacity="0.6" />
              )}

              {/* Название города */}
              <text
                x={city.x + (city.capital ? 10 : 7)}
                y={city.y + (city.capital ? -8 : -5)}
                fontSize={city.capital ? "8" : "5.5"}
                fontFamily="Montserrat, sans-serif"
                fontWeight={city.capital ? "700" : "400"}
                fill={city.capital ? "#d6a54a" : "#c9d1d9"}
                fillOpacity="0.9"
                letterSpacing="0.5"
              >
                {city.name}
              </text>
            </g>
          ))}

          {/* Подпись республики */}
          <text
            x="390"
            y="145"
            fontSize="7"
            fontFamily="Montserrat, sans-serif"
            fontWeight="600"
            fill="#d6a54a"
            fillOpacity="0.35"
            textAnchor="middle"
            letterSpacing="2"
          >
            РЕСПУБЛИКА САХА
          </text>
          <text
            x="390"
            y="157"
            fontSize="6"
            fontFamily="Montserrat, sans-serif"
            fontWeight="400"
            fill="#d6a54a"
            fillOpacity="0.25"
            textAnchor="middle"
            letterSpacing="2.5"
          >
            ЯКУТИЯ
          </text>
        </svg>
      </div>

      {/* Градиентный оверлей — текст слева */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#050608] via-[#050608]/85 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050608] via-transparent to-[#050608]/60 pointer-events-none z-10" />

      {/* Текст */}
      <div className="relative z-20 px-8 md:px-16 lg:px-24 max-w-3xl">
        <div
          className="transition-all duration-1000"
          style={{ opacity: titleVisible ? 1 : 0, transform: titleVisible ? "translateY(0)" : "translateY(30px)" }}
        >
          <p className="text-[#d6a54a] font-display text-xs md:text-sm font-600 uppercase tracking-[0.4em] mb-4">
            Республика Саха (Якутия)
          </p>
          <h1 className="font-display font-black uppercase text-[#d6a54a] leading-none"
            style={{ fontSize: "clamp(3.5rem, 10vw, 8rem)", textShadow: "0 0 60px rgba(214,165,74,0.4)" }}>
            ПАТРИОТ
          </h1>
        </div>

        <div
          className="transition-all duration-1000 mt-4"
          style={{ opacity: subtitleVisible ? 1 : 0, transform: subtitleVisible ? "translateY(0)" : "translateY(20px)" }}
        >
          <p className="text-white/80 font-display font-medium text-base md:text-xl max-w-lg leading-relaxed">
            Спортивный клуб · Турниры<br />Чемпионаты · Подготовка спортсменов
          </p>
          <div className="w-16 h-0.5 bg-[#d6a54a] mt-5 mb-5" />
          <p className="text-white/40 text-sm font-display uppercase tracking-widest">
            г. Якутск · Промышленный округ
          </p>
        </div>

        <div
          className="mt-8 flex gap-4 flex-wrap"
          style={{ opacity: btnVisible ? 1 : 0, transform: btnVisible ? "translateY(0)" : "translateY(20px)", transition: "all 0.8s ease" }}
        >
          <a
            href="#about"
            className="inline-block bg-[#d6a54a] hover:bg-[#c4923a] text-[#08111d] font-display font-bold text-sm px-8 py-3 rounded-md transition-colors duration-200 uppercase tracking-wider"
          >
            Присоединиться
          </a>
          <a
            href="#news"
            className="inline-block border border-[#d6a54a]/50 text-[#d6a54a] hover:bg-[#d6a54a]/10 font-display font-semibold text-sm px-8 py-3 rounded-md transition-colors duration-200 uppercase tracking-wider"
          >
            Новости
          </a>
        </div>
      </div>

      {/* Скролл-индикатор */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-50">
        <div className="w-px h-10 bg-gradient-to-b from-[#d6a54a] to-transparent animate-pulse" />
        <span className="text-[#d6a54a] text-xs font-display uppercase tracking-widest">Scroll</span>
      </div>
    </div>
  )
}

export default Hero3DWebGL
