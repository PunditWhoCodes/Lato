"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Heart, Clock, Users, Bus } from "lucide-react";
import type { Tour } from "@/types";
import { useSavedTours } from "@/lib/saved-tours-context";
import { cn } from "@/lib/utils";
import { ShimmerImage } from "@/components/ui/shimmer-image";
import { BookNowButton } from "@/components/ui/book-now-button";

interface TourCardProps {
	tour: Tour;
	variant?: "default" | "discount" | "featured";
	discountPercent?: number;
}

export function TourCard({
	tour,
	variant = "default",
	discountPercent,
}: TourCardProps) {
	const { toggleSaveTour, isTourSaved } = useSavedTours();
	const tourIdentifier = tour.uuid || tour.id.toString();
	const isSaved = isTourSaved(tourIdentifier);

	const handleSaveClick = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		toggleSaveTour(tourIdentifier, tour);
	};

	// Use UUID if available, otherwise fall back to numeric ID
	const tourLink = tourIdentifier;

	// Featured variant - responsive design (mobile + desktop)
	if (variant === "featured") {
		return (
			<Link href={`/tours/${tourLink}`}>
				{/* Mobile Card - Figma: 218.23px width, 221.44px height, padding 7.13px, gap 7.49px, border-radius 11.19px */}
				<Card className="md:hidden group hover:shadow-xl transition-all duration-300 cursor-pointer bg-white overflow-hidden flex flex-col p-[7.13px] gap-[7.49px] w-[218.23px] h-[221.44px] border-[0.37px] border-black/9 rounded-[11.19px]">
					{/* Frame 2608743 - Image container with title/rating row */}
					<div className="flex flex-col items-center gap-[10.34px] w-[203.96px] h-[145.22px]">
						{/* Image - Figma: 203.96px x 120.88px, border-radius 7.13px */}
						<div className="relative overflow-hidden w-[203.96px] h-[120.88px] rounded-[7.13px]">
							<ShimmerImage
								src={tour.image || "/placeholder.svg"}
								alt={tour.title}
								className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-[7.13px]"
							/>
						</div>

						{/* Frame 2608742 - Title and Rating Row */}
						<div className="flex flex-row justify-between items-start w-[203.96px] h-[14px] gap-[13.55px]">
							<h3
								className="font-poppins font-medium text-[7.46px] leading-[9px] text-[#1C2B38] w-[153.61px] h-[14px] line-clamp-1 truncate"
								title={tour.title}
							>
								{tour.title}
							</h3>
							{/* Frame 2608741 - Rating */}
							<div className="flex flex-row items-center gap-[3.57px] w-[23.19px] h-[9.63px]">
								<Star className="w-[9.63px] h-[9.63px] fill-[#FFA432] text-[#FFA432]" />
								<span className="font-mulish font-semibold text-[6.71px] leading-[8px] text-[#778088]">
									{tour.rating}
								</span>
							</div>
						</div>
					</div>

					{/* Frame 2608745 - Price and Features section */}
					<div className="flex flex-col items-start gap-[7.49px] w-[203.96px]">
						{/* Price Group */}
						<div className="flex flex-col">
							<span
								className="font-volkhov font-bold text-[7.46px] leading-[9px] text-[#7BBCB0]"
								style={{
									textShadow: "0px 1.78px 4.64px rgba(255, 255, 255, 0.4)",
								}}
							>
								${tour.price}
							</span>
							<span className="font-poppins font-normal text-[5.97px] leading-[9px] text-[#778088]">
								per person
							</span>
						</div>

						{/* Features and Button Row */}
						<div className="flex flex-row justify-between items-end w-full">
							{/* Features Column */}
							<div className="flex flex-col gap-[3.57px]">
								<div className="flex items-center gap-[2px]">
									<Clock className="w-[6px] h-[6px] text-[#495560]" />
									<span className="font-poppins font-normal text-[5.97px] leading-[9px] text-[#495560]">
										Duration {tour.duration} hours
									</span>
								</div>
								<div className="flex items-center gap-[2px]">
									<Bus className="w-[7px] h-[5px] text-[#495560]" />
									<span className="font-poppins font-normal text-[5.97px] leading-[7px] text-[#495560]">
										Transport Facility
									</span>
								</div>
								<div className="flex items-center gap-[2px]">
									<Users className="w-[7px] h-[5px] text-[#495560]" />
									<span className="font-poppins font-normal text-[5.97px] leading-[7px] text-[#495560]">
										Family Plan
									</span>
								</div>
							</div>

							{/* Book Now Button */}
							<BookNowButton
								href={`/tours/${tourLink}/book`}
								size="xs"
								className="w-[73.08px]"
							/>
						</div>
					</div>
				</Card>

				{/* Desktop Card */}
				<Card
					className="hidden md:block group max-w-[522px] lg:h-[533px] hover:shadow-xl transition-all duration-300 cursor-pointer bg-white overflow-hidden border border-black/9"
					style={{ borderRadius: "26.8px", padding: "17.08px" }}
				>
					{/* Image */}
					<div
						className="relative overflow-hidden mb-[17.94px]"
						style={{ borderRadius: "17.08px" }}
					>
						<ShimmerImage
							src={tour.image || "/placeholder.svg"}
							alt={tour.title}
							className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
							style={{ height: "289.59px", borderRadius: "17.08px" }}
						/>
					</div>

					{/* Content */}
					<div className="flex flex-col gap-[17.94px]">
						{/* Title and Rating Row */}
						<div className="flex items-start justify-between gap-4">
							<h3
								className="font-poppins font-medium text-[#1C2B38] leading-tight flex-1 line-clamp-1"
								style={{ fontSize: "17.86px", lineHeight: "22px" }}
								title={tour.title}
							>
								{tour.title}
							</h3>
							<div className="flex items-center gap-2 shrink-0">
								<Star className="w-[23px] h-[23px] fill-[#FFA432] text-[#FFA432]" />
								<span
									className="font-mulish font-semibold text-[#778088]"
									style={{ fontSize: "16.08px", lineHeight: "20px" }}
								>
									{tour.rating}
								</span>
							</div>
						</div>

						{/* Price */}
						<div className="flex flex-col">
							<div
								className="font-volkhov font-bold text-[#7BBCB0]"
								style={{
									fontSize: "17.86px",
									lineHeight: "22px",
									textShadow: "0px 4.27px 11.11px rgba(255, 255, 255, 0.4)",
								}}
							>
								${tour.price}
							</div>
							<div
								className="font-poppins text-[#778088]"
								style={{ fontSize: "14.29px", lineHeight: "21px" }}
							>
								per person
							</div>
						</div>

						{/* Features and Button Row */}
						<div className="flex items-end justify-between gap-4">
							{/* Left: Features */}
							<div className="flex flex-col gap-2">
								<div className="flex items-center gap-1.5">
									<Clock className="w-[13.67px] h-[13.67px] text-[#495560]" />
									<span
										className="font-poppins text-[#495560]"
										style={{ fontSize: "14.29px", lineHeight: "21px" }}
									>
										Duration {tour.duration}
									</span>
								</div>
								<div className="flex items-center gap-1.5">
									<Bus className="w-[16.74px] h-[11.96px] text-[#495560]" />
									<span
										className="font-mulish text-[#495560]"
										style={{ fontSize: "14.29px", lineHeight: "18px" }}
									>
										Transport Facility
									</span>
								</div>
								<div className="flex items-center gap-1.5">
									<Users className="w-[16.31px] h-[11.96px] text-[#495560]" />
									<span
										className="font-mulish text-[#495560]"
										style={{ fontSize: "14.29px", lineHeight: "18px" }}
									>
										Family Plan
									</span>
								</div>
							</div>

							{/* Right: Book Now Button */}
							<BookNowButton
								href={`/tours/${tourLink}/book`}
								size="md"
								className="w-[175.07px]"
							/>
						</div>
					</div>
				</Card>
			</Link>
		);
	}

	// Default and discount variants
	return (
		<Link href={`/tours/${tourLink}`}>
			{/* Mobile Card - Figma: 345px x 352.35px */}
			<Card className="md:hidden group hover:shadow-xl transition-all duration-300 cursor-pointer bg-white overflow-hidden flex flex-col p-[11.27px] gap-[11.84px] w-[345px] h-[352.35px] border-[0.59px] border-black/9 rounded-[17.68px]">
				{/* Frame 2608743 - Image + Title/Rating */}
				<div className="flex flex-col items-center gap-[16.35px] w-[322.45px] h-[230.45px]">
					{/* Image */}
					<div className="relative overflow-hidden w-[322.45px] h-[191.1px] rounded-[11.27px]">
						<ShimmerImage
							src={tour.image || "/placeholder.svg"}
							alt={tour.title}
							className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-[11.27px]"
						/>
					</div>

					{/* Frame 2608742 - Title and Rating Row */}
					<div className="flex flex-row justify-between items-start w-[322.45px] h-[23px] gap-[21.42px]">
						<h3 className="font-poppins font-medium text-[11.79px] leading-[15px] text-[#1C2B38] w-[242.85px] line-clamp-2">
							{tour.title}
						</h3>
						{/* Frame 2608741 - Rating */}
						<div className="flex flex-row items-center gap-[5.64px]">
							<Star className="w-[15.22px] h-[15.22px] fill-[#FFA432] text-[#FFA432]" />
							<span className="font-mulish font-semibold text-[10.61px] leading-[13px] text-[#778088]">
								{tour.rating}
							</span>
						</div>
					</div>
				</div>

				{/* Frame 2608745 - Price and Features section */}
				<div className="flex flex-col items-start gap-[11.84px] w-[322.45px] h-[87.51px]">
					{/* Group 231 - Price */}
					<div className="relative w-[55.59px] h-[26.4px]">
						<span
							className="absolute left-0 top-0 w-[38px] h-[15px] font-volkhov font-bold text-[11.79px] leading-[15px] text-right text-[#7BBCB0]"
							style={{
								textShadow: "0px 2.82px 7.33px rgba(255, 255, 255, 0.4)",
							}}
						>
							${tour.price}
						</span>
						<span className="absolute left-[4.59px] top-[12.4px] w-[51px] h-[14px] font-poppins font-normal text-[9.43px] leading-[14px] text-[#778088]">
							per person
						</span>
					</div>

					{/* Frame 2608744 - Features and Button Row */}
					<div className="flex flex-row justify-between items-end w-[322.45px] h-[49.27px]">
						{/* Frame 2608740 - Features Column */}
						<div className="flex flex-col justify-center items-start gap-[5.64px] w-[78.36px] h-[49.27px]">
							{/* Group 202 - Duration */}
							<div className="flex items-center gap-[4.13px] w-[90.77px] h-[14px]">
								<Clock className="w-[9.02px] h-[9.02px] text-[#495560]" />
								<span className="w-[78px] h-[14px] font-poppins font-normal text-[9.43px] leading-[14px] text-[#495560]">
									Duration {tour.duration} hours
								</span>
							</div>
							{/* Group 201 - Transport */}
							<div className="flex items-center gap-[2.95px] w-[91.31px] h-[12px]">
								<Bus className="w-[11.05px] h-[7.89px] text-[#495560]" />
								<span className="w-[77px] h-[12px] font-mulish font-semibold text-[9.43px] leading-[12px] text-[#495560]">
									Transport Facility
								</span>
							</div>
							{/* Group 200 - Family Plan */}
							<div className="flex items-center gap-[2.95px] w-[65.4px] h-[12px]">
								<Users className="w-[10.76px] h-[7.89px] text-[#495560]" />
								<span className="w-[52px] h-[12px] font-mulish font-semibold text-[9.43px] leading-[12px] text-[#495560]">
									Family Plan
								</span>
							</div>
						</div>

						{/* Button (1) - Book Now */}
						<BookNowButton
							href={`/tours/${tourLink}/book`}
							size="md"
							className="w-[115.53px] h-[29.47px]"
						/>
					</div>
				</div>
			</Card>

			{/* Desktop Card */}
			<Card className="hidden md:block group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer border-0 shadow-lg bg-white overflow-hidden rounded-4xl">
				<div className="relative overflow-hidden h-56">
					<ShimmerImage
						src={tour.image || "/placeholder.svg"}
						alt={tour.title}
						className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700 rounded-t-4xl"
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

					{/* Discount Badge */}
					{variant === "discount" && discountPercent && (
						<div className="absolute top-4 left-4">
							<Badge className="bg-accent text-white font-montserrat font-semibold text-sm px-3 py-1 border-0 shadow-lg">
								{discountPercent}% OFF
							</Badge>
						</div>
					)}

					{/* Regular Badges */}
					{variant === "default" && (
						<div className="absolute top-4 left-4 flex flex-wrap gap-2">
							{tour.badges.map((badge, badgeIndex) => (
								<Badge
									key={badgeIndex}
									className="bg-white/90 text-text-primary backdrop-blur-sm font-mulish font-semibold border-0"
								>
									{badge}
								</Badge>
							))}
						</div>
					)}

					{/* Save Button */}
					<div className="absolute top-4 right-4 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
						<Button
							size="sm"
							variant="secondary"
							className={cn(
								"rounded-full shadow-lg hover:scale-110 transition-all bg-white",
								isSaved && "bg-primary hover:bg-primary/90",
							)}
							onClick={handleSaveClick}
							aria-label={isSaved ? "Remove from saved tours" : "Save tour"}
						>
							<Heart
								className={cn(
									"w-4 h-4 transition-all",
									isSaved && "fill-white text-white",
								)}
							/>
						</Button>
					</div>
				</div>

				<CardContent className="p-5">
					<div className="flex items-start justify-between mb-2">
						<h3 className="font-poppins font-semibold text-lg text-text-primary group-hover:text-primary transition-colors leading-tight flex-1">
							{tour.title}
						</h3>
						<div className="text-right ml-4">
							{variant === "discount" && discountPercent ? (
								<>
									<div className="line-through text-text-muted font-volkhov text-sm">
										€{tour.price}
									</div>
									<span className="font-volkhov font-bold text-xl text-primary">
										€{Math.round(tour.price * (1 - discountPercent / 100))}
									</span>
								</>
							) : (
								<span className="font-volkhov font-bold text-xl text-primary">
									€{tour.price}
								</span>
							)}
							<div className="text-xs text-text-muted font-mulish">
								per person
							</div>
						</div>
					</div>

					<p className="text-text-muted mb-3 font-mulish font-semibold text-sm">
						{tour.company}
					</p>

					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<div className="flex items-center gap-1">
								<Star className="w-4 h-4 fill-orange text-orange" />
								<span className="font-semibold text-text-primary font-poppins">
									{tour.rating}
								</span>
							</div>
							<span className="text-text-muted font-poppins text-sm">
								({tour.reviews})
							</span>
						</div>
						<div className="text-primary font-montserrat font-semibold text-sm hover:underline">
							View Details →
						</div>
					</div>
				</CardContent>
			</Card>
		</Link>
	);
}
