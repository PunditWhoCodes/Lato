"use client"

import Image from "next/image"
import { Star } from "lucide-react"

interface Props {
    name: string
    avatar: string
    rating: number
    text: string
}

export function TestimonialFloatingCard({ name, avatar, rating, text }: Props) {
    return (
        <div
            className="
    bg-white rounded-tr-3xl rounded-br-3xl rounded-bl-3xl rounded-tl-none border border-[#00000017] shadow-xl
    w-[220px] md:w-[240px] px-4 py-3
  "
        >
            {/* Top row: avatar column + content column (two-column layout) */}
            <div className="grid grid-cols-[48px_1fr] gap-3 items-start mb-2">
                {/* Avatar column */}
                <div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
                    <Image
                        src={avatar}
                        alt={name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Content column (name + stars) */}
                <div>
                    <div className="flex items-center justify-between">
                        <p className="text-xs md:text-sm font-poppins font-semibold text-gray-900">
                            {name}
                        </p>

                    </div>

                    <div className="flex items-center gap-1 mt-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                                key={i}
                                size={12}
                                className={i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300 fill-gray-300"}
                            />
                        ))}
                        <div className="hidden md:flex items-center text-xs font-medium">
                            {rating}.0
                        </div>
                    </div>

                    <p className="text-[11px] md:text-xs text-gray-600 leading-relaxed mt-1">
                        &laquo; {text} &raquo;
                    </p>
                </div>
            </div>

        </div>
    )
}
