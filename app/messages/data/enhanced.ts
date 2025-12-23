import type { EnhancedConversation } from "../types/enhanced"

export const enhancedMockConversations: EnhancedConversation[] = [
  {
    id: "conv-1",
    company: {
      id: "bali-explorer",
      name: "Bali Explorer Co.",
      avatar: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=200&h=200&fit=crop",
      verified: true,
      rating: 4.8,
      reviewCount: 290,
      responseTime: "Usually responds within 1 hour",
      isOnline: true,
      lastSeen: new Date().toISOString(),
      timezone: "Asia/Makassar", // Bali timezone (UTC+8)
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
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      sender: "company",
    },
    unreadCount: 0,
    status: "active",
    deleted: false,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    messages: [
      {
        id: 1,
        sender: "user",
        text: "Hi! I'm interested in your Bali temple tour. Is it available for next week?",
        timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
        type: "text",
      },
      {
        id: 2,
        sender: "company",
        text: "Hello! Thank you for your interest in our temple and rice terrace tour. Yes, we have availability next week. What dates were you thinking?",
        timestamp: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString(),
        type: "text",
      },
      {
        id: 3,
        sender: "user",
        text: "I was thinking Tuesday or Wednesday. How many people can join?",
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
        type: "text",
      },
      {
        id: 4,
        sender: "company",
        text: "Both days work perfectly! We can accommodate 2-12 people. The tour includes temple visits, rice terrace exploration, and a traditional lunch. Would you like me to send you the detailed itinerary?",
        timestamp: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
        type: "text",
      },
      {
        id: 5,
        sender: "user",
        text: "Yes, please! Also, what's included in the price?",
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        type: "text",
      },
      {
        id: 6,
        sender: "company",
        text: "Great! The €89 per person includes:\n• Professional English-speaking guide\n• Air-conditioned transportation\n• Traditional Balinese lunch\n• All temple entrance fees\n• Hotel pickup and drop-off (Ubud area)\n• Bottled water and snacks",
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        type: "text",
      },
      {
        id: 7,
        sender: "company",
        text: "I'll send you our detailed itinerary now!",
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        type: "text",
      },
      {
        id: 8,
        sender: "user",
        text: "Perfect! I'll review it and get back to you. This looks amazing!",
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
        type: "text",
      },
      {
        id: 9,
        sender: "company",
        text: "Perfect! I'll send you the detailed itinerary and pickup details shortly. Looking forward to showing you the beautiful temples and rice terraces!",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
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
      reviewCount: 412,
      responseTime: "Usually responds within 30 minutes",
      isOnline: false,
      lastSeen: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
      timezone: "Asia/Tokyo", // Tokyo timezone (UTC+9)
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
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
      sender: "company",
    },
    unreadCount: 2,
    status: "active",
    deleted: false,
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    messages: [
      {
        id: 1,
        sender: "user",
        text: "Hello! I'd love to book your Tokyo street food tour. Do you have availability in February?",
        timestamp: new Date(Date.now() - 25 * 60 * 60 * 1000).toISOString(),
        type: "text",
      },
      {
        id: 2,
        sender: "company",
        text: "Hi! Thanks for your interest in our street food tour. What dates are you looking at?",
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        type: "text",
      },
    ],
  },
  {
    id: "conv-3",
    company: {
      id: "greek-island",
      name: "Greek Island Adventures",
      avatar: "https://images.unsplash.com/photo-1601581987809-a874a81309c9?w=200&h=200&fit=crop",
      verified: true,
      rating: 4.7,
      reviewCount: 186,
      responseTime: "Usually responds within 2 hours",
      isOnline: false,
      lastSeen: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
      timezone: "Europe/Athens", // Greece timezone (UTC+2)
    },
    tour: {
      id: 3,
      title: "Santorini Sunset Photography Tour",
      price: 120,
      duration: "3 hours",
      groupSize: "2-6 people",
      image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=400&h=300&fit=crop",
    },
    lastMessage: {
      text: "Thank you for the amazing tour! The photos came out incredible.",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
      sender: "user",
    },
    unreadCount: 0,
    status: "completed",
    deleted: false,
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    messages: [
      {
        id: 1,
        sender: "user",
        text: "Hi! I'm interested in the sunset photography tour. Do you provide cameras or should I bring my own?",
        timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        type: "text",
      },
      {
        id: 2,
        sender: "company",
        text: "Hello! We recommend bringing your own camera or smartphone. We'll teach you the best spots and settings for amazing sunset shots!",
        timestamp: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
        type: "text",
      },
      {
        id: 3,
        sender: "user",
        text: "Perfect! I'll bring my DSLR. Booking for next Saturday.",
        timestamp: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
        type: "text",
      },
      {
        id: 4,
        sender: "company",
        text: "Excellent choice! See you next Saturday at 5 PM. Meet at the Oia main square.",
        timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        type: "text",
      },
      {
        id: 5,
        sender: "user",
        text: "Thank you for the amazing tour! The photos came out incredible.",
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        type: "text",
      },
    ],
  },
  {
    id: "conv-4",
    company: {
      id: "marrakech-flavors",
      name: "Marrakech Flavors",
      avatar: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=200&h=200&fit=crop",
      verified: true,
      rating: 4.6,
      reviewCount: 127,
      responseTime: "Usually responds within 3 hours",
      isOnline: true,
      lastSeen: new Date().toISOString(),
      timezone: "Africa/Casablanca", // Morocco timezone (UTC+1)
    },
    tour: {
      id: 4,
      title: "Moroccan Cooking Class & Market Tour",
      price: 75,
      duration: "5 hours",
      groupSize: "4-10 people",
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop",
    },
    lastMessage: {
      text: "We have availability for next week! Would Tuesday or Wednesday work better for you?",
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
      sender: "company",
    },
    unreadCount: 1,
    status: "active",
    deleted: false,
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    messages: [
      {
        id: 1,
        sender: "user",
        text: "I'm interested in your cooking class. What will we be making?",
        timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
        type: "text",
      },
      {
        id: 2,
        sender: "company",
        text: "We have availability for next week! Would Tuesday or Wednesday work better for you?",
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        type: "text",
      },
    ],
  },
]

export const getConversationById = (id: string): EnhancedConversation | undefined => {
  return enhancedMockConversations.find((conv) => conv.id === id && !conv.deleted)
}
