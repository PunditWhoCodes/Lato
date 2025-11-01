// Page-specific types for Messages page

export interface Conversation {
  id: string
  company: {
    id: string
    name: string
    avatar: string
    verified: boolean
  }
  tour: {
    id: number
    title: string
    price: number
  }
  lastMessage: {
    text: string
    timestamp: string
    sender: "company" | "user"
  }
  unreadCount: number
  status: "active" | "completed" | "pending"
}
