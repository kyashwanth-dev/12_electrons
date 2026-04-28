export const CONDITION_WORKING = 'Working'
export const CONDITION_NOT_WORKING = 'Not Working'
export const CONDITION_DONT_KNOW = "Don't Know"

export function generateComponentId(prefix = 'CMP') {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 7).toUpperCase()
  return `${prefix}-${timestamp}-${random}`
}

export function formatLocalDate() {
  return new Date().toLocaleDateString('en-IN')
}

export function formatLocalTime() {
  return new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' })
}
