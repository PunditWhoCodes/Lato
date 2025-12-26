/**
 * API Response Types for Trips/UserTrips
 * These types represent the actual API response structure from the Lato Travel API
 */

// Language
export interface Language {
  code: string
  flag: string
  name: string
  nativename: string
}

// User/Creator
export interface APIUser {
  id: string
  email: string
  apiKey: string | null
  zapierApiKey: string | null
  name: string
  jobTitle: string
  phoneNumber: string | null
  avatar: {
    key: string | null
  }
  avatarUrl?: string
  verified: boolean
  companyId: string
  role: string
  created_at: string
  updated_at: string
  defaultshow_pois: string
  defaultshow_pdf: string
  defaultshow_documents: string
  defaultchat_enabled: boolean
  defaultCollaboratorCanEdit: boolean
  defaultshow_confirm_option: boolean
  defaultgroup_booking: boolean
  defaultshow_price: string
  defaultshow_directions: boolean
  receiveChatMail: boolean
  defaultTripStatus: string
  defaultpoi_range: number
  defaultBookLink: string
  zohoUserId: string | null
  ai_trip_conversions: {
    free_used: number
    paid_used: number
  }
  latestViewedChangelogDate: string | null
  daysAfterTripCancelled: string | null
  timezone: string | null
  showExtraDestinationContent: boolean
  completedOnboarding: boolean
  dashboardPartialState: {
    dismissedActions: {
      exploreTrip: boolean
      setBranding: boolean
      inviteMember: boolean
      importContacts: boolean
    }
    dashboard_partial_state_version: number
  }
  company?: APICompany
}

// Company
export interface APICompany {
  id: string
  name: string
  billingEmail: string
  site: string | null
  facebookUrl: string | null
  instagramUrl: string | null
  ref_prefix: string
  account_number: string
  ref_number: number
  stripeCustomerId: string
  plan: string
  maxUsers: number
  trial_end_date: string | null
  address: {
    city: string
    zipCode: string
    aptnumber: string
    state: string
    streetAddress: string
  }
  companyType: string
  referredBy: string | null
  freeUserMonths: string
  zohoCompanyId: string
  created_at: string
  updated_at: string
  deeplApiKey: string | null
  map_provider: string
  hotelbeds_client_id: string
  ratehawk_client_id: string
  hotelbeds_api_key: string | null
  referralSource: string | null
  companySize: string | null
  featureInterests: string | null
}

// Country
export interface APICountry {
  iso: string
  name: string
  flagEmoticon: string
  flagImage: string
  continent: string
  region: string
  phonePrefix: string
}

// Title
export interface APITripTitle {
  id: string
  content: string
  language_code: string
  language: Language
  creator: APIUser
}

// Brand
export interface APIBrand {
  id: string
  name: string
  logo: {
    key: string | null
  }
  default_brand: boolean
  logoScale: number
  logoUrl: string
  theme: {
    primary_color: string
    secondary_color: string
    text_color: string
    background_color: string
    font: string
  }
  created_at: string
  updated_at: string
  terms: string
  description: string | null
  content_ai_preference_sentence: string
  contact_email: string | null
  contact_email_type: string
  contact_name_type: string
  contact_description_type: string
  contact_image_type: string
  calculationElementSettings: {
    transportation_fee: number | null
    transportation_margin: number | null
    activity_fee: number | null
    activity_margin: number | null
    hotel_fee: number | null
    hotel_margin: number | null
    other_fee: number | null
    other_margin: number | null
  }
  documentExportSettings: any | null
}

// Trip (nested within UserTrip)
export interface APITrip {
  id: string
  sample: boolean
  titles: APITripTitle[]
  client_name: string
  share: boolean
  start_date: string | null
  end_date: string | null
  collaboratorCanEdit: boolean
  nrOfDays: number
  totalNrOfUserTrips: number
  userTrips: APIUserTrip[]
  country: APICountry
  countryIso: string
  created_at: string
  updated_at: string
}

// UserTrip (main entity)
export interface APIUserTrip {
  id: string
  external_ref: string
  homeBackgroundNumber: number
  tripId: string
  trip?: APITrip
  user: APIUser
  ref: string
  created_at: string
  updated_at: string
  status: string
  chat_enabled: boolean
  show_confirm_option: boolean
  group_booking: boolean
  show_directions: boolean
  max_travellers: number | null
  booked_travellers: number
  poi_range: number
  book_link: string
  show_pois: string
  show_pdf: string
  show_documents: string
  brand: APIBrand
  currencyIso: string
  foreignCurrencyIso: string | null
  exchangeRate: number | null
  price: number | null
  pricePerPerson: boolean
  pricedPersons: number | null
  margin: number
  fee: number
  daysAfterTripCancelled: string | null
  booked_date: string | null
  travelapp_visits: number
  show_price: string
  showExtraDestinationContent: boolean
  documentExportSettings: any | null
  calculationElementSettings: {
    transportation_fee: number | null
    transportation_margin: number | null
    activity_fee: number | null
    activity_margin: number | null
    hotel_fee: number | null
    hotel_margin: number | null
    other_fee: number | null
    other_margin: number | null
  }
}

// Marketplace Response
export interface APIMarketplaceResponse {
  data: APIUserTrip[]
  count: number
}

// Single Trip Response
export interface APISingleTripResponse extends APIUserTrip {
  // Single trip has the same structure as APIUserTrip
}

// Query Parameters
export interface MarketplaceQueryParams {
  page?: number
  step?: number
  sample?: boolean
  countries?: string
}

// Error Response
export interface APIErrorResponse {
  message: string
  statusCode: number
  error?: string
}

