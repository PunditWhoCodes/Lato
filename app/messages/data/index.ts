import type { Conversation } from "../types"

export const mockConversations: Conversation[] = [
  {
    id: "conv-1",
    company: {
      id: "bali-explorer",
      name: "Bali Explorer Co.",
      avatar: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=200&h=200&fit=crop",
      verified: true,
    },
    tour: {
      id: 1,
      title: "Bali Temple & Rice Terrace Adventure",
      price: 89,
    },
    lastMessage: {
      text: "Perfect! I'll send you the detailed itinerary and pickup details shortly. Looking forward to showing you the beautiful temples and rice terraces!",
      timestamp: "2 hours ago",
      sender: "company",
    },
    unreadCount: 0,
    status: "active",
  },
  {
    id: "conv-2",
    company: {
      id: "tokyo-taste",
      name: "Tokyo Taste Tours",
      avatar: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=200&h=200&fit=crop",
      verified: true,
    },
    tour: {
      id: 2,
      title: "Tokyo Street Food & Culture Walk",
      price: 65,
    },
    lastMessage: {
      text: "Hi! Thanks for your interest in our street food tour. What dates are you looking at?",
      timestamp: "1 day ago",
      sender: "company",
    },
    unreadCount: 2,
    status: "active",
  },
  {
    id: "conv-3",
    company: {
      id: "greek-island",
      name: "Greek Island Adventures",
      avatar: "https://images.unsplash.com/photo-1601581987809-a874a81309c9?w=200&h=200&fit=crop",
      verified: true,
    },
    tour: {
      id: 3,
      title: "Santorini Sunset Photography Tour",
      price: 120,
    },
    lastMessage: {
      text: "Thank you for the amazing tour! The photos came out incredible.",
      timestamp: "3 days ago",
      sender: "user",
    },
    unreadCount: 0,
    status: "completed",
  },
  {
    id: "conv-4",
    company: {
      id: "marrakech-flavors",
      name: "Marrakech Flavors",
      avatar: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=200&h=200&fit=crop",
      verified: true,
    },
    tour: {
      id: 4,
      title: "Moroccan Cooking Class & Market Tour",
      price: 75,
    },
    lastMessage: {
      text: "We have availability for next week! Would Tuesday or Wednesday work better for you?",
      timestamp: "5 days ago",
      sender: "company",
    },
    unreadCount: 1,
    status: "active",
  },
]
