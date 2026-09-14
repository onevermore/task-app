interface AppHeaderProps {
  countOpen: number
  countInProgress: number
  countDone: number
}

function Status({ value, label }: { value: number; label: string }) {
  return (
    <div>
      <div className="text-[22px] leading-none font-medium">{value}</div>
      <div className="mt-1.25 text-[10px] font-bold tracking-[.14em] text-rose uppercase">{label}</div>
    </div>
  )
}

export function AppHeader({ countOpen, countInProgress, countDone }: AppHeaderProps) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-6 bg-plum px-10 py-6.5 text-white">
      <div>
        <h1 className="mt-1.5 text-[30px] font-light tracking-[.01em] text-white">Task Manager</h1>
      </div>
      <div className="flex gap-7">
        <Status value={countOpen} label="Open" />
        <Status value={countInProgress} label="In progress" />
        <Status value={countDone} label="Done" />
      </div>
    </header>
  )
}
