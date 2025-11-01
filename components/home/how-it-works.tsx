import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, Search, MessageCircle, Shield, ArrowRight } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface Step {
  step: string
  title: string
  subtitle: string
  description: string
  icon: LucideIcon
  features: string[]
}

const STEPS: Step[] = [
  {
    step: "01",
    title: "Discover & Browse",
    subtitle: "Find Your Perfect Experience",
    description:
      "Explore curated tours and experiences from verified local providers. Use our smart filters to find adventures that match your interests, budget, and travel style.",
    icon: Search,
    features: ["Smart search filters", "Verified providers", "Real reviews", "Price comparison"],
  },
  {
    step: "02",
    title: "Chat & Customize",
    subtitle: "Connect with Local Experts",
    description:
      "Start a conversation with your chosen tour provider. Discuss your preferences, ask questions, and customize your experience to create the perfect adventure.",
    icon: MessageCircle,
    features: ["Direct messaging", "Custom itineraries", "Instant responses", "Local insights"],
  },
  {
    step: "03",
    title: "Book & Experience",
    subtitle: "Secure & Enjoy Your Adventure",
    description:
      "Book with confidence using our secure payment system. Enjoy your personalized adventure with trusted local guides and create memories that last a lifetime.",
    icon: Shield,
    features: ["Secure payments", "24/7 support", "Satisfaction guarantee", "Travel insurance"],
  },
]

export function HowItWorks() {
  return (
    <section className="py-8 sm:py-10 md:py-12 px-4 bg-linear-to-br from-primary/5 via-background to-secondary/5 relative overflow-hidden">
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/5 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-xs font-medium mb-3 shadow-lg">
            <Sparkles className="w-3 h-3" />
            Simple Process
          </div>
          <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl text-foreground mb-3">How It Works</h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
            From discovery to adventure in three simple steps. Connect with local experts and create unforgettable
            memories.
          </p>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl">
            <div className="flex justify-between items-center px-24">
              <div className="w-40 h-1 bg-linear-to-r from-primary/40 to-primary/20 rounded-full shadow-sm"></div>
              <div className="w-40 h-1 bg-linear-to-r from-primary/20 to-primary/40 rounded-full shadow-sm"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 relative z-10">
            {STEPS.map((item, index) => (
              <div key={index} className="group">
                <Card className="relative h-full bg-card/95 dark:bg-card/98 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl dark:hover:shadow-primary/20 transition-all duration-500 hover:-translate-y-2 sm:hover:-translate-y-4 hover:rotate-1 overflow-hidden">
                  <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <CardContent className="p-4 sm:p-5 md:p-6 relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <div className="text-6xl font-heading font-black text-primary/15 select-none group-hover:text-primary/25 transition-colors duration-500">
                        {item.step}
                      </div>
                      <div className="relative">
                        <div className="w-16 h-16 bg-linear-to-br from-primary to-primary rounded-3xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6">
                          <item.icon className="w-8 h-8 text-white drop-shadow-lg" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-4 h-4 bg-secondary rounded-full shadow-lg group-hover:scale-125 transition-transform duration-300"></div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3 className="font-heading font-bold text-xl text-foreground mb-2 group-hover:text-primary transition-colors duration-300 leading-tight">
                          {item.title}
                        </h3>
                        <p className="text-primary/70 font-semibold text-xs uppercase tracking-wider">
                          {item.subtitle}
                        </p>
                      </div>

                      <p className="text-muted-foreground leading-relaxed text-sm">{item.description}</p>

                      <div className="space-y-2 pt-3">
                        {item.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center gap-3 group/feature">
                            <div className="w-2 h-2 bg-primary rounded-full group-hover/feature:scale-125 transition-transform duration-200"></div>
                            <span className="text-xs text-muted-foreground font-medium group-hover/feature:text-foreground transition-colors duration-200">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-6 sm:mt-8">
          <Button
            size="lg"
            className="rounded-full px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 text-base sm:text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-linear-to-r from-primary to-primary"
            asChild
          >
            <Link href="/tours">
              Start Exploring
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
