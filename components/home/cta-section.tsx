import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-8 sm:py-10 md:py-12 px-4 bg-linear-to-br from-primary via-primary to-primary-dark text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_70%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.05),transparent_70%)]"></div>

      <div className="relative max-w-4xl mx-auto text-center px-2">
        <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 sm:mb-4 leading-tight">
          Ready to Start Your
          <span className="block mt-1">Adventure?</span>
        </h2>
        <p className="text-sm sm:text-base md:text-lg mb-6 opacity-90 leading-relaxed max-w-2xl mx-auto">
          Join thousands of travelers discovering amazing experiences through our platform
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
          <Button
            size="lg"
            className="rounded-full px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold bg-white text-primary hover:bg-white/90 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 w-full sm:w-auto"
            asChild
          >
            <Link href="/register">
              Connect with Local Experts
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold border-2 border-white text-white hover:bg-white hover:text-primary bg-transparent shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 w-full sm:w-auto"
            asChild
          >
            <Link href="/tours">Book Your Experience Today</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
