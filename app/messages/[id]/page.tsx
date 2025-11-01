"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  Send,
  Star,
  Clock,
  Users,
  Calendar,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  ImageIcon,
  Search,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ProtectedRoute, useAuth } from "@/lib/auth"
import { mockConversationsDetail, getConversationById } from "./data"
import type { ConversationDetail } from "./types"


export default function ChatPage() {
  const params = useParams()
  const { user } = useAuth()
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const currentConversation = mockConversationsDetail.find((conv) => conv.id === params.id) || mockConversationsDetail[0]
  const [messages, setMessages] = useState(currentConversation.messages)

  useEffect(() => {
    const conversation = mockConversationsDetail.find((conv) => conv.id === params.id)
    if (conversation) {
      setMessages(conversation.messages)
    }
  }, [params.id])

  const filteredConversations = mockConversationsDetail.filter(
    (conv) =>
      conv.company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.tour.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const message = {
      id: messages.length + 1,
      sender: "user" as const,
      text: newMessage,
      timestamp: new Date().toISOString(),
      type: "text" as const,
    }

    setMessages([...messages, message])
    setNewMessage("")

    // Simulate company response after a delay
    setTimeout(() => {
      const response = {
        id: messages.length + 2,
        sender: "company" as const,
        text: "Thanks for your message! I'll get back to you shortly with more details.",
        timestamp: new Date().toISOString(),
        type: "text" as const,
      }
      setMessages((prev) => [...prev, response])
    }, 2000)
  }

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString([], { month: "short", day: "numeric" })
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Navigation />

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Messages List - Always visible */}
            <div className="lg:col-span-1 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-heading font-bold text-lg">Messages</h2>
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Conversations */}
              <div className="space-y-2 max-h-[500px] overflow-y-auto">
                {filteredConversations.map((conversation) => (
                  <Link key={conversation.id} href={`/messages/${conversation.id}`}>
                    <Card
                      className={`hover:shadow-md transition-shadow cursor-pointer ${
                        params.id === conversation.id ? "ring-2 ring-primary" : ""
                      }`}
                    >
                      <CardContent className="p-3">
                        <div className="flex gap-2">
                          <div className="relative">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={conversation.company.avatar || "/placeholder.svg"} />
                              <AvatarFallback>{conversation.company.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            {conversation.unreadCount > 0 && (
                              <div className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center">
                                {conversation.unreadCount}
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="font-semibold text-xs truncate">{conversation.company.name}</h3>
                              <span className="text-xs text-muted-foreground">
                                {conversation.lastMessage.timestamp}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground mb-1 truncate">{conversation.tour.title}</p>
                            <p className="text-xs text-muted-foreground line-clamp-1">
                              {conversation.lastMessage.text}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>

            {/* Chat Interface */}
            <div className="lg:col-span-3">
              <Card className="h-[700px] flex flex-col">
                {/* Chat Header */}
                <CardHeader className="border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={currentConversation.company.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{currentConversation.company.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-heading font-bold">{currentConversation.company.name}</h3>
                          {currentConversation.company.verified && (
                            <Badge variant="outline" className="text-green-600 border-green-600 text-xs">
                              Verified
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>Online • {currentConversation.company.responseTime}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Video className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message, index) => {
                    const showDate =
                      index === 0 || formatDate(message.timestamp) !== formatDate(messages[index - 1].timestamp)

                    return (
                      <div key={message.id}>
                        {showDate && (
                          <div className="text-center my-4">
                            <span className="bg-muted px-3 py-1 rounded-full text-sm text-muted-foreground">
                              {formatDate(message.timestamp)}
                            </span>
                          </div>
                        )}
                        <div className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                          <div
                            className={`flex gap-2 max-w-[70%] ${message.sender === "user" ? "flex-row-reverse" : ""}`}
                          >
                            <Avatar className="w-8 h-8">
                              <AvatarImage
                                src={
                                  message.sender === "user"
                                    ? user?.avatar || "/placeholder.svg"
                                    : currentConversation.company.avatar || "/placeholder.svg"
                                }
                              />
                              <AvatarFallback>
                                {message.sender === "user"
                                  ? user?.name.charAt(0) || "U"
                                  : currentConversation.company.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div
                              className={`rounded-lg px-4 py-2 ${
                                message.sender === "user"
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted text-foreground"
                              }`}
                            >
                              <p className="whitespace-pre-wrap">{message.text}</p>
                              <p
                                className={`text-xs mt-1 ${
                                  message.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                                }`}
                              >
                                {formatTime(message.timestamp)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="border-t p-4">
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <Button type="button" variant="outline" size="sm">
                      <Paperclip className="w-4 h-4" />
                    </Button>
                    <Button type="button" variant="outline" size="sm">
                      <ImageIcon className="w-4 h-4" />
                    </Button>
                    <Input
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-1"
                    />
                    <Button type="submit" disabled={!newMessage.trim()}>
                      <Send className="w-4 h-4" />
                    </Button>
                  </form>
                </div>
              </Card>
            </div>

            {/* Tour Info Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                <Card>
                  <CardHeader>
                    <h3 className="font-heading font-bold">Tour Details</h3>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <img
                      src={currentConversation.tour.image || "/placeholder.svg"}
                      alt={currentConversation.tour.title}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <div>
                      <h4 className="font-semibold mb-2">{currentConversation.tour.title}</h4>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{currentConversation.tour.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span>{currentConversation.tour.groupSize}</span>
                        </div>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="font-heading font-bold text-2xl text-primary">
                        €{currentConversation.tour.price}
                      </span>
                      <span className="text-sm text-muted-foreground">per person</span>
                    </div>
                    <div className="space-y-2">
                      <Button className="w-full" asChild>
                        <Link href={`/tours/${currentConversation.tour.id}`}>View Tour Details</Link>
                      </Button>
                      <Button variant="outline" className="w-full bg-transparent">
                        <Calendar className="w-4 h-4 mr-2" />
                        Book Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <h3 className="font-heading font-bold">Company Info</h3>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{currentConversation.company.rating}</span>
                      <span className="text-muted-foreground text-sm">(342 reviews)</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{currentConversation.company.responseTime}</p>
                    <Button variant="outline" className="w-full bg-transparent" asChild>
                      <Link href={`/companies/${currentConversation.company.id}`}>View Company Profile</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
