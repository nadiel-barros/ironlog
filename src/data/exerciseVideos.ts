import { ALL_EXERCISES } from './exerciseCatalog'

export type ExerciseVideoReference = {
  exerciseName: string
  aliases: string[]
  youtubeUrl: string
  videoId: string
  embedUrl: string
  thumbnailUrl: string
}

type ExerciseVideoOverride = {
  youtubeUrl?: string
  aliases?: string[]
}

const DEFAULT_YOUTUBE_URL = 'https://www.youtube.com/shorts/UHa9U-O09_U'
const DEFAULT_VIDEO_ID = 'UHa9U-O09_U'

const EXERCISE_ALIASES: Record<string, string[]> = {
  'Supino Reto': ['Bench Press'],
  'Supino Inclinado': ['Incline Bench Press'],
  'Triceps Pulley': ['Triceps Pushdown'],
  'Mergulho Triceps': ['Bench Dips', 'Dips'],
  'Barra Fixa': ['Pull Up'],
  'Remada Curvada': ['Bent Over Row'],
  'Rosca Direta': ['Barbell Curl'],
  'Rosca Alternada': ['Alternating Dumbbell Curl'],
  'Leg Press 45': ['Leg Press 45 graus'],
  Stiff: ['Levantamento stiff'],
  Extensora: ['Cadeira Extensora'],
  'Cadeira Flexora': ['Mesa Flexora'],
  'Levantamento Terra Romeno': ['Romanian Deadlift'],
  'Elevacao Y': ['Elevacao Y Raise'],
}

