import { describe, expect, it } from 'vitest'
import type { WorkoutBuilderState } from './workoutBuilderReducer'
import { workoutBuilderReducer } from './workoutBuilderReducer'

const baseState: WorkoutBuilderState = {
  activeWorkoutId: 'workout-1',
  workouts: [
    {
      id: 'workout-1',
      letter: 'A',
      name: 'Peito',
      muscles: ['Peito'],
      notes: '',
      createdAt: '2026-01-01T00:00:00.000Z',
      exercises: [
        {
          id: 'exercise-1',
          name: 'Supino Reto',
          muscle: 'Peito',
          equip: 'Barra',
          sets: 4,
          reps: 10,
          weight: 80,
          rest: 120,
          notes: '',
          done: false,
        },
        {
          id: 'exercise-2',
          name: 'Crucifixo',
          muscle: 'Peito',
          equip: 'Halteres',
          sets: 3,
          reps: 12,
          weight: 20,
          rest: 60,
          notes: '',
          done: false,
        },
      ],
    },
  ],
}

describe('workoutBuilderReducer', () => {
  it('reordena exercicios corretamente', () => {
    const nextState = workoutBuilderReducer(baseState, {
      type: 'REORDER_EXERCISES',
      workoutId: 'workout-1',
      draggedExerciseId: 'exercise-2',
      targetExerciseId: 'exercise-1',
    })

    expect(nextState.workouts[0]?.exercises.map((exercise) => exercise.id)).toEqual([
      'exercise-2',
      'exercise-1',
    ])
  })

  it('alterna status de concluido', () => {
    const nextState = workoutBuilderReducer(baseState, {
      type: 'TOGGLE_EXERCISE_DONE',
      workoutId: 'workout-1',
      exerciseId: 'exercise-1',
    })

    expect(nextState.workouts[0]?.exercises[0]?.done).toBe(true)
  })
})
