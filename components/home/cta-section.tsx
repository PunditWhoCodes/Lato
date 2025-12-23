import Link from "next/link"
import Image from "next/image"

export function CTASection() {
  return (
    <section className="relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/7] xl:aspect-[16/6] max-h-[730px]">
      {/* Background Image */}
      <Image
        src="/cta-img.jpg"
        alt="Beautiful landscape"
        fill
        className="object-cover object-center"
        priority
        quality={100}
      />

      {/* Gradient Overlay - fade to white at bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent via-60% to-white" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-start pt-16 md:pt-20 lg:pt-28 px-4 h-full">
        <h2 className="font-poppins font-normal text-3xl md:text-4xl lg:text-[48px] lg:leading-[72px] text-center text-black mb-8 md:mb-10 lg:mb-12 max-w-3xl">
          Let Lato Plan Your Unforgettable Journey.
        </h2>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <div className="group">
            <Link
              href="/tours"
              className="relative overflow-hidden inline-flex items-center justify-center bg-black text-white rounded-full px-8 py-3.5 text-base font-poppins font-medium shadow-lg"
            >
              <span className="relative z-10">Talk to a Travel Expert</span>

              <span className="absolute inset-0 bg-[#00A792] rounded-full scale-0 opacity-0 transition-all duration-700 ease-out group-hover:scale-150 group-hover:opacity-100 z-0"></span>
            </Link>
          </div>

          {/* <Link
            href="/contact"
            className="bg-white border-2 border-black text-black hover:bg-gray-50 rounded-full px-8 py-3.5 text-base font-poppins font-medium transition-all"
          >
            Start Planning 
          </Link> */}
        </div>
      </div>
    </section>
  )
}
