"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { ChatButton } from "@/components/chat-button"
import {
  Star,
  MapPin,
  Clock,
  Users,
  Heart,
  Share2,
  Calendar,
  CheckCircle,
  XCircle,
  Camera,
  ChevronLeft,
  ChevronRight,
  Shield,
  Award,
  Globe,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { mockTourDetail, detailedItinerary } from "./data"
import type { TourDetail, DetailedItineraryItem } from "./types"

const mockTour: TourDetail = mockTourDetail


export default function TourDetailPage() {
  const params = useParams()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [activeSection, setActiveSection] = useState("overview")
  const [selectedDay, setSelectedDay] = useState<number | null>(null)

  // Mock user - in real app this would come from auth context
  const user = undefined

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["overview", "itinerary", "company", "reviews"]
      const navHeight = 80
      const sectionNavHeight = 60
      const offset = navHeight + sectionNavHeight + 40

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i])
        if (section) {
          const rect = section.getBoundingClientRect()
          if (rect.top <= offset) {
            setActiveSection(sections[i])
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Check initial position

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (selectedDay !== null) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [selectedDay])

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % mockTour.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + mockTour.images.length) % mockTour.images.length)
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const navHeight = 80 // Navigation height
      const sectionNavHeight = 60 // Section navigation height
      const totalOffset = navHeight + sectionNavHeight + 20 // Extra padding
      const elementPosition = element.offsetTop - totalOffset
      window.scrollTo({ top: elementPosition, behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <span>/</span>
          <Link href="/tours" className="hover:text-foreground">
            Tours
          </Link>
          <span>/</span>
          <span className="text-foreground">{mockTour.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="relative">
              <div className="relative aspect-video rounded-xl overflow-hidden">
                <img
                  src={mockTour.images[currentImageIndex] || "/placeholder.svg?height=400&width=600&query=tour+image"}
                  alt={mockTour.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/guided-city-tour.png"
                  }}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-4 right-4 bg-white/80 hover:bg-white"
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <Heart className={`h-5 w-5 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
                <Button variant="ghost" size="sm" className="absolute top-4 right-16 bg-white/80 hover:bg-white">
                  <Share2 className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
                <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  <Camera className="w-4 h-4 inline mr-1" />
                  {currentImageIndex + 1} / {mockTour.images.length}
                </div>
              </div>
              <div className="flex gap-2 mt-4 overflow-x-auto">
                {mockTour.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${index === currentImageIndex ? "border-primary" : "border-transparent"
                      }`}
                  >
                    <img
                      src={image || "/placeholder.svg?height=80&width=80&query=tour+thumbnail"}
                      alt=""
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/vibrant-city-tour.png"
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Tour Info */}
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                {mockTour.badges.map((badge, index) => (
                  <Badge key={index} className="bg-accent text-accent-foreground">
                    {badge}
                  </Badge>
                ))}
              </div>

              <h1 className="font-heading font-black text-3xl md:text-4xl text-foreground mb-2">{mockTour.title}</h1>
              <div className="flex items-center gap-2 mb-4">
                <button
                  onClick={() => scrollToSection("company")}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                >
                  by {mockTour.company.name}
                </button>
                <div className="flex items-center gap-1 px-2 py-1 bg-muted rounded-full">
                  <span className="text-sm">🇮🇩</span>
                  <span className="text-xs text-muted-foreground">Indonesia</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>{mockTour.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{mockTour.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>{mockTour.groupSize}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  <span>{mockTour.languages.join(", ")}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold text-lg">{mockTour.rating}</span>
                  <span className="text-muted-foreground">({mockTour.reviews.length} reviews)</span>
                </div>
                <Badge variant="outline" className="text-green-600 border-green-600">
                  <Shield className="w-4 h-4 mr-1" />
                  Verified
                </Badge>
              </div>
            </div>

            <div className="sticky top-20 z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border rounded-lg p-2">
              <div className="grid grid-cols-4 gap-2">
                <Button
                  variant={activeSection === "overview" ? "default" : "ghost"}
                  onClick={() => scrollToSection("overview")}
                  className="justify-center"
                >
                  Overview
                </Button>
                <Button
                  variant={activeSection === "itinerary" ? "default" : "ghost"}
                  onClick={() => scrollToSection("itinerary")}
                  className="justify-center"
                >
                  Itinerary
                </Button>
                <Button
                  variant={activeSection === "company" ? "default" : "ghost"}
                  onClick={() => scrollToSection("company")}
                  className="justify-center"
                >
                  Company
                </Button>
                <Button
                  variant={activeSection === "reviews" ? "default" : "ghost"}
                  onClick={() => scrollToSection("reviews")}
                  className="justify-center"
                >
                  Reviews
                </Button>
              </div>
            </div>

            <section id="overview" className="space-y-6 pt-4">
              <div>
                <h3 className="font-heading font-bold text-xl mb-4">About This Experience</h3>
                <p className="text-muted-foreground leading-relaxed">{mockTour.description}</p>
              </div>

              <div>
                <h3 className="font-heading font-bold text-xl mb-4">Highlights</h3>
                <ul className="space-y-2">
                  {mockTour.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-heading font-bold text-xl mb-4">What's Included</h3>
                  <ul className="space-y-2">
                    {mockTour.included.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-xl mb-4">Not Included</h3>
                  <ul className="space-y-2">
                    {mockTour.notIncluded.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <XCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Card className="mb-8">
                <CardContent className="p-6">
                  <h4 className="font-heading font-bold text-lg mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    Interactive Route Map
                  </h4>
                  <div className="relative bg-linear-to-br from-primary/5 to-secondary/5 rounded-xl p-8 min-h-[400px] flex items-center justify-center">
                    {/* Enhanced Google Maps style interface */}
                    <div className="relative w-full max-w-3xl">
                      {/* Route visualization */}
                      <div className="absolute inset-0 bg-linear-to-br from-blue-100 to-green-100 rounded-lg opacity-50"></div>

                      {/* Route path with better styling */}
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 300">
                        <defs>
                          <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#43a8a0" />
                            <stop offset="100%" stopColor="#ff817d" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M 60 220 Q 120 80 180 150 Q 240 200 300 120 Q 360 160 420 90"
                          stroke="url(#routeGradient)"
                          strokeWidth="4"
                          fill="none"
                          strokeLinecap="round"
                          className="drop-shadow-sm"
                        />
                      </svg>

                      {/* Enhanced location markers */}
                      <div className="relative grid grid-cols-3 gap-6 h-72 p-4">
                        {mockTour.itinerary.map((item, index) => (
                          <div
                            key={index}
                            className={`flex flex-col items-center justify-center ${index % 2 === 0 ? "self-end" : "self-start"
                              }`}
                          >
                            <div className="relative group">
                              <div className="w-12 h-12 bg-linear-to-br from-primary to-primary-dark rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg hover:scale-110 transition-all duration-300 cursor-pointer border-4 border-white">
                                {index + 1}
                              </div>
                              <div className="absolute -top-2 -right-2 w-4 h-4 bg-secondary rounded-full animate-pulse"></div>
                            </div>
                            <div className="text-xs text-center mt-3 max-w-24">
                              <div className="font-bold text-primary bg-white px-2 py-1 rounded-full shadow-sm">
                                {item.time}
                              </div>
                              <div className="text-foreground font-semibold mt-1 leading-tight">{item.title}</div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Enhanced map controls */}
                      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur rounded-lg p-3 shadow-lg">
                        <div className="text-xs space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-linear-to-r from-primary to-primary-dark rounded-full"></div>
                            <span className="font-medium">Tour Route</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-secondary rounded-full"></div>
                            <span>Live Location</span>
                          </div>
                          <div className="text-muted-foreground">Total: ~8 hours</div>
                        </div>
                      </div>

                      {/* Map attribution */}
                      <div className="absolute bottom-4 left-4 text-xs text-muted-foreground bg-white/80 px-2 py-1 rounded">
                        Interactive map powered by Google Maps
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section id="itinerary" className="space-y-6 pt-4">
              <h3 className="font-heading font-bold text-2xl mb-6">Daily Itinerary</h3>

              <div className="space-y-6">
                {mockTour.itinerary.map((item, index) => (
                  <Card
                    key={index}
                    className="overflow-hidden hover:shadow-xl transition-all duration-300 group border-0 bg-linear-to-br from-white to-gray-50/50 cursor-pointer"
                    onClick={() => setSelectedDay(index)}
                  >
                    <CardContent className="p-0">
                      <div className="grid md:grid-cols-3 gap-0">
                        {/* Image section */}
                        <div className="relative aspect-video md:aspect-square overflow-hidden">
                          <img
                            src={
                              item.image ||
                              `/placeholder.svg?height=200&width=300&query=${encodeURIComponent(item.title) || "/placeholder.svg"}`
                            }
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            onError={(e) => {
                              e.currentTarget.src = "/guided-city-tour.png"
                            }}
                          />
                          <div className="absolute top-4 left-4">
                            <div className="w-14 h-14 bg-linear-to-br from-primary via-primary to-primary-dark rounded-2xl flex items-center justify-center text-white font-bold shadow-2xl border-2 border-white/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                              <span className="text-lg">{index + 1}</span>
                            </div>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>

                        {/* Content section */}
                        <div className="md:col-span-2 p-8">
                          <div className="flex items-start justify-between mb-6">
                            <div className="flex-1">
                              <h4 className="font-heading font-bold text-2xl mb-3 group-hover:text-primary transition-colors leading-tight">
                                {item.title}
                              </h4>
                              <div className="flex items-center gap-4 text-muted-foreground mb-4">
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                                  <span className="text-sm font-medium">
                                    Stop {index + 1} of {mockTour.itinerary.length}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <Badge
                              variant="secondary"
                              className="capitalize bg-primary/10 text-primary border-primary/20 font-medium px-3 py-1"
                            >
                              {index === 0
                                ? "Start"
                                : index === mockTour.itinerary.length - 1
                                  ? "End"
                                  : `Day ${index + 1}`}
                            </Badge>
                          </div>

                          <div className="mb-6">
                            <div className="flex flex-col gap-3">
                              {detailedItinerary[index]?.activities.map((activity, actIndex) => (
                                <div
                                  key={actIndex}
                                  className="flex items-center gap-3 bg-linear-to-r from-muted/30 to-muted/10 rounded-xl px-4 py-3 border border-muted/20 hover:border-primary/20 transition-colors"
                                >
                                  <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center">
                                    <span className="text-lg">
                                      {activity.type === "activity"
                                        ? "🎯"
                                        : activity.type === "transportation"
                                          ? "🚗"
                                          : "🏠"}
                                    </span>
                                  </div>
                                  <span className="text-sm font-medium text-foreground flex-1">{activity.title}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section id="company" className="space-y-6 pt-4">
              <h3 className="font-heading font-bold text-2xl mb-6">About the Company</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={mockTour.company.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{mockTour.company.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-heading font-bold text-xl">{mockTour.company.name}</h4>
                        <div className="flex items-center gap-1 px-2 py-1 bg-muted rounded-full">
                          <span className="text-sm">{mockTour.company.countryFlag}</span>
                          <span className="text-xs text-muted-foreground">{mockTour.company.country}</span>
                        </div>
                        {mockTour.company.verified && (
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            <Shield className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">{mockTour.company.rating}</span>
                          <span className="text-muted-foreground">({mockTour.company.reviews} reviews)</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Award className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">5 years experience</span>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-4">{mockTour.company.responseTime}</p>
                      <div className="flex gap-2">
                        <Button asChild>
                          <Link href={`/companies/${mockTour.company.id}`}>View Profile</Link>
                        </Button>
                        <ChatButton companyId={mockTour.company.id} variant="outline" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section id="reviews" className="space-y-6 pt-4">
              <div className="flex items-center justify-between">
                <h3 className="font-heading font-bold text-2xl">Reviews ({mockTour.reviews.length})</h3>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold text-lg">{mockTour.rating}</span>
                  <span className="text-muted-foreground">average</span>
                </div>
              </div>

              <div className="space-y-6">
                {mockTour.reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <Avatar>
                          <AvatarImage src={review.user.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{review.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h4 className="font-semibold">{review.user.name}</h4>
                              <p className="text-sm text-muted-foreground">{review.user.location}</p>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center gap-1 mb-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                      }`}
                                  />
                                ))}
                              </div>
                              <p className="text-sm text-muted-foreground">{review.date}</p>
                            </div>
                          </div>
                          <p className="text-muted-foreground leading-relaxed mb-3">{review.comment}</p>
                          {review.images && review.images.length > 0 && (
                            <div className="flex gap-2 mb-3 overflow-x-auto">
                              {review.images.map((image, index) => (
                                <img
                                  key={index}
                                  src={image || "/placeholder.svg?height=80&width=80&query=review+photo"}
                                  alt={`Review photo ${index + 1}`}
                                  className="w-20 h-20 object-cover rounded-lg shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
                                  onError={(e) => {
                                    e.currentTarget.src = "/photo-review.png"
                                  }}
                                />
                              ))}
                            </div>
                          )}
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Button variant="ghost" size="sm" className="h-auto p-0">
                              Helpful ({review.helpful})
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Related Tours */}
            <div>
              <h3 className="font-heading font-bold text-2xl mb-6">You Might Also Like</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {mockTour.relatedTours.map((tour) => (
                  <Card key={tour.id} className="group hover:shadow-lg transition-shadow cursor-pointer">
                    <Link href={`/tours/${tour.id}`}>
                      <div className="flex gap-4 p-4">
                        <img
                          src={tour.image || "/placeholder.svg?height=96&width=96&query=related+tour"}
                          alt={tour.title}
                          className="w-24 h-24 object-cover rounded-lg"
                          onError={(e) => {
                            e.currentTarget.src = "/related-tour.png"
                          }}
                        />
                        <div className="flex-1">
                          <h4 className="font-heading font-bold group-hover:text-primary transition-colors mb-2">
                            {tour.title}
                          </h4>
                          <div className="flex items-center gap-2 mb-2">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold">{tour.rating}</span>
                          </div>
                          <p className="font-heading font-bold text-primary">€{tour.price}</p>
                        </div>
                      </div>
                    </Link>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 z-20">
              <Card className="shadow-xl">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-heading font-black text-3xl text-primary">€{mockTour.price}</span>
                        {mockTour.originalPrice && (
                          <span className="text-lg text-muted-foreground line-through">€{mockTour.originalPrice}</span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">per person</p>
                    </div>
                    {mockTour.originalPrice && (
                      <Badge className="bg-destructive text-destructive-foreground">
                        Save €{mockTour.originalPrice - mockTour.price}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="font-semibold">{mockTour.duration}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Group size:</span>
                      <span className="font-semibold">{mockTour.groupSize}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Difficulty:</span>
                      <Badge variant="outline">{mockTour.difficulty}</Badge>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <Button className="w-full" size="lg">
                      <Calendar className="w-4 h-4 mr-2" />
                      Check Availability
                    </Button>
                    <ChatButton
                      companyId={mockTour.company.id}
                      tourId={mockTour.id}
                      variant="outline"
                      size="lg"
                      className="w-full bg-transparent"
                    />
                  </div>

                  <div className="text-center text-sm text-muted-foreground">
                    <Shield className="w-4 h-4 inline mr-1" />
                    Free cancellation up to 24 hours before
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {selectedDay !== null && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedDay(null)}
        >
          <div
            className="bg-background rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-background border-b p-6 flex items-center justify-between">
              <div>
                <h2 className="font-heading font-bold text-2xl">{detailedItinerary[selectedDay]?.title}</h2>
                <p className="text-muted-foreground">Day {selectedDay + 1}</p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setSelectedDay(null)} className="hover:bg-muted">
                ✕
              </Button>
            </div>

            <div className="p-6 space-y-8">
              {detailedItinerary[selectedDay]?.activities.map((activity, actIndex) => (
                <div key={actIndex} className="space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${activity.type === "activity"
                        ? "bg-primary"
                        : activity.type === "transportation"
                          ? "bg-secondary"
                          : "bg-ternary"
                        }`}
                    >
                      {activity.type === "activity" ? "🎯" : activity.type === "transportation" ? "🚗" : "🏠"}
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-xl">{activity.title}</h3>
                      <Badge variant="outline" className="capitalize">
                        {activity.type}
                      </Badge>
                    </div>
                  </div>

                  <p className="text-muted-foreground leading-relaxed">{activity.description}</p>

                  {/* Activity images */}
                  {"images" in activity && activity.images && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {activity.images.map((image, imgIndex) => (
                        <div key={imgIndex} className="aspect-video rounded-lg overflow-hidden">
                          <img
                            src={image || `/placeholder.svg?height=200&width=300&query=${activity.title}`}
                            alt={`${activity.title} ${imgIndex + 1}`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                            onError={(e) => {
                              e.currentTarget.src = "/guided-city-tour.png"
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Activity-specific details */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {activity.duration && (
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          Duration
                        </h4>
                        <p className="text-muted-foreground">{activity.duration}</p>
                      </div>
                    )}

                    {"highlights" in activity && activity.highlights && (
                      <div>
                        <h4 className="font-semibold mb-2">Highlights</h4>
                        <ul className="space-y-1">
                          {activity.highlights.map((highlight, hIndex) => (
                            <li key={hIndex} className="text-muted-foreground text-sm flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {"included" in activity && activity.included && (
                      <div>
                        <h4 className="font-semibold mb-2">Included</h4>
                        <ul className="space-y-1">
                          {activity.included.map((item, iIndex) => (
                            <li key={iIndex} className="text-muted-foreground text-sm flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {"requirements" in activity && activity.requirements && (
                      <div>
                        <h4 className="font-semibold mb-2">Requirements</h4>
                        <ul className="space-y-1">
                          {activity.requirements.map((req, rIndex) => (
                            <li key={rIndex} className="text-muted-foreground text-sm flex items-start gap-2">
                              <span className="w-4 h-4 text-orange-500 mt-0.5 shrink-0">⚠️</span>
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {"amenities" in activity && activity.amenities && (
                      <div>
                        <h4 className="font-semibold mb-2">Amenities</h4>
                        <ul className="space-y-1">
                          {activity.amenities.map((amenity, aIndex) => (
                            <li key={aIndex} className="text-muted-foreground text-sm flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                              {amenity}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {"menu" in activity && activity.menu && (
                      <div>
                        <h4 className="font-semibold mb-2">Menu</h4>
                        <ul className="space-y-1">
                          {activity.menu.map((dish, mIndex) => (
                            <li key={mIndex} className="text-muted-foreground text-sm flex items-start gap-2">
                              <span className="w-4 h-4 mt-0.5 shrink-0">🍽️</span>
                              {dish}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {actIndex < detailedItinerary[selectedDay]!.activities.length - 1 && <Separator className="my-6" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
