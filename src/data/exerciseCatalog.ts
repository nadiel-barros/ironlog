export type ExerciseGroup = {
  muscle: string
  exercises: string[]
}

export const EXERCISE_GROUPS: ExerciseGroup[] = [
  {
    muscle: 'Biceps',
    exercises: [
      'Rosca Alternada',
      'Rosca Simultanea 45',
      'Rosca Scott',
      'Rosca Concentrada',
      'Rosca Martelo no Cross',
      'Rosca Tipica no Cross',
    ],
  },
  {
    muscle: 'Triceps',
    exercises: [
      'Triceps Pulley',
      'Triceps Corda',
      'Triceps Testa',
      'Triceps Frances',
      'Triceps Coice',
      'Supino Fechado',
      'Paralela',
    ],
  },
  {
    muscle: 'Gluteo',
    exercises: [
      'Gluteo Maquina',
      'Cross Over (Gluteo)',
      'Coice com Tornozeleira',
      'Cadeira Abdutora',
      'Graviton',
      'Apolete',
      'Elevacao de Quadril',
    ],
  },
  {
    muscle: 'Antebraco',
    exercises: ['Rosca Punho', 'Rosca Inversa'],
  },
  {
    muscle: 'Trapezio',
    exercises: ['Remada Alta', 'Encolhimento'],
  },
  {
    muscle: 'Quadriceps',
    exercises: [
      'Cadeira Extensora',
      'Leg Press (Quadriceps)',
      'Agachamento',
      'Agachamento Hack',
      'Agachamento Maquina',
      'Avanco',
      'Avanco Passada',
    ],
  },
  {
    muscle: 'Adutores',
    exercises: ['Cadeira Adutora', 'Aducao Tornozeleira', 'Terra Sumo'],
  },
  {
    muscle: 'Abdomen',
    exercises: ['Abdominal Reto', 'Abdominal Obliquo', 'Abdominal Infra Solo', 'Cintura', 'Prancha'],
  },
  {
    muscle: 'Posterior Coxa',
    exercises: [
      'Cadeira Flexora',
      'Mesa Flexora',
      'Flexor em Pe',
      'Flexor com Halter',
      'Stiff',
      'Bom Dia',
      'Les Ado',
    ],
  },
  {
    muscle: 'Panturrilha',
    exercises: ['Leg Press (Panturrilha)', 'Panturrilha em Pe', 'Panturrilha Sentado'],
  },
  {
    muscle: 'Costas',
    exercises: [
      'Pulley Nuca',
      'Pulley Frontal',
      'Pulley Inverso',
      'Remada Baixa',
      'Remada Maquina',
      'Remada Articulada',
      'Remada Unilateral',
      'Barra Fixa',
      'Remo Reto',
      'Remada Curvada',
      'Graviton Cavalinho',
      'Lombar',
    ],
  },
  {
    muscle: 'Ombro',
    exercises: [
      'Desenvolvimento Smith Frente',
      'Desenvolvimento Articulado',
      'Desenvolvimento Halter',
      'Elevacao Frontal',
      'Elevacao Frontal Cabo',
      'Elevacao Lateral',
      'Elevacao Lateral Cabo',
      'Posterior Maquina',
      'Crucifixo Inverso',
    ],
  },
  {
    muscle: 'Peito',
    exercises: [
      'Supino Vertical',
      'Supino Reto',
      'Supino Inclinado',
      'Supino Declinado',
      'Fly Reto',
      'Fly Inclinado',
      'Crucifixo Reto',
      'Crucifixo Inclinado',
      'Peck Deck',
      'Cross Over (Peito)',
      'Pull Over',
      'Voador',
      'Manguito',
    ],
  },
]

export type ExerciseCatalogEntry = {
  exerciseName: string
  muscle: string
}

