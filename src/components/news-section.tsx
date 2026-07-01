import { useState } from "react"
import { getNews, type NewsItem } from "@/lib/store"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export function NewsSection() {
  const news = getNews()
  const [selected, setSelected] = useState<NewsItem | null>(null)

  return (
    <section id="news" className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-orbitron uppercase">
            Новости клуба
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Последние события, победы и анонсы
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item, i) => (
            <Card
              key={item.id}
              className="glow-border hover:shadow-lg hover:shadow-[#d6a54a]/10 transition-all duration-300 slide-up overflow-hidden cursor-pointer group"
              style={{ animationDelay: `${i * 0.1}s` }}
              onClick={() => setSelected(item)}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image || "/placeholder.jpg"}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <CardContent className="p-6">
                <p className="text-[#d6a54a] text-sm font-geist mb-2 flex items-center gap-1">
                  <Icon name="Calendar" size={14} />
                  {item.date}
                </p>
                <h3 className="text-white font-bold text-lg font-orbitron mb-3 line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-4">
                  {item.description}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#d6a54a]/50 text-[#d6a54a] hover:bg-[#d6a54a] hover:text-[#08111d] bg-transparent font-orbitron uppercase text-xs"
                >
                  Читать полностью
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="bg-[#111827] border-[#d6a54a]/30 max-w-2xl text-white">
          <DialogHeader>
            <DialogTitle className="font-orbitron text-[#d6a54a] text-xl pr-6">
              {selected?.title}
            </DialogTitle>
          </DialogHeader>
          {selected && (
            <div>
              <img
                src={selected.image || "/placeholder.jpg"}
                alt={selected.title}
                className="w-full h-56 object-cover rounded-lg mb-4"
              />
              <p className="text-[#d6a54a] text-sm font-geist mb-4 flex items-center gap-1">
                <Icon name="Calendar" size={14} />
                {selected.date}
              </p>
              <p className="text-gray-300 leading-relaxed font-geist">{selected.description}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
