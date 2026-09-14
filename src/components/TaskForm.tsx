import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { TASK_STATUSES, TASK_PRIORITIES, type ITask, type TaskInput } from '../types/tasks'
import { TextField } from './ui/TextField'
import { Textarea } from './ui/Textarea'
import { Select } from './ui/Select'
import { RadioGroup } from './ui/RadioGroup'
import { Button } from './ui/Button'

const taskSchema = z.object({
  title: z.string().trim().min(1, 'A title is required.').max(250, 'Title must be 250 characters or fewer.'),
  description: z.string().max(250, 'description must be 250 characters or fewer.'),
  status: z.enum(TASK_STATUSES),
  priority: z.enum(TASK_PRIORITIES),
  dueDate: z.string().min(1, 'A due date is required.'),
})

interface TaskFormProps {
  initialValue?: ITask
  onSubmit: (values: TaskInput) => void
  onCancel: () => void
}

const emptyDefaults: TaskInput = {
  title: '',
  description: '',
  status: 'To Do',
  priority: 'Medium',
  dueDate: '',
}

export function TaskForm({ initialValue, onSubmit, onCancel }: TaskFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TaskInput>({
    resolver: zodResolver(taskSchema),
    defaultValues: initialValue ?? emptyDefaults,
  })

  const priority = watch('priority')

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4.5">
      <TextField
        label="Title"
        required
        placeholder="What needs doing?"
        error={errors.title?.message}
        {...register('title')}
      />
      <Textarea
        label="Description"
        placeholder="Optional details, links, context…"
        error={errors.description?.message}
        {...register('description')}
      />
      <Select
        label="Status"
        options={TASK_STATUSES.map((status) => ({ value: status, label: status }))}
        error={errors.status?.message}
        {...register('status')}
      />
      <RadioGroup
        label="Priority"
        options={TASK_PRIORITIES.map((option) => ({ value: option, label: option }))}
        registration={register('priority')}
        selectedValue={priority}
        error={errors.priority?.message}
      />
      <TextField type="date" label="Due date" error={errors.dueDate?.message} {...register('dueDate')} />
      <div className="flex gap-2.5 border-t border-sage/30 pt-1.5">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="submit">
          {initialValue ? 'Save changes' : 'Add task'}
        </Button>
      </div>
    </form>
  )
}
