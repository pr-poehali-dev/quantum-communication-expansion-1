import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQSection() {
  const faqs = [
    {
      question: "С какого возраста можно заниматься?",
      answer:
        "Мы принимаем детей с 6 лет, а также подростков и взрослых. Для каждого возраста своя группа и программа подготовки.",
    },
    {
      question: "Нужна ли специальная подготовка для начала?",
      answer:
        "Нет. Мы берём новичков без опыта — тренеры подберут нагрузку под ваш уровень и помогут освоить базу с нуля.",
    },
    {
      question: "Что нужно для первой тренировки?",
      answer:
        "Спортивная форма, сменная обувь и вода. Всё остальное снаряжение для новичков есть в клубе.",
    },
    {
      question: "Как проходят турниры клуба?",
      answer:
        "Мы регулярно проводим внутренние соревнования и выезжаем на городские и региональные чемпионаты. Расписание публикуется в разделе «Турниры».",
    },
    {
      question: "Можно ли получить спортивный разряд?",
      answer:
        "Да. При регулярных тренировках и участии в официальных соревнованиях наши воспитанники получают спортивные разряды.",
    },
    {
      question: "Как записаться в клуб?",
      answer:
        "Нажмите «Присоединиться» или позвоните нам по телефону +7-984-105-91-17 — мы расскажем подробности и запишем на пробную тренировку.",
    },
  ]

  return (
    <section className="py-24 bg-[#050608]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-orbitron uppercase">Частые вопросы</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-geist">
            Ответы на популярные вопросы о тренировках, записи и жизни клуба.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-[#d6a54a]/20 mb-4">
                <AccordionTrigger className="text-left text-lg font-semibold text-white hover:text-[#d6a54a] font-orbitron px-6 py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 leading-relaxed px-6 pb-4 font-geist">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}