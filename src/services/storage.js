import buildSeedData from '../data/seedData.js'
import { hashPassword } from '../utils/auth.js'

const PREFIX = 'farmersRegistry'
const SEED_VERSION = 'v2'

const KEYS = {
  initialized: `${PREFIX}.seed.${SEED_VERSION}`,
  session: `${PREFIX}.session`,
  regions: `${PREFIX}.regions`,
  districts: `${PREFIX}.districts`,
  crops: `${PREFIX}.crops`,
  farmers: `${PREFIX}.farmers`,
  farms: `${PREFIX}.farms`,
  regionalPrices: `${PREFIX}.regionalPrices`,
  outputVerifications: `${PREFIX}.outputVerifications`,
}

function safeParse(raw, fallback) {
  if (raw === null || raw === undefined || raw === '') {
    return fallback
  }
  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : fallback
  } catch {
    return fallback
  }
}

function readCollection(key, fallback = []) {
  try {
    return safeParse(window.localStorage.getItem(key), fallback)
  } catch {
    return fallback
  }
}

function writeCollection(key, items) {
  try {
    window.localStorage.setItem(key, JSON.stringify(items))
    return true
  } catch {
    return false
  }
}

export function initializeStorage() {
  try {
    const alreadyInitialized = window.localStorage.getItem(KEYS.initialized) === 'true'
    if (!alreadyInitialized) {
      const seed = buildSeedData()
      Object.entries(seed).forEach(([collectionName, items]) => {
        writeCollection(KEYS[collectionName], items)
      })
      window.localStorage.setItem(KEYS.initialized, 'true')
    }
    ensureAdminAccount()
  } catch {
    // localStorage is unavailable or full; the app will operate with empty in-memory data.
  }
}

const ADMIN_ACCOUNT = {
  id: 'farmer-admin-zakaria',
  username: 'Admin',
  firstName: 'Zakaria',
  lastName: 'Administrator',
  email: 'admin@gmail.com',
  password: 'admin123',
  salt: 'seed-farmer-admin-zakaria',
}

function ensureAdminAccount() {
  const farmers = farmersStore.getAll()
  const adminEmail = ADMIN_ACCOUNT.email.toLowerCase()
  const existing = farmers.find(
    (farmer) => farmer.email && farmer.email.toLowerCase() === adminEmail,
  )

  if (existing) {
    if (!existing.isAdmin || existing.username !== ADMIN_ACCOUNT.username) {
      writeCollection(
        KEYS.farmers,
        farmers.map((farmer) =>
          farmer.email && farmer.email.toLowerCase() === adminEmail
            ? { ...farmer, username: ADMIN_ACCOUNT.username, isAdmin: true }
            : farmer,
        ),
      )
    }
    return
  }

  const previousAdminIndex = farmers.findIndex(
    (farmer) =>
      farmer.email &&
      ['zaj@email.com', 'admin@farmers.gov.tz'].includes(farmer.email.toLowerCase()),
  )
  const previousAdmin = previousAdminIndex === -1 ? null : farmers[previousAdminIndex]

  const admin = {
    id: previousAdmin ? previousAdmin.id : ADMIN_ACCOUNT.id,
    username: ADMIN_ACCOUNT.username,
    firstName: ADMIN_ACCOUNT.firstName,
    lastName: ADMIN_ACCOUNT.lastName,
    email: ADMIN_ACCOUNT.email,
    phone: previousAdmin?.phone || '+255 700 000 000',
    address: previousAdmin?.address || 'Dar es Salaam, Tanzania',
    image: previousAdmin?.image ?? null,
    status: 'Advancedfarmer',
    isAdmin: true,
    dateJoined: previousAdmin?.dateJoined || '2024-01-01',
    passwordSalt: ADMIN_ACCOUNT.salt,
    passwordHash: hashPassword(ADMIN_ACCOUNT.password, ADMIN_ACCOUNT.salt),
  }

  if (previousAdmin) {
    farmers[previousAdminIndex] = admin
  } else {
    farmers.push(admin)
  }
  writeCollection(KEYS.farmers, farmers)
}

export function generateId(prefix) {
  const randomPart = Math.random().toString(36).slice(2, 8)
  const timePart = Date.now().toString(36)
  return `${prefix}-${timePart}-${randomPart}`
}

function makeCrud(key, idField = 'id') {
  return {
    getAll() {
      return readCollection(key)
    },
    getById(id) {
      return readCollection(key).find((item) => item[idField] === id) || null
    },
    add(item) {
      const items = readCollection(key)
      items.push(item)
      writeCollection(key, items)
      return item
    },
    update(id, changes) {
      const items = readCollection(key)
      const index = items.findIndex((item) => item[idField] === id)
      if (index === -1) {
        return null
      }
      items[index] = { ...items[index], ...changes }
      writeCollection(key, items)
      return items[index]
    },
    delete(id) {
      const items = readCollection(key)
      const remaining = items.filter((item) => item[idField] !== id)
      writeCollection(key, remaining)
    },
  }
}

export const regionsStore = makeCrud(KEYS.regions)
export const districtsStore = makeCrud(KEYS.districts)
export const cropsStore = makeCrud(KEYS.crops)
export const farmersStore = makeCrud(KEYS.farmers)
export const farmsStore = makeCrud(KEYS.farms)
export const regionalPricesStore = makeCrud(KEYS.regionalPrices)
export const outputVerificationsStore = makeCrud(KEYS.outputVerifications)

export function setSession(userId) {
  try {
    window.localStorage.setItem(KEYS.session, JSON.stringify({ userId }))
  } catch {
    // localStorage unavailable; session simply will not persist.
  }
}

export function getSession() {
  try {
    const raw = window.localStorage.getItem(KEYS.session)
    if (!raw) {
      return null
    }
    const parsed = JSON.parse(raw)
    return parsed && parsed.userId ? parsed.userId : null
  } catch {
    return null
  }
}

export function clearSession() {
  try {
    window.localStorage.removeItem(KEYS.session)
  } catch {
    // ignore
  }
}

export function loadAllCollections() {
  return {
    regions: regionsStore.getAll(),
    districts: districtsStore.getAll(),
    crops: cropsStore.getAll(),
    farmers: farmersStore.getAll(),
    farms: farmsStore.getAll(),
    regionalPrices: regionalPricesStore.getAll(),
    outputVerifications: outputVerificationsStore.getAll(),
  }
}