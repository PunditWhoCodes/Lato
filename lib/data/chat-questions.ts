import { ChatQuestion } from "@/app/tours/types";

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