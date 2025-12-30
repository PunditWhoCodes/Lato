"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from "react"

interface SavedToursContextType {
  savedTours: string[]
  toggleSaveTour: (tourId: string) => void
  isTourSaved: (tourId: string) => boolean
  savedToursCount: number
}

const SavedToursContext = createContext<SavedToursContextType | undefined>(undefined)

const STORAGE_KEY = "lato_saved_tours"

// Helper to migrate old numeric IDs to strings
function migrateToStringIds(data: unknown): string[] {
  if (!Array.isArray(data)) return []
  return data.map((id) => String(id))
}

export function SavedToursProvider({ children }: { children: React.ReactNode }) {
  const [savedTours, setSavedTours] = useState<string[]>([])
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        // Migrate any old numeric IDs to strings
        const migratedTours = migrateToStringIds(parsed)
        setSavedTours(migratedTours)
        // Save back migrated data if it was different
        localStorage.setItem(STORAGE_KEY, JSON.stringify(migratedTours))
      }
      // If no stored data, keep empty array (user starts fresh)
    } catch (error) {
      console.error("Failed to load saved tours:", error)
      // On error, keep empty array
    } finally {
      setIsHydrated(true)
    }
  }, [])

  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(savedTours))
      } catch (error) {
        console.error("Failed to save tours:", error)
      }
    }
  }, [savedTours, isHydrated])

  const toggleSaveTour = useCallback((tourId: string) => {
    setSavedTours((prev) => {
      if (prev.includes(tourId)) {
        return prev.filter((id) => id !== tourId)
      }
      return [...prev, tourId]
    })
  }, [])

  const isTourSaved = useCallback(
    (tourId: string) => {
      return savedTours.includes(tourId)
    },
    [savedTours]
  )

  const value = {
    savedTours,
    toggleSaveTour,
    isTourSaved,
    savedToursCount: savedTours.length,
  }

  return <SavedToursContext.Provider value={value}>{children}</SavedToursContext.Provider>
}

export function useSavedTours() {
  const context = useContext(SavedToursContext)
  if (context === undefined) {
    throw new Error("useSavedTours must be used within a SavedToursProvider")
  }
  return context
}
