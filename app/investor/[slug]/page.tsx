import { Metadata } from "next"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { ConditionalFooter } from "@/components/conditional-footer"
import { InvestorPageClient } from "./investor-page-client"

// Mock data - in production, fetch from API
const mockCompanyData = {
  id: "explore-co",
  slug: "explore-co",
  name: "Explore Co",
  logo: "",
  verified: true,
  location: "Headquartered in Giza, Egypt",
  country: "Egypt",
  countryFlag: "🇪🇬",
  stats: {
    numberOfTours: 18,
    ageRange: "1-80",
    numberOfReviews: 176,
    rating: 4.5,
    responseRate: 88,
    responseTime: "within 1 day",
    yearsExperience: 20,
    repeatedCustomers: 80,
  },
  about:
    "Black Holiday is a Tourism company, created to show the wonderful and rich Egyptian culture, that offers the whole world a range of colors flavors and wonders wonderland holidays that narrate the existence of humanity from the antiquity. During all these years of work, we have achieved a high standard of respect, responsibility and quality in the services that we provide, since we have worked diligently for our most valuable resources: you. Satisfying our customers taking care of every detail and optimizing the time that you stay in Egypt. Our goal is at times and personalized attention that values clarity in communication and the delivery of more effective information. Let us take care of your holidays in Egypt and offer you one of the our excellent packages that we have designed for you and live a fabulous and unforgettable experience in the land of the pharaohs.",
  policies: [
    {
      title: "Responsibility and Quality Assurance",
      description:
        "We take full responsibility for the services we provide. Quality is never compromised.",
    },
    {
      title: "Attention to Detail",
      description:
        "We believe that excellence lies in the details. From planning to execution, every element is thoughtfully managed.",
    },
    {
      title: "Respect and Professional Conduct",
      description:
        "We uphold a high standard of respect in all interactions.",
    },
    {
      title: "Customer Satisfaction",
      description:
        "We are committed to delivering experiences that meet and exceed our customer expectations.",
    },
  ],
}

const mockReviews = [
  {
    id: "1",
    user: {
      name: "Leonie",
      avatar: "",
      verified: true,
    },
    rating: 5.0,
    ratingLabel: "Excellent",
    title: "Peru Best Tours are awesome",
    comment:
      "The most amazing place I have ever been, such breath taking scenery. Gorgeous friendly people. Loved it.",
    date: "Written on December 14th, 2023",
  },
  {
    id: "2",
    user: {
      name: "Leonie",
      avatar: "",
      verified: true,
    },
    rating: 5.0,
    ratingLabel: "Excellent",
    title: "Peru Best Tours are awesome",
    comment:
      "The most amazing place I have ever been, such breath taking scenery. Gorgeous friendly people. Loved it.",
    date: "Written on December 14th, 2023",
  },
  {
    id: "3",
    user: {
      name: "Leonie",
      avatar: "",
      verified: true,
    },
    rating: 5.0,
    ratingLabel: "Excellent",
    title: "Peru Best Tours are awesome",
    comment:
      "The most amazing place I have ever been, such breath taking scenery. Gorgeous friendly people. Loved it.",
    date: "Written on December 14th, 2023",
  },
  {
    id: "4",
    user: {
      name: "Leonie",
      avatar: "",
      verified: true,
    },
    rating: 5.0,
    ratingLabel: "Excellent",
    title: "Peru Best Tours are awesome",
    comment:
      "The most amazing place I have ever been, such breath taking scenery. Gorgeous friendly people. Loved it.",
    date: "Written on December 14th, 2023",
  },
]

