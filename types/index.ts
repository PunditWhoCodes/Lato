export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  location?: string
  verified?: boolean
}

export interface Company {
  id: string
  name: string
  avatar: string
  coverImage: string
  location: string
  country: string
  countryFlag: string
  rating: number
  reviews: number
  toursCount: number
  yearsExperience: number
  verified: boolean
  responseTime: string
  specialties: string[]
  languages: string[]
  description: string
  badges: string[]
  contact?: ContactInfo
  certifications?: string[]
  stats?: CompanyStats
}

export interface ContactInfo {
  email: string
  phone: string
  website?: string
}

export interface CompanyStats {
  totalGuests: number
  repeatCustomers: number
  averageResponseTime: string
  completedTours: number
}

// Tour Types
export interface Tour {
  id: number
  uuid?: string // Original UUID from API
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

export interface TourDetail extends Omit<Tour, 'company' | 'reviews'> {
  company: {
    name: string
    id: string
    avatar: string
    rating: number
    reviews: number
    verified: boolean
    responseTime: string
    country: string
    countryFlag: string
    website?: string
    email?: string
  }
  reviewCount: number
  languages: string[]
  description: string
  included: string[]
  notIncluded: string[]
  itinerary: ItineraryItem[]
  reviews: Review[]
  relatedTours: RelatedTour[]
  images: string[]
  // Enhanced fields from full API response
  includedHtml?: string // Raw HTML content from API
  notIncludedHtml?: string // Raw HTML content from API
  tripDescription?: string // HTML description from API
  itineraryDays?: ItineraryDay[] // Full day-by-day itinerary
  accommodations?: Accommodation[] // All hotels from tripdays
  activities?: TourActivity[] // All events from tripdays
  startLocation?: LocationCoordinates
  endLocation?: LocationCoordinates
  nrOfDays?: number
  currencySymbol?: string
  currencyIso?: string
}

export interface ItineraryItem {
  time: string
  title: string
  description: string
  image: string
  location: {
    lat: number
    lng: number
  }
}

export interface DetailedItineraryItem {
  day: number
  title: string
  time: string
  description: string
  image: string
  activities: Activity[]
}

export interface Activity {
  type: 'transportation' | 'activity' | 'accommodation'
  title: string
  description: string
  images: string[]
  duration?: string
  included?: string[]
  highlights?: string[]
  requirements?: string[]
  route?: string
  amenities?: string[]
  capacity?: string
  menu?: string[]
  dietary?: string
  difficulty?: string
  equipment?: string[]
  best_time?: string
  stops?: string[]
}

// Review Types
export interface Review {
  id: number | string
  user: {
    name: string
    avatar?: string
    location?: string
  }
  rating: number
  date: string
  tourTitle?: string
  comment: string
  helpful?: number
  images?: string[]
  verified?: boolean
  source?: 'google' | 'internal'
  googleReviewUrl?: string
}

export interface RelatedTour {
  id: number
  title: string
  price: number
  rating: number
  image: string
}

// Message/Chat Types
export interface Message {
  id: string
  senderId: string
  senderName: string
  senderAvatar: string
  receiverId: string
  receiverName: string
  receiverAvatar: string
  lastMessage: string
  timestamp: string
  unread: boolean
  companyId?: string
  tourId?: number
}

export interface ChatMessage {
  id: string
  senderId: string
  message: string
  timestamp: string
  type: 'text' | 'image' | 'tour'
  tourData?: {
    id: number
    title: string
    price: number
    image: string
  }
}

export interface Destination {
  name: string
  regions: string[]
}

export type SortOption = 'popular' | 'rating' | 'price-low' | 'price-high' | 'reviews' | 'experience' | 'tours'
export type ViewMode = 'grid' | 'list'
export type Difficulty = 'Easy' | 'Moderate' | 'Challenging'
export type TourCategory = 'Cultural' | 'Adventure' | 'Food & Drink' | 'Photography' | 'Nature' | 'Relaxation'
export type TourType = 'Group Tour' | 'Private Tour'

// Search Filter Types
export interface SearchFilters {
  destination: string
  month: string
  year: number
  duration: string
  travelStyle: string
}

export interface QuickCategory {
  icon: any
  label: string
  value: string
}

// ============================================
// Enhanced Types for Full API Integration
// ============================================

// Location with coordinates
export interface LocationCoordinates {
  id?: string
  name: string
  coordinates: [number, number] // [longitude, latitude]
  address?: {
    country_code: string | null
    state: string | null
    city: string | null
    postal_code: string | null
    street: string | null
  }
}

// Full day-by-day itinerary
export interface ItineraryDay {
  dayNumber: number
  tripdayIndex: number
  title: string
  description: string
  location: LocationCoordinates
  image: string
  nrOfNights: number
  accommodation?: Accommodation
  activities: TourActivity[]
  transportations: Transportation[]
}

// Accommodation/Hotel
export interface Accommodation {
  id: string
  name: string
  rating: number
  type: string // e.g., "Hotel", "Resort", "Hostel"
  images: string[]
  nights: number
  checkInDay: number
  location: LocationCoordinates
  board?: string // e.g., "Breakfast included"
  website?: string
  email?: string
  phone?: string
  description?: string
}

// Tour Activity/Event
export interface TourActivity {
  id: string
  title: string
  description: string
  time: string | null
  endTime: string | null
  isOptional: boolean
  location: LocationCoordinates
  images: string[]
  dayNumber?: number
}

// Transportation
export interface Transportation {
  id: string
  title: string
  description: string
  type: string
  carrier?: string
  departureTime?: string
  arrivalTime?: string
  duration?: number
  fromLocation?: LocationCoordinates
  toLocation?: LocationCoordinates
  images: string[]
}
