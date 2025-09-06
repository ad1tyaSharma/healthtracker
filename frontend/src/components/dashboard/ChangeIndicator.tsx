import { LucideArrowUp, LucideArrowDown } from 'lucide-react'

export default function ChangeIndicator({
  current,
  previous,
  isBp = false,
}: {
  current: string
  previous?: string
  isBp?: boolean
}) {
  if (!previous) return null

  let direction: 'up' | 'down' | null = null
  let colorClass = 'text-gray-500'

  if (isBp) {
    const [currentSys, currentDia] = current.split('/').map(Number)
    const [prevSys, prevDia] = previous.split('/').map(Number)
    if (currentSys > prevSys || currentDia > prevDia) {
      direction = 'up'
      colorClass = 'text-red-500'
    } else if (currentSys < prevSys || currentDia < prevDia) {
      direction = 'down'
      colorClass = 'text-green-500'
    }
  } else {
    const numCurrent = parseFloat(current)
    const numPrevious = parseFloat(previous)
    if (numCurrent > numPrevious) {
      direction = 'up'
      colorClass = 'text-red-500'
    } else if (numCurrent < numPrevious) {
      direction = 'down'
      colorClass = 'text-green-500'
    }
  }

  if (direction === 'up') {
    return <LucideArrowUp size={16} className={`inline-block ml-1 ${colorClass}`} />
  } else if (direction === 'down') {
    return <LucideArrowDown size={16} className={`inline-block ml-1 ${colorClass}`} />
  }
  return null
}