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
  id: number
  user: {
    name: string
    avatar: string
    location: string
  }
  rating: number
  date: string
  tourTitle?: string
  comment: string
  helpful: number
  images?: string[]
  verified?: boolean
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
