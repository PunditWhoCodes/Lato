/**
 * Data Mappers for Trips API
 * Transform API response data to application Tour interface
 */

import type { Tour, TourDetail } from "@/types"
import type { APIUserTrip, APIMarketplaceResponse } from "./trips.types"

/**
 * Helper to generate deterministic rating from UUID
 * Prevents hydration errors by ensuring same rating on server and client
 */
function generateDeterministicRating(uuid: string): number {
  // Use first 8 characters of UUID to generate a consistent hash
  let hash = 0
  const str = uuid.slice(0, 8)
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32-bit integer
  }
  // Map hash to rating between 4.5 and 5.0
  const normalized = Math.abs(hash) % 50 // 0-49
  return 4.5 + (normalized / 100) // 4.5-4.99
}

/**
 * Helper to generate tour images based on destination/country
 * In production, these would come from the API or a CDN
 */
function getTourImage(destination: string, index: number = 0): string {
  // Map destinations to placeholder images
  const imageMap: Record<string, string[]> = {
    US: [
      "https://images.unsplash.com/photo-1501466044931-62695aada8e9",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800",
    ],
    FR: [
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
      "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f",
    ],
    IT: [
      "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9",
      "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b",
    ],
  }

  const images = imageMap[destination] || imageMap.US
  return images[index % images.length] || images[0]
}

/**
 * Helper to determine travel style from trip data
 */
function determineTravelStyle(userTrip: APIUserTrip): string {
  // Logic to determine travel style based on trip data
  // This is a simple implementation; adjust based on actual API data
  const title = userTrip.trip?.titles?.[0]?.content?.toLowerCase() || ""

  if (title.includes("cruise") || title.includes("cruise")) return "Luxury"
  if (title.includes("adventure") || title.includes("hike")) return "Adventure"
  if (title.includes("cultural") || title.includes("heritage")) return "Cultural"
  if (title.includes("family")) return "Family"
  if (title.includes("romantic") || title.includes("honeymoon")) return "Romantic"

  return "Exploration"
}

/**
 * Helper to determine tour type
 */
function determineTourType(userTrip: APIUserTrip): string {
  if (userTrip.group_booking) return "Group Tour"
  if (userTrip.max_travellers && userTrip.max_travellers <= 6) return "Private Tour"
  return "Group Tour"
}

/**
 * Helper to generate tour badges
 */
function generateTourBadges(userTrip: APIUserTrip): string[] {
  const badges: string[] = []

  if (userTrip.trip?.sample) badges.push("Sample")
  if (userTrip.user?.verified) badges.push("Verified Operator")
  // Check for special offers based on fee
  if (userTrip?.price && userTrip?.fee && userTrip.fee > 0) {
    badges.push("Special Offer")
  }
  if (userTrip?.travelapp_visits > 50) badges.push("Popular")
  if (userTrip.user?.company?.plan === "pro") badges.push("Premium Partner")

  return badges
}

/**
 * Helper to extract highlights from trip data
 */
function extractHighlights(userTrip: APIUserTrip): string[] {
  const highlights: string[] = []

  // Add duration as a highlight
  if (userTrip.trip?.nrOfDays) {
    highlights.push(`${userTrip.trip.nrOfDays} days adventure`)
  }

  // Add destination
  if (userTrip.trip?.country) {
    highlights.push(`Explore ${userTrip.trip.country.name}`)
  }

  // Add verified operator
  if (userTrip.user?.verified) {
    highlights.push("Verified tour operator")
  }

  // Add brand-specific highlights if available
  if (userTrip.brand?.description) {
    highlights.push(userTrip.brand.description.slice(0, 50))
  }

  return highlights.slice(0, 4) // Limit to 4 highlights
}

/**
 * Map APIUserTrip to Tour interface
 */
