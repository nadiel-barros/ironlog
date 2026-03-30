import { useEffect, useMemo, useRef, useState } from 'react'
import { ALL_EXERCISES, resolveExerciseCatalogEntry } from '../../data/exerciseCatalog'
import { Modal } from '../common/Modal'
import type { CreateExerciseInput } from '../../types/workout'
import './NewExerciseModal.css'

type NewExerciseModalProps = {
  onClose: () => void
  equipments: string[]
  restOptions: number[]
  onSubmitExercise: (input: CreateExerciseInput) => string | null
  title?: string
  submitLabel?: string
  initialForm?: CreateExerciseInput
}

const getInitialForm = (): CreateExerciseInput => ({
  name: '',
  muscle: '',
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
  equipments,
  restOptions,
  onSubmitExercise,
  title = 'ADICIONAR EXERCICIO',
  submitLabel = 'ADICIONAR',
  initialForm,
}: NewExerciseModalProps) {
  const resolveInput = (input: CreateExerciseInput): CreateExerciseInput => {
    const resolved = resolveExerciseCatalogEntry(input.name)

    return {
      ...input,
      name: resolved?.exerciseName ?? '',
      muscle: resolved?.muscle ?? input.muscle.trim(),
    }
  }

  const [form, setForm] = useState<CreateExerciseInput>(
    () => resolveInput(initialForm ?? getInitialForm()),
  )
  const inputRef = useRef<HTMLSelectElement>(null)
  const [nameError, setNameError] = useState('')
  const exerciseOptions = useMemo(() => {
    const collator = new Intl.Collator('pt-BR', { sensitivity: 'base' })
    return [...ALL_EXERCISES].sort((left, right) => collator.compare(left, right))
  }, [])

  useEffect(() => {
    const timer = window.setTimeout(() => inputRef.current?.focus(), 0)
    return () => window.clearTimeout(timer)
  }, [])

  const handleSubmit = () => {
    const resolved = resolveExerciseCatalogEntry(form.name)

    if (!resolved) {
      setNameError('Selecione um exercicio valido da lista.')
      inputRef.current?.focus()
      return
    }

    setNameError('')

    const submitError = onSubmitExercise({
      ...form,
      name: resolved.exerciseName,
      muscle: resolved.muscle,
      sets: clamp(Math.round(form.sets), 1, 20),
      reps: clamp(Math.round(form.reps), 1, 100),
      weight: clamp(form.weight, 0, 10000),
      rest: clamp(Math.round(form.rest), 0, 1800),
      notes: form.notes.trim(),
    })

    if (submitError) {
      setNameError(submitError)
      return
    }
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
        <label className="form-label" htmlFor="exerciseNameSelect">
          Nome do Exercicio
        </label>
        <select
          id="exerciseNameSelect"
          ref={inputRef}
          className="form-input form-select"
          value={form.name}
          onChange={(event) => {
            const selectedName = event.target.value
            const resolved = resolveExerciseCatalogEntry(selectedName)

            setNameError('')
            setForm((previous) => ({
              ...previous,
              name: resolved?.exerciseName ?? '',
              muscle: resolved?.muscle ?? '',
            }))
          }}
        >
          <option value="" disabled>
            Selecione um exercicio da lista
          </option>
          {exerciseOptions.map((exerciseName) => (
            <option key={exerciseName} value={exerciseName}>
              {exerciseName}
            </option>
          ))}
        </select>
        {nameError ? <span className="form-error">{nameError}</span> : null}
      </div>

      <div className="form-group">
        <div className="form-label">Grupo Muscular</div>
        <div className="chips-grid">
          <span className={`chip selected chip-readonly ${form.muscle ? '' : 'chip-placeholder'}`}>
            {form.muscle || 'Selecionado automaticamente'}
          </span>
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
