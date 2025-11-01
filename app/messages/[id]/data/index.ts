import type { ConversationDetail } from "../types"

export const mockConversationsDetail: ConversationDetail[] = [
  {
    id: "conv-1",
    company: {
      id: "bali-explorer",
      name: "Bali Explorer Co.",
      avatar: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=200&h=200&fit=crop",
      verified: true,
      rating: 4.8,
      responseTime: "Usually responds within 1 hour",
    },
    tour: {
      id: 1,
      title: "Bali Temple & Rice Terrace Adventure",
      price: 89,
      duration: "8 hours",
      groupSize: "2-12 people",
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&h=300&fit=crop",
    },
    lastMessage: {
      text: "Perfect! I'll send you the detailed itinerary and pickup details shortly. Looking forward to showing you the beautiful temples and rice terraces!",
      timestamp: "2 hours ago",
      sender: "company",
    },
    unreadCount: 0,
    status: "active",
    messages: [
      {
        id: 1,
        sender: "user",
        text: "Hi! I'm interested in your Bali temple tour. Is it available for next week?",
        timestamp: "2024-01-15T10:00:00Z",
        type: "text",
      },
      {
        id: 2,
        sender: "company",
        text: "Hello! Thank you for your interest in our temple and rice terrace tour. Yes, we have availability next week. What dates were you thinking?",
        timestamp: "2024-01-15T10:15:00Z",
        type: "text",
      },
      {
        id: 3,
        sender: "user",
        text: "I was thinking Tuesday or Wednesday. How many people can join?",
        timestamp: "2024-01-15T10:30:00Z",
        type: "text",
      },
      {
        id: 4,
        sender: "company",
        text: "Both days work perfectly! We can accommodate 2-12 people. The tour includes temple visits, rice terrace exploration, and a traditional lunch. Would you like me to send you the detailed itinerary?",
        timestamp: "2024-01-15T10:45:00Z",
        type: "text",
      },
      {
        id: 5,
        sender: "user",
        text: "Yes, please! Also, what's included in the price?",
        timestamp: "2024-01-15T11:00:00Z",
        type: "text",
      },
      {
        id: 6,
        sender: "company",
        text: "Great! The €89 per person includes:\n• Professional English-speaking guide\n• Air-conditioned transportation\n• Traditional Balinese lunch\n• All temple entrance fees\n• Hotel pickup and drop-off (Ubud area)\n• Bottled water and snacks",
        timestamp: "2024-01-15T11:10:00Z",
        type: "text",
      },
      {
        id: 7,
        sender: "company",
        text: "I'll send you our detailed itinerary now!",
        timestamp: "2024-01-15T11:12:00Z",
        type: "text",
      },
      {
        id: 8,
        sender: "user",
        text: "Perfect! I'll review it and get back to you. This looks amazing!",
        timestamp: "2024-01-15T11:30:00Z",
        type: "text",
      },
      {
        id: 9,
        sender: "company",
        text: "Perfect! I'll send you the detailed itinerary and pickup details shortly. Looking forward to showing you the beautiful temples and rice terraces!",
        timestamp: "2024-01-15T12:00:00Z",
        type: "text",
      },
    ],
  },
  {
    id: "conv-2",
    company: {
      id: "tokyo-taste",
      name: "Tokyo Taste Tours",
      avatar: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=200&h=200&fit=crop",
      verified: true,
      rating: 4.9,
      responseTime: "Usually responds within 30 minutes",
    },
    tour: {
      id: 2,
      title: "Tokyo Street Food & Culture Walk",
      price: 65,
      duration: "4 hours",
      groupSize: "4-8 people",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop",
    },
    lastMessage: {
      text: "Hi! Thanks for your interest in our street food tour. What dates are you looking at?",
      timestamp: "1 day ago",
      sender: "company",
    },
    unreadCount: 2,
    status: "active",
    messages: [
      {
        id: 1,
        sender: "user",
        text: "Hello! I'd love to book your Tokyo street food tour. Do you have availability in February?",
        timestamp: "2024-01-14T09:00:00Z",
        type: "text",
      },
      {
        id: 2,
        sender: "company",
        text: "Hi! Thanks for your interest in our street food tour. What dates are you looking at?",
        timestamp: "2024-01-14T09:30:00Z",
        type: "text",
      },
    ],
  },
]

export const getConversationById = (id: string): ConversationDetail | undefined => {
  return mockConversationsDetail.find((conv) => conv.id === id)
}
