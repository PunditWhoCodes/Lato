"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { TrendingTourCard } from "./trending-tour-card";
import { useToursData } from "@/app/tours/hooks/useToursData";
import { Loader2 } from "lucide-react";

export function TrendingAdventuresSection() {
  const { tours, isLoading } = useToursData({
    page: 1,
    itemsPerPage: 4,
  });

  const trendingTours = tours?.slice(0, 4) || [];

  if (isLoading) {
    return (
      <section className="py-4 md:py-12 lg:py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto flex justify-center py-10 md:py-20">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      </section>
    );
  }

  return (
    <section className="py-6 md:py-12 lg:py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Header Section - Figma pixel-perfect */}
        <div className="flex justify-between items-start mb-4 md:mb-10 lg:mb-14">
          <div className="flex flex-col gap-[6.6px]">
            {/* Top text - Figma: 7px height ~6.3px font */}
            <p className="font-poppins text-[6.3px] md:text-lg font-light leading-[150%]">
              Find your next adventure in destinations
            </p>

            {/* Heading - Figma: 15px height ~22px font (same as How It Works) */}
            <h2 className="font-poppins font-light text-[22px] md:text-4xl lg:text-[56px] leading-[150%] text-black">
              Trending Adventures
            </h2>
          </div>

          {/* View More - Mobile - Figma: 14.2px button, 6.3px text */}
          <Link
            href="/tours"
            className="md:hidden flex items-center gap-[2.5px] group"
          >
            <span className="font-mulish font-semibold text-[6.3px] text-[#495560] group-hover:text-black transition-colors">
              View More
            </span>
            <div className="relative flex items-center justify-center bg-black rounded-[7px] overflow-hidden w-[14px] h-[14px]">
              <ArrowUpRight className="relative z-10 text-white w-[8px] h-[8px] transition-transform duration-300 group-hover:rotate-45" />
              <span className="absolute inset-0 bg-[#00A792] rounded-[7px] scale-0 opacity-0 transition-all duration-700 ease-out group-hover:scale-150 group-hover:opacity-100 z-0"></span>
            </div>
          </Link>

          {/* Desktop View More */}
          <Link
            href="/tours"
            className="hidden lg:flex items-center gap-3 group"
          >
            <span className="text-[#495560] text-base group-hover:text-black transition-colors">
              See All Tours
            </span>
            <div className="relative w-[42px] h-[42px] rounded-full bg-black flex items-center justify-center overflow-hidden">
              <ArrowUpRight className="relative z-10 text-white w-[22px] h-[22px] transition-transform duration-300 group-hover:rotate-45" />

              {/* Radial expanding hover overlay */}
              <span className="absolute inset-0 bg-[#00A792] rounded-full scale-0 opacity-0 transition-all duration-700 ease-out group-hover:scale-150 group-hover:opacity-100 z-0"></span>
            </div>
          </Link>
        </div>

        {/* Mobile: Horizontal Scroll */}
        <div className="md:hidden flex gap-3 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide">
          {trendingTours.map((tour) => (
            <div key={tour.id} className="flex-shrink-0 w-[calc(50%-6px)] snap-start">
              <TrendingTourCard tour={tour} />
            </div>
          ))}
        </div>

        {/* Desktop: Cards Grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingTours.map((tour) => (
            <TrendingTourCard key={tour.id} tour={tour} />
          ))}
        </div>
      </div>
    </section>
  );
}
