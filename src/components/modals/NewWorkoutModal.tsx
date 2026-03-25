import { useEffect, useRef, useState } from 'react'
import { Modal } from '../common/Modal'
import type { CreateWorkoutInput } from '../../types/workout'
import './NewWorkoutModal.css'

type NewWorkoutModalProps = {
  onClose: () => void
  muscles: string[]
  onCreateWorkout: (input: CreateWorkoutInput) => void
}

export function NewWorkoutModal({ onClose, muscles, onCreateWorkout }: NewWorkoutModalProps) {
  const [name, setName] = useState('')
  const [notes, setNotes] = useState('')
  const [selectedMuscles, setSelectedMuscles] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const timer = window.setTimeout(() => inputRef.current?.focus(), 0)
    return () => window.clearTimeout(timer)
  }, [])

  const toggleMuscle = (muscle: string) => {
    setSelectedMuscles((previous) =>
      previous.includes(muscle)
        ? previous.filter((item) => item !== muscle)
        : [...previous, muscle],
    )
  }

  const handleSubmit = () => {
    const trimmedName = name.trim()

    if (!trimmedName) {
      inputRef.current?.focus()
      return
    }

    onCreateWorkout({
      name: trimmedName,
      muscles: selectedMuscles,
      notes: notes.trim(),
    })
  }

  return (
    <Modal
      title="NOVO TREINO"
      onClose={onClose}
      footer={
        <>
          <button type="button" className="btn btn-ghost" onClick={onClose}>
            CANCELAR
          </button>
          <button type="button" className="btn btn-primary" onClick={handleSubmit}>
            CRIAR TREINO
          </button>
        </>
      }
    >
      <div className="form-group">
        <label className="form-label" htmlFor="workoutNameInput">
          Nome do Treino
        </label>
        <input
          id="workoutNameInput"
          ref={inputRef}
          className="form-input"
          placeholder="Ex: Peito e Triceps, Costas, Ombro..."
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>

      <div className="form-group">
        <div className="form-label">Grupos Musculares</div>
        <div className="muscle-grid">
          {muscles.map((muscle) => (
            <button
              key={muscle}
              type="button"
              className={`muscle-chip ${selectedMuscles.includes(muscle) ? 'selected' : ''}`}
              onClick={() => toggleMuscle(muscle)}
            >
              {muscle}
            </button>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="workoutNotesInput">
          Observacoes (opcional)
        </label>
        <textarea
          id="workoutNotesInput"
          className="form-textarea"
          rows={3}
          placeholder="Ex: Foco em volume, progressao de carga..."
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
        />
      </div>
    </Modal>
  )
}
