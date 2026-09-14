import { useMemo, useState } from 'react'
import { useTasks } from '../hooks/useTasks'
import { TASK_PRIORITIES, TASK_STATUSES, type ITask, type TaskInput, type TaskPriority, type TaskStatus } from '../types/tasks'
import { AppHeader } from '../components/AppHeader'
import { FilterBar, type PriorityFilterValue, type StatusFilter } from '../components/FilterBar'
import { TaskList } from '../components/TaskList'
import { TaskForm } from '../components/TaskForm'
import { Modal } from '../components/ui/Modal'

function toTaskInput(task: ITask): TaskInput {
  const { id: _id, ...input } = task
  return input
}

export function TasksPage() {
  const { tasks, addTask, updateTask, deleteTask } = useTasks()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<ITask | null>(null)
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('All')
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilterValue>('Any')

  const statusCounts = useMemo(() => {
    const counts = { 'To Do': 0, 'In Progress': 0, Done: 0 } as Record<TaskStatus, number>
    for (const status of TASK_STATUSES) counts[status] = tasks.filter((task) => task.status === status).length
    return counts
  }, [tasks])

  const priorityCounts = useMemo(() => {
    const counts = { Low: 0, Medium: 0, High: 0 } as Record<TaskPriority, number>
    for (const priority of TASK_PRIORITIES) counts[priority] = tasks.filter((task) => task.priority === priority).length
    return counts
  }, [tasks])

  const displayTasks = useMemo(() => {
    const filtered = tasks.filter(
      (task) => (statusFilter === 'All' || task.status === statusFilter) && (priorityFilter === 'Any' || task.priority === priorityFilter),
    )
    return filtered
  }, [tasks, statusFilter, priorityFilter])

  function openCreateForm() {
    setEditingTask(null)
    setIsFormOpen(true)
  }

  function openEditForm(task: ITask) {
    setEditingTask(task)
    setConfirmDeleteId(null)
    setIsFormOpen(true)
  }

  function closeForm() {
    setIsFormOpen(false)
    setEditingTask(null)
  }

  function handleFormSubmit(values: TaskInput) {
    if (editingTask) {
      updateTask(editingTask.id, values)
    } else {
      addTask(values)
    }
    closeForm()
  }

  function handleToggleDone(task: ITask) {
    updateTask(task.id, { ...toTaskInput(task), status: task.status === 'Done' ? 'To Do' : 'Done' })
  }

  function handleConfirmDelete(task: ITask) {
    deleteTask(task.id)
    setConfirmDeleteId(null)
    if (editingTask?.id === task.id) closeForm()
  }

  return (
    <div className="min-h-screen">
      <AppHeader countOpen={tasks.length - statusCounts.Done} countInProgress={statusCounts['In Progress']} countDone={statusCounts.Done} />

      <main className="mx-auto flex max-w-[1000px] flex-col gap-4.5 px-10 pt-8.5 pb-20">
        <FilterBar
          statusFilter={statusFilter}
          priorityFilter={priorityFilter}
          onStatusFilterChange={setStatusFilter}
          onPriorityFilterChange={setPriorityFilter}
          statusCounts={statusCounts}
          priorityCounts={priorityCounts}
          totalCount={tasks.length}
          onAddTask={openCreateForm}
        />

        <TaskList
          tasks={displayTasks}
          editingTaskId={editingTask?.id ?? null}
          confirmDeleteId={confirmDeleteId}
          onToggleDone={handleToggleDone}
          onEdit={openEditForm}
          onAskDelete={(task) => setConfirmDeleteId(task.id)}
          onConfirmDelete={handleConfirmDelete}
          onCancelDelete={() => setConfirmDeleteId(null)}
        />
      </main>

      <Modal isOpen={isFormOpen} onClose={closeForm} title={editingTask ? 'Edit task' : 'New task'}>
        <TaskForm initialValue={editingTask ?? undefined} onSubmit={handleFormSubmit} onCancel={closeForm} />
      </Modal>
    </div>
  )
}
