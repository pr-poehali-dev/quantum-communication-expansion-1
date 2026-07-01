import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

const navLinks = [
  { href: "#news", label: "Новости" },
  { href: "#tournaments", label: "Турниры" },
  { href: "#championships", label: "Чемпионаты" },
  { href: "#gallery", label: "Галерея" },
  { href: "#about", label: "О клубе" },
  { href: "#contacts", label: "Контакты" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-[9999] bg-[#050608]/95 backdrop-blur-md border-b border-[#d6a54a]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 leading-tight">
            <h1 className="font-orbitron text-2xl font-bold text-[#d6a54a] uppercase tracking-widest">
              Патриот
            </h1>
            <p className="font-geist text-[10px] text-gray-400 uppercase tracking-[0.2em]">Спортивный клуб</p>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-geist text-white hover:text-[#d6a54a] transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button className="bg-[#d6a54a] hover:bg-[#c4923a] text-[#08111d] font-geist font-bold border-0">
              Присоединиться
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-[#d6a54a] transition-colors duration-200"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-[#050608]/98 border-t border-[#d6a54a]/20">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block px-3 py-2 font-geist text-white hover:text-[#d6a54a] transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="px-3 py-2">
                <Button className="w-full bg-[#d6a54a] hover:bg-[#c4923a] text-[#08111d] font-geist font-bold border-0">
                  Присоединиться
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
