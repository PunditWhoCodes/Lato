"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChatButton } from "@/components/chat-button"
import { Star, MapPin, Award, Shield, Globe, Clock, Mail, Phone, Calendar, CheckCircle, Heart } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { mockCompanyDetail } from "./data"

const mockCompany = mockCompanyDetail


export default function CompanyProfilePage() {
  const params = useParams()
  const [activeTab, setActiveTab] = useState("about")

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
          <Link href="/companies" className="hover:text-foreground">
            Companies
          </Link>
          <span>/</span>
          <span className="text-foreground">{mockCompany.name}</span>
        </nav>

        {/* Company Header */}
        <div className="relative mb-8">
          <div className="h-64 rounded-xl overflow-hidden">
            <img
              src={mockCompany.coverImage || "/placeholder.svg"}
              alt={mockCompany.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-16 left-8">
            <Avatar className="w-32 h-32 border-4 border-background">
              <AvatarImage src={mockCompany.avatar || "/placeholder.svg"} />
              <AvatarFallback className="text-2xl">{mockCompany.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Company Info */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="font-heading font-black text-3xl text-foreground">{mockCompany.name}</h1>
                    {mockCompany.verified && (
                      <Badge className="bg-green-500 text-white">
                        <Shield className="w-4 h-4 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground mb-3">
                    <MapPin className="w-5 h-5" />
                    <span>{mockCompany.location}</span>
                  </div>
                  <div className="flex items-center gap-6 mb-4">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold text-lg">{mockCompany.rating}</span>
                      <span className="text-muted-foreground">({mockCompany.reviews.length} reviews)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-muted-foreground" />
                      <span className="text-muted-foreground">{mockCompany.yearsExperience} years experience</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline">
                  <Heart className="w-4 h-4 mr-2" />
                  Save
                </Button>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {mockCompany.badges.map((badge, index) => (
                  <Badge key={index} variant="outline">
                    {badge}
                  </Badge>
                ))}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <div className="font-heading font-bold text-2xl text-primary">{mockCompany.stats?.totalGuests || 0}</div>
                  <div className="text-sm text-muted-foreground">Total Guests</div>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <div className="font-heading font-bold text-2xl text-primary">{mockCompany.toursCount}</div>
                  <div className="text-sm text-muted-foreground">Tours Offered</div>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <div className="font-heading font-bold text-2xl text-primary">
                    {mockCompany.stats?.repeatCustomers || 0}%
                  </div>
                  <div className="text-sm text-muted-foreground">Repeat Customers</div>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <div className="font-heading font-bold text-2xl text-primary">{mockCompany.stats?.completedTours || 0}</div>
                  <div className="text-sm text-muted-foreground">Completed Tours</div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="tours">Tours ({mockCompany.tours.length})</TabsTrigger>
                <TabsTrigger value="reviews">Reviews ({mockCompany.reviews.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="space-y-6">
                <div>
                  <h3 className="font-heading font-bold text-xl mb-4">About Us</h3>
                  <p className="text-muted-foreground leading-relaxed">{mockCompany.description}</p>
                </div>

                <div>
                  <h3 className="font-heading font-bold text-xl mb-4">Specialties</h3>
                  <div className="flex flex-wrap gap-2">
                    {mockCompany.specialties.map((specialty, index) => (
                      <Badge key={index} variant="outline">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-heading font-bold text-xl mb-4">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {mockCompany.languages.map((language, index) => (
                      <Badge key={index} variant="outline">
                        <Globe className="w-3 h-3 mr-1" />
                        {language}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-heading font-bold text-xl mb-4">Certifications</h3>
                  <ul className="space-y-2">
                    {mockCompany.certifications?.map((cert, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span>{cert}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="tours" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mockCompany.tours.map((tour) => (
                    <Card key={tour.id} className="group hover:shadow-lg transition-shadow cursor-pointer">
                      <Link href={`/tours/${tour.id}`}>
                        <div className="aspect-video overflow-hidden rounded-t-lg">
                          <img
                            src={tour.image || "/placeholder.svg"}
                            alt={tour.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <CardContent className="p-4">
                          <h4 className="font-heading font-bold text-lg group-hover:text-primary transition-colors mb-2">
                            {tour.title}
                          </h4>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-semibold">{tour.rating}</span>
                              <span className="text-muted-foreground">({tour.reviews})</span>
                            </div>
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Clock className="w-4 h-4" />
                              <span>{tour.duration}</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="font-heading font-bold text-xl text-primary">€{tour.price}</span>
                            <Button size="sm">View Details</Button>
                          </div>
                        </CardContent>
                      </Link>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading font-bold text-xl">Customer Reviews</h3>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold text-lg">{mockCompany.rating}</span>
                    <span className="text-muted-foreground">average</span>
                  </div>
                </div>

                <div className="space-y-6">
                  {mockCompany.reviews.map((review) => (
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
                                      className={`w-4 h-4 ${
                                        i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <p className="text-sm text-muted-foreground">{review.date}</p>
                              </div>
                            </div>
                            <Badge variant="outline" className="mb-3">
                              {review.tourTitle}
                            </Badge>
                            <p className="text-muted-foreground mb-3">{review.comment}</p>
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
              </TabsContent>
            </Tabs>
          </div>

          {/* Contact Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <Card>
                <CardHeader>
                  <h3 className="font-heading font-bold text-lg">Contact Information</h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm">{mockCompany.responseTime}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm">{mockCompany.contact?.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm">{mockCompany.contact?.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm">{mockCompany.contact?.website}</span>
                  </div>
                  <Separator />
                  <div className="space-y-3">
                    <ChatButton companyId={mockCompany.id} size="lg" className="w-full" />
                    <Button variant="outline" className="w-full bg-transparent" size="lg">
                      <Calendar className="w-4 h-4 mr-2" />
                      Book Consultation
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <h3 className="font-heading font-bold text-lg">Quick Stats</h3>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Response Rate:</span>
                    <span className="font-semibold">98%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">On-time Rate:</span>
                    <span className="font-semibold">99%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Cancellation Rate:</span>
                    <span className="font-semibold">1%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Member Since:</span>
                    <span className="font-semibold">2019</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
