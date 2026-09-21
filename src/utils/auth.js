export function generateSalt() {
  return `salt-${Math.random().toString(36).slice(2, 10)}-${Date.now().toString(36)}`
}

export function hashPassword(password, salt) {
  let hash = 5381
  const input = `${salt}:${password}`
  for (let i = 0; i < input.length; i++) {
    hash = ((hash << 5) + hash + input.charCodeAt(i)) >>> 0
  }
  return hash.toString(16)
}

export function verifyPassword(password, salt, expectedHash) {
  if (!expectedHash) {
    return false
  }
  return hashPassword(password, salt) === expectedHash
}

export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export function isValidPhone(value) {
  return /^\+?[0-9\s-]{7,15}$/.test(value)
}