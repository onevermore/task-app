import type { ITask } from '../types/tasks'
import { OVERDUE_COLORS, PRIORITY_COLORS, STATUS_BADGE_CLASSES, formatDueDate, isOverdue } from '../lib/taskDisplay'

interface TaskItemProps {
  task: ITask
  isEditing: boolean
  isConfirmingDelete: boolean
  onToggleDone: (task: ITask) => void
  onEdit: (task: ITask) => void
  onAskDelete: (task: ITask) => void
  onConfirmDelete: (task: ITask) => void
  onCancelDelete: () => void
}

const badgeBase = 'inline-flex items-center whitespace-nowrap text-[11px] font-bold tracking-[.07em] uppercase'

export function TaskItem({
  task,
  isEditing,
  isConfirmingDelete,
  onToggleDone,
  onEdit,
  onAskDelete,
  onConfirmDelete,
  onCancelDelete,
}: TaskItemProps) {
  const isDone = task.status === 'Done'
  const overdue = isOverdue(task)
  const priorityColors = PRIORITY_COLORS[task.priority]
  const borderColor = isEditing ? '#9b6a6c' : 'rgba(147,168,172,.4)'

  return (
    <li
      className="rounded-[14px] bg-white p-5 px-5.5"
      style={{
        border: `1px solid ${borderColor}`,
        borderLeft: overdue ? `3px solid ${OVERDUE_COLORS.border}` : `1px solid ${borderColor}`,
        boxShadow: isEditing ? '0 0 0 3px rgba(226,180,189,.4)' : '0 1px 3px rgba(155,106,108,.06)',
        opacity: isDone ? 0.68 : 1,
      }}
    >
      <div className="flex items-start gap-3.5">
        <button
          type="button"
          title="Toggle done"
          onClick={() => onToggleDone(task)}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[15px] leading-none font-bold text-white"
          style={{
            background: isDone ? '#424b54' : '#ffffff',
            border: `2px solid ${isDone ? '#424b54' : '#93a8ac'}`,
            boxShadow: isDone ? 'none' : 'inset 0 0 0 3px #ffffff',
          }}
        >
          {isDone && '✓'}
        </button>

        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <h3
            className="m-0 text-[17px] leading-[1.35] font-medium text-ink"
            style={{ textDecoration: isDone ? 'line-through' : 'none' }}
          >
            {task.title}
          </h3>
          {task.description && (
            <p className="m-0 max-w-[62ch] text-[13.5px] leading-[1.55] text-ink/85">{task.description}</p>
          )}
          <div className="flex flex-wrap items-center gap-3.5 pt-0.5">
            <span className={`${badgeBase} rounded-md px-2.5 py-1 ${STATUS_BADGE_CLASSES[task.status]}`}>
              {task.status}
            </span>
            <span
              className={`${badgeBase} gap-1.5 rounded-full py-1 pr-2.75 pl-2`}
              style={{ background: priorityColors.bg, color: priorityColors.ink, border: `1px solid ${priorityColors.border}` }}
            >
              <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: priorityColors.dot }} />
              {task.priority}
            </span>
            {overdue ? (
              <span
                className={`${badgeBase} rounded-full px-2.5 py-1`}
                style={{ background: OVERDUE_COLORS.bg, color: OVERDUE_COLORS.ink, border: `1px solid ${OVERDUE_COLORS.border}` }}
              >
                Overdue · {formatDueDate(task.dueDate)}
              </span>
            ) : (
              <span className="text-xs text-ink/75">
                {task.dueDate ? `Due ${formatDueDate(task.dueDate)}` : 'No due date'}
              </span>
            )}
          </div>
        </div>

        <div className="flex shrink-0 gap-1">
          <button
            type="button"
            title="Edit task"
            aria-label="Edit task"
            onClick={() => onEdit(task)}
            className="flex h-8.5 w-8.5 items-center justify-center rounded-[9px] border border-transparent text-sage transition-colors hover:bg-sage/20 hover:text-ink"
          >
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round">
              <path d="M2 14v-3L11 2l3 3-9 9H2Z" />
              <path d="M9.5 3.5l3 3" />
            </svg>
          </button>
          <button
            type="button"
            title="Delete task"
            aria-label="Delete task"
            onClick={() => onAskDelete(task)}
            className="flex h-8.5 w-8.5 items-center justify-center rounded-[9px] border border-transparent text-sage transition-colors hover:bg-rose/45 hover:text-mauve"
          >
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
              <path d="M2.5 4h11" />
              <path d="M6 4V2.5h4V4" />
              <path d="M4 4l.7 9.5h6.6L12 4" />
            </svg>
          </button>
        </div>
      </div>

      {isConfirmingDelete && (
        <div className="mt-3.5 flex flex-wrap items-center justify-between gap-3 rounded-[10px] border border-rose bg-rose/40 p-3 px-3.5">
          <span className="text-[13.5px] font-medium text-ink">Delete this task? This can't be undone.</span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => onConfirmDelete(task)}
              className="rounded-lg bg-mauve px-3.5 py-1.75 text-[12.5px] font-medium text-white hover:bg-sage"
            >
              Yes, delete
            </button>
            <button
              type="button"
              onClick={onCancelDelete}
              className="rounded-lg border border-sage/60 bg-white px-3.5 py-1.75 text-[12.5px] font-medium text-ink hover:bg-sage/20"
            >
              Keep it
            </button>
          </div>
        </div>
      )}
    </li>
  )
}
