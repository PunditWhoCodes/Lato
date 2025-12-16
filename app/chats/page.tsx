"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Pin, CheckCheck } from "lucide-react"
import Link from "next/link"
import { ProtectedRoute } from "@/lib/auth"
import { useEnhancedMessages } from "@/contexts/EnhancedMessagesContext"

export default function ChatsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState<"all" | "unread">("all")

  const { getFilteredConversations } = useEnhancedMessages()

  const filteredConversations = getFilteredConversations(
    selectedFilter === "unread" ? "unread" : "all",
    searchQuery
  )

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true })
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-white">
        <Navigation />

        <div className="flex h-[calc(100vh-80px)]">
          {/* Left Sidebar - Chat List */}
          <div className="w-full lg:w-[380px] border-r border-gray-100 bg-[#F8FAFB] flex flex-col">
            {/* Header */}
            <div className="p-6 pb-4">
              <h1 className="font-bold text-xl text-[#1C1B1F] mb-5">Active Chats</h1>

              {/* Search */}
              <div className="relative mb-5">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search or start a new chat"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 rounded-xl border-gray-200 bg-white text-sm placeholder:text-gray-400"
                />
              </div>

              {/* Toggle Tabs */}
              <div className="flex bg-gray-100 rounded-full p-1">
                <button
                  onClick={() => setSelectedFilter("all")}
                  className={`flex-1 py-2.5 px-6 rounded-full text-sm font-medium transition-all ${selectedFilter === "all"
                      ? "bg-[#00A699] text-white"
                      : "text-gray-600 hover:text-gray-800"
                    }`}
                >
                  All
                </button>
                <button
                  onClick={() => setSelectedFilter("unread")}
                  className={`flex-1 py-2.5 px-6 rounded-full text-sm font-medium transition-all ${selectedFilter === "unread"
                      ? "bg-[#00A699] text-white"
                      : "text-gray-600 hover:text-gray-800"
                    }`}
                >
                  Unread
                </button>
              </div>
            </div>

            {/* Chat List */}
            <div className="flex-1 overflow-y-auto px-4">
              {filteredConversations.map((conversation) => (
                <Link key={conversation.id} href={`/chats/${conversation.id}`}>
                  <div className="flex items-start gap-3 p-4 hover:bg-white rounded-xl cursor-pointer transition-colors">
                    {/* Avatar */}
                    <Avatar className="w-12 h-12 shrink-0">
                      <AvatarImage src={conversation.company.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-[#00A699] text-white">
                        {conversation.company.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-[15px] text-[#1C1B1F] truncate">
                          {conversation.company.name}
                        </h3>
                        <span className="text-xs text-[#00A699] shrink-0 ml-2">
                          {formatTime(conversation.lastMessage.timestamp)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500 truncate pr-2">
                          {conversation.lastMessage.text}
                        </p>
                        <div className="flex items-center gap-1 shrink-0">
                          {conversation.unreadCount > 0 ? (
                            <span className="bg-[#00A699] text-white text-xs font-medium rounded-full min-w-5 h-5 flex items-center justify-center px-1.5">
                              {conversation.unreadCount > 5 ? "5+" : conversation.unreadCount}
                            </span>
                          ) : conversation.lastMessage.sender === "user" ? (
                            <CheckCheck className="w-4 h-4 text-[#00A699]" />
                          ) : (
                            <Pin className="w-4 h-4 text-gray-400" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}

              {filteredConversations.length === 0 && (
                <div className="text-center py-12 px-4">
                  <p className="text-gray-500 text-sm">No conversations found</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Empty State (hidden on mobile) */}
          <div className="hidden lg:flex flex-1 flex-col items-center justify-center bg-white">
            {/* Mailbox Illustration */}
            <div className="relative mb-6">
              <svg width="338" height="289" viewBox="0 0 338 289" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M228.961 12.0925C228.961 12.0925 182.665 70.7332 108.593 35.7545C34.5204 0.775743 -39.5523 95.4242 24.2324 153.036C88.0172 210.648 25.5991 242.306 68.9319 277.614C118.183 317.744 161.061 236.368 200.155 254.886C286.437 295.756 350.357 279.577 335.955 232.253C310.672 149.181 278.343 143.777 303.033 100.568C327.724 57.359 273.231 -32.4832 228.961 12.0925Z" fill="#7BBCB0" fill-opacity="0.23" />
                <path d="M203.755 174.277L200.098 193.913L182.677 287.256L151.297 281.397L171.418 173.569L172.375 168.431L203.755 174.277Z" fill="#00A792" />
                <path d="M281.04 127.319L270.219 185.33C270.188 185.5 270.123 185.662 270.028 185.807C269.934 185.952 269.812 186.077 269.669 186.175C269.527 186.273 269.366 186.341 269.197 186.377C269.027 186.413 268.853 186.415 268.683 186.383L116.662 158.03L134.555 62.0945L249.994 83.6252C270.917 87.5267 284.814 107.085 281.04 127.319Z" fill="#7BBCB0" />
                <path d="M167.024 107.851L156.289 165.412L76.4922 150.529L87.2279 92.968C91.1807 71.7749 112.249 57.9257 134.283 62.0353C156.318 66.145 170.977 86.6573 167.024 107.851Z" fill="#00A792" />
                <path d="M204.172 134.759C198.291 133.662 194.411 127.947 195.519 122.012C196.626 116.077 202.305 112.144 208.185 113.241C210.059 113.593 211.807 114.435 213.251 115.682C214.694 116.929 215.781 118.536 216.402 120.339L290.681 134.193L288.674 144.952L214.395 131.098C213.166 132.557 211.573 133.664 209.777 134.307C207.981 134.95 206.047 135.106 204.172 134.759Z" fill="#00A792" />
                <path d="M164.375 108.909L153.915 164.99L78.7441 150.97L89.2048 94.8882C93.0558 74.24 113.006 60.639 133.764 64.5106C154.522 68.3822 168.226 88.2602 164.375 108.909Z" fill="#00A792" />
                <path d="M206.277 129.324C209.299 129.324 211.749 126.874 211.749 123.851C211.749 120.829 209.299 118.379 206.277 118.379C203.255 118.379 200.805 120.829 200.805 123.851C200.805 126.874 203.255 129.324 206.277 129.324Z" fill="white" />
                <path d="M291.54 134.155L284.978 169.334C284.95 169.486 284.863 169.62 284.735 169.707C284.608 169.794 284.452 169.827 284.3 169.799L267.052 166.582C267.022 166.576 266.996 166.559 266.979 166.534C266.962 166.509 266.955 166.478 266.961 166.448L273.608 130.81C273.613 130.78 273.63 130.754 273.656 130.737C273.681 130.719 273.712 130.713 273.741 130.719L291.448 134.021C291.478 134.027 291.504 134.044 291.521 134.069C291.539 134.094 291.545 134.125 291.54 134.155Z" fill="#00A792" />
                <path d="M103.621 130.845C104.347 136.188 110.21 142.539 110.21 142.539C101.277 143.172 96.4383 138.12 94.3564 135.05C91.7825 135.793 89.1371 136.263 86.4644 136.45C68.1233 137.75 52.3344 125.776 51.1942 109.691C50.0539 93.6069 63.9962 79.525 82.3372 78.2252C100.678 76.9255 116.466 88.899 117.606 104.984C118.348 115.446 112.702 125.063 103.621 130.845Z" fill="white" />
                <path d="M156.364 165.447C155.533 167.549 140.345 230.178 91.1939 221.011C37.2969 211.886 76.2818 150.511 76.2818 150.511L156.364 165.447Z" fill="#7BBCB0" />
                <path d="M84.4001 112.855C86.9186 112.855 88.9603 110.814 88.9603 108.295C88.9603 105.777 86.9186 103.735 84.4001 103.735C81.8815 103.735 79.8398 105.777 79.8398 108.295C79.8398 110.814 81.8815 112.855 84.4001 112.855Z" fill="#00A792" />
                <path d="M63.9823 110.867C66.516 110.867 68.57 108.813 68.57 106.279C68.57 103.745 66.516 101.691 63.9823 101.691C61.4485 101.691 59.3945 103.745 59.3945 106.279C59.3945 108.813 61.4485 110.867 63.9823 110.867Z" fill="#00A792" />
                <path d="M104.619 114.799C107.153 114.799 109.207 112.745 109.207 110.211C109.207 107.678 107.153 105.624 104.619 105.624C102.085 105.624 100.031 107.678 100.031 110.211C100.031 112.745 102.085 114.799 104.619 114.799Z" fill="#00A792" />
                <path d="M203.754 174.277L200.096 193.913L171.416 173.569L172.373 168.431L203.754 174.277Z" fill="#00A792" />
              </svg>

            </div>

            <h2 className="font-bold text-xl text-[#1C1B1F] mb-3">No New messages</h2>
            <p className="text-gray-500 text-sm text-center max-w-sm leading-relaxed">
              Companies can be contacted via their products page. Replies will be sent to your email address, if offline.
            </p>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
