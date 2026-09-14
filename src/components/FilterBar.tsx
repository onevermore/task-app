import { TASK_PRIORITIES, TASK_STATUSES, type TaskPriority, type TaskStatus } from '../types/tasks'
import { PRIORITY_COLORS } from '../lib/taskDisplay'
import { Button } from './ui/Button'

export type StatusFilter = 'All' | TaskStatus
export type PriorityFilterValue = 'Any' | TaskPriority

interface FilterBarProps {
  statusFilter: StatusFilter
  priorityFilter: PriorityFilterValue
  onStatusFilterChange: (value: StatusFilter) => void
  onPriorityFilterChange: (value: PriorityFilterValue) => void
  statusCounts: Record<TaskStatus, number>
  priorityCounts: Record<TaskPriority, number>
  totalCount: number
  onAddTask: () => void
}

function FilterOption({
  label,
  count,
  active,
  tone,
  dotColor,
  onClick,
}: {
  label: string
  count: number
  active: boolean
  tone: 'status' | 'priority'
  dotColor?: string
  onClick: () => void
}) {
  const activeBg = tone === 'status' ? 'bg-ink border-ink' : 'bg-mauve border-mauve'
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.75 rounded-full border py-1.75 pr-2.75 pl-3.25 text-[12.5px] tracking-[.02em] transition-colors duration-[.12s] ${
        active ? `${activeBg} font-bold text-white` : 'border-sage/55 bg-white font-normal text-ink'
      }`}
    >
      {dotColor && <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: dotColor }} />}
      {label}
      <span
        className={`min-w-5 rounded-full px-1.5 py-0.25 text-[11px] leading-4 font-bold ${
          active ? 'bg-white/22 text-white' : 'bg-sage/22 text-ink'
        }`}
      >
        {count}
      </span>
    </button>
  )
}

export function FilterBar({
  statusFilter,
  priorityFilter,
  onStatusFilterChange,
  onPriorityFilterChange,
  statusCounts,
  priorityCounts,
  totalCount,
  onAddTask,
}: FilterBarProps) {
  const hasFilters = statusFilter !== 'All' || priorityFilter !== 'Any'

  return (
    <div className="flex flex-wrap items-center gap-3.5 rounded-[14px] border border-sage/45 bg-white p-3.5 px-4 shadow-[0_2px_14px_rgba(155,106,108,.07)]">
      <div className="flex min-w-0 flex-1 flex-col gap-2 sm:min-w-[420px]">
        <div className="flex flex-wrap items-center gap-1.75">
          <span className="min-w-14.5 text-xs text-sage">Status:</span>
          <FilterOption label="All" count={totalCount} active={statusFilter === 'All'} tone="status" onClick={() => onStatusFilterChange('All')} />
          {TASK_STATUSES.map((status) => (
            <FilterOption
              key={status}
              label={status}
              count={statusCounts[status]}
              active={statusFilter === status}
              tone="status"
              onClick={() => onStatusFilterChange(status)}
            />
          ))}
          <div className="ml-auto flex items-center gap-2.5 pl-2">
            {hasFilters && (
              <Button
                type="button"
                variant="pill"
                onClick={() => {
                  onStatusFilterChange('All')
                  onPriorityFilterChange('Any')
                }}
              >
                Clear
              </Button>
            )}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-1.75">
          <span className="min-w-14.5 text-xs text-sage">Priority:</span>
          <FilterOption label="Any" count={totalCount} active={priorityFilter === 'Any'} tone="priority" onClick={() => onPriorityFilterChange('Any')} />
          {TASK_PRIORITIES.map((priority) => (
            <FilterOption
              key={priority}
              label={priority}
              count={priorityCounts[priority]}
              active={priorityFilter === priority}
              tone="priority"
              dotColor={PRIORITY_COLORS[priority].dot}
              onClick={() => onPriorityFilterChange(priority)}
            />
          ))}
        </div>
      </div>
      <Button type="button" variant="primary" className="flex shrink-0 items-center gap-2" onClick={onAddTask}>
        <span className="text-[17px]">+</span>Add task
      </Button>
    </div>
  )
}
