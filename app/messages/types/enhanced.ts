// Enhanced unified types for Messages system

export interface ChatMessage {
  id: number
  sender: "user" | "company"
  text: string
  timestamp: string // ISO timestamp
  type: "text" | "image" | "tour"
  tourData?: {
    id: number
    title: string
    price: number
    image: string
  }
}

export interface EnhancedConversation {
  id: string
  company: {
    id: string
    name: string
    avatar: string
    verified: boolean
    rating: number
    responseTime: string // "Usually responds within 1 hour"
    isOnline: boolean // NEW: Real-time online status
    lastSeen: string // NEW: ISO timestamp of last activity
    timezone: string // NEW: IANA timezone (e.g., "Asia/Tokyo")
  }
  tour: {
    id: number
    title: string
    price: number
    duration?: string
    groupSize?: string
    image?: string
  }
  lastMessage: {
    text: string
    timestamp: string // ISO timestamp
    sender: "company" | "user"
  }
  unreadCount: number
  status: "active" | "completed" | "pending"
  messages: ChatMessage[] // Full conversation history
  deleted: boolean // NEW: Soft delete flag
  createdAt: string // NEW: ISO timestamp
  updatedAt: string // NEW: ISO timestamp
}

export type FilterType = "all" | "unread" | "active" | "completed"

export interface MessagesState {
  readStatus: Record<string, boolean>
  deletedConversations: string[]
  lastSync: string
}
