// Profile-related TypeScript interfaces

export type Title = 'Mr' | 'Mrs' | 'Ms' | 'Dr'

export interface PhoneNumber {
  countryCode: string
  number: string
}

export interface PassportInfo {
  number: string
  issueCountry: string
  issueDate: string
  expiryDate: string
}

export interface EmergencyContact {
  id: string
  firstName: string
  lastName: string
  relationship?: string
  phone?: string
}

export interface TravelPreference {
  firstName: string
  lastName: string
}

export interface TravelInsurance {
  firstName: string
  lastName: string
}

// Extended user profile with all personal information
export interface UserProfile {
  id: string
  email: string
  name: string
  avatar?: string

  // Personal Information
  title?: Title
  firstName: string
  lastName: string
  dateOfBirth?: string // ISO date string
  phone?: PhoneNumber
  nationality?: string // ISO country code
  height?: string // in cm

  // Passport Information
  passport?: PassportInfo

  // Emergency Contacts (up to 3)
  emergencyContacts?: EmergencyContact[]

  // Travel Preferences
  travelPreference?: TravelPreference

  // Travel Insurance
  travelInsurance?: TravelInsurance

  // Account
  travelCredits: number
  currency: string
  createdAt: string
  updatedAt: string
}

// Booking status types
export type BookingStatus = 'upcoming' | 'completed' | 'cancelled' | 'pending'

// Booking interface
export interface Booking {
  id: string
  tourId: string
  tourTitle: string
  tourImage: string
  companyName: string
  companyLogo?: string
  status: BookingStatus
  bookingDate: string
  travelDate: string
  endDate?: string
  travelers: number
  totalAmount: number
  currency: string
  destination?: string
  duration?: string
}

// Inbox Message interface
export interface InboxMessage {
  id: string
  sender: {
    id: string
    name: string
    avatar?: string
    isCompany: boolean
  }
  subject: string
  preview: string
  content?: string
  timestamp: string
  isRead: boolean
  tourId?: string
  tourTitle?: string
  bookingId?: string
}

// User Review interface
export interface UserReview {
  id: string
  tourId: string
  tourTitle: string
  tourImage?: string
  companyName?: string
  rating: number
  ratingLabel: 'Poor' | 'Fair' | 'Good' | 'Very Good' | 'Excellent'
  title?: string
  comment: string
  date: string
  reviewer: {
    id: string
    name: string
    avatar?: string
    verified: boolean
  }
}

// API Request/Response types
export interface UpdateProfileRequest {
  title?: Title
  firstName?: string
  lastName?: string
  dateOfBirth?: string
  phone?: PhoneNumber
  nationality?: string
  height?: string
  passport?: PassportInfo
  emergencyContacts?: Omit<EmergencyContact, 'id'>[]
  travelPreference?: TravelPreference
  travelInsurance?: TravelInsurance
}

export interface ProfileResponse {
  data: UserProfile
  message?: string
}

export interface BookingsResponse {
  data: Booking[]
  total: number
  page: number
  limit: number
}

export interface InboxResponse {
  data: InboxMessage[]
  unreadCount: number
}

export interface ReviewsResponse {
  data: UserReview[]
  total: number
}

// Helper function to get rating label from numeric rating
export function getRatingLabel(rating: number): UserReview['ratingLabel'] {
  if (rating >= 4.5) return 'Excellent'
  if (rating >= 3.5) return 'Very Good'
  if (rating >= 2.5) return 'Good'
  if (rating >= 1.5) return 'Fair'
  return 'Poor'
}

// Helper to format display name
export function formatDisplayName(profile: Pick<UserProfile, 'title' | 'firstName' | 'lastName'>): string {
  const parts = [profile.title, profile.firstName, profile.lastName].filter(Boolean)
  return parts.join(' ')
}

// Helper to check if profile is complete
export function isProfileComplete(profile: UserProfile): boolean {
  return !!(
    profile.firstName &&
    profile.lastName &&
    profile.email &&
    profile.dateOfBirth &&
    profile.phone?.number &&
    profile.nationality
  )
}
