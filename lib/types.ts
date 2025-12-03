export interface Lesson {
  id: string
  subject: string
  teacher: string
  room: string
  startTime: string
  endTime: string
  color: string
  dayOfWeek: number // 0 = Monday, 6 = Sunday
  date?: string // YYYY-MM-DD format for specific date lessons
}

export interface DaySchedule {
  date: Date
  lessons: Lesson[]
}

export type Language = "ru" | "en"
