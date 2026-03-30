import { useEffect, useMemo, useReducer, useState } from 'react'
import { Header } from '../components/layout/Header'
import { Sidebar } from '../components/layout/Sidebar'
import { WorkoutDetail } from '../components/workout/WorkoutDetail'
import { NewWorkoutModal } from '../components/modals/NewWorkoutModal'
import { NewExerciseModal } from '../components/modals/NewExerciseModal'
import { createSeedWorkouts } from '../data/seedWorkouts'
import { EQUIPMENTS, LETTERS, MUSCLES, REST_OPTIONS } from '../data/workoutOptions'
import type { CreateExerciseInput, CreateWorkoutInput, Exercise } from '../types/workout'
import {
  type WorkoutBuilderState,
  workoutBuilderReducer,
} from '../state/workoutBuilderReducer'
import { loadWorkoutBuilderState, saveWorkoutBuilderState } from '../utils/workoutStorage'
import './WorkoutBuilderPage.css'

type EditingExerciseState = {
  workoutId: string
  exercise: Exercise
} | null

const normalizeExerciseName = (value: string): string =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const createInitialWorkoutBuilderState = (): WorkoutBuilderState => {
  const savedState = loadWorkoutBuilderState()
  if (savedState) {
    return savedState
  }

  const seedWorkouts = createSeedWorkouts()
  return {
    workouts: seedWorkouts,
    activeWorkoutId: seedWorkouts[0]?.id ?? null,
  }
}

