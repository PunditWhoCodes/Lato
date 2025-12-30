"use client"

import { useState, useMemo } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Heart,
  Star,
  Clock,
  Users,
  MapPin,
  MessageCircle,
  Trash2,
  Building2,
  Globe,
  Calendar,
} from "lucide-react"
import Link from "next/link"
import { ProtectedRoute, useAuth } from "@/lib/auth"
import { useSavedTours } from "@/lib/saved-tours-context"
import { useSavedCompanies } from "@/lib/saved-companies-context"
import { tours, companies } from "@/lib/data"
import { ShimmerImage } from "@/components/ui/shimmer-image"

export default function SavedTripsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("trips")

  const { user } = useAuth()
  const { savedTours, toggleSaveTour } = useSavedTours()
  const { savedCompanies, toggleSaveCompany } = useSavedCompanies()

  // Get actual saved tours data
  const savedTripsData = useMemo(() => {
    return tours.filter((tour) => {
      const tourIdentifier = tour.uuid || tour.id.toString()
      return savedTours.includes(tourIdentifier)
    })
  }, [savedTours])

  // Get actual saved companies data
  const savedCompaniesData = useMemo(() => {
    return companies.filter((company) => savedCompanies.includes(company.id))
  }, [savedCompanies])

  const filteredTrips = savedTripsData.filter(
    (trip) =>
      trip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.company.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredCompanies = savedCompaniesData.filter(
    (company) =>
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const removeSavedTrip = (tripId: string) => {
    toggleSaveTour(tripId)
  }

  const removeSavedCompany = (companyId: string) => {
    toggleSaveCompany(companyId)
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Navigation />

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-heading font-black text-3xl text-foreground mb-2">Saved Items</h1>
              <p className="text-muted-foreground">Keep track of tours and companies you're interested in</p>
            </div>
            <div className="flex gap-2">
              <Badge className="bg-primary text-primary-foreground">
                {savedTripsData.length} trip{savedTripsData.length !== 1 ? "s" : ""}
              </Badge>
              <Badge className="bg-secondary text-secondary-foreground">
                {savedCompaniesData.length} compan{savedCompaniesData.length !== 1 ? "ies" : "y"}
              </Badge>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-8 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder={`Search saved ${activeTab}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
              <TabsTrigger value="trips" className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                Saved Trips ({savedTripsData.length})
              </TabsTrigger>
              <TabsTrigger value="companies" className="flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Saved Companies ({savedCompaniesData.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="trips">
              {/* Saved Trips Grid */}
              {filteredTrips.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTrips.map((trip) => (
                    <Card key={trip.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                      <div className="relative h-48">
                        <ShimmerImage
                          src={trip.image || "/placeholder.svg"}
                          alt={trip.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-3 right-3 flex gap-2">
                          <Button
                            size="sm"
                            variant="secondary"
                            className="bg-white/90 hover:bg-white text-red-500 hover:text-red-600"
                            onClick={() => removeSavedTrip(trip.uuid || trip.id.toString())}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        {trip.originalPrice && trip.originalPrice > trip.price && (
                          <Badge className="absolute top-3 left-3 bg-green-500 text-white">
                            Save €{trip.originalPrice - trip.price}
                          </Badge>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <Badge variant="outline" className="text-xs">
                            {trip.category}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{trip.rating}</span>
                            <span className="text-xs text-muted-foreground">({trip.reviews})</span>
                          </div>
                        </div>

                        <h3 className="font-heading font-bold text-lg mb-2 line-clamp-2">{trip.title}</h3>

                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-sm text-muted-foreground">{trip.company}</span>
                        </div>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            <span>{trip.location}</span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{trip.duration}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              <span>{trip.groupSize}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-heading font-bold text-xl text-primary">€{trip.price}</span>
                            {trip.originalPrice && trip.originalPrice > trip.price && (
                              <span className="text-sm text-muted-foreground line-through">€{trip.originalPrice}</span>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" asChild>
                              <Link href={`/messages/conv-${trip.uuid || trip.id}`}>
                                <MessageCircle className="w-4 h-4" />
                              </Link>
                            </Button>
                            <Button size="sm" asChild>
                              <Link href={`/tours/${trip.uuid || trip.id}`}>View Details</Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-heading font-bold text-xl mb-2">No saved trips found</h3>
                  <p className="text-muted-foreground mb-6">
                    {searchQuery ? "Try adjusting your search" : "Start exploring tours and save the ones you love!"}
                  </p>
                  <Button asChild>
                    <Link href="/tours">Explore Tours</Link>
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="companies">
              {filteredCompanies.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCompanies.map((company) => (
                    <Card
                      key={company.id}
                      className="group hover:shadow-lg transition-all duration-300 overflow-hidden"
                    >
                      <div className="relative">
                        <img
                          src={company.coverImage || "/placeholder.svg"}
                          alt={company.name}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-3 right-3 flex gap-2">
                          <Button
                            size="sm"
                            variant="secondary"
                            className="bg-white/90 hover:bg-white text-red-500 hover:text-red-600"
                            onClick={() => removeSavedCompany(company.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <Badge className="absolute top-3 left-3 bg-muted text-muted-foreground">
                          {company.countryFlag} {company.country}
                        </Badge>
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={company.avatar || "/placeholder.svg"} />
                              <AvatarFallback>{company.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            {company.verified && (
                              <Badge variant="outline" className="text-green-600 border-green-600 text-xs">
                                Verified
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{company.rating}</span>
                            <span className="text-xs text-muted-foreground">({company.reviews})</span>
                          </div>
                        </div>

                        <h3 className="font-heading font-bold text-lg mb-2">{company.name}</h3>

                        <div className="flex items-center gap-2 mb-3">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{company.location}</span>
                        </div>

                        <div className="flex flex-wrap gap-1 mb-3">
                          {company.specialties.map((specialty) => (
                            <Badge key={specialty} variant="secondary" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>

                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{company.description}</p>

                        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <span>{company.yearsExperience} years</span>
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Users className="w-4 h-4" />
                            <span>{company.toursCount} tours</span>
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Globe className="w-4 h-4" />
                            <span>{company.languages.length} languages</span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" asChild>
                            <Link href={`/messages/conv-company-${company.id}`}>
                              <MessageCircle className="w-4 h-4" />
                            </Link>
                          </Button>
                          <Button size="sm" asChild>
                            <Link href={`/companies/${company.id}`}>View Profile</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <Building2 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-heading font-bold text-xl mb-2">No saved companies found</h3>
                  <p className="text-muted-foreground mb-6">
                    {searchQuery
                      ? "Try adjusting your search"
                      : "Start exploring companies and save the ones you trust!"}
                  </p>
                  <Button asChild>
                    <Link href="/companies">Explore Companies</Link>
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ProtectedRoute>
  )
}
