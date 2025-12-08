"use client"

import { useMemo } from "react"
import type { APICountry } from "../api/trips.types"
import { useMarketplaceTrips } from "../api"

export interface CountryOption {
  iso: string
  name: string
  flagEmoticon: string
  flagImage: string
  continent: string
  tripCount: number
}

interface UseCountriesReturn {
  countries: CountryOption[]
  isLoading: boolean
  isError: boolean
  error: Error | null
}

export function useCountries(): UseCountriesReturn {
  const {
    data,
    isLoading,
    isError,
    error,
  } = useMarketplaceTrips(
    {
      page: 1,
      step: 100,
      sample: true,
    },
    {
      staleTime: 30 * 60 * 1000,
    }
  )

  const countries = useMemo(() => {
    if (!data?.data) return []

    const countryMap = new Map<string, CountryOption>()

    data.data.forEach((userTrip) => {
      const country = userTrip.trip?.country
      if (country) {
        const existing = countryMap.get(country.iso)
        if (existing) {
          existing.tripCount++
        } else {
          countryMap.set(country.iso, {
            iso: country.iso,
            name: country.name,
            flagEmoticon: country.flagEmoticon,
            flagImage: country.flagImage,
            continent: country.continent,
            tripCount: 1,
          })
        }
      }
    })

    return Array.from(countryMap.values()).sort((a, b) => b.tripCount - a.tripCount)
  }, [data])

  return {
    countries,
    isLoading,
    isError,
    error: error as Error | null,
  }
}
