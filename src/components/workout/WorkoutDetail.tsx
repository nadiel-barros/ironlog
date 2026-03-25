import { useState } from 'react'
import type { Exercise, Workout } from '../../types/workout'
import { getExerciseVideoByName } from '../../utils/exerciseVideo'
import { formatRest } from '../../utils/workout'
import './WorkoutDetail.css'

type WorkoutDetailProps = {
  workout: Workout | null
  onOpenAddExercise: () => void
  onRemoveExercise: (workoutId: string, exerciseId: string) => void
  onEditExercise: (workoutId: string, exercise: Exercise) => void
  onReorderExercises: (workoutId: string, draggedExerciseId: string, targetExerciseId: string) => void
  onToggleExerciseDone: (workoutId: string, exerciseId: string) => void
}

export function WorkoutDetail({
  workout,
  onOpenAddExercise,
  onRemoveExercise,
  onEditExercise,
  onReorderExercises,
  onToggleExerciseDone,
}: WorkoutDetailProps) {
  const [expandedExercises, setExpandedExercises] = useState<Record<string, boolean>>({})
  const [draggedExerciseId, setDraggedExerciseId] = useState<string | null>(null)
  const [dragOverExerciseId, setDragOverExerciseId] = useState<string | null>(null)
  const [loadedVideos, setLoadedVideos] = useState<Record<string, boolean>>({})
  const [failedVideos, setFailedVideos] = useState<Record<string, boolean>>({})

  if (!workout) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🏋️</div>
        <div className="empty-title">SELECIONE UM TREINO</div>
        <div className="empty-sub">
          Escolha um treino na barra lateral
          <br />
          ou crie um novo
        </div>
      </div>
    )
  }

  const totalSets = workout.exercises.reduce((sum, exercise) => sum + exercise.sets, 0)
  const totalVolume = workout.exercises.reduce(
    (sum, exercise) => sum + exercise.sets * exercise.reps * exercise.weight,
    0,
  )

  const getExerciseKey = (exerciseId: string): string => `${workout.id}:${exerciseId}`

  const toggleExpanded = (exerciseId: string) => {
    const key = getExerciseKey(exerciseId)

    setExpandedExercises((previous) => ({
      ...previous,
      [key]: !previous[key],
    }))
  }

  const loadVideo = (exerciseId: string) => {
    const key = getExerciseKey(exerciseId)

    setFailedVideos((previous) => ({
      ...previous,
      [key]: false,
    }))

    setLoadedVideos((previous) => ({
      ...previous,
      [key]: true,
    }))
  }

  return (
    <div className="workout-detail">
      <div className="detail-header">
        <div className="detail-title-group">
          <div className="detail-letter">{workout.letter}</div>
          <div>
            <div className="detail-title">{workout.name}</div>
            <div className="detail-subtitle">
              {workout.muscles.length > 0 ? workout.muscles.join(' · ') : 'SEM GRUPOS DEFINIDOS'}
            </div>
          </div>
        </div>

        <div className="detail-actions">
          <button type="button" className="btn btn-primary" onClick={onOpenAddExercise}>
            + EXERCICIO
          </button>
        </div>
      </div>

      <div className="stats-row">
        <div className="stat-box">
          <div className="stat-label">Exercicios</div>
          <div className="stat-value yellow">{workout.exercises.length}</div>
        </div>

        <div className="stat-box">
          <div className="stat-label">Total de Series</div>
          <div className="stat-value">{totalSets}</div>
        </div>

        <div className="stat-box">
          <div className="stat-label">Volume Total</div>
          <div className="stat-value green">
            {totalVolume > 0 ? `${Math.round(totalVolume).toLocaleString('pt-BR')}kg` : '-'}
          </div>
        </div>
      </div>

      <div className="section-header">
        <div className="section-title">Exercicios do Treino {workout.letter}</div>
      </div>

      <div className="exercise-list">
        {workout.exercises.length === 0 ? (
          <div className="no-exercises">
            Nenhum exercicio ainda.
            <br />
            Clique em "+ EXERCICIO" para adicionar.
          </div>
        ) : (
          workout.exercises.map((exercise, index) => {
            const video = getExerciseVideoByName(exercise.name)
            const key = getExerciseKey(exercise.id)
            const isExpanded = !!expandedExercises[key]
            const isDone = exercise.done
            const isDragOver = dragOverExerciseId === exercise.id
            const isVideoLoaded = !!loadedVideos[key]
            const hasVideoFailed = !!failedVideos[key]

            return (
              <div
                key={exercise.id}
                className={`exercise-item ${isExpanded ? 'expanded' : ''} ${isDragOver ? 'drag-over' : ''}`}
                onDragOver={(event) => {
                  event.preventDefault()
                  if (dragOverExerciseId !== exercise.id) {
                    setDragOverExerciseId(exercise.id)
                  }
                }}
                onDrop={(event) => {
                  event.preventDefault()

                  if (draggedExerciseId && draggedExerciseId !== exercise.id) {
                    onReorderExercises(workout.id, draggedExerciseId, exercise.id)
                  }

                  setDraggedExerciseId(null)
                  setDragOverExerciseId(null)
                }}
              >
                <div
                  className="exercise-summary"
                  role="button"
                  tabIndex={0}
                  aria-expanded={isExpanded}
                  draggable
                  onDragStart={(event) => {
                    setDraggedExerciseId(exercise.id)
                    event.dataTransfer.effectAllowed = 'move'
                    event.dataTransfer.setData('text/plain', exercise.id)
                  }}
                  onDragEnd={() => {
                    setDraggedExerciseId(null)
                    setDragOverExerciseId(null)
                  }}
                  onClick={() => toggleExpanded(exercise.id)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault()
                      toggleExpanded(exercise.id)
                    }
                  }}
                >
                  <div className="drag-handle" title="Arraste para mover">
                    <div className="drag-dot" />
                    <div className="drag-dot" />
                    <div className="drag-dot" />
                    <div className="drag-dot" />
                  </div>

                  <div className="exercise-num">{String(index + 1).padStart(2, '0')}</div>

                  <div className="exercise-info">
                    <div className={`exercise-name ${isDone ? 'done' : ''}`}>{exercise.name}</div>

                    <div className="exercise-tags">
                      {exercise.muscle ? <span className="tag tag-muscle">{exercise.muscle}</span> : null}
                      {exercise.equip ? <span className="tag tag-equipment">{exercise.equip}</span> : null}
                      <span className="tag tag-sets">
                        {exercise.sets}x{exercise.reps}
                      </span>
                      {exercise.weight > 0 ? (
                        <span className="tag tag-equipment">{exercise.weight}kg</span>
                      ) : null}
                      {exercise.rest > 0 ? (
                        <span className="tag tag-rest">TIME {formatRest(exercise.rest)}</span>
                      ) : null}
                    </div>

                    {exercise.notes ? <div className="exercise-note">{exercise.notes}</div> : null}
                  </div>

                  <div className="exercise-controls">
                    <label
                      className="done-check"
                      title="Marcar exercicio como concluido"
                      onClick={(event) => event.stopPropagation()}
                    >
                      <input
                        type="checkbox"
                        checked={isDone}
                        onChange={() => onToggleExerciseDone(workout.id, exercise.id)}
                      />
                      <span className="done-check-mark" />
                    </label>

                    <div className="sets-reps">
                      <div className="sets-val">
                        {exercise.sets}x{exercise.reps}
                      </div>
                      <div className="sets-label">SETSxREPS</div>
                    </div>

                    <button
                      type="button"
                      className="icon-btn"
                      title="Editar"
                      onClick={(event) => {
                        event.stopPropagation()
                        onEditExercise(workout.id, exercise)
                      }}
                    >
                      E
                    </button>

                    <button
                      type="button"
                      className="icon-btn"
                      title="Remover"
                      onClick={(event) => {
                        event.stopPropagation()
                        onRemoveExercise(workout.id, exercise.id)
                      }}
                    >
                      X
                    </button>
                  </div>
                </div>

                {isExpanded ? (
                  <div className="exercise-content">
                    {!isVideoLoaded ? (
                      <button
                        type="button"
                        className="video-placeholder"
                        onClick={() => loadVideo(exercise.id)}
                      >
                        <img
                          className="video-thumb"
                          src={video.thumbnailUrl}
                          alt={`Capa do video de ${exercise.name}`}
                          loading="lazy"
                        />
                        <span className="video-play">Carregar video</span>
                      </button>
                    ) : (
                      <div className="exercise-video-wrapper">
                        {!hasVideoFailed ? (
                          <iframe
                            className="exercise-video"
                            src={video.embedUrl}
                            title={`Video de ${exercise.name}`}
                            loading="lazy"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            onError={() =>
                              setFailedVideos((previous) => ({
                                ...previous,
                                [key]: true,
                              }))
                            }
                            allowFullScreen
                          />
                        ) : (
                          <div className="exercise-video-fallback">
                            <div className="video-fallback-title">Nao foi possivel carregar o video aqui.</div>
                            <a href={video.youtubeUrl} target="_blank" rel="noreferrer">
                              Abrir no YouTube
                            </a>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            )
          })
        )}
      </div>

      <div className="add-exercise-area">
        <button type="button" className="add-exercise-btn" onClick={onOpenAddExercise}>
          + ADICIONAR EXERCICIO
        </button>
      </div>

      {workout.notes ? (
        <div className="notes-area">
          <div className="notes-label">Observacoes do Treino</div>
          <div className="notes-text">{workout.notes}</div>
        </div>
      ) : null}
    </div>
  )
}
