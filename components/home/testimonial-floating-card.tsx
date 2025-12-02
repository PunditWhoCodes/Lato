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
    w-[270px] md:w-[320px] px-5 py-4
  "
        >
            {/* Top row: avatar column + content column (two-column layout) */}
            <div className="grid grid-cols-[56px_1fr] gap-4 items-start mb-2">
                {/* Avatar column */}
                <div className="w-14 h-14 rounded-full overflow-hidden shrink-0">
                    <Image
                        src={avatar}
                        alt={name}
                        width={56}
                        height={56}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Content column (name + stars) */}
                <div>
                    <div className="flex items-center justify-between">
                        <p className="text-sm md:text-base font-poppins font-semibold text-gray-900">
                            {name}
                        </p>
                        
                    </div>

                    <div className="flex items-center gap-1 mt-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                                key={i}
                                size={14}
                                className={i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300 fill-gray-300"}
                            />
                        ))}
                        <div className="hidden md:flex items-center text-sm font-medium">
                            {rating}.0
                        </div>
                    </div>

                    <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                        &laquo; {text} &raquo;
                    </p>
                </div>
            </div>

        </div>
    )
}