const EXERCISE_VIDEO_OVERRIDES: Record<string, ExerciseVideoOverride> = {
  'Rosca Direta': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Rosca Direta'] ?? [] },
  'Rosca Alternada': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Rosca Alternada'] ?? [] },
  'Rosca Martelo': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Rosca Martelo'] ?? [] },
  'Rosca Scott': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Rosca Scott'] ?? [] },
  'Rosca Concentrada': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Rosca Concentrada'] ?? [] },
  'Rosca Inversa': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Rosca Inversa'] ?? [] },
  'Rosca 21': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Rosca 21'] ?? [] },
  'Rosca no Cabo': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Rosca no Cabo'] ?? [] },
  'Rosca Bayesian': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Rosca Bayesian'] ?? [] },
  'Rosca Spider': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Rosca Spider'] ?? [] },
  'Rosca de Punho': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Rosca de Punho'] ?? [] },
  'Rosca de Punho Inversa': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Rosca de Punho Inversa'] ?? [] },
  'Farmer Walk': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Farmer Walk'] ?? [] },
  'Pronacao de Punho': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Pronacao de Punho'] ?? [] },
  'Supinacao de Punho': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Supinacao de Punho'] ?? [] },
  'Hang na Barra': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Hang na Barra'] ?? [] },
  'Wrist Roller': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Wrist Roller'] ?? [] },
  'Pinch Grip Hold': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Pinch Grip Hold'] ?? [] },
  'Crunch': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Crunch'] ?? [] },
  'Crunch Invertido': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Crunch Invertido'] ?? [] },
  'Abdominal Infra': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Abdominal Infra'] ?? [] },
  'Abdominal Supra': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Abdominal Supra'] ?? [] },
  'Abdominal Bicicleta': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Abdominal Bicicleta'] ?? [] },
  'Prancha': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Prancha'] ?? [] },
  'Prancha Lateral': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Prancha Lateral'] ?? [] },
  'Elevacao de Pernas': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Elevacao de Pernas'] ?? [] },
  'Abdominal na Polia': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Abdominal na Polia'] ?? [] },
  'Roda Abdominal': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Roda Abdominal'] ?? [] },
  'Dead Bug': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Dead Bug'] ?? [] },
  'Mountain Climber': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Mountain Climber'] ?? [] },
  'Triceps Pulley': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Triceps Pulley'] ?? [] },
  'Triceps Corda': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Triceps Corda'] ?? [] },
  'Triceps Frances': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Triceps Frances'] ?? [] },
  'Triceps Testa': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Triceps Testa'] ?? [] },
  'Triceps Coice': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Triceps Coice'] ?? [] },
  'Triceps Banco': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Triceps Banco'] ?? [] },
  'Mergulho Triceps': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Mergulho Triceps'] ?? [] },
  'Supino Fechado': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Supino Fechado'] ?? [] },
  'Extensao Acima da Cabeca': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Extensao Acima da Cabeca'] ?? [] },
  'Triceps Unilateral na Polia': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Triceps Unilateral na Polia'] ?? [] },
  'Encolhimento com Barra': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Encolhimento com Barra'] ?? [] },
  'Encolhimento com Halteres': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Encolhimento com Halteres'] ?? [] },
  'Remada Alta': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Remada Alta'] ?? [] },
  'Remada Alta no Cabo': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Remada Alta no Cabo'] ?? [] },
  'Face Pull': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Face Pull'] ?? [] },
  'Levantamento Terra': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Levantamento Terra'] ?? [] },
  'Farmer Walk Pesado': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Farmer Walk Pesado'] ?? [] },
  'Agachamento Livre': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Agachamento Livre'] ?? [] },
  'Agachamento Frontal': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Agachamento Frontal'] ?? [] },
  'Agachamento Hack': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Agachamento Hack'] ?? [] },
  'Leg Press 45': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Leg Press 45'] ?? [] },
  'Cadeira Extensora': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Cadeira Extensora'] ?? [] },
  'Extensora': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Extensora'] ?? [] },
  'Avanco': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Avanco'] ?? [] },
  'Passada': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Passada'] ?? [] },
  'Bulgarian Split Squat': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Bulgarian Split Squat'] ?? [] },
  'Sissy Squat': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Sissy Squat'] ?? [] },
  'Step Up': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Step Up'] ?? [] },
  'Stiff': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Stiff'] ?? [] },
  'Levantamento Terra Romeno': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Levantamento Terra Romeno'] ?? [] },
  'Mesa Flexora': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Mesa Flexora'] ?? [] },
  'Cadeira Flexora': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Cadeira Flexora'] ?? [] },
  'Good Morning': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Good Morning'] ?? [] },
  'Glute Ham Raise': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Glute Ham Raise'] ?? [] },
  'Nordic Curl': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Nordic Curl'] ?? [] },
  'Kettlebell Swing': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Kettlebell Swing'] ?? [] },
  'Hip Thrust': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Hip Thrust'] ?? [] },
  'Glute Bridge': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Glute Bridge'] ?? [] },
  'Coice na Polia': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Coice na Polia'] ?? [] },
  'Abducao de Quadril': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Abducao de Quadril'] ?? [] },
  'Agachamento Sumo': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Agachamento Sumo'] ?? [] },
  'Terra Sumo': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Terra Sumo'] ?? [] },
  'Passada Reversa': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Passada Reversa'] ?? [] },
  'Step Up Alto': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Step Up Alto'] ?? [] },
  'Ponte Unilateral': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Ponte Unilateral'] ?? [] },
  'Cadeira Adutora': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Cadeira Adutora'] ?? [] },
  'Adutor na Polia': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Adutor na Polia'] ?? [] },
  'Avanco Lateral': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Avanco Lateral'] ?? [] },
  'Deslizamento Lateral': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Deslizamento Lateral'] ?? [] },
  'Panturrilha em Pe': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Panturrilha em Pe'] ?? [] },
  'Panturrilha Sentado': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Panturrilha Sentado'] ?? [] },
  'Panturrilha no Leg Press': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Panturrilha no Leg Press'] ?? [] },
  'Panturrilha Unilateral': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Panturrilha Unilateral'] ?? [] },
  'Donkey Calf Raise': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Donkey Calf Raise'] ?? [] },
  'Panturrilha no Smith': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Panturrilha no Smith'] ?? [] },
  'Barra Fixa': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Barra Fixa'] ?? [] },
  'Puxada Frente': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Puxada Frente'] ?? [] },
  'Puxada Triangulo': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Puxada Triangulo'] ?? [] },
  'Pulldown na Polia': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Pulldown na Polia'] ?? [] },
  'Remada Curvada': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Remada Curvada'] ?? [] },
  'Remada Unilateral': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Remada Unilateral'] ?? [] },
  'Remada Baixa': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Remada Baixa'] ?? [] },
  'Remada Cavalinho': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Remada Cavalinho'] ?? [] },
  'Pullover na Polia': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Pullover na Polia'] ?? [] },
  'Serrote': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Serrote'] ?? [] },
  'Pull Up': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Pull Up'] ?? [] },
  'Chin Up': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Chin Up'] ?? [] },
  'Supino Reto': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Supino Reto'] ?? [] },
  'Supino Inclinado': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Supino Inclinado'] ?? [] },
  'Supino Declinado': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Supino Declinado'] ?? [] },
  'Supino com Halteres': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Supino com Halteres'] ?? [] },
  'Crucifixo': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Crucifixo'] ?? [] },
  'Crucifixo Inclinado': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Crucifixo Inclinado'] ?? [] },
  'Crucifixo no Cabo': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Crucifixo no Cabo'] ?? [] },
  'Crossover': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Crossover'] ?? [] },
  'Peck Deck': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Peck Deck'] ?? [] },
  'Flexao de Bracos': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Flexao de Bracos'] ?? [] },
  'Pullover': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Pullover'] ?? [] },
  'Paralelas para Peito': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Paralelas para Peito'] ?? [] },
  'Desenvolvimento Militar': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Desenvolvimento Militar'] ?? [] },
  'Desenvolvimento com Halteres': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Desenvolvimento com Halteres'] ?? [] },
  'Arnold Press': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Arnold Press'] ?? [] },
  'Elevacao Lateral': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Elevacao Lateral'] ?? [] },
  'Elevacao Frontal': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Elevacao Frontal'] ?? [] },
  'Crucifixo Inverso': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Crucifixo Inverso'] ?? [] },
  'Desenvolvimento no Smith': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Desenvolvimento no Smith'] ?? [] },
  'Elevacao Y': { youtubeUrl: DEFAULT_YOUTUBE_URL, aliases: EXERCISE_ALIASES['Elevacao Y'] ?? [] },
}

