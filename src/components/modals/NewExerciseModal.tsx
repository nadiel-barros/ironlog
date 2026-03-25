import { useEffect, useMemo, useRef, useState } from 'react'
import { ALL_EXERCISES, EXERCISE_GROUPS } from '../../data/exerciseCatalog'
import { Modal } from '../common/Modal'
import type { CreateExerciseInput } from '../../types/workout'
import './NewExerciseModal.css'

type NewExerciseModalProps = {
  onClose: () => void
  preselectedMuscle: string
  muscles: string[]
  equipments: string[]
  restOptions: number[]
  onSubmitExercise: (input: CreateExerciseInput) => void
  title?: string
  submitLabel?: string
  initialForm?: CreateExerciseInput
}

const getInitialForm = (muscle = ''): CreateExerciseInput => ({
  name: '',
  muscle,
  equip: '',
  sets: 4,
  reps: 12,
  weight: 0,
  rest: 60,
  notes: '',
})

const restLabel = (seconds: number): string => {
  if (seconds === 60) return '1min'
  if (seconds === 90) return '1min30'
  if (seconds === 120) return '2min'
  if (seconds === 180) return '3min'
  return `${seconds}s`
}

const clamp = (value: number, min: number, max: number): number => {
  if (!Number.isFinite(value)) {
    return min
  }

  return Math.min(max, Math.max(min, value))
}

const parseAndClamp = (
  rawValue: string,
  currentValue: number,
  min: number,
  max: number,
): number => {
  if (!rawValue.trim()) {
    return currentValue
  }

  const parsed = Number(rawValue)
  if (!Number.isFinite(parsed)) {
    return currentValue
  }

  return clamp(parsed, min, max)
}

export function NewExerciseModal({
  onClose,
  preselectedMuscle,
  muscles,
  equipments,
  restOptions,
  onSubmitExercise,
  title = 'ADICIONAR EXERCICIO',
  submitLabel = 'ADICIONAR',
  initialForm,
}: NewExerciseModalProps) {
  const [form, setForm] = useState<CreateExerciseInput>(
    () => initialForm ?? getInitialForm(preselectedMuscle),
  )
  const inputRef = useRef<HTMLInputElement>(null)
  const exerciseNameSuggestions = useMemo(() => {
    if (!form.muscle) {
      return ALL_EXERCISES
    }

    const selectedGroup = EXERCISE_GROUPS.find((group) => group.muscle === form.muscle)
    return selectedGroup?.exercises ?? ALL_EXERCISES
  }, [form.muscle])

  useEffect(() => {
    const timer = window.setTimeout(() => inputRef.current?.focus(), 0)
    return () => window.clearTimeout(timer)
  }, [])

  const handleSubmit = () => {
    const trimmedName = form.name.trim()

    if (!trimmedName) {
      inputRef.current?.focus()
      return
    }

    onSubmitExercise({
      ...form,
      name: trimmedName,
      sets: clamp(Math.round(form.sets), 1, 20),
      reps: clamp(Math.round(form.reps), 1, 100),
      weight: clamp(form.weight, 0, 10000),
      rest: clamp(Math.round(form.rest), 0, 1800),
      notes: form.notes.trim(),
    })
  }

  return (
    <Modal
      title={title}
      onClose={onClose}
      footer={
        <>
          <button type="button" className="btn btn-ghost" onClick={onClose}>
            CANCELAR
          </button>
          <button type="button" className="btn btn-primary" onClick={handleSubmit}>
            {submitLabel}
          </button>
        </>
      }
    >
      <div className="form-group">
        <label className="form-label" htmlFor="exerciseNameInput">
          Nome do Exercicio
        </label>
        <input
          id="exerciseNameInput"
          ref={inputRef}
          className="form-input"
          placeholder="Ex: Supino Reto, Rosca Direta..."
          list="exerciseNameSuggestions"
          value={form.name}
          onChange={(event) => setForm((previous) => ({ ...previous, name: event.target.value }))}
        />
        <datalist id="exerciseNameSuggestions">
          {exerciseNameSuggestions.map((exerciseName) => (
            <option key={exerciseName} value={exerciseName} />
          ))}
        </datalist>
      </div>

      <div className="form-group">
        <div className="form-label">Grupo Muscular</div>
        <div className="chips-grid">
          {muscles.map((muscle) => (
            <button
              key={muscle}
              type="button"
              className={`chip ${form.muscle === muscle ? 'selected' : ''}`}
              onClick={() => setForm((previous) => ({ ...previous, muscle }))}
            >
              {muscle}
            </button>
          ))}
        </div>
      </div>

      <div className="form-group">
        <div className="form-label">Equipamento</div>
        <div className="chips-grid">
          {equipments.map((equipment) => (
            <button
              key={equipment}
              type="button"
              className={`chip ${form.equip === equipment ? 'selected' : ''}`}
              onClick={() => setForm((previous) => ({ ...previous, equip: equipment }))}
            >
              {equipment}
            </button>
          ))}
        </div>
      </div>

      <div className="number-input-row">
        <div className="form-group">
          <label className="form-label" htmlFor="exerciseSetsInput">
            Series
          </label>
          <input
            id="exerciseSetsInput"
            className="form-input"
            type="number"
            min={1}
            max={20}
            value={form.sets}
            onChange={(event) =>
              setForm((previous) => ({
                ...previous,
                sets: parseAndClamp(event.target.value, previous.sets, 1, 20),
              }))
            }
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="exerciseRepsInput">
            Repeticoes
          </label>
          <input
            id="exerciseRepsInput"
            className="form-input"
            type="number"
            min={1}
            max={100}
            value={form.reps}
            onChange={(event) =>
              setForm((previous) => ({
                ...previous,
                reps: parseAndClamp(event.target.value, previous.reps, 1, 100),
              }))
            }
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="exerciseWeightInput">
            Carga (kg)
          </label>
          <input
            id="exerciseWeightInput"
            className="form-input"
            type="number"
            min={0}
            value={form.weight}
            onChange={(event) =>
              setForm((previous) => ({
                ...previous,
                weight: parseAndClamp(event.target.value, previous.weight, 0, 10000),
              }))
            }
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="exerciseRestInput">
          Descanso (segundos)
        </label>

        <div className="chips-grid">
          {restOptions.map((seconds) => (
            <button
              key={seconds}
              type="button"
              className={`chip ${form.rest === seconds ? 'selected' : ''}`}
              onClick={() => setForm((previous) => ({ ...previous, rest: seconds }))}
            >
              {restLabel(seconds)}
            </button>
          ))}
        </div>

        <input
          id="exerciseRestInput"
          className="form-input"
          type="number"
          value={form.rest}
          placeholder="Segundos"
          style={{ marginTop: '0.5rem' }}
          onChange={(event) =>
            setForm((previous) => ({
              ...previous,
              rest: parseAndClamp(event.target.value, previous.rest, 0, 1800),
            }))
          }
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="exerciseNotesInput">
          Observacoes
        </label>
        <input
          id="exerciseNotesInput"
          className="form-input"
          placeholder="Ex: Pegada neutra, controle excentrico..."
          value={form.notes}
          onChange={(event) => setForm((previous) => ({ ...previous, notes: event.target.value }))}
        />
      </div>
    </Modal>
  )
}



