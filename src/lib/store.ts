export interface NewsItem {
  id: string
  title: string
  date: string
  description: string
  image: string
}

export interface Tournament {
  id: string
  name: string
  date: string
  place: string
  status: "open" | "closed"
  regulationUrl?: string
  resultsUrl?: string
}

export interface Championship {
  id: string
  name: string
  stages: { date: string; description: string }[]
  results: { place: number; name: string; points: number }[]
  winners: { name: string; photo: string; achievement: string }[]
}

export interface GalleryItem {
  id: string
  url: string
  caption?: string
}

function loadOrDefault<T>(key: string, defaults: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : defaults
  } catch {
    return defaults
  }
}

function save<T>(key: string, data: T): void {
  localStorage.setItem(key, JSON.stringify(data))
}

// ─── NEWS ─────────────────────────────────────────────────────────────────────

const DEFAULT_NEWS: NewsItem[] = [
  {
    id: "1",
    title: "Команда «Патриот» взяла золото на городском первенстве",
    date: "15 июня 2025",
    description: "Наши спортсмены завоевали 3 золотые медали на городском первенстве по боевым искусствам. Поздравляем победителей!",
    image: "https://cdn.poehali.dev/projects/ca96a9b4-8e03-4bdb-baad-101a1b65bc87/files/1ef2a2b0-ab0e-4fe5-9124-5ed99df2d250.jpg",
  },
  {
    id: "2",
    title: "Открытие нового тренировочного зала",
    date: "1 мая 2025",
    description: "Клуб «Патриот» открыл обновлённый тренировочный зал с новым оборудованием — теперь тренироваться ещё эффективнее.",
    image: "https://cdn.poehali.dev/projects/ca96a9b4-8e03-4bdb-baad-101a1b65bc87/files/1ef2a2b0-ab0e-4fe5-9124-5ed99df2d250.jpg",
  },
  {
    id: "3",
    title: "Набор в детские и юношеские группы",
    date: "20 апреля 2025",
    description: "Объявляем набор в группы для детей от 6 лет и подростков. Первая тренировка — бесплатно. Звоните и записывайтесь!",
    image: "https://cdn.poehali.dev/projects/ca96a9b4-8e03-4bdb-baad-101a1b65bc87/files/1ef2a2b0-ab0e-4fe5-9124-5ed99df2d250.jpg",
  },
]

export function getNews(): NewsItem[] {
  return loadOrDefault("patriot_news", DEFAULT_NEWS)
}
export function saveNews(items: NewsItem[]): void {
  save("patriot_news", items)
}

// ─── TOURNAMENTS ───────────────────────────────────────────────────────────────

const DEFAULT_TOURNAMENTS: Tournament[] = [
  {
    id: "1",
    name: "Открытый турнир «Патриот» по рукопашному бою",
    date: "12 июля 2025, 10:00",
    place: "г. Якутск, Промышленный округ, СК «Патриот»",
    status: "open",
  },
  {
    id: "2",
    name: "Первенство Якутска по дзюдо",
    date: "5 сентября 2025, 09:00",
    place: "г. Якутск, ул. Октябрьская, 11",
    status: "open",
  },
  {
    id: "3",
    name: "Зимний кубок по самбо",
    date: "18 января 2025",
    place: "г. Якутск, Дворец спорта",
    status: "closed",
  },
]

export function getTournaments(): Tournament[] {
  return loadOrDefault("patriot_tournaments", DEFAULT_TOURNAMENTS)
}
export function saveTournaments(items: Tournament[]): void {
  save("patriot_tournaments", items)
}

// ─── CHAMPIONSHIPS ─────────────────────────────────────────────────────────────

const DEFAULT_CHAMPIONSHIP: Championship = {
  id: "1",
  name: "Чемпионат Якутска 2025",
  stages: [
    { date: "15 февраля 2025", description: "I этап — квалификационный тур" },
    { date: "22 марта 2025", description: "II этап — полуфинал" },
    { date: "10 мая 2025", description: "III этап — финал и награждение" },
  ],
  results: [
    { place: 1, name: "Алексей Борисов", points: 120 },
    { place: 2, name: "Иван Попов", points: 95 },
    { place: 3, name: "Дмитрий Соколов", points: 87 },
    { place: 4, name: "Пётр Фёдоров", points: 74 },
    { place: 5, name: "Николай Кузнецов", points: 68 },
  ],
  winners: [
    { name: "Алексей Борисов", photo: "/placeholder-user.jpg", achievement: "Чемпион 2025, 1 место" },
    { name: "Иван Попов", photo: "/placeholder-user.jpg", achievement: "Серебряный призёр 2025" },
    { name: "Дмитрий Соколов", photo: "/placeholder-user.jpg", achievement: "Бронзовый призёр 2025" },
  ],
}

export function getChampionship(): Championship {
  return loadOrDefault("patriot_championship", DEFAULT_CHAMPIONSHIP)
}
export function saveChampionship(item: Championship): void {
  save("patriot_championship", item)
}

// ─── GALLERY ───────────────────────────────────────────────────────────────────

const DEFAULT_GALLERY: GalleryItem[] = [
  { id: "1", url: "https://cdn.poehali.dev/projects/ca96a9b4-8e03-4bdb-baad-101a1b65bc87/files/1ef2a2b0-ab0e-4fe5-9124-5ed99df2d250.jpg", caption: "Турнир 2025" },
  { id: "2", url: "https://cdn.poehali.dev/projects/ca96a9b4-8e03-4bdb-baad-101a1b65bc87/files/1ef2a2b0-ab0e-4fe5-9124-5ed99df2d250.jpg", caption: "Тренировка" },
  { id: "3", url: "https://cdn.poehali.dev/projects/ca96a9b4-8e03-4bdb-baad-101a1b65bc87/files/1ef2a2b0-ab0e-4fe5-9124-5ed99df2d250.jpg", caption: "Награждение" },
  { id: "4", url: "https://cdn.poehali.dev/projects/ca96a9b4-8e03-4bdb-baad-101a1b65bc87/files/1ef2a2b0-ab0e-4fe5-9124-5ed99df2d250.jpg", caption: "Команда" },
  { id: "5", url: "https://cdn.poehali.dev/projects/ca96a9b4-8e03-4bdb-baad-101a1b65bc87/files/1ef2a2b0-ab0e-4fe5-9124-5ed99df2d250.jpg", caption: "Спарринг" },
  { id: "6", url: "https://cdn.poehali.dev/projects/ca96a9b4-8e03-4bdb-baad-101a1b65bc87/files/1ef2a2b0-ab0e-4fe5-9124-5ed99df2d250.jpg", caption: "Победители" },
]

export function getGallery(): GalleryItem[] {
  return loadOrDefault("patriot_gallery", DEFAULT_GALLERY)
}
export function saveGallery(items: GalleryItem[]): void {
  save("patriot_gallery", items)
}
