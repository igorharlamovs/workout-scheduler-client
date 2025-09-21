/**
 * Converts a duration string "HH:MM:SS" to total seconds.
 * @param {string} duration - duration in format "HH:MM:SS"
 * @returns {number} total seconds
 */
export function durationToSeconds(duration) {
  if (!duration) return 0
  const parts = duration.split(':').map(Number)
  if (parts.length !== 3) return 0
  const [hours, minutes, seconds] = parts
  return hours * 3600 + minutes * 60 + seconds
}

/**
 * Convert seconds into a duration string.
 * @param {number} seconds
 * @param {Object} options
 * @param {boolean} options.clockStyle - If true, outputs "HH:MM:SS". Otherwise, outputs "X hours Y minutes Z seconds"
 * @returns {string}
 */
export function secondsToDuration(seconds, { clockStyle = false } = {}) {
  if (!Number.isFinite(seconds) || seconds < 0) return clockStyle ? '00:00:00' : '0 seconds'

  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60

  if (!clockStyle) {
    const parts = []
    if (h > 0) parts.push(`${h} hour${h !== 1 ? 's' : ''}`)
    if (m > 0) parts.push(`${m} minute${m !== 1 ? 's' : ''}`)
    if (s > 0 || parts.length === 0) parts.push(`${s} second${s !== 1 ? 's' : ''}`)
    return parts.join(' ')
  } else {
    const hh = String(h).padStart(2, '0')
    const mm = String(m).padStart(2, '0')
    const ss = String(s).padStart(2, '0')
    return `${hh}:${mm}:${ss}`
  }
}
