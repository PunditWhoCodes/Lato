import { AttractionsScroller } from "./attractions-scroller"
import { AttractionCard } from "./attraction-card"

export function AttractionsCarousel() {
  const ATTRACTIONS = [
    {
      name: "Peru",
      location: "450+ Tours",
      description: "Explore the ancient wonders of Peru including Machu Picchu and breathtaking Andes landscapes.",
      image: "/attractions/peru.jpg",
      href: "/tours/peru",
    },
    {
      name: "Nepal",
      location: "450+ Tours",
      description: "Experience the majestic Himalayas, rich culture, and spiritual heritage of Nepal.",
      image: "/attractions/nepal.jpg",
      href: "/tours/nepal",
    },
    {
      name: "Italy",
      location: "450+ Tours",
      description: "Discover Italy’s timeless beauty: coastal cliffs, historic cities, and extraordinary cuisine.",
      image: "/attractions/italy.jpg",
      href: "/tours/italy",
    },
    {
      name: "Thailand",
      location: "450+ Tours",
      description: "Beautiful beaches, turquoise waters, and unforgettable island adventures await.",
      image: "/attractions/thailand.jpg",
      href: "/tours/thailand",
    },
    {
      name: "Milan",
      location: "450+ Tours",
      description: "A fusion of culture, architecture, and Italian charm in one iconic city.",
      image: "/attractions/milan.jpg",
      href: "/tours/milan",
    },
    {
      name: "Greece",
      location: "450+ Tours",
      description: "Experience whitewashed beauty, stunning sunsets, and ancient mythology.",
      image: "/attractions/greece.jpg",
      href: "/tours/greece",
    },
    {
      name: "Spain",
      location: "450+ Tours",
      description: "A vibrant blend of art, food, culture, and architectural wonders.",
      image: "/attractions/spain.jpg",
      href: "/tours/spain",
    },
    {
      name: "London",
      location: "450+ Tours",
      description: "Iconic landmarks, rich history, and one of the world’s greatest cities.",
      image: "/attractions/london.jpg",
      href: "/tours/london",
    },
  ]

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">

        <h2 className="font-poppins text-4xl md:text-5xl font-bold text-text-primary mb-16">
          Top Destinations
        </h2>

        <AttractionsScroller>
          {ATTRACTIONS.map((item, index) => (
            <AttractionCard
              key={index}
              name={item.name}
              location={item.location}
              description={item.description}
              image={item.image}
              href={item.href}
            />
          ))}
        </AttractionsScroller>

      </div>
    </section>
  )
}
