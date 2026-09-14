import { useLocalStorage } from './useLocalStorage'
import type { ITask, TaskInput } from '../types/tasks'

export function useTasks() {
  const [tasks, setTasks] = useLocalStorage<ITask[]>('tasks', [])

  function addTask(input: TaskInput) {
    const newTask: ITask = { id: crypto.randomUUID(), ...input }
    setTasks((prev) => [...prev, newTask])
  }

  function updateTask(id: string, input: TaskInput) {
    setTasks((prev) => prev.map((task) => (task.id === id ? { id, ...input } : task)))
  }

  function deleteTask(id: string) {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  return { tasks, addTask, updateTask, deleteTask }
}
