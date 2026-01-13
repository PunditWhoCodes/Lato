"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from "react"
import type { Tour } from "@/types"

// Minimal tour data we need to store for wishlist display
interface SavedTourData {
  id: number
  uuid?: string
  title: string
  company: string
  companyId: string
  companyCountry: string
  companyFlag: string
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  duration: string
  groupSize: string
  location: string
  destination: string
  travelStyle: string
  image: string
  badges: string[]
  category: string
  difficulty: string
  highlights: string[]
  tourType: string
}

interface SavedToursContextType {
  savedTours: string[] // Array of tour IDs for quick lookup
  savedToursData: SavedTourData[] // Full tour data for display
  toggleSaveTour: (tourId: string, tourData?: Tour | SavedTourData) => void
  isTourSaved: (tourId: string) => boolean
  savedToursCount: number
  cleanupStaleTours: (validTourIds: string[]) => void
}

const SavedToursContext = createContext<SavedToursContextType | undefined>(undefined)

const STORAGE_KEY = "lato_saved_tours"
const STORAGE_KEY_DATA = "lato_saved_tours_data"

// Helper to migrate old numeric IDs to strings
function migrateToStringIds(data: unknown): string[] {
  if (!Array.isArray(data)) return []
  return data.map((id) => String(id))
}

// Helper to get tour identifier
function getTourIdentifier(tour: Tour | SavedTourData): string {
  return tour.uuid || tour.id.toString()
}

export function SavedToursProvider({ children }: { children: React.ReactNode }) {
  const [savedTours, setSavedTours] = useState<string[]>([])
  const [savedToursData, setSavedToursData] = useState<SavedTourData[]>([])
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    try {
      // Load saved tour IDs
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        const migratedTours = migrateToStringIds(parsed)
        setSavedTours(migratedTours)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(migratedTours))
      }

      // Load saved tour data
      const storedData = localStorage.getItem(STORAGE_KEY_DATA)
      if (storedData) {
        const parsedData = JSON.parse(storedData)
        if (Array.isArray(parsedData)) {
          setSavedToursData(parsedData)
        }
      }
    } catch (error) {
      console.error("Failed to load saved tours:", error)
    } finally {
      setIsHydrated(true)
    }
  }, [])

  // Sync savedTours IDs to localStorage
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(savedTours))
      } catch (error) {
        console.error("Failed to save tour IDs:", error)
      }
    }
  }, [savedTours, isHydrated])

  // Sync savedToursData to localStorage
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(savedToursData))
      } catch (error) {
        console.error("Failed to save tour data:", error)
      }
    }
  }, [savedToursData, isHydrated])

  const toggleSaveTour = useCallback((tourId: string, tourData?: Tour | SavedTourData) => {
    setSavedTours((prev) => {
      const isCurrentlySaved = prev.includes(tourId)

      if (isCurrentlySaved) {
        // Remove from saved tours
        setSavedToursData((prevData) =>
          prevData.filter((tour) => getTourIdentifier(tour) !== tourId)
        )
        return prev.filter((id) => id !== tourId)
      } else {
        // Add to saved tours
        if (tourData) {
          const dataToSave: SavedTourData = {
            id: tourData.id,
            uuid: tourData.uuid,
            title: tourData.title,
            company: tourData.company,
            companyId: tourData.companyId,
            companyCountry: tourData.companyCountry,
            companyFlag: tourData.companyFlag,
            price: tourData.price,
            originalPrice: tourData.originalPrice,
            rating: tourData.rating,
            reviews: tourData.reviews,
            duration: tourData.duration,
            groupSize: tourData.groupSize,
            location: tourData.location,
            destination: tourData.destination,
            travelStyle: tourData.travelStyle,
            image: tourData.image,
            badges: tourData.badges || [],
            category: tourData.category,
            difficulty: tourData.difficulty,
            highlights: tourData.highlights || [],
            tourType: tourData.tourType,
          }
          setSavedToursData((prevData) => {
            // Avoid duplicates
            const exists = prevData.some((t) => getTourIdentifier(t) === tourId)
            if (exists) return prevData
            return [...prevData, dataToSave]
          })
        }
        return [...prev, tourId]
      }
    })
  }, [])

  const isTourSaved = useCallback(
    (tourId: string) => {
      return savedTours.includes(tourId)
    },
    [savedTours]
  )

  // Cleanup stale tour IDs that no longer exist in the available tours
  const cleanupStaleTours = useCallback((validTourIds: string[]) => {
    setSavedTours((prev) => {
      const validSet = new Set(validTourIds)
      const cleaned = prev.filter((id) => validSet.has(id))
      if (cleaned.length !== prev.length) {
        // Also clean up the tour data
        setSavedToursData((prevData) =>
          prevData.filter((tour) => validSet.has(getTourIdentifier(tour)))
        )
        return cleaned
      }
      return prev
    })
  }, [])

  const value = {
    savedTours,
    savedToursData,
    toggleSaveTour,
    isTourSaved,
    savedToursCount: savedTours.length,
    cleanupStaleTours,
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
