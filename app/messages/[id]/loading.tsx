import { Navigation } from "@/components/navigation"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Messages List Skeleton */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-24" />
            </div>

            {/* Search Skeleton */}
            <Skeleton className="h-10 w-full" />

            {/* Conversations Skeleton */}
            <div className="space-y-2">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i}>
                  <CardContent className="p-3">
                    <div className="flex gap-2">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <Skeleton className="h-3 w-20" />
                          <Skeleton className="h-3 w-12" />
                        </div>
                        <Skeleton className="h-3 w-full mb-1" />
                        <Skeleton className="h-3 w-full" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Chat Interface Skeleton */}
          <div className="lg:col-span-3">
            <Card className="h-[700px] flex flex-col">
              {/* Chat Header Skeleton */}
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div>
                      <Skeleton className="h-5 w-48 mb-2" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-9 w-9" />
                    <Skeleton className="h-9 w-9" />
                    <Skeleton className="h-9 w-9" />
                  </div>
                </div>
              </CardHeader>

              {/* Messages Skeleton */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className={`flex ${i % 2 === 0 ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`flex gap-2 max-w-[70%] ${i % 2 === 0 ? "flex-row-reverse" : ""}`}
                    >
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <div className="space-y-1">
                        <Skeleton className="h-16 w-64 rounded-lg" />
                        <Skeleton className="h-3 w-16" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input Skeleton */}
              <div className="border-t p-4">
                <div className="flex gap-2">
                  <Skeleton className="h-9 w-9" />
                  <Skeleton className="h-9 w-9" />
                  <Skeleton className="h-10 flex-1" />
                  <Skeleton className="h-10 w-20" />
                </div>
              </div>
            </Card>
          </div>

          {/* Tour Info Sidebar Skeleton */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-32" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <Skeleton className="w-full h-32 rounded-lg" />
                  <div>
                    <Skeleton className="h-5 w-full mb-2" />
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-4 w-4" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-4 w-4" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-32" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
