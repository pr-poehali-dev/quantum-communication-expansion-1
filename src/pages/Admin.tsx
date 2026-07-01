import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import Icon from "@/components/ui/icon"
import {
  getNews, saveNews,
  getTournaments, saveTournaments,
  getChampionship, saveChampionship,
  getGallery, saveGallery,
  type NewsItem, type Tournament, type Championship, type GalleryItem,
} from "@/lib/store"

const ADMIN_LOGIN = "admin"
const ADMIN_PASSWORD = "patriot2025"

// ─── Login ────────────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (login === ADMIN_LOGIN && password === ADMIN_PASSWORD) {
      sessionStorage.setItem("patriot_admin", "1")
      onLogin()
    } else {
      setError(true)
    }
  }

  return (
    <div className="dark min-h-screen bg-[#08111d] flex items-center justify-center px-4">
      <div className="w-full max-w-sm border border-[#d6a54a]/30 bg-[#111827] rounded-xl p-8">
        <h1 className="font-orbitron text-2xl font-bold text-[#d6a54a] mb-1 uppercase text-center">Патриот</h1>
        <p className="text-gray-400 text-sm text-center font-geist mb-8">Вход в панель управления</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Логин"
            value={login}
            onChange={(e) => { setLogin(e.target.value); setError(false) }}
            className="bg-[#08111d] border-[#d6a54a]/30 text-white placeholder:text-gray-500"
          />
          <Input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(false) }}
            className="bg-[#08111d] border-[#d6a54a]/30 text-white placeholder:text-gray-500"
          />
          {error && <p className="text-red-400 text-sm font-geist">Неверный логин или пароль</p>}
          <Button className="w-full bg-[#d6a54a] hover:bg-[#c4923a] text-[#08111d] font-orbitron font-bold uppercase">
            Войти
          </Button>
        </form>
      </div>
    </div>
  )
}

