import { Navigation } from "@/components/navigation"
import { Skeleton } from "@/components/ui/skeleton"

export default function ChatConversationLoading() {
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
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <div className="flex items-center gap-4">
              <Skeleton className="w-12 h-12 rounded-full" />
              <div>
                <Skeleton className="h-5 w-40 mb-2" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
            <div className="flex gap-3">
              <Skeleton className="w-10 h-10 rounded-lg" />
              <Skeleton className="w-10 h-10 rounded-lg" />
              <Skeleton className="w-10 h-10 rounded-lg" />
            </div>
          </div>

          {/* Messages skeleton */}
          <div className="flex-1 p-6 space-y-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`flex gap-3 ${i % 2 === 0 ? "" : "justify-end"}`}
              >
                {i % 2 === 0 && <Skeleton className="w-10 h-10 rounded-full shrink-0" />}
                <div className={`max-w-[60%] ${i % 2 !== 0 ? "text-right" : ""}`}>
                  <Skeleton className={`h-16 w-64 rounded-2xl ${i % 2 !== 0 ? "ml-auto" : ""}`} />
                  <Skeleton className={`h-3 w-16 mt-2 ${i % 2 !== 0 ? "ml-auto" : ""}`} />
                </div>
                {i % 2 !== 0 && <Skeleton className="w-10 h-10 rounded-full shrink-0" />}
              </div>
            ))}
          </div>

          {/* Input skeleton */}
          <div className="px-6 py-4 border-t">
            <div className="flex items-center gap-3">
              <Skeleton className="flex-1 h-14 rounded-full" />
              <Skeleton className="w-12 h-12 rounded-full" />
              <Skeleton className="w-10 h-10 rounded-full" />
              <Skeleton className="w-10 h-10 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
