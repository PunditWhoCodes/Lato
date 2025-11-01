import type { Company, Review } from "@/types"

export const mockCompanyDetail: Omit<Company, "reviews"> & {
  tours: Array<{
    id: number
    title: string
    price: number
    rating: number
    reviews: number
    image: string
    duration: string
  }>
  reviews: Review[]
} = {
  id: "bali-explorer",
  name: "Bali Explorer Co.",
  avatar: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=200&h=200&fit=crop",
  coverImage: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&h=400&fit=crop",
  location: "Ubud, Bali, Indonesia",
  country: "Indonesia",
  countryFlag: "🇮🇩",
  rating: 4.8,
  toursCount: 15,
  yearsExperience: 5,
  verified: true,
  responseTime: "Usually responds within 1 hour",
  specialties: ["Cultural Tours", "Temple Visits", "Rice Terraces", "Traditional Arts"],
  languages: ["English", "Indonesian", "Dutch", "German"],
  description:
    "We are passionate local experts specializing in authentic Balinese cultural experiences. Our team of certified guides has been sharing the beauty and traditions of Bali with travelers from around the world for over 5 years. We believe in sustainable tourism that benefits local communities while providing unforgettable experiences for our guests.",
  badges: ["Top Rated", "Quick Response", "Local Expert", "Eco-Friendly"],
  contact: {
    email: "hello@baliexplorer.com",
    phone: "+62 361 123456",
    website: "www.baliexplorer.com",
  },
  certifications: ["Licensed Tour Operator", "First Aid Certified", "Sustainable Tourism Certified"],
  tours: [
    {
      id: 1,
      title: "Bali Temple & Rice Terrace Adventure",
      price: 89,
      rating: 4.9,
      reviews: 127,
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&h=300&fit=crop",
      duration: "8 hours",
    },
    {
      id: 2,
      title: "Traditional Balinese Cooking Class",
      price: 65,
      rating: 4.8,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&h=300&fit=crop",
      duration: "4 hours",
    },
    {
      id: 3,
      title: "Sunrise Mount Batur Trekking",
      price: 75,
      rating: 4.7,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      duration: "6 hours",
    },
  ],
  reviews: [
    {
      id: 1,
      user: {
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces",
        location: "Australia",
      },
      rating: 5,
      date: "2 weeks ago",
      tourTitle: "Bali Temple & Rice Terrace Adventure",
      comment:
        "Made and his team provided an absolutely incredible experience! Their knowledge of Balinese culture is extensive and they made sure we understood the significance of each temple we visited. The rice terraces were breathtaking and the lunch with the local family was a highlight. Professional, friendly, and authentic - highly recommend!",
      helpful: 15,
    },
    {
      id: 2,
      user: {
        name: "Marco Rodriguez",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces",
        location: "Spain",
      },
      rating: 5,
      date: "1 month ago",
      tourTitle: "Traditional Balinese Cooking Class",
      comment:
        "What an amazing cooking experience! The team taught us so much about traditional Balinese ingredients and cooking techniques. The market tour was fascinating and the food we prepared was delicious. Great value for money and such a personal touch.",
      helpful: 12,
    },
    {
      id: 3,
      user: {
        name: "Emma Chen",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=faces",
        location: "Canada",
      },
      rating: 4,
      date: "1 month ago",
      tourTitle: "Sunrise Mount Batur Trekking",
      comment:
        "Beautiful sunrise trek with knowledgeable guides. They were very safety-conscious and made sure everyone was comfortable throughout the hike. The views were spectacular and the breakfast at the top was a nice touch. Would definitely book with them again!",
      helpful: 8,
    },
  ],
  stats: {
    totalGuests: 2847,
    repeatCustomers: 23,
    averageResponseTime: "1 hour",
    completedTours: 1456,
  },
}
