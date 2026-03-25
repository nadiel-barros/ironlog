import './Header.css'

type HeaderProps = {
  workoutsCount: number
  totalExercises: number
}

export function Header({ workoutsCount, totalExercises }: HeaderProps) {
  return (
    <header>
      <div className="logo">
        IRON<span>LOG</span>
      </div>

      <div className="header-right">
        <div className="stats-pill">
          TREINOS: <span>{workoutsCount}</span>
          &nbsp;|&nbsp;
          EXERCICIOS: <span>{totalExercises}</span>
        </div>
      </div>
    </header>
  )
}
