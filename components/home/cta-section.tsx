import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Globe } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-12 md:py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-5xl overflow-hidden bg-gradient-to-br from-primary to-teal-light p-12 md:p-16 text-center shadow-2xl">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 border-4 border-white rounded-full"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 border-4 border-white rounded-full"></div>
            <div className="absolute top-1/2 left-1/3 w-24 h-24 border-4 border-white rounded-full"></div>
          </div>

          <div className="relative z-10">
            <div className="mb-6">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="w-10 h-10 text-white" />
              </div>
              <h2 className="font-poppins font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-6">
                Ready to Start Your Adventure?
              </h2>
              <p className="text-lg md:text-xl font-poppins text-white/90 max-w-2xl mx-auto mb-8">
                Join thousands of travelers who have discovered unforgettable experiences with local experts around the world
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                asChild
                className="bg-white text-primary hover:bg-white/90 rounded-4xl px-10 py-6 text-lg font-montserrat font-semibold shadow-xl hover:shadow-2xl transition-all"
              >
                <Link href="/tours">
                  Browse All Tours
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                asChild
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary rounded-4xl px-10 py-6 text-lg font-montserrat font-semibold transition-all"
              >
                <Link href="/register">
                  Become a Guide
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
