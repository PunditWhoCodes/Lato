"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from "react"
import { mockConversations } from "@/app/messages/data"
import { mockConversationsDetail } from "@/app/messages/[id]/data"
import type { Conversation } from "@/app/messages/types"
import type { ConversationDetail } from "@/app/messages/[id]/types"

interface MessagesContextType {
  conversations: Conversation[]
  conversationsDetail: ConversationDetail[]
  markAsRead: (conversationId: string) => void
  getConversation: (conversationId: string) => ConversationDetail | undefined
  getTotalUnread: () => number
}

const MessagesContext = createContext<MessagesContextType | undefined>(undefined)

const STORAGE_KEY = "lato_messages_read_status"

export function MessagesProvider({ children }: { children: React.ReactNode }) {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [conversationsDetail, setConversationsDetail] = useState<ConversationDetail[]>([])

  // Initialize state from localStorage or mock data
  useEffect(() => {
    const storedData = localStorage.getItem(STORAGE_KEY)

    if (storedData) {
      try {
        const readStatus = JSON.parse(storedData) as Record<string, boolean>

        // Apply read status to mock data
        const updatedConversations = mockConversations.map((conv) => ({
          ...conv,
          unreadCount: readStatus[conv.id] ? 0 : conv.unreadCount,
        }))

        const updatedConversationsDetail = mockConversationsDetail.map((conv) => ({
          ...conv,
          unreadCount: readStatus[conv.id] ? 0 : conv.unreadCount,
        }))

        setConversations(updatedConversations)
        setConversationsDetail(updatedConversationsDetail)
      } catch (error) {
        console.error("Error loading read status from localStorage:", error)
        setConversations(mockConversations)
        setConversationsDetail(mockConversationsDetail)
      }
    } else {
      setConversations(mockConversations)
      setConversationsDetail(mockConversationsDetail)
    }
  }, [])

  // Save read status to localStorage whenever it changes
  const saveReadStatus = useCallback((conversations: Conversation[]) => {
    const readStatus: Record<string, boolean> = {}
    conversations.forEach((conv) => {
      readStatus[conv.id] = conv.unreadCount === 0
    })
    localStorage.setItem(STORAGE_KEY, JSON.stringify(readStatus))
  }, [])

  // Mark a conversation as read
  const markAsRead = useCallback((conversationId: string) => {
    setConversations((prev) => {
      const updated = prev.map((conv) =>
        conv.id === conversationId ? { ...conv, unreadCount: 0 } : conv
      )
      saveReadStatus(updated)
      return updated
    })

    setConversationsDetail((prev) =>
      prev.map((conv) =>
        conv.id === conversationId ? { ...conv, unreadCount: 0 } : conv
      )
    )
  }, [saveReadStatus])

  // Get a specific conversation
  const getConversation = useCallback(
    (conversationId: string) => {
      return conversationsDetail.find((conv) => conv.id === conversationId)
    },
    [conversationsDetail]
  )

  // Get total unread count
  const getTotalUnread = useCallback(() => {
    return conversations.reduce((sum, conv) => sum + conv.unreadCount, 0)
  }, [conversations])

  const value: MessagesContextType = {
    conversations,
    conversationsDetail,
    markAsRead,
    getConversation,
    getTotalUnread,
  }

  return <MessagesContext.Provider value={value}>{children}</MessagesContext.Provider>
}

export function useMessages() {
  const context = useContext(MessagesContext)
  if (context === undefined) {
    throw new Error("useMessages must be used within a MessagesProvider")
  }
  return context
}
