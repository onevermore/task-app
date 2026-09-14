import type { ITask, TaskPriority, TaskStatus } from '../types/tasks'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export const PRIORITY_COLORS: Record<TaskPriority, { bg: string; ink: string; border: string; dot: string }> = {
    High: {
        bg: '#FFE3C0',
        ink: '#794402',
        border: '#EFC694',
        dot: '#D39747',
    },
    Medium: {
        bg: '#FFD9DF',
        ink: '#744248',
        border: '#F5C1C9',
        dot: '#DE9CA7',
    },
    Low: {
        bg: '#D4F0DC',
        ink: '#225A39',
        border: '#B3DDC0',
        dot: '#5CA477',
    },
}

export const OVERDUE_COLORS = {
    border: '#B25D61',
    bg: '#FFD5D5',
    ink: '#883136',
}

export const STATUS_BADGE_CLASSES: Record<TaskStatus, string> = {
  'To Do': 'bg-white text-ink border border-sage/60',
  'In Progress': 'bg-sage/32 text-ink border border-sage',
  Done: 'bg-ink text-white border border-ink',
}

export function formatDueDate(date: string): string {
  const [, month, day] = date.split('-')
  return `${MONTHS[Number(month) - 1]} ${Number(day)}`
}

export function todayIso(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export function isOverdue(task: ITask): boolean {
  return !!task.dueDate && task.status !== 'Done' && task.dueDate < todayIso()
}

