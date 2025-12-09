"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ShimmerImage } from "@/components/ui/shimmer-image";
import type { Tour } from "@/types";

interface Props {
    tour: Tour;
}

export function TrendingTourCard({ tour }: Props) {
    const discountedPrice = tour.price;
    const hasDiscount = !!tour.originalPrice;

    return (
        <Link href={`/tours/${tour.uuid || tour.id}`} className="block group h-full">
            <Card
                className="h-full flex flex-col border border-black/10 rounded-[24px] overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 p-3"
            >
                {/* Image */}
                <div
                    className="relative mb-4 w-full overflow-hidden rounded-[16px]"
                    style={{ height: "220px" }}
                >
                    <ShimmerImage
                        src={tour.image || "/placeholder.svg"}
                        alt={tour.title}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Discount Badge */}
                    {hasDiscount && (
                        <div className="absolute top-3 left-3 bg-[#F23813] text-white text-xs font-semibold px-3 py-1 rounded-full">
                            -{Math.round(((tour.price - discountedPrice) / tour.price) * 100)}%off
                        </div>
                    )}
                </div>

                <div className="flex flex-col flex-grow px-1">
                    {/* Header Row: Title + Rating */}
                    <div className="flex items-start justify-between mb-3">
                        <h3 className="font-poppins font-medium text-[17px] leading-[22px] text-[#1C2B38] w-[75%] line-clamp-2 min-h-[44px]">
                            {tour.title}
                        </h3>

                        <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-[#FFA432] text-[#FFA432]" />
                            <span className="font-mulish text-[14px] font-semibold text-[#778088]">
                                {tour.rating}
                            </span>
                        </div>
                    </div>

                    {/* Duration */}
                    <p className="text-[#778088] font-mulish text-[14px] mb-2">
                        {tour.duration || 9} days
                    </p>

                    {/* Price Section - pushed to bottom */}
                    <div className="flex items-center gap-2 mt-auto">
                        <span className="text-[#778088] font-mulish text-[14px]">
                            From
                        </span>

                        {hasDiscount && (
                            <span className="line-through font-poppins text-[14px]">
                                ${tour.price.toFixed(2)}
                            </span>
                        )}

                        <span className="font-poppins text-[16px] font-semibold text-[#F23813]">
                            ${discountedPrice.toFixed(2)}
                        </span>
                    </div>
                </div>
            </Card>
        </Link>
    );
}
