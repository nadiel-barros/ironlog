import { describe, expect, it } from 'vitest'
import { loadWorkoutBuilderState, saveWorkoutBuilderState } from './workoutStorage'

describe('workoutStorage', () => {
  it('salva e carrega estado do builder', () => {
    const state = {
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
          ],
        },
      ],
    }

    saveWorkoutBuilderState(state)
    const loaded = loadWorkoutBuilderState()

    expect(loaded).toEqual(state)
  })
})