// ============================================
// Trip Detail Response Types (Full Structure)
// ============================================

// Image
export interface APIImage {
  id: string
  site: string
  s3Key: string
  bgId: string | null
  eventId: string | null
  ord: number
  hotelId: string | null
  poiId: string | null
  destinationId: string | null
  transportationId: string | null
  s3: {
    key: string
  }
  url: string
  originUrl: string
}

// Location
export interface APILocation {
  id: string
  name: string
  coordinates: [number, number] // [longitude, latitude]
  address: {
    country_code: string | null
    state: string | null
    city: string | null
    postal_code: string | null
    street: string | null
  }
}

// Translation/Content (used for titles, descriptions, etc.)
export interface APITranslation {
  id: string
  content: string
  language_code: string
  language: Language
  creator?: APIUser
  eventId?: string | null
  priceDescriptionId?: string | null
  includedId?: string | null
  notIncludedId?: string | null
  hotelId?: string | null
  eventTitleId?: string | null
  tripTitleId?: string | null
  tripdayTitleId?: string | null
  tripDescriptionId?: string | null
  destinationTitleId?: string | null
  destinationDescriptionId?: string | null
  transportationTitleId?: string | null
  transportationDescriptionId?: string | null
}

// Library Image Relation (for events/activities)
export interface APILibraryImageRelation {
  id: string
  ord: number
  libraryImageId: string
  eventId: string | null
  hotelId: string | null
  poiId: string | null
  destinationId: string | null
  transportationId: string | null
  libraryImage: {
    id: string
    name: string
    site: string
    s3Key: string
    url: string
    originUrl: string
    userId: string
    locationId: string
    countryIso: string
  }
}

// Room (within Hotel)
export interface APIRoom {
  id: string
  name: string
  description: string
  roomType: string
  maxOccupancy: number
  amenities: string[]
}

// Hotel/Accommodation
export interface APIHotel {
  id: string
  name: string
  tripdayId: string
  ord: number
  created_at: string
  updated_at: string
  userId: string
  locationId: string
  countryIso: string
  board: string
  origin: string
  originCode: string
  website: string | null
  primaryEmail: string | null
  phoneNumber: string | null
  chain: string
  chainRef: string
  showVoucher: boolean
  rating: number
  bookingStatus: string
  bookingRef: string
  accommodationType: string
  images: APIImage[]
  libraryImageRelations: APILibraryImageRelation[]
  location: APILocation
  titles: APITranslation[]
  descriptions: APITranslation[]
  rooms: APIRoom[]
  nrOfNights: number
  checkInDayNumber: number
}

// Event/Activity
export interface APIEvent {
  id: string
  tripdayId: string
  ord: number
  dayIndex: number | null
  time: string | null
  endTime: string | null
  name: string | null
  created_at: string
  updated_at: string
  userId: string
  locationId: string
  countryIso: string
  website: string | null
  primaryEmail: string | null
  phoneNumber: string | null
  chain: string
  chainRef: string | null
  showVoucher: boolean
  isOptional: boolean
  images: APIImage[]
  libraryImageRelations: APILibraryImageRelation[]
  location: APILocation
  documents: APIDocument[]
  titles: APITranslation[]
  descriptions: APITranslation[]
}

// Transportation
export interface APITransportation {
  id: string
  tripdayId: string
  ord: number
  type: string
  carrier: string | null
  departure_time: string | null
  arrival_time: string | null
  duration: number | null
  from_location: APILocation | null
  to_location: APILocation | null
  images: APIImage[]
  libraryImageRelations: APILibraryImageRelation[]
  titles: APITranslation[]
  descriptions: APITranslation[]
  departureDate: string | null
  arrivalDate: string | null
  flightDurationInMinutes: number | null
}

// Document
export interface APIDocument {
  id: string
  name: string
  url: string
  type: string
}

// Destination (within tripday)
export interface APIDestination {
  id: string
  created_at: string
  updated_at: string
  tripdayId: string
  locationId: string
  userId: string
  showExtraDestinationContent: boolean
  images: APIImage[]
  libraryImageRelations: APILibraryImageRelation[]
  location: APILocation
  documents: APIDocument[]
  titles: APITranslation[]
  descriptions: APITranslation[]
}

// Trip Day (day-by-day itinerary)
export interface APITripday {
  id: string
  dayNumber: number
  tripdayIndex: number
  locationId: string
  tripId: string
  nrOfNights: number
  libraryImageId: string | null
  image: APIImage | null
  libraryImage: APILibraryImageRelation | null
  location: APILocation
  documents: APIDocument[]
  titles: APITranslation[]
  destination: APIDestination | null
  hotels: APIHotel[]
  events: APIEvent[]
  transportations: APITransportation[]
}

// Currency
export interface APICurrency {
  iso: string
  name: string
  symbol: string
}

// Full Trip Detail Response (from /usertrips/[uuid])
export interface APITripDetailResponse {
  id: string
  client_name: string
  nrOfDays: number
  created_at: string
  updated_at: string
  sample: boolean
  share: boolean
  collaboratorCanEdit: boolean
  countryIso: string
  leadBookerId: string | null
  trips_contacts_contacts: any[]
  userTrips: (APIUserTrip & {
    currency: APICurrency
    chatmessages: any[]
    notes: any[]
    tasks: any[]
  })[]
  tripdays: APITripday[]
  tripdocs: APIDocument[]
  flights: any[]
  defaultDocuments: APIDocument[]
  country: APICountry
  priceDescriptions: APITranslation[]
  includeds: APITranslation[]
  notIncludeds: APITranslation[]
  titles: APITranslation[]
  descriptions: APITranslation[]
}
