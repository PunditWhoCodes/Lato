"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Pin, CheckCheck, Phone, Video, Info, Send, Paperclip, Check, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { ProtectedRoute, useAuth } from "@/lib/auth"
import { useEnhancedMessages } from "@/contexts/EnhancedMessagesContext"

export default function ChatConversationPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState<"all" | "unread">("all")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  const {
    getFilteredConversations,
    getConversation,
    markAsRead,
    addMessage,
  } = useEnhancedMessages()

  const currentConversation = getConversation(params.id as string)
  const filteredConversations = getFilteredConversations(
    selectedFilter === "unread" ? "unread" : "all",
    searchQuery
  )

  // Redirect if conversation not found
  useEffect(() => {
    if (!currentConversation) {
      router.push("/chats")
    }
  }, [currentConversation, router])

  // Mark conversation as read when opened
  useEffect(() => {
    if (params.id) {
      markAsRead(params.id as string)
    }
  }, [params.id, markAsRead])

  // Scroll to bottom on new messages
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight
    }
  }, [currentConversation?.messages])

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true }).toUpperCase()
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !currentConversation) return

    addMessage(params.id as string, newMessage, "user")
    setNewMessage("")

    // Simulate company response
    setTimeout(() => {
      addMessage(
        params.id as string,
        "Thanks for your message! I'll get back to you shortly with more details.",
        "company"
      )
    }, 2000)
  }

  if (!currentConversation) {
    return null
  }

  // Get initials for company avatar
  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase()
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-white">
        <Navigation />

        <div className="flex h-[calc(100vh-80px)]">
          {/* Left Sidebar - Chat List (hidden on mobile) */}
          <div className="hidden lg:flex w-[380px] border-r border-gray-100 bg-[#F8FAFB] flex-col">
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
                  className={`flex-1 py-2.5 px-6 rounded-full text-sm font-medium transition-all ${
                    selectedFilter === "all"
                      ? "bg-[#00A699] text-white"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setSelectedFilter("unread")}
                  className={`flex-1 py-2.5 px-6 rounded-full text-sm font-medium transition-all ${
                    selectedFilter === "unread"
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
                  <div
                    className={`flex items-start gap-3 p-4 rounded-xl cursor-pointer transition-colors ${
                      params.id === conversation.id
                        ? "bg-white shadow-sm"
                        : "hover:bg-white"
                    }`}
                  >
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
            </div>
          </div>

          {/* Right Panel - Chat Conversation */}
          <div className="flex-1 flex flex-col bg-white">
            {/* Chat Header */}
            <div className="flex items-center justify-between px-4 lg:px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-3 lg:gap-4">
                {/* Back button for mobile */}
                <Link
                  href="/chats"
                  className="lg:hidden p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Back to chats"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </Link>
                <Avatar className="w-10 h-10 lg:w-12 lg:h-12">
                  <AvatarImage src={currentConversation.company.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-[#00A699] text-white">
                    {currentConversation.company.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-bold text-[17px] text-[#1C1B1F]">
                    {currentConversation.company.name}
                  </h2>
                  <p className="text-sm text-gray-500">#{currentConversation.company.id.toUpperCase()}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  className="p-2.5 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Voice call"
                >
                  <Phone className="w-5 h-5 text-[#00A699]" />
                </button>
                <button
                  className="p-2.5 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Video call"
                >
                  <Video className="w-5 h-5 text-[#00A699]" />
                </button>
                <button
                  className="p-2.5 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="View info"
                >
                  <Info className="w-5 h-5 text-[#00A699]" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto p-6 space-y-6"
            >
              {currentConversation.messages.map((message) => (
                <div key={message.id}>
                  {message.sender === "company" ? (
                    // Incoming message (from company)
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#E6F7F5] flex items-center justify-center shrink-0">
                        <span className="text-sm font-semibold text-[#00A699]">
                          {getInitials(currentConversation.company.name)}
                        </span>
                      </div>
                      <div className="max-w-[60%]">
                        <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-md px-5 py-3.5 shadow-sm">
                          <p className="text-[#00A699] text-[15px] leading-relaxed">
                            {message.text}
                          </p>
                        </div>
                        <p className="text-xs text-gray-400 mt-2 ml-1">
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  ) : (
                    // Outgoing message (from user)
                    <div className="flex items-start justify-end gap-3">
                      <div className="max-w-[60%]">
                        <div className="bg-[#00A699] rounded-2xl rounded-tr-md px-5 py-3.5">
                          <p className="text-white text-[15px] leading-relaxed">
                            {message.text}
                          </p>
                        </div>
                        <p className="text-xs text-gray-400 mt-2 text-right mr-1">
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                      <Avatar className="w-10 h-10 shrink-0">
                        <AvatarImage src={user?.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-orange-400 text-white">
                          {user?.name?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="px-4 lg:px-6 py-4 border-t border-gray-100">
              <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                <div className="flex-1 relative">
                  <Input
                    placeholder="Type a message"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="h-14 rounded-full border-gray-200 bg-gray-50 px-5 pr-14 text-[15px] placeholder:text-gray-400"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="w-12 h-12 rounded-full bg-[#00A699] hover:bg-[#008F85] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                  aria-label="Send message"
                >
                  <Send className="w-5 h-5 text-white" />
                </button>
                <button
                  type="button"
                  className="hidden sm:flex w-10 h-10 rounded-full hover:bg-gray-100 items-center justify-center transition-colors"
                  aria-label="Attach file"
                >
                  <Paperclip className="w-5 h-5 text-gray-400" />
                </button>
                <button
                  type="button"
                  className="hidden sm:flex w-10 h-10 rounded-full hover:bg-gray-100 items-center justify-center transition-colors"
                  aria-label="Mark as done"
                >
                  <Check className="w-5 h-5 text-[#00A699]" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
