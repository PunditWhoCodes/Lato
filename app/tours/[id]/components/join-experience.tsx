"use client";

import Image from "next/image";

export function JoinExperience() {
  const background =
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1600&q=80";

  return (
    <div className="relative w-full h-[200px] md:h-60 lg:h-[280px] rounded-2xl overflow-hidden my-12">

      {/* Background Image */}
      <Image
        src={background}
        alt="Exclusive Discount Background"
        fill
        className="object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content Wrapper */}
      <div className="absolute inset-0 px-2 md:px-6 lg:px-8 flex items-center">
        
        {/* 2 Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-6 items-center">
          
          {/* Left Column (Text) */}
          <div className="flex flex-col justify-center text-center md:text-left">
            <h2 className="text-white font-bold text-base md:text-lg lg:text-[25px] leading-tight">
              Get Trip Exclusive Discount
            </h2>

            <p className=" text-white text-sm md:text-base max-w-xl mt-3 mx-auto md:mx-0 leading-snug">
              Download a detailed PDF brochure and unlock an exclusive discount
              for this tour
            </p>
          </div>

          {/* Right Column (Button) */}
          <div className="flex justify-center md:justify-end">
            <button
              className="
                bg-white/25 backdrop-blur-lg 
                text-white 
                text-lg 
                px-10 py-3.5 
                rounded-2xl
                font-medium
                shadow-xl
                hover:bg-white/35 
                transition
              "
            >
              Download Now
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
