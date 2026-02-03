/**
 * Data Mappers for Trips API
 * Transform API response data to application Tour interface
 */

// ============================================
// Reviewable Location Types and Extraction
// ============================================

/**
 * Represents a location that can be reviewed via Google Places API
 */
export interface ReviewableLocation {
  name: string
  lat: number
  lng: number
  type: 'destination' | 'accommodation' | 'activity'
}

import type {
  Tour,
  TourDetail,
  ItineraryDay,
  Accommodation,
  TourActivity,
  Transportation,
  LocationCoordinates
} from "@/types"
import type {
  APIUserTrip,
  APIMarketplaceResponse,
  APITripDetailResponse,
  APITripday,
  APIHotel,
  APIEvent,
  APITransportation,
  APITranslation,
  APILocation,
  APIImage,
  APILibraryImageRelation
} from "./trips.types"

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
      companyId: "",
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

// ============================================
// Enhanced Mappers for Full Trip Detail Response
// ============================================

/**
 * Get content in preferred language (English first, fallback to first available)
 */
function getTranslatedContent(
  translations: APITranslation[] | undefined,
  preferredLang: string = 'en'
): string {
  if (!translations || translations.length === 0) return ''

  // Try preferred language first
  const preferred = translations.find(t => t.language_code === preferredLang)
  if (preferred?.content) return preferred.content

  // Fallback to first available
  return translations[0]?.content || ''
}

/**
 * Map API Location to LocationCoordinates
 */
function mapLocation(location: APILocation | undefined | null): LocationCoordinates {
  if (!location) {
    return {
      name: 'Unknown',
      coordinates: [0, 0]
    }
  }

  return {
    id: location.id,
    name: location.name,
    coordinates: location.coordinates || [0, 0],
    address: location.address
  }
}

const VIDEO_EXTENSIONS = /\.(mp4|webm|ogg|mov|avi|mkv)(\?|$)/i

function isImageUrl(url: string): boolean {
  return !VIDEO_EXTENSIONS.test(url)
}

/**
 * Extract image URLs from API images or library image relations
 */
function extractImageUrls(
  images: APIImage[] | undefined,
  libraryRelations: APILibraryImageRelation[] | undefined
): string[] {
  const urls: string[] = []

  if (images && images.length > 0) {
    images.forEach(img => {
      const url = img.url || img.originUrl
      if (url && isImageUrl(url)) urls.push(url)
    })
  }

  if (libraryRelations && libraryRelations.length > 0) {
    libraryRelations
      .sort((a, b) => a.ord - b.ord)
      .forEach(rel => {
        const url = rel.libraryImage?.url || rel.libraryImage?.originUrl
        if (url && isImageUrl(url)) urls.push(url)
      })
  }

  return urls
}

/**
 * Map API Hotel to Accommodation
 */
function mapHotelToAccommodation(hotel: APIHotel): Accommodation {
  return {
    id: hotel.id,
    name: hotel.name,
    rating: hotel.rating || 0,
    type: hotel.accommodationType || 'Hotel',
    images: extractImageUrls(hotel.images, hotel.libraryImageRelations),
    nights: hotel.nrOfNights || 1,
    checkInDay: hotel.checkInDayNumber || 1,
    location: mapLocation(hotel.location),
    board: hotel.board || undefined,
    website: hotel.website || undefined,
    email: hotel.primaryEmail || undefined,
    phone: hotel.phoneNumber || undefined,
    description: getTranslatedContent(hotel.descriptions)
  }
}

/**
 * Map API Event to TourActivity
 */
function mapEventToActivity(event: APIEvent, dayNumber?: number): TourActivity {
  return {
    id: event.id,
    title: getTranslatedContent(event.titles) || event.name || 'Activity',
    description: getTranslatedContent(event.descriptions),
    time: event.time,
    endTime: event.endTime,
    isOptional: event.isOptional,
    location: mapLocation(event.location),
    images: extractImageUrls(event.images, event.libraryImageRelations),
    dayNumber
  }
}

/**
 * Map API Transportation to Transportation
 */
