"use client"

import { useState } from "react"
import type { Lesson } from "@/lib/types"
import { DAYS_OF_WEEK_RU, DAYS_OF_WEEK_EN } from "@/lib/constants"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface WeekViewProps {
  lessons: Lesson[]
  onDeleteLesson: (id: string) => void
  language: "ru" | "en"
}

export default function WeekView({ lessons, onDeleteLesson, language }: WeekViewProps) {
  const [weekStart, setWeekStart] = useState(() => {
    const date = new Date()
    date.setDate(date.getDate() - date.getDay() + 1)
    return date
  })

  const daysOfWeek = language === "ru" ? DAYS_OF_WEEK_RU : DAYS_OF_WEEK_EN

  const getWeekDays = () => {
    const days = []
    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStart)
      date.setDate(date.getDate() + i)
      days.push(date)
    }
    return days
  }

  const weekDays = getWeekDays()

  const getLessonsForDay = (dayOfWeek: number) => {
    return lessons.filter((l) => l.dayOfWeek === dayOfWeek).sort((a, b) => a.startTime.localeCompare(b.startTime))
  }

  const goToPreviousWeek = () => {
    const newDate = new Date(weekStart)
    newDate.setDate(newDate.getDate() - 7)
    setWeekStart(newDate)
  }

  const goToNextWeek = () => {
    const newDate = new Date(weekStart)
    newDate.setDate(newDate.getDate() + 7)
    setWeekStart(newDate)
  }

  return (
    <div className="px-4 py-6 max-w-6xl mx-auto">
      {/* Navigation */}
      <div className="flex items-center justify-between mb-6">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={goToPreviousWeek}
          className="w-10 h-10 flex items-center justify-center bg-white dark:bg-slate-800 rounded-full shadow-neumorphic hover:shadow-lg transition-shadow text-foreground"
        >
          <ChevronLeft size={20} />
        </motion.button>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground">{language === "ru" ? "Неделя" : "Week"}</h2>
          <p className="text-sm text-muted-foreground">
            {weekStart.toLocaleDateString(language === "ru" ? "ru-RU" : "en-US")}
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={goToNextWeek}
          className="w-10 h-10 flex items-center justify-center bg-white dark:bg-slate-800 rounded-full shadow-neumorphic hover:shadow-lg transition-shadow text-foreground"
        >
          <ChevronRight size={20} />
        </motion.button>
      </div>

      {/* Week Grid */}
      <div className="grid grid-cols-7 gap-2 mb-6">
        {weekDays.map((date, index) => (
          <div key={index} className="flex flex-col">
            {/* Day Header */}
            <div className="bg-white dark:bg-slate-800 rounded-t-2xl p-2 text-center shadow-neumorphic">
              <p className="text-xs font-bold text-foreground">{daysOfWeek[index]}</p>
              <p className="text-xs text-muted-foreground">{date.getDate()}</p>
            </div>

            {/* Lessons Container */}
            <div className="bg-sky-50 dark:bg-slate-700/30 rounded-b-2xl p-2 min-h-96 flex flex-col gap-2">
              {getLessonsForDay(index).length === 0 ? (
                <div className="flex-1 flex items-center justify-center text-xs text-muted-foreground">-</div>
              ) : (
                getLessonsForDay(index).map((lesson) => (
                  <motion.div
                    key={lesson.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="group relative"
                  >
                    <div
                      className="w-full rounded-lg p-2 flex flex-col justify-between text-white shadow-neumorphic hover:shadow-lg transition-shadow cursor-pointer min-h-16 text-center"
                      style={{ backgroundColor: lesson.color }}
                      title={`${lesson.subject} - ${lesson.startTime}`}
                    >
                      <span className="text-xs font-bold line-clamp-2">{lesson.subject}</span>
                      <span className="text-xs font-semibold text-white/90">{lesson.startTime}</span>
                    </div>
                    <button
                      onClick={() => onDeleteLesson(lesson.id)}
                      className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity shadow-neumorphic"
                    >
                      ×
                    </button>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
