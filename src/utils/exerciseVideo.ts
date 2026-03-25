import {
  EXERCISE_VIDEO_LIBRARY,
  createFallbackExerciseVideo,
  type ExerciseVideoReference,
} from '../data/exerciseVideos'

const normalizeExerciseName = (value: string): string =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const videoLookup = new Map<string, ExerciseVideoReference>()

for (const video of EXERCISE_VIDEO_LIBRARY) {
  const keys = [video.exerciseName, ...video.aliases]

  for (const key of keys) {
    videoLookup.set(normalizeExerciseName(key), video)
  }
}

export const getExerciseVideoByName = (exerciseName: string): ExerciseVideoReference => {
  const normalizedName = normalizeExerciseName(exerciseName)

  const exact = videoLookup.get(normalizedName)
  if (exact) {
    return exact
  }

  for (const [key, video] of videoLookup.entries()) {
    if (normalizedName.includes(key) || key.includes(normalizedName)) {
      return video
    }
  }

  return createFallbackExerciseVideo(exerciseName)
}
