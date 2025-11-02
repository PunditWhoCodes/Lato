import type { TourDetail, DetailedItineraryItem } from "@/types"

export type { TourDetail, DetailedItineraryItem }

export interface ImageGalleryProps {
  images: string[]
  title: string
  currentImageIndex: number
  setCurrentImageIndex: (index: number) => void
  isLiked: boolean
  setIsLiked: (liked: boolean) => void
}

export interface RelatedToursProps {
  tours: TourDetail["relatedTours"]
}

export interface ReviewsSectionProps {
  reviews: TourDetail["reviews"]
  rating: number
}

export interface SectionNavigationProps {
  activeSection: string
  onSectionClick: (section: string) => void
}

export interface TourInfoProps {
  tour: TourDetail
  onCompanyClick: () => void
}

export interface TourItineraryModalProps {
  itinerary: DetailedItineraryItem[]
  selectedDay: number
  onClose: () => void
}

export interface TourItineraryProps {
  itinerary: TourDetail["itinerary"]
  onDayClick: (index: number) => void
}

export interface TourOverviewProps {
  tour: TourDetail
}