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
    <section className="py-12 md:py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-mulish font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            Simple Process
          </div>
          <h2 className="font-poppins font-bold text-3xl md:text-4xl lg:text-5xl text-text-primary mb-4">
            How It Works
          </h2>
          <p className="text-base md:text-lg font-poppins text-text-muted max-w-3xl mx-auto leading-relaxed">
            From discovery to adventure in three simple steps. Connect with local experts and create unforgettable
            memories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {STEPS.map((item, index) => (
            <div key={index} className="group">
              <Card className="relative h-full bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 rounded-4xl overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-6xl font-poppins font-bold text-primary/10 select-none group-hover:text-primary/20 transition-colors duration-500">
                      {item.step}
                    </div>
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-500">
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="font-poppins font-semibold text-xl text-text-primary mb-2 group-hover:text-primary transition-colors duration-300 leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-primary font-mulish font-semibold text-xs uppercase tracking-wider">
                        {item.subtitle}
                      </p>
                    </div>

                    <p className="text-text-muted font-poppins leading-relaxed text-sm">
                      {item.description}
                    </p>

                    <div className="space-y-2 pt-3">
                      {item.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span className="text-xs text-text-muted font-mulish font-medium">
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

        <div className="text-center mt-12">
          <Button
            size="lg"
            className="rounded-4xl bg-primary hover:bg-primary/90 text-white px-10 py-6 text-lg font-montserrat font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
            asChild
          >
            <Link href="/tours">
              Start Exploring
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
