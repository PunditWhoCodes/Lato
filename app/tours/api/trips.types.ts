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
