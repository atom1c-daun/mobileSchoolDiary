import { Calendar } from "lucide-react"

interface HeaderProps {
  currentView: "day" | "week" | "settings"
  language: "ru" | "en"
}

export default function Header({ currentView, language }: HeaderProps) {
  const titles = {
    ru: { day: "Мой день", week: "Неделя", settings: "Настройки" },
    en: { day: "My Day", week: "Week", settings: "Settings" },
  }

  const title = titles[language][currentView]

  return (
    <header className="bg-white dark:bg-slate-800 shadow-neumorphic sticky top-0 z-40">
      <div className="px-4 py-5 flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-blue-500 rounded-2xl flex items-center justify-center text-white">
          <Calendar size={20} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">SmartSchedule</h1>
          <p className="text-sm text-muted-foreground">{title}</p>
        </div>
      </div>
    </header>
  )
}
