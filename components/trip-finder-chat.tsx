"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send } from "lucide-react"

interface ChatMessage {
  type: "bot" | "user"
  content: string
  timestamp: string
  questionId?: string
}

interface ChatQuestion {
  id: string
  question: string
  type: string
  options: string[]
}

export function TripFinderChat() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [chatResponses, setChatResponses] = useState<Record<string, string>>({})
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([])
  const [customInput, setCustomInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const chatQuestions: ChatQuestion[] = [
    {
      id: "destination",
      question: "Where would you like to travel?",
      type: "select",
      options: ["Europe", "Asia", "Americas", "Africa", "Oceania", "I'm flexible"],
    },
    {
      id: "travelStyle",
      question: "What type of experience are you looking for?",
      type: "select",
      options: ["Adventure", "Cultural", "Relaxation", "Nature", "Family-friendly", "Food & Drink"],
    },
    {
      id: "duration",
      question: "How long is your ideal trip?",
      type: "select",
      options: ["2-3 days", "4-7 days", "1-2 weeks", "2-3 weeks", "Month or longer", "I'm flexible"],
    },
    {
      id: "budget",
      question: "What's your budget per person?",
      type: "select",
      options: ["Under €200", "€200-€500", "€500-€1000", "€1000-€2000", "€2000+", "I'm flexible"],
    },
    {
      id: "groupSize",
      question: "How many people will be traveling?",
      type: "select",
      options: ["Just me", "2 people", "3-5 people", "6-10 people", "Large group (10+)"],
    },
  ]

  useEffect(() => {
    if (chatHistory.length === 0) {
      setChatHistory([
        {
          type: "bot",
          content:
            "Hi there! I'm your Trip Finder assistant. I'll help you discover the perfect travel experience by asking a few quick questions.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
        {
          type: "bot",
          content: "Ready to find your next adventure? Let's get started!",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ])
    }
  }, [chatHistory.length])

  useEffect(() => {
    if (currentStep < chatQuestions.length && chatHistory.length > 0) {
      const currentQuestion = chatQuestions[currentStep]
      const questionExists = chatHistory.some((msg) => msg.questionId === currentQuestion.id)

      if (!questionExists) {
        setChatHistory((prev) => [
          ...prev,
          {
            type: "bot",
            content: currentQuestion.question,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            questionId: currentQuestion.id,
          },
        ])
      }
    }
  }, [currentStep, chatHistory.length, chatQuestions])

  const handleChatResponse = (response: string) => {
    const currentQuestion = chatQuestions[currentStep]
    setChatResponses((prev) => ({ ...prev, [currentQuestion.id]: response }))

    setChatHistory((prev) => [
      ...prev,
      {
        type: "user",
        content: response,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ])

    if (currentStep < chatQuestions.length - 1) {
      setCurrentStep((prev) => prev + 1)
    } else {
      setTimeout(() => {
        setChatHistory((prev) => [
          ...prev,
          {
            type: "bot",
            content:
              "Perfect! 🎉 Based on your preferences, I've found some great travel options for you. Check out the recommended tours!",
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ])
      }, 500)
    }
  }

  const handleCustomInput = () => {
    if (customInput.trim()) {
      setChatHistory((prev) => [
        ...prev,
        {
          type: "user",
          content: customInput,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
        {
          type: "bot",
          content:
            "Thanks for the additional details! I'll take that into consideration when finding your perfect trip.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ])
      setCustomInput("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCustomInput()
    }
  }

  const resetChat = () => {
    setCurrentStep(0)
    setChatResponses({})
    setChatHistory([
      {
        type: "bot",
        content:
          "Hi there! I'm your Trip Finder assistant. I'll help you discover the perfect travel experience by asking a few quick questions.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
      {
        type: "bot",
        content: "Ready to find your next adventure? Let's get started!",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ])
  }

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
      setChatHistory((prev) => {
        const newHistory = [...prev]
        while (newHistory.length > 0 && newHistory[newHistory.length - 1].type === "user") {
          newHistory.pop()
        }
        return newHistory
      })

      const currentQuestion = chatQuestions[currentStep - 1]
      setChatResponses((prev) => {
        const newResponses = { ...prev }
        delete newResponses[currentQuestion.id]
        return newResponses
      })
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (isChatOpen) {
      setTimeout(scrollToBottom, 100)
    }
  }, [isChatOpen])

  useEffect(() => {
    scrollToBottom()
  }, [chatHistory])

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isChatOpen ? (
        <Button
          onClick={() => setIsChatOpen(true)}
          className="h-16 w-16 rounded-full bg-primary hover:bg-primary/90 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110"
        >
          <MessageCircle className="h-7 w-7 text-white" />
        </Button>
      ) : (
        <Card className="w-[420px] h-[600px] shadow-2xl border-0 bg-white rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between p-4 bg-tomato border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div className="w-2 h-2 bg-primary rounded-full ml-1"></div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Trip Finder</h3>
                <p className="text-xs text-gray-500">Online now</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsChatOpen(false)}
              className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex flex-col h-[520px]">
            <div className="flex-1 p-6 overflow-y-auto bg-gray-50 space-y-3">
              {chatHistory.map((message, index) => (
                <div key={index} className={`flex gap-3 ${message.type === "user" ? "justify-end" : ""}`}>
                  {message.type === "bot" && (
                    <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="w-1 h-1 bg-primary rounded-full"></div>
                      <div className="w-1 h-1 bg-primary rounded-full ml-0.5"></div>
                    </div>
                  )}
                  <div
                    className={`rounded-2xl p-3 shadow-sm max-w-[85%] ${
                      message.type === "bot" ? "bg-white rounded-tl-md" : "bg-primary text-white rounded-tr-md"
                    }`}
                  >
                    <p className={`text-sm leading-relaxed ${message.type === "bot" ? "text-gray-800" : "text-white"}`}>
                      {message.content}
                    </p>
                    <p
                      className={`text-xs mt-1.5 ${
                        message.type === "bot" ? "text-gray-500" : "text-primary-foreground/70"
                      }`}
                    >
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}

              {currentStep < chatQuestions.length && (
                <div className="space-y-2 flex flex-col items-end">
                  <p className="text-xs text-gray-500 font-medium self-start ml-8">Choose an option:</p>
                  <div className="flex flex-wrap gap-1.5 justify-end">
                    {chatQuestions[currentStep].options.map((option, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        onClick={() => handleChatResponse(option)}
                        className="justify-center text-center h-auto py-2 px-3 whitespace-nowrap bg-white hover:bg-gray-50 border-gray-200 hover:border-primary/30 text-gray-700 hover:text-primary rounded-full transition-all duration-200 text-xs w-auto"
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {currentStep >= chatQuestions.length && (
                <div className="flex justify-end space-y-2">
                  <Button
                    onClick={resetChat}
                    variant="outline"
                    className="bg-white hover:bg-gray-50 border-gray-200 hover:border-primary/30 text-gray-700 hover:text-primary rounded-full px-5 py-2 text-xs"
                  >
                    Start Over
                  </Button>
                </div>
              )}

              {currentStep > 0 && currentStep < chatQuestions.length && (
                <div className="flex justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={goBack}
                    className="text-xs text-gray-500 hover:text-gray-700 p-0 h-auto font-normal"
                  >
                    ← Go back
                  </Button>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-white border-t border-gray-100 space-y-3">
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Tell us more about your ideal trip..."
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 text-sm border-gray-200 focus:border-primary/30 rounded-full px-4 py-2"
                />
                <Button
                  onClick={handleCustomInput}
                  size="sm"
                  className="rounded-full w-8 h-8 p-0 bg-primary hover:bg-primary/90"
                  disabled={!customInput.trim()}
                >
                  <Send className="h-3 w-3" />
                </Button>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  Step {Math.min(currentStep + 1, chatQuestions.length)} of {chatQuestions.length}
                </span>
                <div className="flex gap-1.5">
                  {chatQuestions.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index <= currentStep ? "bg-primary" : "bg-gray-200"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
