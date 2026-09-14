import type { ITask } from '../types/tasks'
import { TaskItem } from './TaskItem'

interface TaskListProps {
  tasks: ITask[]
  editingTaskId: string | null
  confirmDeleteId: string | null
  onToggleDone: (task: ITask) => void
  onEdit: (task: ITask) => void
  onAskDelete: (task: ITask) => void
  onConfirmDelete: (task: ITask) => void
  onCancelDelete: () => void
}

export function TaskList({
  tasks,
  editingTaskId,
  confirmDeleteId,
  onToggleDone,
  onEdit,
  onAskDelete,
  onConfirmDelete,
  onCancelDelete,
}: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-sage/70 bg-sage/8 p-13.5 px-6 text-center">
        <div className="text-base font-medium text-ink">No tasks</div>
        <div className="mt-1.5 text-[13.5px] text-ink/80">Add a task.</div>
      </div>
    )
  }

  return (
    <ul className="flex flex-col gap-4">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          isEditing={editingTaskId === task.id}
          isConfirmingDelete={confirmDeleteId === task.id}
          onToggleDone={onToggleDone}
          onEdit={onEdit}
          onAskDelete={onAskDelete}
          onConfirmDelete={onConfirmDelete}
          onCancelDelete={onCancelDelete}
        />
      ))}
    </ul>
  )
}
