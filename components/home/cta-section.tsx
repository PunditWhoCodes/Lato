import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section
      className="
        py-8 sm:py-10 md:py-12 px-4 relative overflow-hidden
        bg-linear-to-br from-primary/10 via-background to-secondary/10
        dark:from-primary/20 dark:via-background dark:to-secondary/20
        transition-colors duration-500
      "
    >
      {/* Soft radial overlays for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.08),transparent_70%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(0,0,0,0.3),transparent_70%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.05),transparent_70%)] dark:bg-[radial-gradient(circle_at_70%_80%,rgba(0,0,0,0.4),transparent_70%)]"></div>

      <div className="relative max-w-4xl mx-auto text-center px-2">
        <h2
          className="
            font-heading font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl 
            mb-3 sm:mb-4 leading-tight 
            text-foreground
          "
        >
          Ready to Start Your
          <span className="block mt-1 text-primary">Adventure?</span>
        </h2>

        <p className="text-sm sm:text-base md:text-lg mb-6 text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          Join thousands of travelers discovering amazing experiences through our platform
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
          <Button
            size="lg"
            className="
              rounded-full px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold
              bg-primary text-primary-foreground
              hover:bg-primary/90
              shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105
              w-full sm:w-auto
            "
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
            className="
              rounded-full px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold
              border-2 border-primary/70 text-foreground
              hover:bg-primary/10 dark:hover:bg-primary/20
              shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105
              w-full sm:w-auto
            "
            asChild
          >
            <Link href="/tours">Book Your Experience Today</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