export function WorkoutBuilderPage() {
  const [builderState, dispatch] = useReducer(
    workoutBuilderReducer,
    undefined,
    createInitialWorkoutBuilderState,
  )

  const [isNewWorkoutModalOpen, setIsNewWorkoutModalOpen] = useState(false)
  const [isNewExerciseModalOpen, setIsNewExerciseModalOpen] = useState(false)
  const [editingExerciseState, setEditingExerciseState] = useState<EditingExerciseState>(null)

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsNewWorkoutModalOpen(false)
        setIsNewExerciseModalOpen(false)
        setEditingExerciseState(null)
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      saveWorkoutBuilderState(builderState)
    }, 300)

    return () => window.clearTimeout(timer)
  }, [builderState])

  const activeWorkout = useMemo(
    () =>
      builderState.workouts.find((workout) => workout.id === builderState.activeWorkoutId) ?? null,
    [builderState.workouts, builderState.activeWorkoutId],
  )

  const totalExercises = useMemo(
    () => builderState.workouts.reduce((sum, workout) => sum + workout.exercises.length, 0),
    [builderState.workouts],
  )

  const handleCreateWorkout = (input: CreateWorkoutInput) => {
    dispatch({
      type: 'CREATE_WORKOUT',
      input,
      letters: LETTERS,
    })
    setIsNewWorkoutModalOpen(false)
  }

  const handleDeleteWorkout = (workoutId: string) => {
    if (!window.confirm('Excluir este treino?')) {
      return
    }

    dispatch({
      type: 'DELETE_WORKOUT',
      workoutId,
    })
  }

  const handleAddExercise = (input: CreateExerciseInput): string | null => {
    if (!builderState.activeWorkoutId) {
      return 'Selecione um treino antes de adicionar exercicio.'
    }

    const workout = builderState.workouts.find((item) => item.id === builderState.activeWorkoutId)
    const normalizedInputName = normalizeExerciseName(input.name)
    const hasDuplicate = workout?.exercises.some(
      (exercise) => normalizeExerciseName(exercise.name) === normalizedInputName,
    )

    if (hasDuplicate) {
      return 'Este exercicio ja foi adicionado neste treino.'
    }

    dispatch({
      type: 'ADD_EXERCISE',
      workoutId: builderState.activeWorkoutId,
      input,
    })

    setIsNewExerciseModalOpen(false)

    return null
  }

  const handleUpdateExercise = (input: CreateExerciseInput): string | null => {
    if (!editingExerciseState) {
      return 'Exercicio invalido para edicao.'
    }

    const workout = builderState.workouts.find((item) => item.id === editingExerciseState.workoutId)
    const normalizedInputName = normalizeExerciseName(input.name)
    const hasDuplicate = workout?.exercises.some(
      (exercise) =>
        exercise.id !== editingExerciseState.exercise.id &&
        normalizeExerciseName(exercise.name) === normalizedInputName,
    )

    if (hasDuplicate) {
      return 'Ja existe outro exercicio com esse nome neste treino.'
    }

    dispatch({
      type: 'UPDATE_EXERCISE',
      workoutId: editingExerciseState.workoutId,
      exerciseId: editingExerciseState.exercise.id,
      input,
    })
    setEditingExerciseState(null)

    return null
  }

  const handleStartEditExercise = (workoutId: string, exercise: Exercise) => {
    setEditingExerciseState({ workoutId, exercise })
  }

  const handleToggleExerciseDone = (workoutId: string, exerciseId: string) => {
    dispatch({
      type: 'TOGGLE_EXERCISE_DONE',
      workoutId,
      exerciseId,
    })
  }

  const handleReorderExercises = (workoutId: string, draggedExerciseId: string, targetExerciseId: string) => {
    if (draggedExerciseId === targetExerciseId) {
      return
    }

    dispatch({
      type: 'REORDER_EXERCISES',
      workoutId,
      draggedExerciseId,
      targetExerciseId,
    })
  }

  const handleRemoveExercise = (workoutId: string, exerciseId: string) => {
    dispatch({
      type: 'REMOVE_EXERCISE',
      workoutId,
      exerciseId,
    })
  }

  return (
    <>
      <Header workoutsCount={builderState.workouts.length} totalExercises={totalExercises} />

      <div className="app">
        <Sidebar
          workouts={builderState.workouts}
          activeWorkoutId={builderState.activeWorkoutId}
          onSelectWorkout={(workoutId) => dispatch({ type: 'SELECT_WORKOUT', workoutId })}
          onOpenNewWorkout={() => setIsNewWorkoutModalOpen(true)}
          onDeleteWorkout={handleDeleteWorkout}
        />

        <main className="main">
          <WorkoutDetail
            workout={activeWorkout}
            onOpenAddExercise={() => setIsNewExerciseModalOpen(true)}
            onRemoveExercise={handleRemoveExercise}
            onEditExercise={handleStartEditExercise}
            onReorderExercises={handleReorderExercises}
            onToggleExerciseDone={handleToggleExerciseDone}
          />
        </main>
      </div>

      {isNewWorkoutModalOpen ? (
        <NewWorkoutModal
          onClose={() => setIsNewWorkoutModalOpen(false)}
          muscles={MUSCLES}
          onCreateWorkout={handleCreateWorkout}
        />
      ) : null}

      {isNewExerciseModalOpen ? (
        <NewExerciseModal
          onClose={() => setIsNewExerciseModalOpen(false)}
          equipments={EQUIPMENTS}
          restOptions={REST_OPTIONS}
          onSubmitExercise={handleAddExercise}
        />
      ) : null}

      {editingExerciseState ? (
        <NewExerciseModal
          onClose={() => setEditingExerciseState(null)}
          equipments={EQUIPMENTS}
          restOptions={REST_OPTIONS}
          onSubmitExercise={handleUpdateExercise}
          title="EDITAR EXERCICIO"
          submitLabel="SALVAR"
          initialForm={{
            name: editingExerciseState.exercise.name,
            muscle: editingExerciseState.exercise.muscle,
            equip: editingExerciseState.exercise.equip,
            sets: editingExerciseState.exercise.sets,
            reps: editingExerciseState.exercise.reps,
            weight: editingExerciseState.exercise.weight,
            rest: editingExerciseState.exercise.rest,
            notes: editingExerciseState.exercise.notes,
          }}
        />
      ) : null}
    </>
  )
}
