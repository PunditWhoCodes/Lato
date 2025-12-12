"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp, MapPin, Map } from "lucide-react";

interface HighlightsSectionProps {
  highlights: string[];
  mapImage?: string;
  startLocation?: string;
  endLocation?: string;
}

export function HighlightsSection({
  highlights,
  mapImage = "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&q=80",
  startLocation = "Lima, Peru",
  endLocation = "Lima, Peru",
}: HighlightsSectionProps) {
  const [showAll, setShowAll] = useState(false);
  const visibleHighlights = showAll ? highlights : highlights.slice(0, 4);
  const hasMore = highlights.length > 4;

  return (
    <div className="py-8 border-[#E5E5E5]">
      <h2 className="text-lg font-semibold text-[#1C1B1F] mb-4">
        Highlights
      </h2>

      {/* Highlights List */}
      <ul className="space-y-3 mb-6">
        {visibleHighlights.map((highlight, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className="mt-0.5 text-[#00A699] font-bold">✓</span>
            <span className="text-sm text-[#4B5563]">{highlight}</span>
          </li>
        ))}
      </ul>

      {/* Show More / Collapse */}
      {hasMore && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="flex items-center gap-1 text-sm text-[#00A699] font-medium mb-6"
        >
          {showAll ? (
            <>
              Collapse all <ChevronUp className="w-4 h-4" />
            </>
          ) : (
            <>
              Show more <ChevronDown className="w-4 h-4" />
            </>
          )}
        </button>
      )}

      {/* Map Section Container */}
      <div className="relative w-full rounded-xl overflow-hidden">
        <div className="relative h-[260px] w-full">
          <Image
            src={mapImage}
            alt="Route map"
            fill
            className="object-cover"
          />
        </div>

        {/* View Destinations - BOTTOM RIGHT */}
        <button className="absolute bottom-4 right-4 bg-white shadow-md rounded-full px-4 py-2 flex items-center gap-2 text-sm font-medium text-[#1C1B1F] hover:bg-gray-50 transition">
          <Map className="w-4 h-4 text-[#00A699]" />
          View Destinations
        </button>
      </div>

      {/* Bottom Start / Destination Count / End Section */}
      <div className="flex items-center justify-between mt-6">
        {/* Start */}
        <div className="flex flex-col">
          <span className="text-[11px] text-gray-400">Starts</span>
          <span className="text-sm font-medium text-[#1C1B1F]">
            {startLocation}
          </span>
        </div>

        {/* Destination count (center line with dots) */}
        <div className="flex-1 flex items-center px-4">
          {/* Start Dot */}
          <div className="w-3 h-3 rounded-full bg-[#00A699] shrink-0" />

          {/* Line with destination badge */}
          <div className="flex-1 h-0.5 bg-[#00A699] relative mx-0">
            <span className="absolute left-1/2 -translate-x-1/2 -top-4 bg-white rounded-full shadow-md px-3 py-1.5 text-[11px] text-gray-600 whitespace-nowrap">
              6 more destinations
            </span>
          </div>

          {/* End Dot */}
          <div className="w-3 h-3 rounded-full bg-[#00A699] shrink-0" />
        </div>

        {/* End */}
        <div className="flex flex-col text-right">
          <span className="text-[11px] text-gray-400">Ends</span>
          <span className="text-sm font-medium text-[#1C1B1F]">
            {endLocation}
          </span>
        </div>
      </div>
    </div>
  );
}
