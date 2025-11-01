"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from "react"

interface SavedToursContextType {
  savedTours: number[]
  toggleSaveTour: (tourId: number) => void
  isTourSaved: (tourId: number) => boolean
  savedToursCount: number
}

const SavedToursContext = createContext<SavedToursContextType | undefined>(undefined)

const STORAGE_KEY = "lato_saved_tours"

export function SavedToursProvider({ children }: { children: React.ReactNode }) {
  const [savedTours, setSavedTours] = useState<number[]>([])
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        setSavedTours(Array.isArray(parsed) ? parsed : [])
      }
    } catch (error) {
      console.error("Failed to load saved tours:", error)
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

  const toggleSaveTour = useCallback((tourId: number) => {
    setSavedTours((prev) => {
      if (prev.includes(tourId)) {
        return prev.filter((id) => id !== tourId)
      }
      return [...prev, tourId]
    })
  }, [])

  const isTourSaved = useCallback(
    (tourId: number) => {
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
