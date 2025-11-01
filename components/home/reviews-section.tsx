import { Star } from "lucide-react"
import { ReviewCard } from "./review-card"

const REVIEWS = [
  {
    name: "Sarah Johnson",
    location: "London, UK",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces",
    rating: 5,
    review:
      "The Bali temple tour was absolutely magical! Our guide Maya was incredibly knowledgeable and showed us hidden spots that most tourists never see. The rice terraces at sunset were breathtaking.",
    tourImage: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=600&fit=crop",
    tourTitle: "Bali Temple & Rice Terrace Adventure",
    verified: true,
    company: "Bali Explorer Co.",
  },
  {
    name: "Marco Rodriguez",
    location: "Barcelona, Spain",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces",
    rating: 5,
    review:
      "Tokyo street food tour exceeded all expectations! Tried authentic ramen, takoyaki, and sake in places I would never have found on my own. Kenji was an amazing host and now I have a local friend in Tokyo!",
    tourImage: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop",
    tourTitle: "Tokyo Street Food & Culture Walk",
    verified: true,
    company: "Tokyo Taste Tours",
  },
  {
    name: "Emma Thompson",
    location: "Melbourne, Australia",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=faces",
    rating: 5,
    review:
      "The Santorini photography tour was a dream come true! Not only did I get stunning sunset shots, but Dimitri taught me so much about composition and local history. Worth every euro!",
    tourImage: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&h=600&fit=crop",
    tourTitle: "Santorini Sunset Photography Tour",
    verified: true,
    company: "Greek Island Adventures",
  },
]

export function ReviewsSection() {
  return (
    <section className="py-8 sm:py-10 md:py-12 px-4 bg-background/50 dark:bg-background/30 backdrop-blur-sm transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-xs font-medium mb-3 shadow-lg">
            <Star className="w-3 h-3" />
            Customer Stories
          </div>
          <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl text-foreground mb-3">What Travelers Say</h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4 sm:px-0">
            Real experiences from real travelers who discovered amazing adventures through our platform
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {REVIEWS.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
        </div>

        <div className="text-center mt-6 sm:mt-8">
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-4 bg-linear-to-r from-primary/10 to-secondary/10 rounded-3xl sm:rounded-full px-6 sm:px-8 py-4">
            <div className="flex -space-x-2">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces"
                alt="Reviewer"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-background object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces"
                alt="Reviewer"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-background object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=faces"
                alt="Reviewer"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-background object-cover"
              />
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-background bg-primary flex items-center justify-center text-white text-xs font-bold">
                +2K
              </div>
            </div>
            <div className="text-center sm:text-left">
              <div className="font-semibold text-foreground text-sm sm:text-base">Join 2,000+ Happy Travelers</div>
              <div className="text-muted-foreground text-xs sm:text-sm">Average rating: 4.9/5 ⭐</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