function mapTransportation(transport: APITransportation): Transportation {
  return {
    id: transport.id,
    title: getTranslatedContent(transport.titles) || 'Transportation',
    description: getTranslatedContent(transport.descriptions),
    type: transport.type || 'transfer',
    carrier: transport.carrier || undefined,
    departureTime: transport.departure_time || transport.departureDate || undefined,
    arrivalTime: transport.arrival_time || transport.arrivalDate || undefined,
    duration: transport.duration || transport.flightDurationInMinutes || undefined,
    fromLocation: transport.from_location ? mapLocation(transport.from_location) : undefined,
    toLocation: transport.to_location ? mapLocation(transport.to_location) : undefined,
    images: extractImageUrls(transport.images, transport.libraryImageRelations)
  }
}

/**
 * Map API Tripday to ItineraryDay
 */
function mapTripdayToItineraryDay(tripday: APITripday): ItineraryDay {
  // Get day title from tripday titles or destination
  const title = getTranslatedContent(tripday.titles) ||
    tripday.destination?.location?.name ||
    tripday.location?.name ||
    `Day ${tripday.dayNumber}`

  // Get description from destination
  const description = tripday.destination
    ? getTranslatedContent(tripday.destination.descriptions)
    : ''

  // Get day image - priority: tripday image > destination images > placeholder
  let image = ''
  if (tripday.image?.url) {
    image = tripday.image.url
  } else if (tripday.destination?.images?.[0]?.url) {
    image = tripday.destination.images[0].url
  }

  // Map hotels for this day
  const accommodation = tripday.hotels?.[0]
    ? mapHotelToAccommodation(tripday.hotels[0])
    : undefined

  // Map activities/events for this day
  const activities = (tripday.events || []).map(event =>
    mapEventToActivity(event, tripday.dayNumber)
  )

  // Map transportations for this day
  const transportations = (tripday.transportations || []).map(mapTransportation)

  return {
    dayNumber: tripday.dayNumber,
    tripdayIndex: tripday.tripdayIndex,
    title,
    description,
    location: mapLocation(tripday.location),
    image,
    nrOfNights: tripday.nrOfNights || 0,
    accommodation,
    activities,
    transportations
  }
}

/**
 * Extract all images from the full trip detail response
 */
export function extractAllTripImages(tripDetail: APITripDetailResponse): string[] {
  const images: string[] = []

  tripDetail.tripdays?.forEach(tripday => {
    if (tripday.image?.url && isImageUrl(tripday.image.url)) {
      images.push(tripday.image.url)
    }

    if (tripday.destination?.images) {
      tripday.destination.images.forEach(img => {
        if (img.url && isImageUrl(img.url)) images.push(img.url)
      })
    }

    tripday.hotels?.forEach(hotel => {
      hotel.images?.forEach(img => {
        if (img.url && isImageUrl(img.url)) images.push(img.url)
      })
    })

    tripday.events?.forEach(event => {
      extractImageUrls(event.images, event.libraryImageRelations).forEach(url => {
        images.push(url)
      })
    })
  })

  return [...new Set(images)]
}

/**
 * Extract all accommodations from the full trip detail response
 */
export function extractAllAccommodations(tripDetail: APITripDetailResponse): Accommodation[] {
  const accommodations: Accommodation[] = []
  const seenIds = new Set<string>()

  tripDetail.tripdays?.forEach(tripday => {
    tripday.hotels?.forEach(hotel => {
      if (!seenIds.has(hotel.id)) {
        seenIds.add(hotel.id)
        accommodations.push(mapHotelToAccommodation(hotel))
      }
    })
  })

  return accommodations
}

/**
 * Extract all activities from the full trip detail response
 */
export function extractAllActivities(tripDetail: APITripDetailResponse): TourActivity[] {
  const activities: TourActivity[] = []

  tripDetail.tripdays?.forEach(tripday => {
    tripday.events?.forEach(event => {
      activities.push(mapEventToActivity(event, tripday.dayNumber))
    })
  })

  return activities
}

/**
 * Extract unique languages from translations
 */
function extractLanguages(tripDetail: APITripDetailResponse): string[] {
  const languages = new Set<string>()

  // Check titles for available languages
  tripDetail.titles?.forEach(t => {
    if (t.language?.name) languages.add(t.language.name)
  })

  // Check descriptions
  tripDetail.descriptions?.forEach(t => {
    if (t.language?.name) languages.add(t.language.name)
  })

  // Default to English if no languages found
  if (languages.size === 0) languages.add('English')

  return Array.from(languages)
}

