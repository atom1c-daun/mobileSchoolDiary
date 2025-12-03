"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import LessonCard from "./LessonCard"
import type { Lesson } from "@/lib/types"
import { DAYS_OF_WEEK_FULL_RU, DAYS_OF_WEEK_FULL_EN } from "@/lib/constants"
import { motion } from "framer-motion"
import { useSwipeable } from "react-swipeable"

interface DayViewProps {
  selectedDate: Date
  setSelectedDate: (date: Date) => void
  lessons: Lesson[]
  onDeleteLesson: (id: string) => void
  onSwitchView: () => void
  language: "ru" | "en"
}

export default function DayView({
  selectedDate,
  setSelectedDate,
  lessons,
  onDeleteLesson,
  onSwitchView,
  language,
}: DayViewProps) {
  const [direction, setDirection] = useState(0)

  const dayOfWeek = selectedDate.getDay() === 0 ? 6 : selectedDate.getDay() - 1
  const dayLessons = lessons.filter(
    (l) => l.dayOfWeek === dayOfWeek || l.date === selectedDate.toISOString().split("T")[0],
  )
  const sortedLessons = [...dayLessons].sort((a, b) => a.startTime.localeCompare(b.startTime))

  const goToNextDay = () => {
    setDirection(1)
    const nextDate = new Date(selectedDate)
    nextDate.setDate(nextDate.getDate() + 1)
    setSelectedDate(nextDate)
  }

  const goToPreviousDay = () => {
    setDirection(-1)
    const prevDate = new Date(selectedDate)
    prevDate.setDate(prevDate.getDate() - 1)
    setSelectedDate(prevDate)
  }

  const handlers = useSwipeable({
    onSwipedLeft: goToNextDay,
    onSwipedRight: goToPreviousDay,
    trackMouse: true,
  })

  const dayNamesFull = language === "ru" ? DAYS_OF_WEEK_FULL_RU : DAYS_OF_WEEK_FULL_EN
  const dayName = dayNamesFull[dayOfWeek]
  const dateStr = selectedDate.toLocaleDateString(language === "ru" ? "ru-RU" : "en-US")

  return (
    <div {...handlers} className="px-4 py-6 max-w-2xl mx-auto">
      {/* Date Navigation */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={goToPreviousDay}
            className="w-10 h-10 flex items-center justify-center bg-white dark:bg-slate-800 rounded-full shadow-neumorphic hover:shadow-lg transition-shadow text-foreground"
          >
            <ChevronLeft size={20} />
          </motion.button>

          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground">{dayName}</h2>
            <p className="text-sm text-muted-foreground">{dateStr}</p>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={goToNextDay}
            className="w-10 h-10 flex items-center justify-center bg-white dark:bg-slate-800 rounded-full shadow-neumorphic hover:shadow-lg transition-shadow text-foreground"
          >
            <ChevronRight size={20} />
          </motion.button>
        </div>

        {/* Today Button and Week Button */}
        <div className="grid grid-cols-2 gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedDate(new Date())}
            className="bg-white dark:bg-slate-800 rounded-xl p-2 shadow-neumorphic hover:shadow-lg transition-shadow text-sm font-medium text-foreground"
          >
            {language === "ru" ? "Сегодня" : "Today"}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onSwitchView}
            className="bg-gradient-to-br from-sky-400 to-blue-500 rounded-xl p-2 shadow-neumorphic hover:shadow-lg transition-shadow text-sm font-bold text-white"
          >
            {language === "ru" ? "Неделя" : "Week"}
          </motion.button>
        </div>
      </div>

      {/* Lessons List */}
      <div className="space-y-3">
        {sortedLessons.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <div className="text-6xl mb-3">📚</div>
            <p className="text-muted-foreground">{language === "ru" ? "Нет уроков" : "No lessons"}</p>
          </motion.div>
        ) : (
          sortedLessons.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} onDelete={onDeleteLesson} language={language} />
          ))
        )}
      </div>
    </div>
  )
}
