"use client"

import { Home, Calendar, Settings } from "lucide-react"
import { motion } from "framer-motion"

interface BottomNavProps {
  currentView: "day" | "week" | "settings"
  onViewChange: (view: "day" | "week" | "settings") => void
  language: "ru" | "en"
}

export default function BottomNav({ currentView, onViewChange, language }: BottomNavProps) {
  const labels = {
    ru: { day: "День", week: "Неделя", settings: "Настройки" },
    en: { day: "Day", week: "Week", settings: "Settings" },
  }

  const navItems = [
    { id: "day" as const, icon: Home, label: labels[language].day },
    { id: "week" as const, icon: Calendar, label: labels[language].week },
    { id: "settings" as const, icon: Settings, label: labels[language].settings },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-800 border-t border-border shadow-neumorphic">
      <div className="flex justify-around items-center px-2 py-3 max-w-2xl mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = currentView === item.id
          return (
            <motion.button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${
                  isActive
                    ? "bg-gradient-to-br from-sky-400 to-blue-500 text-white"
                    : "text-muted-foreground hover:bg-sky-100 dark:hover:bg-slate-700"
                }`}
              >
                <Icon size={20} />
              </div>
              <span className={`text-xs font-medium ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 to-blue-500 rounded-t-full"
                  transition={{ duration: 0.2 }}
                />
              )}
            </motion.button>
          )
        })}
      </div>
    </nav>
  )
}
