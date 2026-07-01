import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Icon from "@/components/ui/icon"

const features = [
  {
    title: "Дисциплина и характер",
    description: "Воспитываем силу воли, ответственность и уважение. Спорт формирует настоящий мужской характер.",
    icon: "Shield",
    badge: "Характер",
  },
  {
    title: "Профессиональные тренеры",
    description: "Опытные наставники, мастера спорта и чемпионы, которые доведут вас до результата.",
    icon: "Medal",
    badge: "Опыт",
  },
  {
    title: "Турниры и соревнования",
    description: "Регулярные внутренние и выездные турниры — реальная практика и путь к спортивным разрядам.",
    icon: "Trophy",
    badge: "Практика",
  },
  {
    title: "Физическая подготовка",
    description: "Комплексные тренировки на силу, выносливость и технику для бойцов любого уровня.",
    icon: "Dumbbell",
    badge: "Форма",
  },
  {
    title: "Патриотическое воспитание",
    description: "Любовь к Родине, командный дух и готовность защищать — основа нашего клуба.",
    icon: "Flag",
    badge: "Ценности",
  },
  {
    title: "Для всех возрастов",
    description: "Группы для детей, подростков и взрослых. Начать путь в спорте никогда не поздно.",
    icon: "Users",
    badge: "Все группы",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-orbitron uppercase">Почему выбирают «Патриот»</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Сила, дисциплина и результат — то, что мы даём каждому спортсмену
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="glow-border hover:shadow-lg transition-all duration-300 slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="w-12 h-12 rounded-lg bg-[#d6a54a]/10 flex items-center justify-center text-[#d6a54a]">
                    <Icon name={feature.icon} size={26} fallback="Shield" />
                  </div>
                  <Badge variant="secondary" className="bg-accent text-accent-foreground">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-bold text-card-foreground font-orbitron">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}