import { Navigation } from "@/components/navigation"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Skeleton className="h-10 w-48 mb-2" />
            <Skeleton className="h-5 w-96" />
          </div>
          <Skeleton className="h-8 w-40" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Conversations List Skeleton */}
          <div className="lg:col-span-1 space-y-4">
            {/* Search Skeleton */}
            <Skeleton className="h-10 w-full" />

            {/* Filters Skeleton */}
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-8 w-20" />
              ))}
            </div>

            {/* Conversation Cards Skeleton */}
            <div className="flex flex-col space-y-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Card key={i}>
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-3 w-16" />
                        </div>
                        <Skeleton className="h-3 w-full mb-2" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Main Content Skeleton */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] flex items-center justify-center">
              <div className="text-center">
                <Skeleton className="h-16 w-16 rounded-full mx-auto mb-4" />
                <Skeleton className="h-7 w-56 mx-auto mb-2" />
                <Skeleton className="h-5 w-72 mx-auto" />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