const normalizeExerciseName = (value: string): string =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const EXERCISE_NAME_ALIASES: Record<string, string[]> = {
  'Rosca Simultanea 45': ['Rosca Simultanea 45 graus'],
  'Rosca Martelo no Cross': ['Rosca Martelo Closs', 'Rosca Martelo Cross'],
  'Rosca Tipica no Cross': ['Tipica Closs', 'Tipica Cross', 'Rosca Tipica Cross'],
  'Triceps Pulley': ['Pulley'],
  'Triceps Corda': ['Corda'],
  'Triceps Testa': ['Testa'],
  'Triceps Frances': ['Frances'],
  'Triceps Coice': ['Coice'],
  Paralela: ['Paralelas', 'Mergulho Triceps'],
  'Gluteo Maquina': ['Gluteo Maq.', 'Gluteo Maq'],
  'Cross Over (Gluteo)': ['Cross Over Gluteo'],
  'Coice com Tornozeleira': ['Tornozeleira', 'Coice na Polia'],
  Prancha: ['Camcha'],
  'Leg Press (Quadriceps)': ['Leg Press', 'Leg Press 45'],
  'Leg Press (Panturrilha)': ['Leg Press Panturrilha', 'Panturrilha no Leg Press'],
  'Aducao Tornozeleira': ['Aducao com Tornozeleira', 'Adutor na Polia'],
  'Abdominal Reto': ['Reto'],
  'Abdominal Obliquo': ['Obliquo'],
  'Abdominal Infra Solo': ['Infra Solo', 'Abdominal Infra'],
  Agachamento: ['Agachamento Livre'],
  'Agachamento Maquina': ['Agachamento Maq.', 'Agachamento no Smith'],
  'Avanco Passada': ['Passada'],
  'Bom Dia': ['Good Morning'],
  'Pulley Frontal': ['Puxada Frente', 'Pulldown na Polia'],
  'Pulley Inverso': ['Puxada Triangulo', 'Pulley Invertido'],
  'Remada Maquina': ['Remada Maq.'],
  'Remada Articulada': ['Remada Articulada Maquina'],
  'Graviton Cavalinho': ['Remada Cavalinho', 'Cavalinho'],
  'Desenvolvimento Smith Frente': ['Desenv. Smith Frente', 'Desenvolvimento no Smith'],
  'Desenvolvimento Articulado': ['Desenv. Articulado'],
  'Desenvolvimento Halter': ['Desenv. Halter', 'Desenvolvimento com Halteres'],
  'Elevacao Frontal Cabo': ['Elevacao Frontal no Cabo'],
  'Elevacao Lateral Cabo': ['Elevacao Lateral no Cabo'],
  'Supino Vertical': ['Supino Maquina'],
  'Crucifixo Reto': ['Crucifixo'],
  'Cross Over (Peito)': ['Cross Over', 'Crossover', 'Cross Over Peito'],
  'Pull Over': ['Pullover'],
  Manguito: ['Manguito Rotador'],
  'Rosca Punho': ['Rosca de Punho'],
  'Rosca Inversa': ['Rosca de Punho Inversa'],
  'Cadeira Abdutora': ['Abducao de Quadril'],
}

const EXERCISE_CATALOG_ENTRIES: ExerciseCatalogEntry[] = EXERCISE_GROUPS.flatMap((group) =>
  group.exercises.map((exerciseName) => ({
    exerciseName,
    muscle: group.muscle,
  })),
)

const EXERCISE_ENTRY_LOOKUP = new Map<string, ExerciseCatalogEntry>()

const addLookupValue = (value: string, entry: ExerciseCatalogEntry): void => {
  const key = normalizeExerciseName(value)
  if (!key || EXERCISE_ENTRY_LOOKUP.has(key)) {
    return
  }

  EXERCISE_ENTRY_LOOKUP.set(key, entry)
}

for (const entry of EXERCISE_CATALOG_ENTRIES) {
  addLookupValue(entry.exerciseName, entry)

  const aliases = EXERCISE_NAME_ALIASES[entry.exerciseName] ?? []
  for (const alias of aliases) {
    addLookupValue(alias, entry)
  }
}

export const ALL_EXERCISES = EXERCISE_CATALOG_ENTRIES.map((entry) => entry.exerciseName)

export const MUSCLE_GROUPS = EXERCISE_GROUPS.map((group) => group.muscle)

export const resolveExerciseCatalogEntry = (exerciseName: string): ExerciseCatalogEntry | null =>
  EXERCISE_ENTRY_LOOKUP.get(normalizeExerciseName(exerciseName)) ?? null
