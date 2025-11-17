"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from "react"
import { enhancedMockConversations } from "@/app/messages/data/enhanced"
import type { EnhancedConversation, FilterType, MessagesState } from "@/app/messages/types/enhanced"

interface EnhancedMessagesContextType {
  // Data
  conversations: EnhancedConversation[]

  // Read/Unread
  markAsRead: (conversationId: string) => void
  markAsUnread: (conversationId: string) => void
  getTotalUnread: () => number

  // Delete functionality
  deleteConversation: (conversationId: string) => void
  restoreConversation: (conversationId: string) => void
  permanentlyDeleteConversation: (conversationId: string) => void

  // Filtering
  getFilteredConversations: (filter: FilterType, searchQuery?: string) => EnhancedConversation[]
  getConversation: (conversationId: string) => EnhancedConversation | undefined

  // Messages
  addMessage: (conversationId: string, text: string, sender: "user" | "company") => void
}

const EnhancedMessagesContext = createContext<EnhancedMessagesContextType | undefined>(undefined)

const STORAGE_KEY = "lato_messages_state"

export function EnhancedMessagesProvider({ children }: { children: React.ReactNode }) {
  const [conversations, setConversations] = useState<EnhancedConversation[]>([])

  // Initialize state from localStorage or mock data
  useEffect(() => {
    const storedData = localStorage.getItem(STORAGE_KEY)

    if (storedData) {
      try {
        const state = JSON.parse(storedData) as MessagesState

        // Apply stored state to mock data
        const updatedConversations = enhancedMockConversations.map((conv) => ({
          ...conv,
          unreadCount: state.readStatus[conv.id] === false ? conv.unreadCount : 0,
          deleted: state.deletedConversations.includes(conv.id),
        }))

        setConversations(updatedConversations)
      } catch (error) {
        console.error("Error loading messages state from localStorage:", error)
        setConversations(enhancedMockConversations)
      }
    } else {
      setConversations(enhancedMockConversations)
    }

    // Simulate online status changes every 30 seconds
    const interval = setInterval(() => {
      setConversations((prev) =>
        prev.map((conv) => {
          // Randomly toggle online status for simulation
          const shouldToggle = Math.random() > 0.8
          return shouldToggle
            ? {
                ...conv,
                company: {
                  ...conv.company,
                  isOnline: !conv.company.isOnline,
                  lastSeen: conv.company.isOnline ? new Date().toISOString() : conv.company.lastSeen,
                },
              }
            : conv
        })
      )
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  // Save state to localStorage whenever it changes
  const saveState = useCallback((conversations: EnhancedConversation[]) => {
    const state: MessagesState = {
      readStatus: {},
      deletedConversations: [],
      lastSync: new Date().toISOString(),
    }

    conversations.forEach((conv) => {
      state.readStatus[conv.id] = conv.unreadCount === 0
      if (conv.deleted) {
        state.deletedConversations.push(conv.id)
      }
    })

    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [])

  // Mark a conversation as read
  const markAsRead = useCallback(
    (conversationId: string) => {
      setConversations((prev) => {
        const updated = prev.map((conv) =>
          conv.id === conversationId ? { ...conv, unreadCount: 0 } : conv
        )
        saveState(updated)
        return updated
      })
    },
    [saveState]
  )

  // Mark a conversation as unread
  const markAsUnread = useCallback(
    (conversationId: string) => {
      setConversations((prev) => {
        const updated = prev.map((conv) =>
          conv.id === conversationId ? { ...conv, unreadCount: conv.unreadCount || 1 } : conv
        )
        saveState(updated)
        return updated
      })
    },
    [saveState]
  )

  // Get total unread count
  const getTotalUnread = useCallback(() => {
    return conversations.filter((conv) => !conv.deleted).reduce((sum, conv) => sum + conv.unreadCount, 0)
  }, [conversations])

  // Soft delete a conversation
  const deleteConversation = useCallback(
    (conversationId: string) => {
      setConversations((prev) => {
        const updated = prev.map((conv) =>
          conv.id === conversationId ? { ...conv, deleted: true } : conv
        )
        saveState(updated)
        return updated
      })
    },
    [saveState]
  )

  // Restore a deleted conversation
  const restoreConversation = useCallback(
    (conversationId: string) => {
      setConversations((prev) => {
        const updated = prev.map((conv) =>
          conv.id === conversationId ? { ...conv, deleted: false } : conv
        )
        saveState(updated)
        return updated
      })
    },
    [saveState]
  )

  // Permanently delete a conversation
  const permanentlyDeleteConversation = useCallback(
    (conversationId: string) => {
      setConversations((prev) => {
        const updated = prev.filter((conv) => conv.id !== conversationId)
        saveState(updated)
        return updated
      })
    },
    [saveState]
  )

  // Get filtered conversations
  const getFilteredConversations = useCallback(
    (filter: FilterType, searchQuery: string = "") => {
      return conversations.filter((conv) => {
        // Exclude deleted conversations
        if (conv.deleted) return false

        // Apply search filter
        const matchesSearch =
          !searchQuery ||
          conv.company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          conv.tour.title.toLowerCase().includes(searchQuery.toLowerCase())

        // Apply status filter
        const matchesFilter =
          filter === "all" ||
          (filter === "unread" && conv.unreadCount > 0) ||
          (filter === "active" && conv.status === "active") ||
          (filter === "completed" && conv.status === "completed")

        return matchesSearch && matchesFilter
      })
    },
    [conversations]
  )

  // Get a specific conversation
  const getConversation = useCallback(
    (conversationId: string) => {
      return conversations.find((conv) => conv.id === conversationId && !conv.deleted)
    },
    [conversations]
  )

  // Add a message to a conversation
  const addMessage = useCallback(
    (conversationId: string, text: string, sender: "user" | "company") => {
      setConversations((prev) => {
        const updated = prev.map((conv) => {
          if (conv.id === conversationId) {
            const newMessage = {
              id: conv.messages.length + 1,
              sender,
              text,
              timestamp: new Date().toISOString(),
              type: "text" as const,
            }

            return {
              ...conv,
              messages: [...conv.messages, newMessage],
              lastMessage: {
                text,
                timestamp: new Date().toISOString(),
                sender,
              },
              updatedAt: new Date().toISOString(),
              unreadCount: sender === "company" ? conv.unreadCount + 1 : conv.unreadCount,
            }
          }
          return conv
        })
        saveState(updated)
        return updated
      })
    },
    [saveState]
  )

  const value: EnhancedMessagesContextType = {
    conversations,
    markAsRead,
    markAsUnread,
    getTotalUnread,
    deleteConversation,
    restoreConversation,
    permanentlyDeleteConversation,
    getFilteredConversations,
    getConversation,
    addMessage,
  }

  return <EnhancedMessagesContext.Provider value={value}>{children}</EnhancedMessagesContext.Provider>
}

export function useEnhancedMessages() {
  const context = useContext(EnhancedMessagesContext)
  if (context === undefined) {
    throw new Error("useEnhancedMessages must be used within an EnhancedMessagesProvider")
  }
  return context
}
