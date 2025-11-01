"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import {
  Home,
  Search,
  MapPin,
  Compass,
  ArrowLeft,
  Sparkles,
  TrendingUp
} from "lucide-react"
import { useState } from "react"

export default function NotFound() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/tours?search=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const popularDestinations = [
    { name: "Bali", icon: "🌴", href: "/tours?destination=Bali" },
    { name: "Tokyo", icon: "🗼", href: "/tours?destination=Tokyo" },
    { name: "Paris", icon: "🗼", href: "/tours?destination=Paris" },
    { name: "Iceland", icon: "🏔️", href: "/tours?destination=Iceland" },
  ]

  const quickLinks = [
    { label: "Explore All Tours", href: "/tours", icon: Compass },
    { label: "Tour Companies", href: "/companies", icon: TrendingUp },
    { label: "Adventure Tours", href: "/tours?style=adventure", icon: MapPin },
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <main className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12 md:py-16">
        <div className="max-w-4xl w-full">
          {/* Hero Section */}
          <div className="text-center mb-8 sm:mb-12">
            {/* 404 Number with gradient */}
            <div className="relative mb-6 sm:mb-8">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 sm:w-64 sm:h-64 bg-linear-to-br from-primary/20 via-secondary/20 to-primary/20 rounded-full blur-3xl animate-pulse"></div>
              </div>
              <h1 className="relative font-heading font-black text-7xl sm:text-8xl md:text-9xl lg:text-[12rem] leading-none">
                <span className="text-transparent bg-linear-to-br from-primary via-secondary to-primary bg-clip-text">
                  404
                </span>
              </h1>
            </div>

            {/* Message */}
            <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-xs sm:text-sm font-medium">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                Oops! Wrong Turn
              </div>
              <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-foreground">
                Adventure Not Found
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4">
                The page you're looking for seems to have wandered off the map. But don't worry, there are plenty of amazing adventures waiting for you!
              </p>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-8 sm:mb-10">
              <div className="relative group">
                <div className="absolute inset-0 bg-linear-to-r from-primary to-secondary rounded-full opacity-20 blur-lg group-hover:opacity-30 transition-opacity"></div>
                <div className="relative bg-white rounded-full shadow-xl border border-white/20 p-2">
                  <div className="flex items-center gap-2">
                    <Search className="ml-3 sm:ml-4 text-muted-foreground h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
                    <Input
                      type="text"
                      placeholder="Search for tours, destinations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="border-0 bg-transparent text-sm sm:text-base placeholder:text-muted-foreground/70 focus-visible:ring-0 px-2 sm:px-3"
                    />
                    <Button
                      type="submit"
                      size="sm"
                      className="rounded-full px-4 sm:px-6 py-2 shadow-lg hover:shadow-xl transition-all"
                    >
                      Search
                    </Button>
                  </div>
                </div>
              </div>
            </form>

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-12">
              <Button
                asChild
                size="lg"
                className="rounded-full px-6 sm:px-8 shadow-lg hover:shadow-xl transition-all hover:scale-105 w-full sm:w-auto"
              >
                <Link href="/">
                  <Home className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Back to Home
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full px-6 sm:px-8 shadow-lg hover:shadow-xl transition-all hover:scale-105 w-full sm:w-auto"
              >
                <Link href="/tours">
                  <Compass className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Explore Tours
                </Link>
              </Button>
            </div>
          </div>

          {/* Popular Destinations */}
          <div className="mb-8 sm:mb-10">
            <h3 className="font-heading font-semibold text-base sm:text-lg text-center mb-4 sm:mb-6">
              Popular Destinations
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {popularDestinations.map((destination) => (
                <Link key={destination.name} href={destination.href}>
                  <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-4 sm:p-6 text-center">
                      <div className="text-3xl sm:text-4xl mb-2 sm:mb-3 group-hover:scale-110 transition-transform">
                        {destination.icon}
                      </div>
                      <p className="font-medium text-sm sm:text-base text-foreground group-hover:text-primary transition-colors">
                        {destination.name}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-base sm:text-lg text-center mb-4 sm:mb-6">
              Quick Links
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {quickLinks.map((link) => (
                <Link key={link.label} href={link.href}>
                  <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border-0 shadow-lg bg-linear-to-br from-white to-primary/5">
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-primary/20 group-hover:scale-110 transition-all">
                          <link.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm sm:text-base text-foreground group-hover:text-primary transition-colors truncate">
                            {link.label}
                          </p>
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            Discover more
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Back Navigation */}
          <div className="text-center mt-8 sm:mt-12">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
