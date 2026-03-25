import type { Workout } from '../../types/workout'
import './Sidebar.css'

type SidebarProps = {
  workouts: Workout[]
  activeWorkoutId: string | null
  onSelectWorkout: (workoutId: string) => void
  onOpenNewWorkout: () => void
  onDeleteWorkout: (workoutId: string) => void
}

export function Sidebar({
  workouts,
  activeWorkoutId,
  onSelectWorkout,
  onOpenNewWorkout,
  onDeleteWorkout,
}: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar-title">Meus Treinos</div>

      <button type="button" className="add-workout-btn" onClick={onOpenNewWorkout}>
        <span className="icon">+</span> NOVO TREINO
      </button>

      <div className="workout-list">
        {workouts.map((workout) => (
          <div
            key={workout.id}
            className={`workout-card ${activeWorkoutId === workout.id ? 'active' : ''}`}
          >
            <button
              type="button"
              className="workout-card-select"
              onClick={() => onSelectWorkout(workout.id)}
              aria-pressed={activeWorkoutId === workout.id}
              aria-label={`Selecionar treino ${workout.name}`}
            >
              <div className="workout-card-header">
                <div className="workout-letter">{workout.letter}</div>
                <div className="workout-badge">{workout.exercises.length} exerc.</div>
              </div>

              <div className="workout-name">{workout.name}</div>

              {workout.muscles.length > 0 ? (
                <div className="workout-meta">{workout.muscles.slice(0, 3).join(' · ')}</div>
              ) : null}
            </button>

            <div className="workout-actions">
              <button
                type="button"
                className="btn-sm danger"
                onClick={() => onDeleteWorkout(workout.id)}
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </aside>
  )
}
