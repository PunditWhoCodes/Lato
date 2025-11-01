import { Navigation } from "@/components/navigation"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Cover Image Skeleton */}
        <Skeleton className="w-full h-64 rounded-lg mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Company Header Skeleton */}
            <div className="flex items-start gap-6 -mt-20">
              <Skeleton className="h-32 w-32 rounded-lg border-4 border-white shrink-0" />
              <div className="flex-1 mt-20">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <Skeleton className="h-8 w-64 mb-2" />
                    <Skeleton className="h-5 w-48 mb-3" />
                    <div className="flex items-center gap-3 mb-2">
                      <Skeleton className="h-5 w-24" />
                      <Skeleton className="h-5 w-32" />
                    </div>
                  </div>
                  <Skeleton className="h-10 w-10 rounded-full" />
                </div>

                {/* Badges Skeleton */}
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="h-6 w-24" />
                  ))}
                </div>

                {/* Stats Skeleton */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="text-center p-4 bg-muted/30 rounded-lg">
                      <Skeleton className="h-8 w-16 mx-auto mb-2" />
                      <Skeleton className="h-4 w-20 mx-auto" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tabs Skeleton */}
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="tours">Tours</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="space-y-6">
                {/* Description Skeleton */}
                <div>
                  <Skeleton className="h-7 w-32 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </div>

                {/* Specialties Skeleton */}
                <div>
                  <Skeleton className="h-7 w-32 mb-4" />
                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Skeleton key={i} className="h-8 w-32" />
                    ))}
                  </div>
                </div>

                {/* Certifications Skeleton */}
                <div>
                  <Skeleton className="h-7 w-40 mb-4" />
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center gap-3">
                        <Skeleton className="h-5 w-5" />
                        <Skeleton className="h-4 w-64" />
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="tours">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[1, 2, 3, 4].map((i) => (
                    <Card key={i} className="overflow-hidden">
                      <Skeleton className="w-full h-48" />
                      <CardContent className="p-4 space-y-3">
                        <Skeleton className="h-6 w-3/4" />
                        <div className="flex items-center justify-between">
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-4 w-20" />
                        </div>
                        <div className="flex items-center gap-2">
                          <Skeleton className="h-4 w-4" />
                          <Skeleton className="h-4 w-16" />
                        </div>
                        <Skeleton className="h-10 w-full" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="reviews">
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <Card key={i}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <Skeleton className="h-12 w-12 rounded-full" />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <Skeleton className="h-5 w-32" />
                              <Skeleton className="h-4 w-24" />
                            </div>
                            <div className="flex gap-1 mb-2">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Skeleton key={star} className="h-4 w-4" />
                              ))}
                            </div>
                            <Skeleton className="h-4 w-full mb-1" />
                            <Skeleton className="h-4 w-full mb-1" />
                            <Skeleton className="h-4 w-2/3" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Contact Card Skeleton */}
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-48" />
                </CardHeader>
                <CardContent className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Skeleton className="h-5 w-5" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  ))}
                  <Separator />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>

              {/* Quick Stats Card Skeleton */}
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-32" />
                </CardHeader>
                <CardContent className="space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center justify-between">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
