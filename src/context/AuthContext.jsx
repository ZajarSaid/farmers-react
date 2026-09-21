/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import {
  farmersStore,
  getSession,
  setSession,
  clearSession,
} from '../services/storage.js'
import { generateId } from '../services/storage.js'
import { hashPassword, generateSalt, verifyPassword } from '../utils/auth.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [currentUserId, setCurrentUserId] = useState(() => getSession())
  const [version, setVersion] = useState(0)

  const login = useCallback((email, password) => {
    const farmers = farmersStore.getAll()
    const farmer = farmers.find(
      (item) => item.email && item.email.toLowerCase() === email.trim().toLowerCase(),
    )
    if (!farmer || !verifyPassword(password, farmer.passwordSalt, farmer.passwordHash)) {
      return { ok: false, error: "There's an error logging in. Check your email and password." }
    }
    setSession(farmer.id)
    setCurrentUserId(farmer.id)
    return { ok: true, farmer }
  }, [])

  const register = useCallback((values) => {
    const farmers = farmersStore.getAll()

    if (!values.username || values.username.trim().length === 0) {
      return { ok: false, error: 'A username is required.' }
    }
    if (!/^[a-zA-Z0-9._]+$/.test(values.username)) {
      return { ok: false, error: 'Username should only contain letters, numbers, dots and underscores.' }
    }
    if (farmers.some((f) => f.username.toLowerCase() === values.username.trim().toLowerCase())) {
      return { ok: false, error: 'This username is already taken, choose another one.' }
    }
    if (!values.firstName || !values.lastName) {
      return { ok: false, error: 'First and last name are required.' }
    }
    if (farmers.some((f) => f.email && f.email.toLowerCase() === values.email.trim().toLowerCase())) {
      return { ok: false, error: 'This email is already taken, choose another one.' }
    }
    if (!values.password || values.password.length < 6) {
      return { ok: false, error: 'Your password is too short, it must be at least 6 characters.' }
    }

    const salt = generateSalt()
    const farmer = {
      id: generateId('farmer'),
      username: values.username.trim(),
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      email: values.email.trim(),
      phone: values.phone.trim() || '+255',
      address: values.address.trim(),
      image: null,
      status: 'MediumFarmer',
      isAdmin: false,
      dateJoined: new Date().toISOString().slice(0, 10),
      passwordSalt: salt,
      passwordHash: hashPassword(values.password, salt),
    }
    farmersStore.add(farmer)
    return { ok: true, farmer }
  }, [])

  const updateUser = useCallback((id, changes) => {
    const updated = farmersStore.update(id, changes)
    if (updated) {
      setVersion((value) => value + 1)
    }
    return updated
  }, [])

  const changePassword = useCallback((id, currentPassword, newPassword) => {
    const farmer = farmersStore.getById(id)
    if (!farmer || !verifyPassword(currentPassword, farmer.passwordSalt, farmer.passwordHash)) {
      return { ok: false, error: 'Your current password is incorrect.' }
    }
    if (!newPassword || newPassword.length < 6) {
      return { ok: false, error: 'Your new password is too short, it must be at least 6 characters.' }
    }
    const salt = generateSalt()
    farmersStore.update(id, {
      passwordSalt: salt,
      passwordHash: hashPassword(newPassword, salt),
    })
    setVersion((value) => value + 1)
    return { ok: true }
  }, [])

  const logout = useCallback(() => {
    clearSession()
    setCurrentUserId(null)
  }, [])

  const value = useMemo(() => {
    const currentUser = currentUserId ? farmersStore.getById(currentUserId) : null
    void version
    return {
      currentUser,
      isAuthenticated: Boolean(currentUser),
      isAdmin: Boolean(currentUser?.isAdmin),
      login,
      register,
      updateUser,
      changePassword,
      logout,
    }
  }, [currentUserId, version, login, register, updateUser, changePassword, logout])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}