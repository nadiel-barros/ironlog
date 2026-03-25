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
const DEFAULT_YOUTUBE_URL02 = 'https://www.youtube.com/shorts/hlV6f0kHmeo'
const DEFAULT_VIDEO_ID = 'UHa9U-O09_U'

const EXERCISE_VIDEO_OVERRIDES: Record<string, ExerciseVideoOverride> = {
  'Supino Reto': { aliases: ['Bench Press'] },
  'Supino Inclinado': {
    youtubeUrl: DEFAULT_YOUTUBE_URL02,
    aliases: ['Incline Bench Press'],
  },
  'Triceps Pulley': { aliases: ['Triceps Pushdown'] },
  'Mergulho Triceps': { aliases: ['Bench Dips', 'Dips'] },
  'Barra Fixa': { aliases: ['Pull Up'] },
  'Remada Curvada': { aliases: ['Bent Over Row'] },
  'Rosca Direta': { aliases: ['Barbell Curl'] },
  'Rosca Alternada': { aliases: ['Alternating Dumbbell Curl'] },
  'Leg Press 45': { aliases: ['Leg Press 45 graus'] },
  Stiff: { aliases: ['Levantamento stiff'] },
  Extensora: { aliases: ['Cadeira Extensora'] },
  'Cadeira Flexora': { aliases: ['Mesa Flexora'] },
  'Levantamento Terra Romeno': { aliases: ['Romanian Deadlift'] },
  'Elevacao Y': { aliases: ['Elevacao Y Raise'] },
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
