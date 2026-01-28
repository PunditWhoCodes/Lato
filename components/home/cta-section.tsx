import Link from "next/link"
import Image from "next/image"

export function CTASection() {
  return (
    <section className="relative w-full h-[200px] md:h-[1250px] md:aspect-[16/9] lg:aspect-[16/8] xl:aspect-[16/8] md:max-h-[730px] bg-white overflow-hidden">
      {/* Background Image */}
      <Image
        src="/cta-img.jpg"
        alt="Beautiful landscape"
        fill
        className="object-cover object-center"
        priority
        quality={100}
      />

      {/* Gradient Overlay - fade from white at top and to white at bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent via-50% to-white" />

      {/* Mobile Content - Figma: 19px ExtraLight title, 159.766px x 20.535px button */}
      <div className="md:hidden relative z-10 flex flex-col items-center justify-start pt-8 px-4 h-full">
        <div className="flex flex-col items-center gap-[22px] max-w-[216px]">
          <h2 className="font-poppins font-extralight text-[19px] leading-[normal] text-center text-black">
            Let Lato Plan Your<br />Unforgettable Journey.
          </h2>

          <div className="group">
            <Link
              href="/tours"
              className="relative overflow-hidden inline-flex items-center justify-center bg-black border-[0.4px] border-black text-white rounded-[12px] w-[160px] h-[21px] font-poppins font-normal text-[7.4px] leading-[150%]"
            >
              <span className="relative z-10">Talk to a Travel Expert</span>
              <span className="absolute inset-0 bg-[#00A792] rounded-[12px] scale-0 opacity-0 transition-all duration-700 ease-out group-hover:scale-110 group-hover:opacity-100 z-0"></span>
            </Link>
          </div>
        </div>
      </div>

      {/* Desktop Content */}
      <div className="hidden md:flex relative z-10 flex-col items-center justify-start pt-20 lg:pt-28 px-4 h-full">
        <h2 className="font-poppins font-normal text-4xl lg:text-[48px] lg:leading-[72px] text-center text-black mb-10 lg:mb-12 max-w-3xl">
          Let Lato Plan Your Unforgettable Journey.
        </h2>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <div className="group">
            <Link
              href="/tours"
              className="relative overflow-hidden inline-flex items-center justify-center bg-black text-white rounded-full px-8 py-3.5 text-base font-poppins font-medium shadow-lg"
            >
              <span className="relative z-10">Talk to a Travel Expert</span>
              <span className="absolute inset-0 bg-[#00A792] rounded-full scale-0 opacity-0 transition-all duration-700 ease-out group-hover:scale-110 group-hover:opacity-100 z-0"></span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