/**
 * Map full APITripDetailResponse to TourDetail
 * This is the main mapper for the tour detail page
 */
export function mapTripDetailResponseToTourDetail(
  response: APITripDetailResponse
): TourDetail {
  // Get the first userTrip for pricing and user info
  const userTrip = response.userTrips?.[0]
  const user = userTrip?.user

  const userTripUuid = userTrip?.id || response.id

  // Get title and description
  const title = getTranslatedContent(response.titles) || 'Untitled Tour'
  const description = getTranslatedContent(response.descriptions) || ''

  // Get included/not included HTML
  const includedHtml = getTranslatedContent(response.includeds)
  const notIncludedHtml = getTranslatedContent(response.notIncludeds)

  // Parse HTML lists to arrays (simple parsing)
  const parseHtmlList = (html: string): string[] => {
    if (!html) return []
    // Extract text from <li> tags
    const matches = html.match(/<li[^>]*>([\s\S]*?)<\/li>/gi)
    if (!matches) return [html.replace(/<[^>]*>/g, '').trim()].filter(Boolean)
    return matches.map(match =>
      match.replace(/<[^>]*>/g, '').trim()
    ).filter(Boolean)
  }

  // Map all tripdays to itinerary
  const itineraryDays = (response.tripdays || [])
    .sort((a, b) => a.dayNumber - b.dayNumber)
    .map(mapTripdayToItineraryDay)

  // Extract all accommodations
  const accommodations = extractAllAccommodations(response)

  // Extract all activities
  const activities = extractAllActivities(response)

  // Extract all images
  const allImages = extractAllTripImages(response)

  // Get start and end locations
  const startTripday = response.tripdays?.[0]
  const endTripday = response.tripdays?.[response.tripdays.length - 1]

  // Determine travel style from title
  const travelStyle = title.toLowerCase().includes('adventure') ? 'Adventure' :
    title.toLowerCase().includes('cultural') ? 'Cultural' :
      title.toLowerCase().includes('luxury') ? 'Luxury' :
        title.toLowerCase().includes('family') ? 'Family' : 'Exploration'

  // Generate badges
  const badges: string[] = []
  if (response.sample) badges.push('Sample')
  if (user?.verified) badges.push('Verified Operator')
  if (user?.company?.plan === 'pro') badges.push('Premium Partner')
  if (userTrip?.travelapp_visits && userTrip.travelapp_visits > 50) badges.push('Popular')

  return {
    id: parseInt(userTripUuid.split('-')[0], 16),
    uuid: userTripUuid,
    title,
    company: {
      name: user?.company?.name || user?.name || 'Unknown Company',
      id: user?.companyId || '',
      avatar: user?.avatarUrl || '',
      rating: generateDeterministicRating(response.id),
      reviews: userTrip?.travelapp_visits || 0,
      verified: user?.verified || false,
      responseTime: 'Within 24 hours',
      country: response.country?.name || 'Unknown',
      countryFlag: response.country?.flagEmoticon || '🌍',
      website: user?.company?.site || undefined,
      email: user?.company?.billingEmail || undefined
    },
    companyId: user?.companyId || '',
    companyCountry: response.country?.name || 'Unknown',
    companyFlag: response.country?.flagEmoticon || '🌍',
    price: userTrip?.price || 0,
    originalPrice: userTrip?.price && userTrip?.fee ? userTrip.price + userTrip.fee : undefined,
    rating: generateDeterministicRating(response.id),
    reviewCount: userTrip?.travelapp_visits || 0,
    duration: `${response.nrOfDays} days`,
    groupSize: userTrip?.max_travellers
      ? `Up to ${userTrip.max_travellers} people`
      : userTrip?.group_booking
        ? 'Group'
        : 'Small Group',
    location: response.country?.name || 'International',
    destination: response.countryIso || 'INT',
    travelStyle,
    image: allImages[0] || getTourImage(response.countryIso || 'US'),
    images: allImages.length > 0 ? allImages : [
      getTourImage(response.countryIso || 'US', 0),
      getTourImage(response.countryIso || 'US', 1),
      getTourImage(response.countryIso || 'US', 2)
    ],
    badges,
    category: travelStyle,
    difficulty: 'Moderate',
    highlights: itineraryDays.slice(0, 4).map(day => day.title),
    tourType: userTrip?.group_booking ? 'Group Tour' : 'Private Tour',
    languages: extractLanguages(response),
    description,
    included: parseHtmlList(includedHtml),
    notIncluded: parseHtmlList(notIncludedHtml),
    itinerary: [], // Legacy format, use itineraryDays instead
    reviews: [],
    relatedTours: [],
    // Enhanced fields
    includedHtml,
    notIncludedHtml,
    tripDescription: description,
    itineraryDays,
    accommodations,
    activities,
    startLocation: startTripday ? mapLocation(startTripday.location) : undefined,
    endLocation: endTripday ? mapLocation(endTripday.location) : undefined,
    nrOfDays: response.nrOfDays,
    currencySymbol: userTrip?.currency?.symbol || '€',
    currencyIso: userTrip?.currencyIso || 'EUR'
  }
}

