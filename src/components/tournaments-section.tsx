import { getTournaments } from "@/lib/store"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"

export function TournamentsSection() {
  const tournaments = getTournaments()

  return (
    <section id="tournaments" className="py-24 px-6 bg-[#050608]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-orbitron uppercase">
            Турниры
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Расписание соревнований и результаты прошедших турниров
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {tournaments.map((t, i) => (
            <div
              key={t.id}
              className="border border-[#d6a54a]/20 bg-[#111827] rounded-xl p-6 slide-up hover:border-[#d6a54a]/50 transition-colors duration-300"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <h3 className="text-white font-bold text-lg font-orbitron leading-tight">
                  {t.name}
                </h3>
                <Badge
                  className={
                    t.status === "open"
                      ? "bg-green-500/20 text-green-400 border border-green-500/40 shrink-0"
                      : "bg-gray-500/20 text-gray-400 border border-gray-500/40 shrink-0"
                  }
                >
                  {t.status === "open" ? "Регистрация открыта" : "Завершён"}
                </Badge>
              </div>

              <div className="space-y-2 mb-5">
                <div className="flex items-center gap-2 text-muted-foreground text-sm font-geist">
                  <Icon name="Calendar" size={15} className="text-[#d6a54a]" />
                  {t.date}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground text-sm font-geist">
                  <Icon name="MapPin" size={15} className="text-[#d6a54a]" />
                  {t.place}
                </div>
              </div>

              <div className="flex gap-3 flex-wrap">
                {t.regulationUrl && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-[#d6a54a]/50 text-[#d6a54a] hover:bg-[#d6a54a] hover:text-[#08111d] bg-transparent font-orbitron uppercase text-xs"
                    asChild
                  >
                    <a href={t.regulationUrl} target="_blank" rel="noreferrer">
                      <Icon name="FileText" size={14} className="mr-1" />
                      Положение
                    </a>
                  </Button>
                )}
                {t.resultsUrl && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-gray-500/50 text-gray-300 hover:bg-gray-700 bg-transparent font-orbitron uppercase text-xs"
                    asChild
                  >
                    <a href={t.resultsUrl} target="_blank" rel="noreferrer">
                      <Icon name="BarChart2" size={14} className="mr-1" />
                      Результаты
                    </a>
                  </Button>
                )}
                {t.status === "open" && (
                  <Button
                    size="sm"
                    className="bg-[#d6a54a] hover:bg-[#c4923a] text-[#08111d] font-orbitron uppercase text-xs"
                  >
                    Зарегистрироваться
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
