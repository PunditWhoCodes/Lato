"use client"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ReviewsSection } from "./reviews-section"
import type { CompanyReview, Guide } from "@/lib/types/investor"

interface CompanyTabsProps {
  reviews: CompanyReview[]
  companyName: string
  aboutContent: string
  guides: Guide[]
  onWriteReview?: () => void
  onFindTours?: () => void
}

export function CompanyTabs({
  reviews,
  companyName,
  aboutContent,
  guides,
  onWriteReview,
  onFindTours,
}: CompanyTabsProps) {
  return (
    <Tabs defaultValue="reviews" className="w-full">
      <TabsList className="w-full justify-start bg-transparent border-b border-gray-100 rounded-none p-0 h-auto gap-4 md:gap-6">
        <TabsTrigger
          value="reviews"
          className="font-poppins text-sm px-1 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-black data-[state=active]:bg-transparent data-[state=active]:shadow-none bg-transparent text-gray-400 hover:text-gray-600"
        >
          Reviews
        </TabsTrigger>
        <TabsTrigger
          value="find-tours"
          className="font-poppins text-sm px-1 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-black data-[state=active]:bg-transparent data-[state=active]:shadow-none bg-transparent text-gray-400 hover:text-gray-600"
        >
          Find Tours
        </TabsTrigger>
        <TabsTrigger
          value="about"
          className="font-poppins text-sm px-1 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-black data-[state=active]:bg-transparent data-[state=active]:shadow-none bg-transparent text-gray-400 hover:text-gray-600"
        >
          About
        </TabsTrigger>
        <TabsTrigger
          value="guides"
          className="font-poppins text-sm px-1 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-black data-[state=active]:bg-transparent data-[state=active]:shadow-none bg-transparent text-gray-400 hover:text-gray-600"
        >
          Guides
        </TabsTrigger>
      </TabsList>

      <TabsContent value="reviews" className="mt-0">
        <ReviewsSection reviews={reviews} onWriteReview={onWriteReview} />
      </TabsContent>

      <TabsContent value="find-tours" className="mt-6">
        <div className="text-center py-12">
          <p className="font-poppins text-gray-500 mb-4">
            Browse all tours offered by {companyName}
          </p>
          <button
            onClick={onFindTours}
            className="font-poppins text-sm text-primary hover:underline"
          >
            View all tours →
          </button>
        </div>
      </TabsContent>

      <TabsContent value="about" className="mt-6">
        <div className="py-6">
          <h3 className="font-poppins font-semibold text-lg text-black mb-3">
            About {companyName}
          </h3>
          <p className="font-poppins text-sm md:text-base text-gray-600 leading-relaxed">
            {aboutContent}
          </p>
        </div>
      </TabsContent>

      <TabsContent value="guides" className="mt-6">
        {guides.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-6">
            {guides.map((guide) => (
              <div
                key={guide.id}
                className="bg-white rounded-xl p-4 border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={guide.avatar}
                    alt={guide.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-poppins font-medium text-sm text-black">
                      {guide.name}
                    </h4>
                    <p className="font-poppins text-xs text-gray-500">
                      {guide.specialization}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>{guide.experience} exp</span>
                  <span>⭐ {guide.rating}</span>
                  <span>{guide.tours} tours</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="font-poppins text-gray-500">
              No guides information available
            </p>
          </div>
        )}
      </TabsContent>
    </Tabs>
  )
}
