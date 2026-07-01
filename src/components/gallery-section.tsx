import { useState } from "react"
import { getGallery, type GalleryItem } from "@/lib/store"
import Icon from "@/components/ui/icon"

export function GallerySection() {
  const items = getGallery()
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  function open(item: GalleryItem, index: number) {
    setLightbox(item)
    setLightboxIndex(index)
  }

  function prev() {
    const i = (lightboxIndex - 1 + items.length) % items.length
    setLightbox(items[i])
    setLightboxIndex(i)
  }

  function next() {
    const i = (lightboxIndex + 1) % items.length
    setLightbox(items[i])
    setLightboxIndex(i)
  }

  return (
    <section id="gallery" className="py-24 px-6 bg-[#050608]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-orbitron uppercase">
            Галерея
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Фотохроника соревнований и тренировочных будней
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {items.map((item, i) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-lg cursor-pointer aspect-square slide-up"
              style={{ animationDelay: `${i * 0.05}s` }}
              onClick={() => open(item, i)}
            >
              <img
                src={item.url}
                alt={item.caption || "Фото"}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center">
                <Icon
                  name="ZoomIn"
                  size={32}
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
              {item.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white text-xs font-geist">{item.caption}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-[#d6a54a] transition-colors"
            onClick={() => setLightbox(null)}
          >
            <Icon name="X" size={32} />
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-[#d6a54a] transition-colors bg-black/50 rounded-full p-2"
            onClick={(e) => { e.stopPropagation(); prev() }}
          >
            <Icon name="ChevronLeft" size={32} />
          </button>
          <div className="max-w-4xl max-h-[85vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <img
              src={lightbox.url}
              alt={lightbox.caption || "Фото"}
              className="max-h-[75vh] max-w-full object-contain rounded-lg"
            />
            {lightbox.caption && (
              <p className="text-white text-center mt-4 font-geist text-lg">{lightbox.caption}</p>
            )}
            <p className="text-gray-500 text-sm mt-1">{lightboxIndex + 1} / {items.length}</p>
          </div>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-[#d6a54a] transition-colors bg-black/50 rounded-full p-2"
            onClick={(e) => { e.stopPropagation(); next() }}
          >
            <Icon name="ChevronRight" size={32} />
          </button>
        </div>
      )}
    </section>
  )
}
