"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Star, MapPin, Award, Shield, Users, Globe } from "lucide-react"
import Link from "next/link"
import { ChatButton } from "@/components/chat-button"
import { companies } from "@/lib/data"
import type { Company } from "@/types"

const mockCompanies: Company[] = companies

export default function CompaniesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [selectedSpecialty, setSelectedSpecialty] = useState("all")
  const [sortBy, setSortBy] = useState("rating")

  // Mock user - in real app this would come from auth context
  const user = undefined

  const locations = [
    "Bali, Indonesia",
    "Tokyo, Japan",
    "Santorini, Greece",
    "Amazon, Brazil",
    "Marrakech, Morocco",
    "Reykjavik, Iceland",
  ]
  const specialties = ["Cultural Tours", "Food Tours", "Photography", "Wildlife", "Cooking Classes", "Northern Lights"]

  const filteredCompanies = mockCompanies.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.specialties.some((specialty) => specialty.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesLocation = selectedLocation === "all" || company.location.includes(selectedLocation)
    const matchesSpecialty = selectedSpecialty === "all" || company.specialties.includes(selectedSpecialty)

    return matchesSearch && matchesLocation && matchesSpecialty
  })

  const sortedCompanies = [...filteredCompanies].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating
      case "reviews":
        return b.reviews - a.reviews
      case "experience":
        return b.yearsExperience - a.yearsExperience
      case "tours":
        return b.toursCount - a.toursCount
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="relative bg-linear-to-br from-primary/5 via-primary/10 to-secondary/5 py-12 px-4 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-8">
            <h1 className="font-heading font-black text-3xl md:text-4xl text-foreground mb-4 leading-tight">
              Trusted Tour
              <span className="block text-transparent bg-linear-to-r from-primary to-secondary bg-clip-text">
                Companies
              </span>
            </h1>
            <p className="text-lg text-muted-foreground mb-6 max-w-3xl mx-auto leading-relaxed">
              Connect with verified local experts and professional tour operators worldwide. Experience authentic
              adventures with trusted guides.
            </p>
          </div>

          {/* Modern Search Bar */}
          <div className="max-w-3xl mx-auto">
            <div className="relative group">
              <div className="absolute inset-0 bg-linear-to-r from-primary/20 to-secondary/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-2xl border border-white/20">
                <div className="relative">
                  <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-muted-foreground h-6 w-6" />
                  <Input
                    placeholder="Search companies, locations, or specialties..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-16 pr-6 py-6 text-lg rounded-xl border-0 bg-transparent focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground/70"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="All Locations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {locations.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="All Specialties" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Specialties</SelectItem>
              {specialties.map((specialty) => (
                <SelectItem key={specialty} value={specialty}>
                  {specialty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="reviews">Most Reviews</SelectItem>
              <SelectItem value="experience">Most Experience</SelectItem>
              <SelectItem value="tours">Most Tours</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results Count */}
        <p className="text-muted-foreground mb-6">
          Showing {sortedCompanies.length} of {mockCompanies.length} companies
        </p>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedCompanies.map((company) => (
            <Card
              key={company.id}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border-0 shadow-lg overflow-hidden"
            >
              <Link href={`/companies/${company.id}`}>
                <div className="relative h-32 overflow-hidden">
                  <img
                    src={company.coverImage || "/placeholder.svg?height=128&width=400&query=company cover"}
                    alt={company.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = "/abstract-company-cover.png"
                    }}
                  />
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    {company.verified && (
                      <Badge className="bg-green-500 text-white">
                        <Shield className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                </div>
              </Link>

              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage
                      src={company.avatar || "/placeholder.svg?height=48&width=48&query=company avatar"}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = "/abstract-company-avatar.png"
                      }}
                    />
                    <AvatarFallback>{company.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Link href={`/companies/${company.id}`}>
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-heading font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                          {company.name}
                        </h3>
                        <div className="flex items-center gap-1 px-2 py-1 bg-muted rounded-full">
                          <span className="text-sm">{company.countryFlag}</span>
                          <span className="text-xs text-muted-foreground">{company.country}</span>
                        </div>
                      </div>
                    </Link>
                    <div className="flex items-center gap-1 text-muted-foreground text-sm mb-2">
                      <MapPin className="w-4 h-4" />
                      <span>{company.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {company.badges.slice(0, 2).map((badge, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {badge}
                    </Badge>
                  ))}
                </div>

                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{company.description}</p>

                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{company.rating}</span>
                    <span className="text-muted-foreground">({company.reviews})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{company.yearsExperience} years</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{company.toursCount} tours</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{company.languages.length} languages</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" className="flex-1" asChild>
                    <Link href={`/companies/${company.id}`}>View Profile</Link>
                  </Button>
                  <ChatButton companyId={company.id} size="sm" variant="outline" className="px-3" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {sortedCompanies.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="font-heading font-bold text-xl mb-2">No companies found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or filters to find more companies.
            </p>
            <Button
              onClick={() => {
                setSearchQuery("")
                setSelectedLocation("all")
                setSelectedSpecialty("all")
              }}
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
