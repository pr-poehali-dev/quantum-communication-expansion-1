import { useState } from "react"
import { getChampionship } from "@/lib/store"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Icon from "@/components/ui/icon"

export function ChampionshipsSection() {
  const champ = getChampionship()

  return (
    <section id="championships" className="py-24 px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-orbitron uppercase">
            Чемпионаты
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{champ.name}</p>
        </div>

        <Tabs defaultValue="schedule" className="w-full">
          <TabsList className="w-full bg-[#111827] border border-[#d6a54a]/20 mb-8 p-1 h-auto flex-wrap">
            <TabsTrigger
              value="schedule"
              className="flex-1 font-orbitron uppercase text-xs data-[state=active]:bg-[#d6a54a] data-[state=active]:text-[#08111d] text-gray-300"
            >
              Расписание
            </TabsTrigger>
            <TabsTrigger
              value="results"
              className="flex-1 font-orbitron uppercase text-xs data-[state=active]:bg-[#d6a54a] data-[state=active]:text-[#08111d] text-gray-300"
            >
              Таблица результатов
            </TabsTrigger>
            <TabsTrigger
              value="winners"
              className="flex-1 font-orbitron uppercase text-xs data-[state=active]:bg-[#d6a54a] data-[state=active]:text-[#08111d] text-gray-300"
            >
              Победители
            </TabsTrigger>
          </TabsList>

          {/* Schedule */}
          <TabsContent value="schedule">
            <div className="space-y-4">
              {champ.stages.map((stage, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 border border-[#d6a54a]/15 bg-[#111827] rounded-xl p-5"
                >
                  <div className="w-10 h-10 rounded-full bg-[#d6a54a]/10 border border-[#d6a54a]/40 flex items-center justify-center shrink-0 text-[#d6a54a] font-orbitron font-bold text-sm">
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-[#d6a54a] font-geist text-sm flex items-center gap-1 mb-1">
                      <Icon name="Calendar" size={13} />
                      {stage.date}
                    </p>
                    <p className="text-white font-geist font-medium">{stage.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Results table */}
          <TabsContent value="results">
            <div className="border border-[#d6a54a]/20 rounded-xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#d6a54a]/10 border-b border-[#d6a54a]/20">
                    <th className="text-left text-[#d6a54a] font-orbitron uppercase text-xs px-6 py-4">Место</th>
                    <th className="text-left text-[#d6a54a] font-orbitron uppercase text-xs px-6 py-4">Спортсмен</th>
                    <th className="text-right text-[#d6a54a] font-orbitron uppercase text-xs px-6 py-4">Очки</th>
                  </tr>
                </thead>
                <tbody>
                  {champ.results.map((r, i) => (
                    <tr
                      key={i}
                      className="border-b border-[#d6a54a]/10 bg-[#111827] hover:bg-[#d6a54a]/5 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <span
                          className={`font-orbitron font-bold text-sm ${
                            r.place === 1
                              ? "text-[#d6a54a]"
                              : r.place === 2
                              ? "text-gray-300"
                              : r.place === 3
                              ? "text-amber-700"
                              : "text-muted-foreground"
                          }`}
                        >
                          #{r.place}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-white font-geist">{r.name}</td>
                      <td className="px-6 py-4 text-right text-muted-foreground font-geist font-bold">
                        {r.points}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          {/* Winners */}
          <TabsContent value="winners">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {champ.winners.map((w, i) => (
                <div
                  key={i}
                  className="border border-[#d6a54a]/20 bg-[#111827] rounded-xl p-6 text-center slide-up"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="relative w-20 h-20 mx-auto mb-4">
                    <img
                      src={w.photo || "/placeholder-user.jpg"}
                      alt={w.name}
                      className="w-20 h-20 rounded-full object-cover border-2 border-[#d6a54a]/50"
                    />
                    {i === 0 && (
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#d6a54a] rounded-full flex items-center justify-center">
                        <Icon name="Trophy" size={14} className="text-[#08111d]" />
                      </div>
                    )}
                  </div>
                  <h3 className="text-white font-orbitron font-bold text-base mb-1">{w.name}</h3>
                  <p className="text-[#d6a54a] text-sm font-geist">{w.achievement}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