// ============================================
// Reviewable Location Extraction
// ============================================

/**
 * Extract all reviewable locations from a trip detail response
 * These locations can be used to fetch reviews from Google Places API
 *
 * Extracts from:
 * - Destinations/cities from tripdays
 * - Hotels/accommodations with coordinates
 * - Activities/events with coordinates
 *
 * Deduplicates by coordinates to avoid fetching reviews for same location twice
 */
export function extractReviewableLocations(
  tripDetail: APITripDetailResponse
): ReviewableLocation[] {
  const locations: ReviewableLocation[] = []
  const seen = new Set<string>()

  if (!tripDetail.tripdays || tripDetail.tripdays.length === 0) {
    return locations
  }

  tripDetail.tripdays.forEach(tripday => {
    // 1. Extract destination locations
    if (tripday.destination?.location) {
      const loc = tripday.destination.location
      // coordinates are [longitude, latitude] in API
      if (loc.coordinates && loc.coordinates[0] !== 0 && loc.coordinates[1] !== 0) {
        const key = `${loc.coordinates[1].toFixed(4)},${loc.coordinates[0].toFixed(4)}`
        if (!seen.has(key)) {
          seen.add(key)
          locations.push({
            name: loc.name || tripday.destination.titles?.[0]?.content || 'Unknown Destination',
            lat: loc.coordinates[1], // latitude is second element
            lng: loc.coordinates[0], // longitude is first element
            type: 'destination'
          })
        }
      }
    }

    // Also check tripday.location if destination is not present
    if (!tripday.destination && tripday.location) {
      const loc = tripday.location
      if (loc.coordinates && loc.coordinates[0] !== 0 && loc.coordinates[1] !== 0) {
        const key = `${loc.coordinates[1].toFixed(4)},${loc.coordinates[0].toFixed(4)}`
        if (!seen.has(key)) {
          seen.add(key)
          locations.push({
            name: loc.name || `Day ${tripday.dayNumber} Location`,
            lat: loc.coordinates[1],
            lng: loc.coordinates[0],
            type: 'destination'
          })
        }
      }
    }

    // 2. Extract hotel/accommodation locations
    if (tripday.hotels && tripday.hotels.length > 0) {
      tripday.hotels.forEach(hotel => {
        if (hotel.location?.coordinates) {
          const loc = hotel.location
          if (loc.coordinates[0] !== 0 && loc.coordinates[1] !== 0) {
            const key = `${loc.coordinates[1].toFixed(4)},${loc.coordinates[0].toFixed(4)}`
            if (!seen.has(key)) {
              seen.add(key)
              locations.push({
                name: hotel.name || hotel.titles?.[0]?.content || 'Hotel',
                lat: loc.coordinates[1],
                lng: loc.coordinates[0],
                type: 'accommodation'
              })
            }
          }
        }
      })
    }

    // 3. Extract event/activity locations
    if (tripday.events && tripday.events.length > 0) {
      tripday.events.forEach(event => {
        if (event.location?.coordinates) {
          const loc = event.location
          if (loc.coordinates[0] !== 0 && loc.coordinates[1] !== 0) {
            const key = `${loc.coordinates[1].toFixed(4)},${loc.coordinates[0].toFixed(4)}`
            if (!seen.has(key)) {
              seen.add(key)
              locations.push({
                name: event.name || event.titles?.[0]?.content || loc.name || 'Activity',
                lat: loc.coordinates[1],
                lng: loc.coordinates[0],
                type: 'activity'
              })
            }
          }
        }
      })
    }
  })

  return locations
}
