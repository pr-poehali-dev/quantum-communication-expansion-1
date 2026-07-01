import { Timeline } from "@/components/ui/timeline"

export function ApplicationsTimeline() {
  const data = [
    {
      title: "Начальная подготовка",
      content: (
        <div>
          <p className="text-white text-sm md:text-base font-normal mb-6 leading-relaxed">
            Первый шаг в спорте: базовая физическая форма, техника и знакомство с дисциплиной клуба.
            Индивидуальный подход к каждому новичку любого возраста.
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-[#d6a54a] text-sm">
              <div className="w-2 h-2 bg-[#d6a54a] rounded-full"></div>
              Общая физическая подготовка (ОФП)
            </div>
            <div className="flex items-center gap-3 text-[#d6a54a] text-sm">
              <div className="w-2 h-2 bg-[#d6a54a] rounded-full"></div>
              Постановка базовой техники
            </div>
            <div className="flex items-center gap-3 text-[#d6a54a] text-sm">
              <div className="w-2 h-2 bg-[#d6a54a] rounded-full"></div>
              Воспитание дисциплины и режима
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Спортивное мастерство",
      content: (
        <div>
          <p className="text-white text-sm md:text-base font-normal mb-6 leading-relaxed">
            Углублённые тренировки под руководством опытных наставников. Развитие силы, выносливости и
            тактического мышления для выхода на соревновательный уровень.
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-[#d6a54a] text-sm">
              <div className="w-2 h-2 bg-[#d6a54a] rounded-full"></div>
              Работа над техникой и тактикой
            </div>
            <div className="flex items-center gap-3 text-[#d6a54a] text-sm">
              <div className="w-2 h-2 bg-[#d6a54a] rounded-full"></div>
              Силовая и функциональная подготовка
            </div>
            <div className="flex items-center gap-3 text-[#d6a54a] text-sm">
              <div className="w-2 h-2 bg-[#d6a54a] rounded-full"></div>
              Спарринги и командная работа
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Турниры и разряды",
      content: (
        <div>
          <p className="text-white text-sm md:text-base font-normal mb-6 leading-relaxed">
            Участие в турнирах и чемпионатах, борьба за призовые места и получение спортивных разрядов.
            Путь от воспитанника клуба до настоящего чемпиона.
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-[#d6a54a] text-sm">
              <div className="w-2 h-2 bg-[#d6a54a] rounded-full"></div>
              Внутренние и выездные турниры
            </div>
            <div className="flex items-center gap-3 text-[#d6a54a] text-sm">
              <div className="w-2 h-2 bg-[#d6a54a] rounded-full"></div>
              Участие в чемпионатах региона
            </div>
            <div className="flex items-center gap-3 text-[#d6a54a] text-sm">
              <div className="w-2 h-2 bg-[#d6a54a] rounded-full"></div>
              Присвоение спортивных разрядов
            </div>
          </div>
        </div>
      ),
    },
  ]

  return (
    <section id="applications" className="py-20 bg-[#050608]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6 uppercase">Путь спортсмена</h2>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            От первой тренировки до чемпионского пьедестала — клуб «Патриот» проведёт вас через все этапы
            спортивного роста.
          </p>
        </div>

        <div className="relative">
          <Timeline data={data} />
        </div>
      </div>
    </section>
  )
}