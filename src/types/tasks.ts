export const TASK_STATUSES = ['To Do', 'In Progress', 'Done'] as const
export type TaskStatus = (typeof TASK_STATUSES)[number]

export const TASK_PRIORITIES = ['Low', 'Medium', 'High'] as const
export type TaskPriority = (typeof TASK_PRIORITIES)[number]

export interface ITask {
    id: string
    title: string
    description: string
    status: TaskStatus
    priority: TaskPriority
    dueDate: string
}

export type TaskInput = Omit<ITask, 'id'>
