import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { ChatButton } from "@/components/chat-button"
import { Star, MapPin, Award, Shield, Globe, Clock, Mail, Phone, Calendar, CheckCircle } from "lucide-react"
import Link from "next/link"
import { companies } from "@/lib/data"
import { mockCompanyDetail } from "./data"
import { CompanyDetailClient } from "./components/company-detail-client"
import { notFound } from "next/navigation"

/**
 * Company Detail Page (Server Component with SSG + ISR)
 *
 * This page is pre-generated at build time and revalidated every hour.
 * Interactive features (save button, tabs) are handled by CompanyDetailClient.
 */

// Generate static params for all companies at build time
export async function generateStaticParams() {
  return companies.map((company) => ({
    id: company.id,
  }))
}

// Revalidate every hour (3600 seconds)
export const revalidate = 3600

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const company = companies.find((c) => c.id === id)

  if (!company) {
    return {
      title: "Company Not Found | Lato Marketplace",
    }
  }

  return {
    title: `${company.name} | Tour Company Profile | Lato Marketplace`,
    description: company.description,
  }
}

export default async function CompanyProfilePage({ params }: { params: Promise<{ id: string }> }) {
  // In production, this would fetch from API
  // For now, using mock data
  const { id } = await params
  const company = companies.find((c) => c.id === id)

  if (!company) {
    notFound()
  }

  // Extended company details (in production, fetch from API)
  const companyDetail = mockCompanyDetail

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
          <span className="text-foreground">{company.name}</span>
        </nav>

        {/* Company Header */}
        <div className="relative mb-8">
          <div className="h-64 rounded-xl overflow-hidden">
            <img src={company.coverImage || "/placeholder.svg"} alt={company.name} className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-16 left-8">
            <Avatar className="w-32 h-32 border-4 border-background">
              <AvatarImage src={company.avatar || "/placeholder.svg"} />
              <AvatarFallback className="text-2xl">{company.name.charAt(0)}</AvatarFallback>
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
                    <h1 className="font-heading font-black text-3xl text-foreground">{company.name}</h1>
                    {company.verified && (
                      <Badge className="bg-green-500 text-white">
                        <Shield className="w-4 h-4 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground mb-3">
                    <MapPin className="w-5 h-5" />
                    <span>{company.location}</span>
                  </div>
                  <div className="flex items-center gap-6 mb-4">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold text-lg">{company.rating}</span>
                      <span className="text-muted-foreground">({companyDetail.reviews.length} reviews)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-muted-foreground" />
                      <span className="text-muted-foreground">{company.yearsExperience} years experience</span>
                    </div>
                  </div>
                </div>

                <CompanyDetailClient
                  companyId={company.id}
                  aboutContent={
                    <>
                      <div>
                        <h3 className="font-heading font-bold text-xl mb-4">About Us</h3>
                        <p className="text-muted-foreground leading-relaxed">{companyDetail.description}</p>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="font-heading font-bold text-xl mb-4">Specialties</h3>
                        <div className="flex flex-wrap gap-2">
                          {companyDetail.specialties.map((specialty, index) => (
                            <Badge key={index} variant="secondary">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="font-heading font-bold text-xl mb-4">Languages</h3>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Globe className="w-5 h-5" />
                          <span>{companyDetail.languages.join(", ")}</span>
                        </div>
                      </div>

                      <Separator />

                      {companyDetail.certifications && (
                        <div>
                          <h3 className="font-heading font-bold text-xl mb-4">Certifications</h3>
                          <ul className="space-y-2">
                            {companyDetail.certifications.map((cert, index) => (
                              <li key={index} className="flex items-center gap-2 text-muted-foreground">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                {cert}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </>
                  }
                  toursContent={
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {companyDetail.tours.map((tour) => (
                        <Card key={tour.id}>
                          <Link href={`/tours/${tour.id}`}>
                            <img src={tour.image} alt={tour.title} className="w-full h-48 object-cover rounded-t-lg" />
                          </Link>
                          <CardContent className="p-4">
                            <h4 className="font-heading font-bold mb-2">{tour.title}</h4>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span className="font-semibold">{tour.rating}</span>
                                <span className="text-muted-foreground text-sm">({tour.reviews})</span>
                              </div>
                              <span className="font-bold text-primary">${tour.price}</span>
                            </div>
                            <p className="text-muted-foreground text-sm mt-2">Duration: {tour.duration}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  }
                  reviewsContent={
                    <div className="space-y-6">
                      {companyDetail.reviews.map((review) => (
                        <Card key={review.id}>
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                              <Avatar>
                                <AvatarImage src={review.user.avatar} />
                                <AvatarFallback>{review.user.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-bold">{review.user.name}</h4>
                                  <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    <span className="font-semibold">{review.rating}</span>
                                  </div>
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">{review.date}</p>
                                <p className="text-muted-foreground">{review.comment}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  }
                />
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {company.badges.map((badge, index) => (
                  <Badge key={index} variant="outline">
                    {badge}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <h3 className="font-heading font-bold text-lg">Contact Information</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                {companyDetail.contact && (
                  <>
                    <div className="flex items-center gap-3 text-sm">
                      <Mail className="w-5 h-5 text-muted-foreground" />
                      <span>{companyDetail.contact.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Phone className="w-5 h-5 text-muted-foreground" />
                      <span>{companyDetail.contact.phone}</span>
                    </div>
                    {companyDetail.contact.website && (
                      <div className="flex items-center gap-3 text-sm">
                        <Globe className="w-5 h-5 text-muted-foreground" />
                        <span>{companyDetail.contact.website}</span>
                      </div>
                    )}
                  </>
                )}
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Clock className="w-5 h-5" />
                  <span>{company.responseTime}</span>
                </div>
                <Separator />
                <div className="space-y-2">
                  <ChatButton companyId={company.id} className="w-full" />
                  <Button variant="outline" className="w-full">
                    View All Tours
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="font-heading font-bold text-lg">Company Stats</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Tours</span>
                  <span className="font-bold">{company.toursCount}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Reviews</span>
                  <span className="font-bold">{company.reviews}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Experience</span>
                  <span className="font-bold">{company.yearsExperience} years</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
