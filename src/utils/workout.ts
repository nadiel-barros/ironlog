import type { Workout } from '../types/workout'

export const uid = (): string => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }

  return Math.random().toString(36).slice(2, 11)
}

export const formatRest = (seconds: number): string => {
  if (seconds < 60) {
    return `${seconds}s`
  }

  const minutes = Math.floor(seconds / 60)
  const remaining = seconds % 60
  return remaining ? `${minutes}min${remaining}s` : `${minutes}min`
}

export const getNextLetter = (workouts: Workout[], letters: string): string => {
  const used = new Set(workouts.map((workout) => workout.letter))

  for (const letter of letters) {
    if (!used.has(letter)) {
      return letter
    }
  }

  return '?'
}
