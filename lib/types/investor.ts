import type { Tour, Review } from "@/types"

export interface CompanyProfile {
  id: string
  slug: string
  name: string
  logo: string
  verified: boolean
  location: string
  country: string
  countryFlag: string
  stats: CompanyStats
  about: string
  policies: Policy[]
}

export interface CompanyStats {
  numberOfTours: number
  ageRange: string
  numberOfReviews: number
  rating: number
  responseRate: number
  responseTime: string
  yearsExperience: number
  repeatedCustomers: number
}

export interface Policy {
  title: string
  description: string
}

export interface CompanyReview {
  id: string
  user: {
    name: string
    avatar: string
    verified: boolean
  }
  rating: number
  ratingLabel: string
  title: string
  comment: string
  date: string
}

export interface CompanyTour {
  id: string
  uuid?: string
  title: string
  image: string
  location: string
  countryFlag: string
  rating: number
  reviews: number
  groupType: string
  price: number
  originalPrice?: number
}

export interface Guide {
  id: string
  name: string
  avatar: string
  specialization: string
  experience: string
  languages: string[]
  rating: number
  tours: number
}
