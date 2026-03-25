import type { Exercise, Workout } from '../types/workout'
import type { WorkoutBuilderState } from '../state/workoutBuilderReducer'

export type WorkoutBuilderStorageState = WorkoutBuilderState

const STORAGE_KEY = 'academia.workout_builder.v1'

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null

const toStringValue = (value: unknown): string => (typeof value === 'string' ? value : '')
const toNumberValue = (value: unknown, fallback = 0): number =>
  typeof value === 'number' && Number.isFinite(value) ? value : fallback

const normalizeExercise = (raw: unknown): Exercise | null => {
  if (!isRecord(raw)) {
    return null
  }

  const id = toStringValue(raw.id)
  const name = toStringValue(raw.name)

  if (!id || !name) {
    return null
  }

  return {
    id,
    name,
    muscle: toStringValue(raw.muscle),
    equip: toStringValue(raw.equip),
    sets: toNumberValue(raw.sets, 4),
    reps: toNumberValue(raw.reps, 12),
    weight: toNumberValue(raw.weight, 0),
    rest: toNumberValue(raw.rest, 60),
    notes: toStringValue(raw.notes),
    done: Boolean(raw.done),
  }
}

const normalizeWorkout = (raw: unknown): Workout | null => {
  if (!isRecord(raw)) {
    return null
  }

  const id = toStringValue(raw.id)
  const letter = toStringValue(raw.letter)
  const name = toStringValue(raw.name)

  if (!id || !letter || !name) {
    return null
  }

  const muscles = Array.isArray(raw.muscles) ? raw.muscles.map(toStringValue).filter(Boolean) : []
  const exercises = Array.isArray(raw.exercises)
    ? raw.exercises.map(normalizeExercise).filter((exercise): exercise is Exercise => Boolean(exercise))
    : []

  return {
    id,
    letter,
    name,
    muscles,
    notes: toStringValue(raw.notes),
    exercises,
    createdAt: toStringValue(raw.createdAt) || new Date().toISOString(),
  }
}

export const loadWorkoutBuilderState = (): WorkoutBuilderStorageState | null => {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return null
    }

    const parsed: unknown = JSON.parse(raw)
    if (!isRecord(parsed)) {
      return null
    }

    const workouts = Array.isArray(parsed.workouts)
      ? parsed.workouts.map(normalizeWorkout).filter((workout): workout is Workout => Boolean(workout))
      : []

    const activeWorkoutId = parsed.activeWorkoutId
    const resolvedActiveWorkoutId =
      typeof activeWorkoutId === 'string' && workouts.some((workout) => workout.id === activeWorkoutId)
        ? activeWorkoutId
        : workouts[0]?.id ?? null

    return {
      workouts,
      activeWorkoutId: resolvedActiveWorkoutId,
    }
  } catch {
    return null
  }
}

export const saveWorkoutBuilderState = (state: WorkoutBuilderStorageState): void => {
  if (typeof window === 'undefined') {
    return
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // Ignore storage write failures (quota/private mode).
  }
}
