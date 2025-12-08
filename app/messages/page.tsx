"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, MessageCircle } from "lucide-react"
import Link from "next/link"
import { ProtectedRoute, useAuth } from "@/lib/auth"
import { useEnhancedMessages } from "@/contexts/EnhancedMessagesContext"
import type { FilterType } from "./types/enhanced"

export default function MessagesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("all")

  const { user } = useAuth()
  const { getFilteredConversations, getTotalUnread } = useEnhancedMessages()

  const filteredConversations = getFilteredConversations(selectedFilter, searchQuery)
  const totalUnread = getTotalUnread()

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Navigation />

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-heading font-black text-3xl text-foreground mb-2">Messages</h1>
              <p className="text-muted-foreground">Communicate directly with tour providers and manage your bookings</p>
            </div>
            {totalUnread > 0 && (
              <Badge className="bg-primary text-primary-foreground">
                {totalUnread} unread message{totalUnread !== 1 ? "s" : ""}
              </Badge>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Conversations List */}
            <div className="lg:col-span-1 space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-2">
                {[
                  { key: "all" as FilterType, label: "All" },
                  { key: "unread" as FilterType, label: "Unread" },
                  { key: "active" as FilterType, label: "Active" },
                  { key: "completed" as FilterType, label: "Completed" },
                ].map((filter) => (
                  <Button
                    key={filter.key}
                    variant={selectedFilter === filter.key ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFilter(filter.key)}
                  >
                    {filter.label}
                  </Button>
                ))}
              </div>

              {/* Conversations */}
              <div className="flex flex-col space-y-2">
                {filteredConversations.map((conversation) => (
                  <Link key={conversation.id} href={`/messages/${conversation.id}`}>
                    <Card className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex gap-3">
                          <div className="relative">
                            <Avatar>
                              <AvatarImage src={conversation.company.avatar || "/placeholder.svg"} />
                              <AvatarFallback>{conversation.company.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            {conversation.unreadCount > 0 && (
                              <Badge className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs min-w-[18px] h-[18px] flex items-center justify-center p-0 rounded-full animate-pulse">
                                {conversation.unreadCount}
                              </Badge>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="font-semibold text-sm truncate">{conversation.company.name}</h3>
                              <span className="text-xs text-muted-foreground">
                                {conversation.lastMessage.timestamp}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground mb-2 truncate">{conversation.tour.title}</p>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {conversation.lastMessage.text}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>

              {filteredConversations.length === 0 && (
                <div className="text-center py-8">
                  <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">No conversations found</h3>
                  <p className="text-sm text-muted-foreground">
                    {searchQuery ? "Try adjusting your search" : "Start chatting with tour providers!"}
                  </p>
                </div>
              )}
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <Card className="h-[600px] flex items-center justify-center">
                <div className="text-center">
                  <MessageCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-heading font-bold text-xl mb-2">Select a conversation</h3>
                  <p className="text-muted-foreground">Choose a conversation from the list to start messaging</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
