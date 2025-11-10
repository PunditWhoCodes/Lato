"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { useSavedCompanies } from "@/lib/saved-companies-context"
import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface CompanyDetailClientProps {
  companyId: string
  aboutContent: React.ReactNode
  toursContent: React.ReactNode
  reviewsContent: React.ReactNode
}

export function CompanyDetailClient({ companyId, aboutContent, toursContent, reviewsContent }: CompanyDetailClientProps) {
  const [activeTab, setActiveTab] = useState("about")
  const { toggleSaveCompany, isCompanySaved } = useSavedCompanies()

  const isSaved = isCompanySaved(companyId)

  return (
    <>
      <Button variant={isSaved ? "default" : "outline"} onClick={() => toggleSaveCompany(companyId)}>
        <Heart className={cn("w-4 h-4 mr-2", isSaved && "fill-current")} />
        {isSaved ? "Saved" : "Save Company"}
      </Button>

      <CompanyTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        aboutContent={aboutContent}
        toursContent={toursContent}
        reviewsContent={reviewsContent}
      />
    </>
  )
}

interface CompanyTabsProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  aboutContent: React.ReactNode
  toursContent: React.ReactNode
  reviewsContent: React.ReactNode
}

export function CompanyTabs({ activeTab, setActiveTab, aboutContent, toursContent, reviewsContent }: CompanyTabsProps) {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="about">About</TabsTrigger>
        <TabsTrigger value="tours">Tours</TabsTrigger>
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
      </TabsList>

      <TabsContent value="about" className="space-y-6">
        {aboutContent}
      </TabsContent>

      <TabsContent value="tours" className="space-y-6">
        {toursContent}
      </TabsContent>

      <TabsContent value="reviews" className="space-y-6">
        {reviewsContent}
      </TabsContent>
    </Tabs>
  )
}
