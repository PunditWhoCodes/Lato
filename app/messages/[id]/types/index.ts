// Page-specific types for Message Detail (Chat) page

export interface ChatMessage {
  id: number
  sender: "user" | "company"
  text: string
  timestamp: string
  type: "text" | "image" | "tour"
  tourData?: {
    id: number
    title: string
    price: number
    image: string
  }
}

export interface ConversationDetail {
  id: string
  company: {
    id: string
    name: string
    avatar: string
    verified: boolean
    rating: number
    responseTime: string
  }
  tour: {
    id: number
    title: string
    price: number
    duration: string
    groupSize: string
    image: string
  }
  lastMessage: {
    text: string
    timestamp: string
    sender: "company" | "user"
  }
  unreadCount: number
  status: "active" | "completed" | "pending"
  messages: ChatMessage[]
}
