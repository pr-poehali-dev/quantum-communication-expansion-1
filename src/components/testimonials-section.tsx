import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const testimonials = [
  {
    name: "Дмитрий Соколов",
    role: "Воспитанник клуба, 3 года в «Патриоте»",
    avatar: "/placeholder-user.jpg",
    content:
      "Пришёл обычным парнем — сейчас у меня разряд и три победы на турнирах. Тренеры выкладываются на 100%.",
  },
  {
    name: "Анна Петрова",
    role: "Мама воспитанника",
    avatar: "/placeholder-user.jpg",
    content:
      "Сын изменился: стал дисциплинированным, собранным и уверенным в себе. Спасибо клубу за настоящее мужское воспитание.",
  },
  {
    name: "Сергей Иванов",
    role: "Взрослая группа, любитель",
    avatar: "/placeholder-user.jpg",
    content:
      "Отличная атмосфера и сильная команда. Здесь тренируются на результат, а поддержка чувствуется с первого дня.",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-24 px-6 bg-card">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-card-foreground mb-4 font-orbitron uppercase">Отзывы наших спортсменов</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Что говорят воспитанники клуба и их родители
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="glow-border slide-up" style={{ animationDelay: `${index * 0.15}s` }}>
              <CardContent className="p-6">
                <p className="text-card-foreground mb-6 leading-relaxed italic">"{testimonial.content}"</p>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-primary">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}