const mockTours = [
  {
    id: "1",
    title: "Rainbow Mountain",
    image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=400",
    location: "Peru",
    countryFlag: "🇵🇪",
    rating: 4.8,
    reviews: 34,
    groupType: "M People Group",
    price: 33,
    originalPrice: 40,
  },
  {
    id: "2",
    title: "Rainbow Mountain",
    image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=400",
    location: "Peru",
    countryFlag: "🇵🇪",
    rating: 4.8,
    reviews: 34,
    groupType: "M People Group",
    price: 35,
    originalPrice: 45,
  },
  {
    id: "3",
    title: "Cusco Panoramica",
    image: "https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?w=400",
    location: "Peru",
    countryFlag: "🇵🇪",
    rating: 4.8,
    reviews: 75,
    groupType: "M People Group",
    price: 35,
    originalPrice: 45,
  },
  {
    id: "4",
    title: "Rainbow Mountain",
    image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=400",
    location: "Peru",
    countryFlag: "🇵🇪",
    rating: 4.8,
    reviews: 34,
    groupType: "M People Group",
    price: 33,
    originalPrice: 40,
  },
  {
    id: "5",
    title: "Rainbow Mountain",
    image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=400",
    location: "Peru",
    countryFlag: "🇵🇪",
    rating: 4.8,
    reviews: 34,
    groupType: "M People Group",
    price: 33,
    originalPrice: 40,
  },
]

const mockTopDeals = [
  {
    id: "deal-1",
    title: "Cusco Panoramica",
    image: "https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?w=400",
    location: "Peru",
    countryFlag: "🇵🇪",
    rating: 4.8,
    reviews: 75,
    groupType: "M People Group",
    price: 35,
    originalPrice: 45,
  },
  {
    id: "deal-2",
    title: "Rainbow Mountain",
    image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=400",
    location: "Peru",
    countryFlag: "🇵🇪",
    rating: 4.8,
    reviews: 34,
    groupType: "M People Group",
    price: 35,
    originalPrice: 45,
  },
  {
    id: "deal-3",
    title: "Rainbow Mountain",
    image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=400",
    location: "Peru",
    countryFlag: "🇵🇪",
    rating: 4.8,
    reviews: 34,
    groupType: "M People Group",
    price: 33,
    originalPrice: 40,
  },
  {
    id: "deal-4",
    title: "Rainbow Mountain",
    image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=400",
    location: "Peru",
    countryFlag: "🇵🇪",
    rating: 4.8,
    reviews: 34,
    groupType: "M People Group",
    price: 33,
    originalPrice: 40,
  },
  {
    id: "deal-5",
    title: "Rainbow Mountain",
    image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=400",
    location: "Peru",
    countryFlag: "🇵🇪",
    rating: 4.8,
    reviews: 34,
    groupType: "M People Group",
    price: 33,
    originalPrice: 40,
  },
]

const mockGuides = [
  {
    id: "1",
    name: "Ahmed Hassan",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    specialization: "Egyptologist",
    experience: "15 years",
    languages: ["English", "Arabic", "French"],
    rating: 4.9,
    tours: 250,
  },
  {
    id: "2",
    name: "Sara Mohamed",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    specialization: "Adventure Guide",
    experience: "8 years",
    languages: ["English", "Arabic"],
    rating: 4.8,
    tours: 180,
  },
]

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  // In production, fetch company data based on slug
  return {
    title: `${mockCompanyData.name} | Tour Operator Profile | Lato Marketplace`,
    description: `Explore tours and experiences offered by ${mockCompanyData.name}. ${mockCompanyData.stats.numberOfTours} tours available with ${mockCompanyData.stats.rating} rating.`,
  }
}

export default async function InvestorPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  // In production, fetch company data based on slug

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm font-poppins mb-6">
          <Link href="/" className="text-gray-500 hover:text-primary transition-colors">
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-primary">{mockCompanyData.name}</span>
        </nav>

        {/* Client Component with all interactive content */}
        <InvestorPageClient
          company={mockCompanyData}
          reviews={mockReviews}
          tours={mockTours}
          topDeals={mockTopDeals}
          guides={mockGuides}
        />
      </main>

      <ConditionalFooter />
    </div>
  )
}