const extractYouTubeVideoId = (youtubeUrl: string): string | null => {
  const patterns = [
    /youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
  ]

  for (const pattern of patterns) {
    const match = youtubeUrl.match(pattern)
    if (match?.[1]) {
      return match[1]
    }
  }

  return null
}

const toEmbedUrl = (youtubeUrl: string): string => {
  const videoId = extractYouTubeVideoId(youtubeUrl)
  const safeVideoId = videoId ?? DEFAULT_VIDEO_ID

  return `https://www.youtube.com/embed/${safeVideoId}?rel=0&modestbranding=1&playsinline=1`
}

const toThumbnailUrl = (videoId: string): string => `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`

const createVideoReference = (
  exerciseName: string,
  youtubeUrl: string,
  aliases: string[] = [],
): ExerciseVideoReference => {
  const videoId = extractYouTubeVideoId(youtubeUrl) ?? DEFAULT_VIDEO_ID

  return {
    exerciseName,
    aliases,
    youtubeUrl,
    videoId,
    embedUrl: toEmbedUrl(youtubeUrl),
    thumbnailUrl: toThumbnailUrl(videoId),
  }
}

export const EXERCISE_VIDEO_LIBRARY: ExerciseVideoReference[] = ALL_EXERCISES.map((exerciseName) => {
  const override = EXERCISE_VIDEO_OVERRIDES[exerciseName]

  return createVideoReference(
    exerciseName,
    override?.youtubeUrl ?? DEFAULT_YOUTUBE_URL,
    override?.aliases ?? [],
  )
})

export const createFallbackExerciseVideo = (exerciseName: string): ExerciseVideoReference => {
  return createVideoReference(exerciseName, DEFAULT_YOUTUBE_URL)
}