// ─── News CRUD ────────────────────────────────────────────────────────────────
function NewsAdmin() {
  const [items, setItems] = useState<NewsItem[]>(getNews)
  const [editing, setEditing] = useState<NewsItem | null>(null)
  const [form, setForm] = useState({ title: "", date: "", description: "", image: "" })

  function startNew() {
    setEditing({ id: "", title: "", date: "", description: "", image: "" })
    setForm({ title: "", date: "", description: "", image: "" })
  }

  function startEdit(item: NewsItem) {
    setEditing(item)
    setForm({ title: item.title, date: item.date, description: item.description, image: item.image })
  }

  function save() {
    if (!form.title.trim()) return
    let updated: NewsItem[]
    if (editing?.id) {
      updated = items.map((i) => i.id === editing.id ? { ...i, ...form } : i)
    } else {
      updated = [{ id: Date.now().toString(), ...form }, ...items]
    }
    setItems(updated)
    saveNews(updated)
    setEditing(null)
  }

  function remove(id: string) {
    const updated = items.filter((i) => i.id !== id)
    setItems(updated)
    saveNews(updated)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-orbitron text-xl text-white uppercase">Новости</h2>
        <Button className="bg-[#d6a54a] hover:bg-[#c4923a] text-[#08111d] font-orbitron text-xs uppercase" onClick={startNew}>
          <Icon name="Plus" size={14} className="mr-1" /> Добавить
        </Button>
      </div>

      {editing !== null && (
        <div className="border border-[#d6a54a]/30 bg-[#08111d] rounded-xl p-6 mb-6 space-y-3">
          <Input placeholder="Заголовок" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="bg-[#111827] border-[#d6a54a]/20 text-white placeholder:text-gray-500" />
          <Input placeholder="Дата (напр. 15 июня 2025)" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="bg-[#111827] border-[#d6a54a]/20 text-white placeholder:text-gray-500" />
          <Textarea placeholder="Текст новости" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="bg-[#111827] border-[#d6a54a]/20 text-white placeholder:text-gray-500 min-h-[100px]" />
          <Input placeholder="URL изображения" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })}
            className="bg-[#111827] border-[#d6a54a]/20 text-white placeholder:text-gray-500" />
          <div className="flex gap-3">
            <Button className="bg-[#d6a54a] hover:bg-[#c4923a] text-[#08111d] font-orbitron text-xs uppercase" onClick={save}>Сохранить</Button>
            <Button variant="outline" className="border-gray-600 text-gray-400 bg-transparent hover:bg-gray-700 font-orbitron text-xs uppercase" onClick={() => setEditing(null)}>Отмена</Button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-start justify-between gap-4 border border-[#d6a54a]/15 bg-[#111827] rounded-xl p-4">
            <div className="flex-1 min-w-0">
              <p className="text-white font-geist font-semibold truncate">{item.title}</p>
              <p className="text-[#d6a54a] text-xs font-geist mt-0.5">{item.date}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => startEdit(item)} className="text-gray-400 hover:text-[#d6a54a] transition-colors">
                <Icon name="Pencil" size={16} />
              </button>
              <button onClick={() => remove(item.id)} className="text-gray-400 hover:text-red-400 transition-colors">
                <Icon name="Trash2" size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Tournaments CRUD ─────────────────────────────────────────────────────────
function TournamentsAdmin() {
  const [items, setItems] = useState<Tournament[]>(getTournaments)
  const [editing, setEditing] = useState<Tournament | null>(null)
  const [form, setForm] = useState({ name: "", date: "", place: "", status: "open" as "open" | "closed" })

  function startNew() {
    setEditing({ id: "", name: "", date: "", place: "", status: "open" })
    setForm({ name: "", date: "", place: "", status: "open" })
  }
  function startEdit(item: Tournament) {
    setEditing(item)
    setForm({ name: item.name, date: item.date, place: item.place, status: item.status })
  }
  function save() {
    if (!form.name.trim()) return
    let updated: Tournament[]
    if (editing?.id) {
      updated = items.map((i) => i.id === editing.id ? { ...i, ...form } : i)
    } else {
      updated = [{ id: Date.now().toString(), ...form }, ...items]
    }
    setItems(updated)
    saveTournaments(updated)
    setEditing(null)
  }
  function remove(id: string) {
    const updated = items.filter((i) => i.id !== id)
    setItems(updated)
    saveTournaments(updated)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-orbitron text-xl text-white uppercase">Турниры</h2>
        <Button className="bg-[#d6a54a] hover:bg-[#c4923a] text-[#08111d] font-orbitron text-xs uppercase" onClick={startNew}>
          <Icon name="Plus" size={14} className="mr-1" /> Добавить
        </Button>
      </div>

      {editing !== null && (
        <div className="border border-[#d6a54a]/30 bg-[#08111d] rounded-xl p-6 mb-6 space-y-3">
          <Input placeholder="Название турнира" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="bg-[#111827] border-[#d6a54a]/20 text-white placeholder:text-gray-500" />
          <Input placeholder="Дата и время" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="bg-[#111827] border-[#d6a54a]/20 text-white placeholder:text-gray-500" />
          <Input placeholder="Место проведения" value={form.place} onChange={(e) => setForm({ ...form, place: e.target.value })}
            className="bg-[#111827] border-[#d6a54a]/20 text-white placeholder:text-gray-500" />
          <div className="flex gap-3">
            <button
              onClick={() => setForm({ ...form, status: "open" })}
              className={`px-4 py-2 rounded-lg text-xs font-orbitron uppercase transition-colors ${form.status === "open" ? "bg-green-500/20 text-green-400 border border-green-500/40" : "text-gray-400 border border-gray-600"}`}
            >Регистрация открыта</button>
            <button
              onClick={() => setForm({ ...form, status: "closed" })}
              className={`px-4 py-2 rounded-lg text-xs font-orbitron uppercase transition-colors ${form.status === "closed" ? "bg-gray-500/30 text-gray-300 border border-gray-500/40" : "text-gray-400 border border-gray-600"}`}
            >Завершён</button>
          </div>
          <div className="flex gap-3">
            <Button className="bg-[#d6a54a] hover:bg-[#c4923a] text-[#08111d] font-orbitron text-xs uppercase" onClick={save}>Сохранить</Button>
            <Button variant="outline" className="border-gray-600 text-gray-400 bg-transparent hover:bg-gray-700 font-orbitron text-xs uppercase" onClick={() => setEditing(null)}>Отмена</Button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-start justify-between gap-4 border border-[#d6a54a]/15 bg-[#111827] rounded-xl p-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-white font-geist font-semibold truncate">{item.name}</p>
                <Badge className={item.status === "open" ? "bg-green-500/20 text-green-400 border border-green-500/40 text-xs" : "bg-gray-500/20 text-gray-400 border border-gray-500/40 text-xs"}>
                  {item.status === "open" ? "Открыт" : "Завершён"}
                </Badge>
              </div>
              <p className="text-[#d6a54a] text-xs font-geist">{item.date} · {item.place}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => startEdit(item)} className="text-gray-400 hover:text-[#d6a54a] transition-colors">
                <Icon name="Pencil" size={16} />
              </button>
              <button onClick={() => remove(item.id)} className="text-gray-400 hover:text-red-400 transition-colors">
                <Icon name="Trash2" size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Championships CRUD ───────────────────────────────────────────────────────
function ChampionshipsAdmin() {
  const [champ, setChamp] = useState<Championship>(getChampionship)
  const [saved, setSaved] = useState(false)
  const [newStage, setNewStage] = useState({ date: "", description: "" })
  const [newResult, setNewResult] = useState({ place: "", name: "", points: "" })
  const [newWinner, setNewWinner] = useState({ name: "", photo: "", achievement: "" })

  function persist(updated: Championship) {
    setChamp(updated)
    saveChampionship(updated)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="font-orbitron text-xl text-white uppercase">Чемпионат</h2>
        {saved && <span className="text-green-400 text-sm font-geist">Сохранено ✓</span>}
      </div>

      <Input
        placeholder="Название чемпионата"
        value={champ.name}
        onChange={(e) => persist({ ...champ, name: e.target.value })}
        className="bg-[#111827] border-[#d6a54a]/20 text-white placeholder:text-gray-500"
      />

      {/* Stages */}
      <div>
        <h3 className="text-[#d6a54a] font-orbitron uppercase text-sm mb-3">Этапы расписания</h3>
        <div className="space-y-2 mb-3">
          {champ.stages.map((s, i) => (
            <div key={i} className="flex items-center gap-3 bg-[#111827] border border-[#d6a54a]/15 rounded-lg px-4 py-2">
              <span className="text-[#d6a54a] text-sm font-geist w-32 shrink-0">{s.date}</span>
              <span className="text-white text-sm font-geist flex-1">{s.description}</span>
              <button onClick={() => persist({ ...champ, stages: champ.stages.filter((_, j) => j !== i) })} className="text-gray-500 hover:text-red-400 transition-colors">
                <Icon name="X" size={14} />
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Input placeholder="Дата" value={newStage.date} onChange={(e) => setNewStage({ ...newStage, date: e.target.value })}
            className="bg-[#111827] border-[#d6a54a]/20 text-white placeholder:text-gray-500 w-36" />
          <Input placeholder="Описание этапа" value={newStage.description} onChange={(e) => setNewStage({ ...newStage, description: e.target.value })}
            className="bg-[#111827] border-[#d6a54a]/20 text-white placeholder:text-gray-500 flex-1" />
          <Button className="bg-[#d6a54a] hover:bg-[#c4923a] text-[#08111d] font-orbitron text-xs uppercase shrink-0"
            onClick={() => { if (newStage.description) { persist({ ...champ, stages: [...champ.stages, newStage] }); setNewStage({ date: "", description: "" }) } }}>
            <Icon name="Plus" size={14} />
          </Button>
        </div>
      </div>

      {/* Results */}
      <div>
        <h3 className="text-[#d6a54a] font-orbitron uppercase text-sm mb-3">Результаты</h3>
        <div className="space-y-2 mb-3">
          {champ.results.map((r, i) => (
            <div key={i} className="flex items-center gap-3 bg-[#111827] border border-[#d6a54a]/15 rounded-lg px-4 py-2">
              <span className="text-[#d6a54a] font-orbitron w-8 shrink-0">#{r.place}</span>
              <span className="text-white font-geist flex-1">{r.name}</span>
              <span className="text-muted-foreground font-geist text-sm">{r.points} очков</span>
              <button onClick={() => persist({ ...champ, results: champ.results.filter((_, j) => j !== i) })} className="text-gray-500 hover:text-red-400 transition-colors">
                <Icon name="X" size={14} />
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Input placeholder="Место" value={newResult.place} onChange={(e) => setNewResult({ ...newResult, place: e.target.value })}
            className="bg-[#111827] border-[#d6a54a]/20 text-white placeholder:text-gray-500 w-20" />
          <Input placeholder="Имя" value={newResult.name} onChange={(e) => setNewResult({ ...newResult, name: e.target.value })}
            className="bg-[#111827] border-[#d6a54a]/20 text-white placeholder:text-gray-500 flex-1" />
          <Input placeholder="Очки" value={newResult.points} onChange={(e) => setNewResult({ ...newResult, points: e.target.value })}
            className="bg-[#111827] border-[#d6a54a]/20 text-white placeholder:text-gray-500 w-24" />
          <Button className="bg-[#d6a54a] hover:bg-[#c4923a] text-[#08111d] font-orbitron text-xs uppercase shrink-0"
            onClick={() => {
              if (newResult.name) {
                persist({ ...champ, results: [...champ.results, { place: parseInt(newResult.place) || 0, name: newResult.name, points: parseInt(newResult.points) || 0 }] })
                setNewResult({ place: "", name: "", points: "" })
              }
            }}>
            <Icon name="Plus" size={14} />
          </Button>
        </div>
      </div>

      {/* Winners */}
      <div>
        <h3 className="text-[#d6a54a] font-orbitron uppercase text-sm mb-3">Победители</h3>
        <div className="space-y-2 mb-3">
          {champ.winners.map((w, i) => (
            <div key={i} className="flex items-center gap-3 bg-[#111827] border border-[#d6a54a]/15 rounded-lg px-4 py-2">
              <span className="text-white font-geist flex-1">{w.name}</span>
              <span className="text-muted-foreground font-geist text-sm">{w.achievement}</span>
              <button onClick={() => persist({ ...champ, winners: champ.winners.filter((_, j) => j !== i) })} className="text-gray-500 hover:text-red-400 transition-colors">
                <Icon name="X" size={14} />
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Input placeholder="Имя" value={newWinner.name} onChange={(e) => setNewWinner({ ...newWinner, name: e.target.value })}
            className="bg-[#111827] border-[#d6a54a]/20 text-white placeholder:text-gray-500 flex-1" />
          <Input placeholder="Достижение" value={newWinner.achievement} onChange={(e) => setNewWinner({ ...newWinner, achievement: e.target.value })}
            className="bg-[#111827] border-[#d6a54a]/20 text-white placeholder:text-gray-500 flex-1" />
          <Button className="bg-[#d6a54a] hover:bg-[#c4923a] text-[#08111d] font-orbitron text-xs uppercase shrink-0"
            onClick={() => {
              if (newWinner.name) {
                persist({ ...champ, winners: [...champ.winners, { name: newWinner.name, photo: "/placeholder-user.jpg", achievement: newWinner.achievement }] })
                setNewWinner({ name: "", photo: "", achievement: "" })
              }
            }}>
            <Icon name="Plus" size={14} />
          </Button>
        </div>
      </div>
    </div>
  )
}

// ─── Gallery CRUD ─────────────────────────────────────────────────────────────
function GalleryAdmin() {
  const [items, setItems] = useState<GalleryItem[]>(getGallery)
  const [url, setUrl] = useState("")
  const [caption, setCaption] = useState("")

  function add() {
    if (!url.trim()) return
    const updated = [...items, { id: Date.now().toString(), url, caption }]
    setItems(updated)
    saveGallery(updated)
    setUrl("")
    setCaption("")
  }

  function remove(id: string) {
    const updated = items.filter((i) => i.id !== id)
    setItems(updated)
    saveGallery(updated)
  }

  return (
    <div>
      <h2 className="font-orbitron text-xl text-white uppercase mb-6">Галерея</h2>

      <div className="flex gap-2 mb-6">
        <Input placeholder="URL фото" value={url} onChange={(e) => setUrl(e.target.value)}
          className="bg-[#111827] border-[#d6a54a]/20 text-white placeholder:text-gray-500 flex-1" />
        <Input placeholder="Подпись (необязательно)" value={caption} onChange={(e) => setCaption(e.target.value)}
          className="bg-[#111827] border-[#d6a54a]/20 text-white placeholder:text-gray-500 flex-1" />
        <Button className="bg-[#d6a54a] hover:bg-[#c4923a] text-[#08111d] font-orbitron text-xs uppercase shrink-0" onClick={add}>
          <Icon name="Plus" size={14} className="mr-1" /> Добавить
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {items.map((item) => (
          <div key={item.id} className="relative group rounded-lg overflow-hidden aspect-square">
            <img src={item.url} alt={item.caption || ""} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
              {item.caption && <p className="text-white text-xs text-center font-geist">{item.caption}</p>}
              <button onClick={() => remove(item.id)} className="text-red-400 hover:text-red-300 transition-colors">
                <Icon name="Trash2" size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Main Admin Page ──────────────────────────────────────────────────────────
export default function Admin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem("patriot_admin") === "1")

  function logout() {
    sessionStorage.removeItem("patriot_admin")
    setAuthed(false)
  }

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />

  return (
    <div className="dark min-h-screen bg-[#08111d]">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-[#050608]/95 backdrop-blur-md border-b border-[#d6a54a]/20 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="font-orbitron text-xl font-bold text-[#d6a54a] uppercase tracking-widest">Патриот</h1>
          <p className="text-gray-400 text-xs font-geist uppercase tracking-widest">Панель управления</p>
        </div>
        <div className="flex items-center gap-4">
          <a href="/" className="text-gray-400 hover:text-[#d6a54a] text-sm font-geist flex items-center gap-1 transition-colors">
            <Icon name="Globe" size={15} /> Сайт
          </a>
          <Button variant="outline" size="sm" onClick={logout}
            className="border-gray-600 text-gray-400 bg-transparent hover:bg-gray-700 font-orbitron text-xs uppercase">
            <Icon name="LogOut" size={14} className="mr-1" /> Выйти
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        <Tabs defaultValue="news" className="w-full">
          <TabsList className="bg-[#111827] border border-[#d6a54a]/20 mb-8 p-1 h-auto flex-wrap gap-1 w-full">
            {[
              { value: "news", label: "Новости", icon: "Newspaper" },
              { value: "tournaments", label: "Турниры", icon: "Trophy" },
              { value: "championships", label: "Чемпионаты", icon: "Medal" },
              { value: "gallery", label: "Галерея", icon: "Images" },
            ].map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="flex-1 font-orbitron uppercase text-xs data-[state=active]:bg-[#d6a54a] data-[state=active]:text-[#08111d] text-gray-300 flex items-center gap-1.5"
              >
                <Icon name={tab.icon} size={13} fallback="Circle" />
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="news"><NewsAdmin /></TabsContent>
          <TabsContent value="tournaments"><TournamentsAdmin /></TabsContent>
          <TabsContent value="championships"><ChampionshipsAdmin /></TabsContent>
          <TabsContent value="gallery"><GalleryAdmin /></TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
