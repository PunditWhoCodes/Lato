import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <Navigation />

      {/* Hero Section Skeleton */}
      <section className="relative w-full h-[200px] md:h-[220px] bg-gray-300 animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/30" />
        <div className="relative z-10 max-w-[1440px] mx-auto px-4 md:px-10 h-full flex flex-col justify-center">
          <Skeleton className="h-4 w-64 mb-3 bg-white/20" />
          <Skeleton className="h-10 w-80 mb-4 bg-white/20" />
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-10 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar Skeleton */}
          <aside className="w-full lg:w-[260px] flex-shrink-0">
            <div className="bg-white rounded-[8px] p-5">
              <Skeleton className="h-6 w-16 mb-5" />

              {/* Destination */}
              <div className="mb-6">
                <Skeleton className="h-4 w-24 mb-3" />
                <Skeleton className="h-10 w-full mb-3" />
                <div className="flex gap-2">
                  <Skeleton className="h-9 flex-1" />
                  <Skeleton className="h-9 flex-1" />
                </div>
              </div>

              {/* Filter Sections */}
              {[1, 2, 3, 4, 5].map((section) => (
                <div key={section} className="mb-6">
                  <Skeleton className="h-4 w-20 mb-3" />
                  <div className="space-y-2.5">
                    {[1, 2, 3, 4, 5].map((item) => (
                      <div key={item} className="flex items-center gap-2.5">
                        <Skeleton className="h-4 w-4" />
                        <Skeleton className="h-4 flex-1" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Apply Button */}
              <Skeleton className="h-10 w-full" />
            </div>
          </aside>

          {/* Main Content Area Skeleton */}
          <div className="flex-1 min-w-0">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-10 w-48" />
            </div>

            {/* Tours Grid Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                <div key={i} className="bg-white rounded-[10px] overflow-hidden">
                  <Skeleton className="h-[180px] w-full" />
                  <div className="p-4">
                    <Skeleton className="h-3 w-20 mb-1" />
                    <Skeleton className="h-4 w-full mb-1" />
                    <Skeleton className="h-4 w-3/4 mb-3" />
                    <Skeleton className="h-3 w-24 mb-3" />
                    <Skeleton className="h-5 w-32 mb-3" />
                    <Skeleton className="h-3 w-28 mb-3" />
                    <div className="flex gap-3">
                      <Skeleton className="h-3 w-24" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Skeleton */}
            <div className="flex items-center justify-center gap-1 mt-10">
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <Skeleton key={i} className="h-9 w-9" />
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
