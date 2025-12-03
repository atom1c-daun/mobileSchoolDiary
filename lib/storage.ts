import type { Lesson } from "./types"

const STORAGE_KEY = "smartschedule_lessons"

export const loadSchedule = (): Lesson[] => {
  if (typeof window === "undefined") return []

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export const saveSchedule = (lessons: Lesson[]) => {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lessons))
  } catch {
    console.error("Failed to save schedule")
  }
}

export const clearSchedule = () => {
  if (typeof window === "undefined") return
  localStorage.removeItem(STORAGE_KEY)
}
