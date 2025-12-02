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
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Top text */}
        <p className="font-poppins text-lg font-light mb-3">
          Find your next adventure in destinations that inspire you
        </p>

        {/* Heading + Action */}
        <div className="flex justify-between items-center mb-14">
          <h2 className="font-poppins font-light text-[56px] leading-normal text-black">
            Trending Adventures
          </h2>

          <Link
            href="/tours"
            className="hidden lg:flex items-center gap-3 group"
          >
            <span className="font-mullish text-[#495560] font-semibold text-sm leading-px">
              See All Tours
            </span>
            <div className="w-[42px] h-[42px] rounded-full bg-black flex items-center justify-center group-hover:bg-gray-900 transition-colors">
              <ArrowUpRight className="text-white w-[22px] h-[22px]" />
            </div>
          </Link>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {trendingTours.map((tour) => (
            <TrendingTourCard key={tour.id} tour={tour} />
          ))}
        </div>
      </div>
    </section>
  );
}
