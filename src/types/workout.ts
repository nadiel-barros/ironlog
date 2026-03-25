export type Exercise = {
  id: string
  name: string
  muscle: string
  equip: string
  sets: number
  reps: number
  weight: number
  rest: number
  notes: string
  done: boolean
}

export type Workout = {
  id: string
  letter: string
  name: string
  muscles: string[]
  notes: string
  exercises: Exercise[]
  createdAt: string
}

export type CreateWorkoutInput = {
  name: string
  muscles: string[]
  notes: string
}

export type CreateExerciseInput = {
  name: string
  muscle: string
  equip: string
  sets: number
  reps: number
  weight: number
  rest: number
  notes: string
}
