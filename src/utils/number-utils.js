import humanInterval from 'human-interval'

export function formatDuration(duration) {
  const seconds = Math.round(humanInterval(duration) / 1000)
  const minutes = Math.floor(seconds / 60)
  const modSeconds = seconds % 60

  return `${minutes
    .toString()
    .padStart(2, '0')}:${modSeconds.toString().padStart(2, '0')}`
}
