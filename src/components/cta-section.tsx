import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"

export function CTASection() {
  return (
    <section id="contacts" className="py-24 px-6 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
      <div className="max-w-4xl mx-auto text-center">
        <div className="slide-up">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-orbitron uppercase text-balance">
            Стань частью команды «Патриот»
          </h2>
          <p className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto">
            Запишись на первую тренировку прямо сейчас. Дисциплина, сила и настоящий спортивный характер начинаются здесь.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 pulse-button text-lg px-8 py-4 font-orbitron uppercase"
            >
              Присоединиться
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg px-8 py-4 bg-transparent font-orbitron uppercase"
            >
              Связаться с нами
            </Button>
          </div>
          <div className="flex flex-col md:flex-row gap-4 md:gap-10 justify-center text-muted-foreground">
            <div className="flex items-center justify-center gap-2">
              <Icon name="Phone" size={18} className="text-primary" />
              <span className="font-geist">+7‒984‒105‒91‒17</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Icon name="MapPin" size={18} className="text-primary" />
              <span className="font-geist">Промышленный округ, Якутск, 677004</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}