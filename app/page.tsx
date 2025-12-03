"use client"

import { useState, useEffect } from "react"
import DayView from "@/components/DayView"
import WeekView from "@/components/WeekView"
import BottomNav from "@/components/BottomNav"
import Header from "@/components/Header"
import AddLessonModal from "@/components/AddLessonModal"
import { loadSchedule, saveSchedule } from "@/lib/storage"
import type { Lesson } from "@/lib/types"
import { motion, AnimatePresence } from "framer-motion"

type ViewType = "day" | "week" | "settings"

export default function Home() {
  const [currentView, setCurrentView] = useState<ViewType>("day")
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [language, setLanguage] = useState<"ru" | "en">("ru")

  useEffect(() => {
    const savedLessons = loadSchedule()
    const savedDarkMode = localStorage.getItem("darkMode") === "true"
    const savedNotifications = localStorage.getItem("notificationsEnabled") !== "false"
    const savedLanguage = (localStorage.getItem("language") || "ru") as "ru" | "en"

    setLessons(savedLessons)
    setIsDarkMode(savedDarkMode)
    setNotificationsEnabled(savedNotifications)
    setLanguage(savedLanguage)

    if (savedDarkMode) {
      document.documentElement.classList.add("dark")
    }
  }, [])

  useEffect(() => {
    saveSchedule(lessons)
  }, [lessons])

  const addLesson = (lesson: Lesson) => {
    setLessons([...lessons, lesson])
    setShowAddModal(false)
  }

  const updateLesson = (id: string, updatedLesson: Lesson) => {
    setLessons(lessons.map((l) => (l.id === id ? updatedLesson : l)))
  }

  const deleteLesson = (id: string) => {
    setLessons(lessons.filter((l) => l.id !== id))
  }

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode
    setIsDarkMode(newDarkMode)
    localStorage.setItem("darkMode", String(newDarkMode))
    if (newDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  const toggleNotifications = () => {
    const newNotifications = !notificationsEnabled
    setNotificationsEnabled(newNotifications)
    localStorage.setItem("notificationsEnabled", String(newNotifications))
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? "dark" : ""}`}>
      <div className="bg-gradient-to-br from-sky-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 min-h-screen pb-24">
        <Header currentView={currentView} language={language} />

        <AnimatePresence mode="wait">
          {currentView === "day" && (
            <motion.div
              key="day-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <DayView
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                lessons={lessons}
                onDeleteLesson={deleteLesson}
                onSwitchView={() => setCurrentView("week")}
                language={language}
              />
            </motion.div>
          )}

          {currentView === "week" && (
            <motion.div
              key="week-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <WeekView lessons={lessons} onDeleteLesson={deleteLesson} language={language} />
            </motion.div>
          )}

          {currentView === "settings" && (
            <motion.div
              key="settings-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="px-4 py-6 max-w-2xl mx-auto"
            >
              <div className="space-y-4">
                {/* Dark mode toggle */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-neumorphic">
                  <div className="flex items-center justify-between">
                    <span className="text-foreground font-medium">
                      {language === "ru" ? "Тёмный режим" : "Dark Mode"}
                    </span>
                    <button
                      onClick={toggleDarkMode}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        isDarkMode ? "bg-blue-400" : "bg-slate-300"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full bg-white transition-transform transform ${
                          isDarkMode ? "translate-x-6" : "translate-x-0.5"
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Notifications toggle */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-neumorphic">
                  <div className="flex items-center justify-between">
                    <span className="text-foreground font-medium">
                      {language === "ru" ? "Уведомления" : "Notifications"}
                    </span>
                    <button
                      onClick={toggleNotifications}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        notificationsEnabled ? "bg-blue-400" : "bg-slate-300"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full bg-white transition-transform transform ${
                          notificationsEnabled ? "translate-x-6" : "translate-x-0.5"
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Language select */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-neumorphic">
                  <label className="block text-foreground font-medium mb-3">
                    {language === "ru" ? "Язык" : "Language"}
                  </label>
                  <select
                    value={language}
                    onChange={(e) => {
                      setLanguage(e.target.value as "ru" | "en")
                      localStorage.setItem("language", e.target.value)
                    }}
                    className="w-full px-4 py-2 bg-sky-100 dark:bg-slate-700 rounded-xl focus:outline-none text-foreground"
                  >
                    <option value="ru">Русский</option>
                    <option value="en">English</option>
                  </select>
                </div>

                {/* Export/Import */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      const dataStr = JSON.stringify(lessons, null, 2)
                      const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)
                      const exportFileDefaultName = "smartschedule_backup.json"
                      const linkElement = document.createElement("a")
                      linkElement.setAttribute("href", dataUri)
                      linkElement.setAttribute("download", exportFileDefaultName)
                      linkElement.click()
                    }}
                    className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-neumorphic text-center font-medium text-foreground hover:shadow-lg transition-shadow"
                  >
                    {language === "ru" ? "Экспорт" : "Export"}
                  </button>
                  <button
                    onClick={() => {
                      const input = document.createElement("input")
                      input.type = "file"
                      input.accept = ".json"
                      input.onchange = (e: any) => {
                        const file = e.target.files[0]
                        const reader = new FileReader()
                        reader.onload = (event: any) => {
                          try {
                            const imported = JSON.parse(event.target.result)
                            setLessons(imported)
                          } catch (err) {
                            alert(language === "ru" ? "Ошибка при импорте" : "Import error")
                          }
                        }
                        reader.readAsText(file)
                      }
                      input.click()
                    }}
                    className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-neumorphic text-center font-medium text-foreground hover:shadow-lg transition-shadow"
                  >
                    {language === "ru" ? "Импорт" : "Import"}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Add Button */}
        <AnimatePresence>
          {currentView !== "settings" && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={() => setShowAddModal(true)}
              className="fixed bottom-28 right-4 w-14 h-14 bg-gradient-to-br from-sky-400 to-blue-500 rounded-full shadow-neumorphic flex items-center justify-center text-white font-bold text-2xl hover:shadow-lg transition-shadow active:scale-95"
            >
              +
            </motion.button>
          )}
        </AnimatePresence>

        <BottomNav currentView={currentView} onViewChange={setCurrentView} language={language} />

        <AddLessonModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onAdd={addLesson}
          language={language}
        />
      </div>
    </div>
  )
}
