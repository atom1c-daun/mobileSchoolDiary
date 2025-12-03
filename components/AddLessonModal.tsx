"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"
import type { Lesson } from "@/lib/types"
import { DAYS_OF_WEEK_RU, DAYS_OF_WEEK_EN, SUBJECT_COLORS } from "@/lib/constants"
import { motion, AnimatePresence } from "framer-motion"

interface AddLessonModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (lesson: Lesson) => void
  language: "ru" | "en"
}

export default function AddLessonModal({ isOpen, onClose, onAdd, language }: AddLessonModalProps) {
  const [formData, setFormData] = useState({
    subject: "",
    teacher: "",
    room: "",
    startTime: "09:00",
    endTime: "10:00",
    dayOfWeek: 0,
    color: "#A5D6FF",
  })

  const daysOfWeek = language === "ru" ? DAYS_OF_WEEK_RU : DAYS_OF_WEEK_EN
  const labels = {
    ru: {
      addLesson: "Добавить урок",
      subject: "Предмет",
      teacher: "Учитель",
      room: "Кабинет",
      startTime: "Начало",
      endTime: "Конец",
      day: "День",
      color: "Цвет",
      save: "Сохранить",
      cancel: "Отмена",
    },
    en: {
      addLesson: "Add Lesson",
      subject: "Subject",
      teacher: "Teacher",
      room: "Room",
      startTime: "Start Time",
      endTime: "End Time",
      day: "Day",
      color: "Color",
      save: "Save",
      cancel: "Cancel",
    },
  }

  const currentLabels = labels[language]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.subject.trim()) return

    const newLesson: Lesson = {
      id: Date.now().toString(),
      ...formData,
    }

    onAdd(newLesson)
    setFormData({
      subject: "",
      teacher: "",
      room: "",
      startTime: "09:00",
      endTime: "10:00",
      dayOfWeek: 0,
      color: "#A5D6FF",
    })
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/30 z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-end"
          >
            <div className="w-full bg-white dark:bg-slate-800 rounded-t-3xl shadow-2xl p-6 max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">{currentLabels.addLesson}</h2>
                <button
                  onClick={onClose}
                  className="w-10 h-10 flex items-center justify-center bg-sky-100 dark:bg-slate-700 rounded-full text-foreground hover:bg-sky-200 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">{currentLabels.subject}</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Математика"
                    className="w-full px-4 py-2 bg-sky-100 dark:bg-slate-700 rounded-xl focus:outline-none text-foreground placeholder:text-muted-foreground"
                  />
                </div>

                {/* Teacher */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">{currentLabels.teacher}</label>
                  <input
                    type="text"
                    value={formData.teacher}
                    onChange={(e) => setFormData({ ...formData, teacher: e.target.value })}
                    placeholder="И.О. Учителя"
                    className="w-full px-4 py-2 bg-sky-100 dark:bg-slate-700 rounded-xl focus:outline-none text-foreground placeholder:text-muted-foreground"
                  />
                </div>

                {/* Room */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">{currentLabels.room}</label>
                  <input
                    type="text"
                    value={formData.room}
                    onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                    placeholder="101"
                    className="w-full px-4 py-2 bg-sky-100 dark:bg-slate-700 rounded-xl focus:outline-none text-foreground placeholder:text-muted-foreground"
                  />
                </div>

                {/* Time */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">{currentLabels.startTime}</label>
                    <input
                      type="time"
                      value={formData.startTime}
                      onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                      className="w-full px-4 py-2 bg-sky-100 dark:bg-slate-700 rounded-xl focus:outline-none text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">{currentLabels.endTime}</label>
                    <input
                      type="time"
                      value={formData.endTime}
                      onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                      className="w-full px-4 py-2 bg-sky-100 dark:bg-slate-700 rounded-xl focus:outline-none text-foreground"
                    />
                  </div>
                </div>

                {/* Day of Week */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">{currentLabels.day}</label>
                  <select
                    value={formData.dayOfWeek}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        dayOfWeek: Number.parseInt(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2 bg-sky-100 dark:bg-slate-700 rounded-xl focus:outline-none text-foreground"
                  >
                    {daysOfWeek.map((day, index) => (
                      <option key={index} value={index}>
                        {day}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Color */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">{currentLabels.color}</label>
                  <div className="grid grid-cols-6 gap-3">
                    {Object.values(SUBJECT_COLORS).map((color, index) => (
                      <motion.button
                        key={index}
                        type="button"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setFormData({ ...formData, color })}
                        className={`w-10 h-10 rounded-full transition-all ${
                          formData.color === color
                            ? "ring-2 ring-offset-2 ring-blue-500 scale-110"
                            : "shadow-neumorphic"
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                {/* Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={onClose}
                    className="px-4 py-3 bg-white dark:bg-slate-700 rounded-xl font-medium text-foreground shadow-neumorphic hover:shadow-lg transition-shadow"
                  >
                    {currentLabels.cancel}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="px-4 py-3 bg-gradient-to-br from-sky-400 to-blue-500 rounded-xl font-bold text-white shadow-neumorphic hover:shadow-lg transition-shadow"
                  >
                    {currentLabels.save}
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
