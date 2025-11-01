export interface SavedTrip {
  id: number
  title: string
  company: {
    name: string
    avatar: string
    verified: boolean
  }
  price: number
  originalPrice: number
  rating: number
  reviewCount: number
  duration: string
  groupSize: string
  location: string
  image: string
  savedDate: string
  category: string
}

export interface SavedCompany {
  id: number
  name: string
  description: string
  country: string
  location: string
  avatar: string
  coverImage: string
  verified: boolean
  rating: number
  reviewCount: number
  toursCount: number
  yearsExperience: number
  specialties: string[]
  languages: number
  responseTime: string
  savedDate: string
}