export function mapUserTripToTour(userTrip: APIUserTrip): Tour {
  // Validate input
  if (!userTrip) {
    console.error("mapUserTripToTour: userTrip is undefined or null")
    throw new Error("Invalid user trip data: userTrip is undefined")
  }

  if (!userTrip.id) {
    console.error("mapUserTripToTour: userTrip.id is missing", userTrip)
    throw new Error("Invalid user trip data: ID is missing")
  }

  // Check if this is actually a Trip object instead of UserTrip
  // The API sometimes returns Trip directly instead of UserTrip
  const isTrip = 'client_name' in userTrip || 'tripdays' in userTrip

  if (isTrip) {
    console.warn("Received Trip object instead of UserTrip, creating minimal tour data")
    const tripData = userTrip as any
    const title = tripData.titles?.[0]?.content || "Untitled Tour"
    const country = tripData.country

    return {
      id: parseInt(tripData.id.split("-")[0], 16),
      uuid: tripData.id,
      title,
      company: "Unknown Company",
      companyId: undefined,
      companyCountry: country?.name || "Unknown",
      companyFlag: country?.flagEmoticon || "🌍",
      price: 0,
      originalPrice: undefined,
      rating: generateDeterministicRating(tripData.id),
      reviews: 0,
      duration: tripData.nrOfDays ? `${tripData.nrOfDays} days` : "Multiple days",
      groupSize: "Small Group",
      location: country?.name || "International",
      destination: country?.iso || "INT",
      travelStyle: "Exploration",
      image: getTourImage(country?.iso || "US"),
      badges: tripData.sample ? ["Sample"] : [],
      category: "Exploration",
      difficulty: "Moderate",
      highlights: [],
      tourType: "Group Tour",
    }
  }

  const trip = userTrip.trip
  const title = trip?.titles?.[0]?.content || "Untitled Tour"
  const country = trip?.country

  try {
    return {
      id: parseInt(userTrip.id.split("-")[0], 16), // Convert UUID to number for compatibility
      uuid: userTrip.id, // Preserve original UUID for API calls
      title,
      company: userTrip?.user?.company?.name || userTrip?.user?.name || "Unknown Company",
      companyId: userTrip?.user?.companyId,
      companyCountry: country?.name || "Unknown",
      companyFlag: country?.flagEmoticon || "🌍",
      price: userTrip?.price || 0,
      originalPrice: userTrip?.price && userTrip?.fee ? userTrip.price + userTrip.fee : undefined,
      rating: generateDeterministicRating(userTrip.id), // Deterministic rating based on UUID
      reviews: userTrip?.travelapp_visits || 0, // Using visits as a proxy for reviews
      duration: trip?.nrOfDays ? `${trip.nrOfDays} days` : "Multiple days",
      groupSize: userTrip.max_travellers
        ? `Up to ${userTrip.max_travellers} people`
        : userTrip.group_booking
          ? "Group"
          : "Small Group",
      location: country?.name || "International",
      destination: country?.iso || "INT",
      travelStyle: determineTravelStyle(userTrip),
      image: getTourImage(country?.iso || "US"),
      badges: generateTourBadges(userTrip),
      category: determineTravelStyle(userTrip),
      difficulty: "Moderate", // Default difficulty
      highlights: extractHighlights(userTrip),
      tourType: determineTourType(userTrip),
    }
  } catch (error) {
    console.error("Error in mapUserTripToTour:", error, { userTrip })
    throw new Error(`Failed to map user trip: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

/**
 * Map multiple APIUserTrips to Tour array
 */
export function mapUserTripsToTours(userTrips: APIUserTrip[]): Tour[] {
  return userTrips.map(mapUserTripToTour)
}

/**
 * Map APIMarketplaceResponse to Tour array
 */
export function mapMarketplaceResponseToTours(response: APIMarketplaceResponse): Tour[] {
  return mapUserTripsToTours(response.data)
}

/**
 * Map APIUserTrip to TourDetail interface
 * Used for individual tour detail pages
 */
export function mapUserTripToTourDetail(userTrip: APIUserTrip): Partial<TourDetail> {
  const baseTour = mapUserTripToTour(userTrip)
  const user = userTrip.user

  return {
    ...baseTour,
    company: {
      name: user.company?.name || user.name,
      id: user.companyId,
      avatar: user.avatarUrl || user.avatar?.key || "",
      rating: generateDeterministicRating(userTrip.id),
      reviews: userTrip.travelapp_visits,
      verified: user.verified,
      responseTime: "Within 24 hours",
      country: userTrip.trip?.country?.name || "Unknown",
      countryFlag: userTrip.trip?.country?.flagEmoticon || "🌍",
    },
    reviewCount: userTrip.travelapp_visits,
    languages: ["English"], // Default language
    description: userTrip.brand?.description || userTrip.trip?.titles?.[0]?.content || "",
    included: [
      "Professional guide",
      "All activities as described",
      "Travel insurance",
    ],
    notIncluded: [
      "Personal expenses",
      "Gratuities",
      "International flights",
    ],
    itinerary: [], // Would need additional API data for detailed itinerary
    reviews: [], // Would need additional API endpoint for reviews
    relatedTours: [], // Would need additional API endpoint for related tours
    images: [
      getTourImage(userTrip.trip?.country?.iso || "US", 0),
      getTourImage(userTrip.trip?.country?.iso || "US", 1),
      getTourImage(userTrip.trip?.country?.iso || "US", 2),
    ],
  }
}

/**
 * Helper to filter and transform marketplace data with additional filters
 */
export function transformAndFilterTrips(
  response: APIMarketplaceResponse,
  filters?: {
    minPrice?: number
    maxPrice?: number
    travelStyles?: string[]
    destinations?: string[]
  }
): Tour[] {
  let tours = mapMarketplaceResponseToTours(response)

  if (filters) {
    // Apply price filter
    if (filters.minPrice !== undefined) {
      tours = tours.filter((tour) => tour.price >= filters.minPrice!)
    }
    if (filters.maxPrice !== undefined) {
      tours = tours.filter((tour) => tour.price <= filters.maxPrice!)
    }

    // Apply travel style filter
    if (filters.travelStyles && filters.travelStyles.length > 0) {
      tours = tours.filter((tour) =>
        filters.travelStyles!.includes(tour.travelStyle)
      )
    }

    // Apply destination filter
    if (filters.destinations && filters.destinations.length > 0) {
      tours = tours.filter((tour) =>
        filters.destinations!.includes(tour.destination)
      )
    }
  }

  return tours
}
