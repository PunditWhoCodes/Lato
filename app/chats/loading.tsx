import { Navigation } from "@/components/navigation"
import { Skeleton } from "@/components/ui/skeleton"

export default function ChatsLoading() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Sidebar */}
        <div className="w-[380px] border-r border-gray-100 bg-[#F8FAFB] p-6">
          <Skeleton className="h-7 w-32 mb-5" />
          <Skeleton className="h-14 w-full rounded-xl mb-5" />
          <Skeleton className="h-11 w-full rounded-full mb-6" />

          {/* Chat list skeleton */}
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex gap-3 p-4">
                <Skeleton className="w-12 h-12 rounded-full flex-shrink-0" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-32 mb-2" />
                  <Skeleton className="h-3 w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Skeleton className="w-44 h-40 rounded-full mx-auto mb-6" />
            <Skeleton className="h-6 w-48 mx-auto mb-3" />
            <Skeleton className="h-4 w-64 mx-auto" />
          </div>
        </div>
      </div>
    </div>
  )
}
