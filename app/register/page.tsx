"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { MapPin, Eye, EyeOff, User, Building2 } from "lucide-react"

type UserType = "traveler" | "provider" | null

export default function RegisterPage() {
  const [step, setStep] = useState<"userType" | "form">("userType")
  const [userType, setUserType] = useState<UserType>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    agreeToTerms: false,
  })

  const handleUserTypeSelect = (type: UserType) => {
    setUserType(type)
  }

  const handleContinue = () => {
    if (userType) {
      setStep("form")
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement registration logic
    console.log("Registration attempt:", { ...formData, userType })
  }

  if (step === "userType") {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-cyan-50 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          {/* Logo */}
          <div className="flex items-center justify-center mb-8">
            <Link href="/" className="flex items-center space-x-2">
              <MapPin className="h-8 w-8 text-primary" />
              <span className="font-heading font-black text-2xl text-foreground">Lato Marketplace</span>
            </Link>
          </div>

          <div className="text-center mb-12">
            <h1 className="font-heading text-4xl font-bold text-foreground mb-4">
              Join as a traveler or tour provider
            </h1>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Traveler Option */}
            <Card
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg border-2 ${userType === "traveler" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                }`}
              onClick={() => handleUserTypeSelect("traveler")}
            >
              <CardContent className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <User className="h-12 w-12 text-primary" />
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${userType === "traveler" ? "border-primary bg-primary" : "border-muted-foreground"
                      }`}
                  >
                    {userType === "traveler" && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </div>
                <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
                  I'm a traveler, looking for experiences
                </h3>
                <p className="text-muted-foreground">Discover and book unique tours and experiences around the world</p>
              </CardContent>
            </Card>

            {/* Tour Provider Option */}
            <Card
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg border-2 ${userType === "provider" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                }`}
              onClick={() => handleUserTypeSelect("provider")}
            >
              <CardContent className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <Building2 className="h-12 w-12 text-primary" />
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${userType === "provider" ? "border-primary bg-primary" : "border-muted-foreground"
                      }`}
                  >
                    {userType === "provider" && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </div>
                <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
                  I'm a tour provider, offering experiences
                </h3>
                <p className="text-muted-foreground">
                  Share your expertise and create memorable experiences for travelers
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button onClick={handleContinue} disabled={!userType} className="px-12 py-3 text-lg font-semibold">
              Create Account
            </Button>
            <div className="mt-6 text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline font-medium">
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <Link href="/" className="flex items-center space-x-2">
            <MapPin className="h-8 w-8 text-primary" />
            <span className="font-heading font-black text-2xl text-foreground">Lato Marketplace</span>
          </Link>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="font-heading text-2xl font-bold">
              Create your {userType === "traveler" ? "traveler" : "provider"} account
            </CardTitle>
            <CardDescription>
              {userType === "traveler"
                ? "Join thousands of travelers discovering unique experiences"
                : "Start sharing your expertise with travelers worldwide"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>

              {userType === "provider" && (
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    type="text"
                    placeholder="Enter your company name"
                    value={formData.companyName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, companyName: e.target.value }))}
                    required
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, agreeToTerms: checked as boolean }))}
                />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the{" "}
                  <Link href="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </Label>
              </div>
              <Button type="submit" className="w-full font-semibold" disabled={!formData.agreeToTerms}>
                Create Account
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <div className="text-sm text-center text-muted-foreground w-full">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline font-medium">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
