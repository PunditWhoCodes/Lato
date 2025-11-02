import { tours } from "@/lib/data"
import type { TravelStyleType, ChatQuestion } from "../types"

export const mockTours = tours

export const categories = ["Cultural", "Food & Drink", "Adventure", "Photography", "Nature"]

export const destinations = [
  "France",
  "Italy",
  "Spain",
  "Greece",
  "Portugal",
  "Germany",
  "Netherlands",
  "United Kingdom",
  "Japan",
  "Thailand",
  "Indonesia",
  "Vietnam",
  "China",
  "India",
  "South Korea",
  "Philippines",
  "United States",
  "Canada",
  "Mexico",
  "Brazil",
  "Argentina",
  "Peru",
  "Chile",
  "Costa Rica",
  "Egypt",
  "Morocco",
  "South Africa",
  "Kenya",
  "Tanzania",
  "Madagascar",
  "Australia",
  "New Zealand",
  "Fiji",
]

export const travelStyles: TravelStyleType[] = [
  {
    name: "Adventure",
    types: [
      "Bungee Jumping",
      "Hiking & Trekking",
      "Mountain Biking",
      "Rock Climbing",
      "Skydiving",
      "White Water Rafting",
    ],
  },
  {
    name: "Cultural",
    types: ["Architecture", "Art & Museums", "Festivals", "Food & Wine", "Historical Tours", "Local Experiences"],
  },
  {
    name: "Family",
    types: ["Beach Resorts", "City Breaks", "Educational Tours", "Kid-Friendly", "Multi-Generation", "Theme Parks"],
  },
  {
    name: "Nature",
    types: ["Bird Watching", "Camping", "Eco Tours", "National Parks", "Photography Tours", "Wildlife Safari"],
  },
  {
    name: "Relaxation",
    types: ["Beach Holidays", "Cruise Ships", "Luxury Resorts", "Spa Retreats", "Wellness Tours", "Yoga Retreats"],
  },
]

export const operators = [
  "Bali Explorer Co.",
  "Tokyo Taste Tours",
  "Greek Island Adventures",
  "Wild Amazon Tours",
  "Marrakech Flavors",
  "Arctic Adventures",
]

export const durations = ["2-3 days", "4-7 days", "1-2 weeks", "2+ weeks"]

export const groupSizes = ["1-4 people", "5-8 people", "9-12 people", "13-20 people", "20+ people"]

export const tourTypes = ["Group Tour", "Private Tour"]

export const chatQuestions: ChatQuestion[] = [
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
    options: ["Half day (2-4 hours)", "Full day (6-8 hours)", "Multi-day (2-3 days)", "Week-long", "I'm flexible"],
  },
  {
    id: "budget",
    question: "What's your budget per person?",
    type: "select",
    options: [
      "Under €50",
      "€50-€100",
      "€100-€200",
      "€200-€500",
      "€500-€1000",
      "€1000-€5000",
      "€5000+",
      "I'm flexible",
    ],
  },
  {
    id: "groupSize",
    question: "How many people will be traveling?",
    type: "select",
    options: ["Just me", "2 people", "3-5 people", "6-10 people", "Large group (10+)"],
  },
]
