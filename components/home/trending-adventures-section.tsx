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
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto flex justify-center py-20">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Top text */}
        <p className="font-poppins text-sm md:text-lg font-light mb-2 md:mb-3">
          Find your next adventure in destinations that inspire you
        </p>

        {/* Heading + Action */}
        <div className="flex justify-between items-start md:items-center mb-8 md:mb-14">
          <h2 className="font-poppins font-light text-3xl md:text-4xl lg:text-[56px] leading-tight lg:leading-normal text-black">
            Trending Adventures
          </h2>

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
        <div className="md:hidden flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide">
          {trendingTours.map((tour) => (
            <div key={tour.id} className="flex-shrink-0 w-[calc(50%-8px)] snap-start">
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
