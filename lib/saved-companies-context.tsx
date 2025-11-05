"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from "react"

interface SavedCompaniesContextType {
  savedCompanies: string[]
  toggleSaveCompany: (companyId: string) => void
  isCompanySaved: (companyId: string) => boolean
  savedCompaniesCount: number
}

const SavedCompaniesContext = createContext<SavedCompaniesContextType | undefined>(undefined)

const STORAGE_KEY = "lato_saved_companies"

export function SavedCompaniesProvider({ children }: { children: React.ReactNode }) {
  const [savedCompanies, setSavedCompanies] = useState<string[]>([])
  const [isHydrated, setIsHydrated] = useState(false)

  // Load saved companies from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        setSavedCompanies(Array.isArray(parsed) ? parsed : [])
      }
    } catch (error) {
      console.error("Failed to load saved companies:", error)
    } finally {
      setIsHydrated(true)
    }
  }, [])

  // Save to localStorage whenever savedCompanies changes
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(savedCompanies))
      } catch (error) {
        console.error("Failed to save companies:", error)
      }
    }
  }, [savedCompanies, isHydrated])

  const toggleSaveCompany = useCallback((companyId: string) => {
    setSavedCompanies((prev) => {
      if (prev.includes(companyId)) {
        return prev.filter((id) => id !== companyId)
      }
      return [...prev, companyId]
    })
  }, [])

  const isCompanySaved = useCallback(
    (companyId: string) => {
      return savedCompanies.includes(companyId)
    },
    [savedCompanies]
  )

  const value = {
    savedCompanies,
    toggleSaveCompany,
    isCompanySaved,
    savedCompaniesCount: savedCompanies.length,
  }

  return <SavedCompaniesContext.Provider value={value}>{children}</SavedCompaniesContext.Provider>
}

export function useSavedCompanies() {
  const context = useContext(SavedCompaniesContext)
  if (context === undefined) {
    throw new Error("useSavedCompanies must be used within a SavedCompaniesProvider")
  }
  return context
}
