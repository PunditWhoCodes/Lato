export interface TravelStyle {
  name: string
  types: string[]
}

export const travelStyles: TravelStyle[] = [
  {
    name: "Adventure",
    types: ["Hiking & Trekking", "Mountain Climbing", "Water Sports", "Wildlife Safari", "Extreme Sports"],
  },
  {
    name: "Cultural",
    types: ["Historical Tours", "Art & Museums", "Food & Culinary", "Religious Sites", "Local Experiences"],
  },
  {
    name: "Relaxation",
    types: ["Beach & Islands", "Spa & Wellness", "Luxury Resorts", "Yoga Retreats", "Cruise Tours"],
  },
]
