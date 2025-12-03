"use client"

import { X } from "lucide-react"
import type { Lesson } from "@/lib/types"
import { motion } from "framer-motion"

interface LessonCardProps {
  lesson: Lesson
  onDelete: (id: string) => void
  variant?: "full" | "compact"
  language: "ru" | "en"
}

export default function LessonCard({ lesson, onDelete, variant = "full", language }: LessonCardProps) {
  if (variant === "compact") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="relative group"
      >
        <div
          className="w-full aspect-square rounded-xl p-2 flex flex-col justify-between text-white shadow-neumorphic hover:shadow-lg transition-shadow cursor-pointer"
          style={{ backgroundColor: lesson.color }}
        >
          <div className="flex-1 flex items-start justify-between">
            <span className="text-xs font-bold line-clamp-2 flex-1">{lesson.subject}</span>
            <button
              onClick={() => onDelete(lesson.id)}
              className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={14} />
            </button>
          </div>
          <div className="text-xs font-semibold text-white/90">{lesson.startTime}</div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-neumorphic hover:shadow-lg transition-shadow group"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-4 h-4 rounded-full flex-shrink-0 mt-1" style={{ backgroundColor: lesson.color }} />
        <button
          onClick={() => onDelete(lesson.id)}
          className="text-muted-foreground hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
        >
          <X size={18} />
        </button>
      </div>

      <h3 className="text-lg font-bold text-foreground mb-2">{lesson.subject}</h3>

      <div className="space-y-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="font-medium text-foreground">⏰</span>
          <span>
            {lesson.startTime} - {lesson.endTime}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium text-foreground">👨‍🏫</span>
          <span>{lesson.teacher}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium text-foreground">🚪</span>
          <span>
            {language === "ru" ? "Кабинет" : "Room"} {lesson.room}
          </span>
        </div>
      </div>
    </motion.div>
  )
}
