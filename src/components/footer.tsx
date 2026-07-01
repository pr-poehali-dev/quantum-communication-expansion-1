import Icon from "@/components/ui/icon"

export function Footer() {
  return (
    <footer className="bg-[#050608] border-t border-[#d6a54a]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h2 className="font-orbitron text-2xl font-bold text-[#d6a54a] mb-1 uppercase tracking-widest">Патриот</h2>
            <p className="font-geist text-xs text-gray-400 uppercase tracking-[0.2em] mb-4">Спортивный клуб</p>
            <p className="font-geist text-gray-300 mb-6 max-w-md">
              Воспитываем силу, дисциплину и характер. Турниры, чемпионаты и профессиональная подготовка спортсменов любого возраста.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[#d6a54a] transition-colors duration-200">
                <Icon name="Send" size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#d6a54a] transition-colors duration-200">
                <Icon name="Instagram" size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#d6a54a] transition-colors duration-200">
                <Icon name="Youtube" size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#d6a54a] transition-colors duration-200">
                <Icon name="Mail" size={20} />
              </a>
            </div>
          </div>

          {/* Club */}
          <div>
            <h3 className="font-orbitron text-white font-semibold mb-4 uppercase">Клуб</h3>
            <ul className="space-y-2">
              <li>
                <a href="#news" className="font-geist text-gray-400 hover:text-[#d6a54a] transition-colors duration-200">
                  Новости
                </a>
              </li>
              <li>
                <a href="#tournaments" className="font-geist text-gray-400 hover:text-[#d6a54a] transition-colors duration-200">
                  Турниры
                </a>
              </li>
              <li>
                <a href="#championships" className="font-geist text-gray-400 hover:text-[#d6a54a] transition-colors duration-200">
                  Чемпионаты
                </a>
              </li>
              <li>
                <a href="#gallery" className="font-geist text-gray-400 hover:text-[#d6a54a] transition-colors duration-200">
                  Галерея
                </a>
              </li>
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="font-orbitron text-white font-semibold mb-4 uppercase">Контакты</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400 font-geist">
                <Icon name="Phone" size={16} className="text-[#d6a54a]" />
                +7‒984‒105‒91‒17
              </li>
              <li className="flex items-start gap-2 text-gray-400 font-geist">
                <Icon name="MapPin" size={16} className="text-[#d6a54a] mt-1" />
                Промышленный округ,<br />Якутск, 677004
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-[#d6a54a]/20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="font-geist text-gray-400 text-sm">© 2025 СК «Патриот». Все права защищены.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="font-geist text-gray-400 hover:text-[#d6a54a] text-sm transition-colors duration-200">
                Конфиденциальность
              </a>
              <a href="#about" className="font-geist text-gray-400 hover:text-[#d6a54a] text-sm transition-colors duration-200">
                О клубе
              </a>
              <a href="#contacts" className="font-geist text-gray-400 hover:text-[#d6a54a] text-sm transition-colors duration-200">
                Контакты
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
