import type { CreateExerciseInput, CreateWorkoutInput, Exercise, Workout } from '../types/workout'
import { getNextLetter, uid } from '../utils/workout'

export type WorkoutBuilderState = {
  workouts: Workout[]
  activeWorkoutId: string | null
}

type SelectWorkoutAction = {
  type: 'SELECT_WORKOUT'
  workoutId: string | null
}

type CreateWorkoutAction = {
  type: 'CREATE_WORKOUT'
  input: CreateWorkoutInput
  letters: string
}

type DeleteWorkoutAction = {
  type: 'DELETE_WORKOUT'
  workoutId: string
}

type AddExerciseAction = {
  type: 'ADD_EXERCISE'
  workoutId: string
  input: CreateExerciseInput
}

type UpdateExerciseAction = {
  type: 'UPDATE_EXERCISE'
  workoutId: string
  exerciseId: string
  input: CreateExerciseInput
}

type ToggleExerciseDoneAction = {
  type: 'TOGGLE_EXERCISE_DONE'
  workoutId: string
  exerciseId: string
}

type ReorderExercisesAction = {
  type: 'REORDER_EXERCISES'
  workoutId: string
  draggedExerciseId: string
  targetExerciseId: string
}

type RemoveExerciseAction = {
  type: 'REMOVE_EXERCISE'
  workoutId: string
  exerciseId: string
}

export type WorkoutBuilderAction =
  | SelectWorkoutAction
  | CreateWorkoutAction
  | DeleteWorkoutAction
  | AddExerciseAction
  | UpdateExerciseAction
  | ToggleExerciseDoneAction
  | ReorderExercisesAction
  | RemoveExerciseAction

const clamp = (value: number, min: number, max: number): number => {
  if (!Number.isFinite(value)) {
    return min
  }

  return Math.min(max, Math.max(min, value))
}

const sanitizeExerciseInput = (input: CreateExerciseInput): CreateExerciseInput => ({
  name: input.name.trim(),
  muscle: input.muscle.trim(),
  equip: input.equip.trim(),
  sets: clamp(Math.round(input.sets), 1, 20),
  reps: clamp(Math.round(input.reps), 1, 100),
  weight: clamp(input.weight, 0, 10000),
  rest: clamp(Math.round(input.rest), 0, 1800),
  notes: input.notes.trim(),
})

const buildExerciseFromInput = (input: CreateExerciseInput): Exercise => {
  const safeInput = sanitizeExerciseInput(input)

  return {
    id: uid(),
    name: safeInput.name,
    muscle: safeInput.muscle,
    equip: safeInput.equip,
    sets: safeInput.sets,
    reps: safeInput.reps,
    weight: safeInput.weight,
    rest: safeInput.rest,
    notes: safeInput.notes,
    done: false,
  }
}

export const workoutBuilderReducer = (
  state: WorkoutBuilderState,
  action: WorkoutBuilderAction,
): WorkoutBuilderState => {
  switch (action.type) {
    case 'SELECT_WORKOUT':
      return {
        ...state,
        activeWorkoutId: action.workoutId,
      }

    case 'CREATE_WORKOUT': {
      const newWorkout: Workout = {
        id: uid(),
        letter: getNextLetter(state.workouts, action.letters),
        name: action.input.name.trim(),
        muscles: action.input.muscles,
        notes: action.input.notes.trim(),
        exercises: [],
        createdAt: new Date().toISOString(),
      }

      return {
        workouts: [...state.workouts, newWorkout],
        activeWorkoutId: newWorkout.id,
      }
    }

    case 'DELETE_WORKOUT': {
      const nextWorkouts = state.workouts.filter((workout) => workout.id !== action.workoutId)
      const nextActiveWorkoutId =
        state.activeWorkoutId === action.workoutId
          ? (nextWorkouts[0]?.id ?? null)
          : state.activeWorkoutId

      return {
        workouts: nextWorkouts,
        activeWorkoutId: nextActiveWorkoutId,
      }
    }

    case 'ADD_EXERCISE': {
      const safeExercise = buildExerciseFromInput(action.input)

      return {
        ...state,
        workouts: state.workouts.map((workout) => {
          if (workout.id !== action.workoutId) {
            return workout
          }

          return {
            ...workout,
            exercises: [...workout.exercises, safeExercise],
          }
        }),
      }
    }

    case 'UPDATE_EXERCISE': {
      const safeInput = sanitizeExerciseInput(action.input)

      return {
        ...state,
        workouts: state.workouts.map((workout) => {
          if (workout.id !== action.workoutId) {
            return workout
          }

          return {
            ...workout,
            exercises: workout.exercises.map((exercise) => {
              if (exercise.id !== action.exerciseId) {
                return exercise
              }

              return {
                ...exercise,
                name: safeInput.name,
                muscle: safeInput.muscle,
                equip: safeInput.equip,
                sets: safeInput.sets,
                reps: safeInput.reps,
                weight: safeInput.weight,
                rest: safeInput.rest,
                notes: safeInput.notes,
              }
            }),
          }
        }),
      }
    }

    case 'TOGGLE_EXERCISE_DONE':
      return {
        ...state,
        workouts: state.workouts.map((workout) => {
          if (workout.id !== action.workoutId) {
            return workout
          }

          return {
            ...workout,
            exercises: workout.exercises.map((exercise) => {
              if (exercise.id !== action.exerciseId) {
                return exercise
              }

              return {
                ...exercise,
                done: !exercise.done,
              }
            }),
          }
        }),
      }

    case 'REORDER_EXERCISES':
      return {
        ...state,
        workouts: state.workouts.map((workout) => {
          if (workout.id !== action.workoutId) {
            return workout
          }

          const fromIndex = workout.exercises.findIndex(
            (exercise) => exercise.id === action.draggedExerciseId,
          )
          const toIndex = workout.exercises.findIndex(
            (exercise) => exercise.id === action.targetExerciseId,
          )

          if (fromIndex === -1 || toIndex === -1 || fromIndex === toIndex) {
            return workout
          }

          const nextExercises = [...workout.exercises]
          const [movedExercise] = nextExercises.splice(fromIndex, 1)
          nextExercises.splice(toIndex, 0, movedExercise)

          return {
            ...workout,
            exercises: nextExercises,
          }
        }),
      }

    case 'REMOVE_EXERCISE':
      return {
        ...state,
        workouts: state.workouts.map((workout) => {
          if (workout.id !== action.workoutId) {
            return workout
          }

          return {
            ...workout,
            exercises: workout.exercises.filter((exercise) => exercise.id !== action.exerciseId),
          }
        }),
      }

    default:
      return state
  }
}
