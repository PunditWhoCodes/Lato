"use client";

import {
	MapPin,
	ChevronLeft,
	ChevronRight,
	Calendar,
	Minus,
	Plus,
	Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

// Destination names with their country codes for URL navigation
const DESTINATIONS: { name: string; code: string }[] = [
	{ name: "Thailand", code: "TH" },
	{ name: "Japan", code: "JP" },
	{ name: "Indonesia", code: "ID" },
	{ name: "Vietnam", code: "VN" },
	{ name: "Malaysia", code: "MY" },
	{ name: "Singapore", code: "SG" },
	{ name: "Philippines", code: "PH" },
	{ name: "South Korea", code: "KR" },
	{ name: "China", code: "CN" },
	{ name: "India", code: "IN" },
	{ name: "Italy", code: "IT" },
	{ name: "Spain", code: "ES" },
	{ name: "Greece", code: "GR" },
	{ name: "France", code: "FR" },
	{ name: "Portugal", code: "PT" },
	{ name: "Germany", code: "DE" },
	{ name: "Netherlands", code: "NL" },
	{ name: "Switzerland", code: "CH" },
	{ name: "Turkey", code: "TR" },
	{ name: "Croatia", code: "HR" },
	{ name: "Morocco", code: "MA" },
	{ name: "Egypt", code: "EG" },
	{ name: "Kenya", code: "KE" },
	{ name: "South Africa", code: "ZA" },
	{ name: "Tanzania", code: "TZ" },
	{ name: "Peru", code: "PE" },
	{ name: "Brazil", code: "BR" },
	{ name: "Argentina", code: "AR" },
	{ name: "Mexico", code: "MX" },
	{ name: "Colombia", code: "CO" },
];

// Legacy array for backward compatibility
const destinations = DESTINATIONS.map((d) => d.name);

type ActiveDropdown = "destination" | "calendar" | "passengers" | null;

export function SearchBar() {
	const router = useRouter();

	const [activeDropdown, setActiveDropdown] = useState<ActiveDropdown>(null);

	// Destination state
	const [destination, setDestination] = useState("");

	// Month picker state
	const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
	const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

	// Passengers state
	const [adults, setAdults] = useState(0);
	const [children, setChildren] = useState(0);
	// const [rooms, setRooms] = useState(1) -- unused

	// Refs for desktop
	const destinationDesktopRef = useRef<HTMLDivElement>(null);
	const calendarDesktopRef = useRef<HTMLDivElement>(null);
	const passengerDesktopRef = useRef<HTMLDivElement>(null);

	// Refs for mobile
	const destinationMobileRef = useRef<HTMLDivElement>(null);
	const calendarMobileRef = useRef<HTMLDivElement>(null);
	const passengerMobileRef = useRef<HTMLDivElement>(null);

	// Close dropdowns when clicking outside
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			const target = event.target as Node;

			// Check destination dropdowns (both desktop and mobile)
			const isOutsideDestination =
				(!destinationDesktopRef.current ||
					!destinationDesktopRef.current.contains(target)) &&
				(!destinationMobileRef.current ||
					!destinationMobileRef.current.contains(target));

			if (isOutsideDestination && activeDropdown === "destination") {
				setActiveDropdown(null);
			}

			// Check calendar dropdowns (both desktop and mobile)
			const isOutsideCalendar =
				(!calendarDesktopRef.current ||
					!calendarDesktopRef.current.contains(target)) &&
				(!calendarMobileRef.current ||
					!calendarMobileRef.current.contains(target));

			if (isOutsideCalendar && activeDropdown === "calendar") {
				setActiveDropdown(null);
			}

			// Check passenger dropdowns (both desktop and mobile)
			const isOutsidePassenger =
				(!passengerDesktopRef.current ||
					!passengerDesktopRef.current.contains(target)) &&
				(!passengerMobileRef.current ||
					!passengerMobileRef.current.contains(target));

			if (isOutsidePassenger && activeDropdown === "passengers") {
				setActiveDropdown(null);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () =>
			document.removeEventListener("mousedown", handleClickOutside);
	}, [activeDropdown]);

	const handleSearch = () => {
		// Build query parameters
		const params = new URLSearchParams();

		// Add country code if destination is selected
		if (destination) {
			const destInfo = DESTINATIONS.find((d) => d.name === destination);
			if (destInfo) {
				params.set("countries", destInfo.code);
			}
		}

		if (selectedMonth) {
			params.set("month", selectedMonth);
			params.set("year", String(selectedYear));
		}

		// Add passengers
		if (adults > 0) {
			params.set("adults", String(adults));
		}
		if (children > 0) {
			params.set("children", String(children));
		}

		// Navigate to tours page with filters
		const queryString = params.toString();
		router.push(`/tours${queryString ? `?${queryString}` : ""}`);
	};

	const MONTH_NAMES = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const MONTH_SHORT = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];

	const getMonthDisplay = () => {
		if (!selectedMonth) return "Select Month";
		return `${selectedMonth} ${selectedYear}`;
	};

	const handleMonthSelect = (e: React.MouseEvent, month: string) => {
		e.stopPropagation();
		setSelectedMonth(month);
		setActiveDropdown(null);
	};

	const goToPrevYear = (e: React.MouseEvent) => {
		e.stopPropagation();
		setSelectedYear(selectedYear - 1);
	};

	const goToNextYear = (e: React.MouseEvent) => {
		e.stopPropagation();
		setSelectedYear(selectedYear + 1);
	};

	// Passenger summary text
	const getPassengerSummary = () => {
		const parts = [];
		if (adults > 0) parts.push(`${adults} Adult${adults > 1 ? "s" : ""}`);
		if (children > 0)
			parts.push(`${children} Child${children > 1 ? "ren" : ""}`);
		return parts.length > 0 ? parts.join(", ") : "Passengers";
	};

	// Handle passenger count changes
	const handleAdultsChange = (e: React.MouseEvent, delta: number) => {
		setAdults((prev) => {
			const next = prev + delta;
			return Math.max(0, next);
		});
	};

	const handleChildrenChange = (e: React.MouseEvent, delta: number) => {
		e.stopPropagation();
		setChildren((prev) => Math.max(0, prev + delta));
	};

	// Handle done button
	const handlePassengerDone = (e: React.MouseEvent) => {
		e.stopPropagation();
		setActiveDropdown(null);
	};

	// Handle destination select
	const handleDestinationSelect = (e: React.MouseEvent, dest: string) => {
		e.stopPropagation();
		setDestination(dest);
		setActiveDropdown(null);
	};

	return (
		<div className="mx-auto w-full max-w-[1462px] p-0 md:p-8 lg:py-[46px] lg:px-8 bg-transparent md:bg-white/8 md:backdrop-blur-[55.55px] rounded-[19.69px]">
			{/* Desktop Layout */}
			<div className="hidden md:flex flex-row justify-between items-center bg-white mx-auto w-full max-w-[1380px] h-[69px] rounded-[30px]">
				{/* Three Input Fields Container */}
				<div className="relative bg-white flex items-center flex-1 h-[69px] rounded-[30px]">
					{/* First Field - Destination Dropdown */}
					<div
						ref={destinationDesktopRef}
						className="relative flex items-center flex-1 h-full bg-white border-r border-black/9 rounded-l-[30px] px-4 lg:px-5"
					>
						<button
							onClick={(e) => {
								e.stopPropagation();
								setActiveDropdown((prev) =>
									prev === "destination"
										? null
										: "destination",
								);
							}}
							className="w-full h-full flex items-center justify-between outline-none bg-transparent font-montserrat text-sm lg:text-base cursor-pointer"
						>
							<span
								className={
									destination
										? "text-[#112211]"
										: "text-[#112211]/50"
								}
							>
								{destination || "Destination"}
							</span>
							<MapPin className="w-5 h-5 text-[#00A792]" />
						</button>

						{/* Destination Dropdown */}
						{activeDropdown === "destination" && (
							<div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
								{destinations.map((dest) => (
									<button
										key={dest}
										onClick={(e) =>
											handleDestinationSelect(e, dest)
										}
										className={`w-full px-4 py-3 text-left text-sm hover:bg-[#F0FDFC] transition-colors cursor-pointer ${
											destination === dest
												? "bg-[#E6F7F5] text-[#00A792]"
												: "text-[#112211]"
										}`}
									>
										{dest}
									</button>
								))}
							</div>
						)}
					</div>

					{/* Second Field - Calendar Dropdown */}
					<div
						ref={calendarDesktopRef}
						className="relative flex items-center flex-1 h-full bg-white px-4 lg:px-5"
					>
						<button
							onClick={(e) => {
								e.stopPropagation();
								setActiveDropdown((prev) =>
									prev === "calendar" ? null : "calendar",
								);
							}}
							className="w-full h-full flex items-center justify-between outline-none bg-transparent font-montserrat text-sm lg:text-base cursor-pointer"
						>
							<span
								className={
									selectedMonth
										? "text-[#112211]"
										: "text-[#112211]/50"
								}
							>
								{getMonthDisplay()}
							</span>
							<Calendar className="w-5 h-5 text-[#00A792]" />
						</button>

						{/* Month Picker Dropdown */}
						{activeDropdown === "calendar" && (
							<div
								className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 p-4 w-[320px]"
								onClick={(e) => e.stopPropagation()}
							>
								{/* Year Navigation */}
								<div className="flex items-center justify-between mb-4">
									<button
										onClick={goToPrevYear}
										className="p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
									>
										<ChevronLeft className="w-5 h-5 text-[#112211]" />
									</button>
									<span className="font-medium text-[#112211]">
										{selectedYear}
									</span>
									<button
										onClick={goToNextYear}
										className="p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
									>
										<ChevronRight className="w-5 h-5 text-[#112211]" />
									</button>
								</div>

								{/* Month Grid (4x3) */}
								<div className="grid grid-cols-4 gap-2">
									{MONTH_NAMES.map((month, index) => (
										<button
											key={month}
											onClick={(e) =>
												handleMonthSelect(e, month)
											}
											className={`py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
												selectedMonth === month &&
												selectedYear === selectedYear
													? "bg-[#00A792] text-white"
													: "hover:bg-[#E6F7F5] text-[#112211]"
											}`}
										>
											{MONTH_SHORT[index]}
										</button>
									))}
								</div>
							</div>
						)}
					</div>

					{/* Third Field - Passenger Dropdown */}
					<div
						ref={passengerDesktopRef}
						className="relative flex items-center flex-1 h-full bg-white border-l border-black/[0.2] rounded-r-[30px] px-4 lg:px-5"
					>
						<button
							onClick={(e) => {
								e.stopPropagation();
								setActiveDropdown((prev) =>
									prev === "passengers" ? null : "passengers",
								);
							}}
							className="w-full h-full flex items-center justify-between outline-none bg-transparent font-montserrat text-sm lg:text-base cursor-pointer"
						>
							<span
								className={
									adults > 0 || children > 0
										? "text-[#112211]"
										: "text-[#112211]/50"
								}
							>
								{adults > 0 || children > 0
									? getPassengerSummary()
									: "Passengers"}
							</span>
							<Users className="w-5 h-5 text-[#00A792]" />
						</button>

						{/* Passenger Dropdown */}
						{activeDropdown === "passengers" && (
							<div
								className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 p-4 w-[250px]"
								onClick={(e) => e.stopPropagation()}
							>
								{/* Adults Row */}
								<div className="flex items-center justify-between py-3">
									<span className="text-[#112211] ">
										Adults
									</span>
									<div className="flex items-center border border-gray-200 rounded-lg">
										<button
											disabled={adults === 0}
											onClick={(e) =>
												adults > 0 &&
												handleAdultsChange(e, -1)
											}
											className="w-9 h-9 flex items-center justify-center text-[#00A792] hover:bg-gray-50 transition-colors rounded-l-lg cursor-pointer"
										>
											<Minus className="w-4 h-4" />
										</button>
										<span className="w-9 h-9 flex items-center justify-center text-[#112211] font-medium border-x border-gray-200">
											{adults}
										</span>
										<button
											onClick={(e) =>
												handleAdultsChange(e, 1)
											}
											className="w-9 h-9 flex items-center justify-center text-[#00A792] hover:bg-gray-50 transition-colors rounded-r-lg cursor-pointer"
										>
											<Plus className="w-4 h-4" />
										</button>
									</div>
								</div>

								{/* Children Row */}
								<div className="flex items-center justify-between py-3">
									<span className="text-[#112211]">
										Children
									</span>
									<div className="flex items-center border border-gray-200 rounded-lg">
										<button
											disabled={children === 0}
											onClick={(e) =>
												handleChildrenChange(e, -1)
											}
											className="w-9 h-9 flex items-center justify-center text-[#00A792] hover:bg-gray-50 transition-colors rounded-l-lg cursor-pointer"
										>
											<Minus className="w-4 h-4" />
										</button>
										<span className="w-9 h-9 flex items-center justify-center text-[#112211] font-medium border-x border-gray-200">
											{children}
										</span>
										<button
											onClick={(e) =>
												handleChildrenChange(e, 1)
											}
											className="w-9 h-9 flex items-center justify-center text-[#00A792] hover:bg-gray-50 transition-colors rounded-r-lg cursor-pointer"
										>
											<Plus className="w-4 h-4" />
										</button>
									</div>
								</div>

								{/* Done Button */}
								<div className="group pt-3">
									<button
										onClick={handlePassengerDone}
										className="relative overflow-hidden w-full bg-[#00A792] text-white rounded-[30px] font-montserrat font-medium h-10 text-sm cursor-pointer"
									>
										<span className="relative z-10">
											Done
										</span>
										<span className="absolute inset-0 bg-black rounded-full scale-0 opacity-0 transition-all duration-700 ease-out group-hover:scale-150 group-hover:opacity-100 z-0"></span>
									</button>
								</div>
							</div>
						)}
					</div>
				</div>

				{/* Search Button */}
				<div className="group flex-none ml-4 lg:ml-0 mr-2 lg:mr-4">
					<Button
						onClick={handleSearch}
						className="relative overflow-hidden bg-[#00A792] text-white rounded-[30px] font-montserrat font-medium cursor-pointer"
						style={{
							width: "150px",
							height: "50px",
							fontSize: "16px",
						}}
					>
						<span className="relative z-10">Search</span>

						{/* Radial expanding hover overlay */}
						<span className="absolute inset-0 bg-black rounded-full scale-0 opacity-0 transition-all duration-700 ease-out group-hover:scale-150 group-hover:opacity-100 z-0"></span>
					</Button>
				</div>
			</div>

			{/* Mobile Layout - Figma: Frame 1984078325 */}
			<div className="md:hidden w-full bg-[rgba(217,217,217,0.2)] backdrop-blur-[20px] border border-white rounded-[10px] py-[18px]">
				{/* Inner Container */}
				<div className="flex flex-col items-center gap-[18px] w-[317px] mx-auto">
					<div
						ref={destinationMobileRef}
						className="relative w-[301px]"
					>
						<button
							onClick={(e) => {
								e.stopPropagation();
								setActiveDropdown((prev) =>
									prev === "destination"
										? null
										: "destination",
								);
							}}
							className="w-[301px] h-[52px] bg-white rounded-full border border-black/[0.09] flex items-center pl-[15px] pr-0 cursor-pointer"
						>
							<span
								className={`flex-1 font-montserrat font-normal text-[12.08px] leading-[15px] text-left ${destination ? "text-[#112211]" : "text-[#112211]"}`}
							>
								{destination || "Destination"}
							</span>
							{/* Location Icon Container */}
							<div className="flex items-center justify-center w-[44.6px] h-[44.6px] p-[11.15px]">
								<svg
									width="19"
									height="19"
									viewBox="0 0 19 19"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M9.5 10.2812C10.5701 10.2812 11.4375 9.41382 11.4375 8.34375C11.4375 7.27368 10.5701 6.40625 9.5 6.40625C8.42993 6.40625 7.5625 7.27368 7.5625 8.34375C7.5625 9.41382 8.42993 10.2812 9.5 10.2812Z"
										stroke="#00A792"
										strokeWidth="1.13"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M9.5 2.53125C7.96146 2.53125 6.48597 3.14279 5.39876 4.23001C4.31154 5.31722 3.7 6.79271 3.7 8.33125C3.7 9.68562 3.97438 10.5519 4.74375 11.5469L9.5 17.4688L14.2562 11.5469C15.0256 10.5519 15.3 9.68562 15.3 8.33125C15.3 6.79271 14.6885 5.31722 13.6012 4.23001C12.514 3.14279 11.0385 2.53125 9.5 2.53125Z"
										stroke="#00A792"
										strokeWidth="1.13"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</div>
						</button>

						{/* Destination Dropdown - Mobile */}
						{activeDropdown === "destination" && (
							<div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-[20px] shadow-lg z-50 max-h-60 overflow-y-auto">
								{destinations.map((dest) => (
									<button
										key={dest}
										onClick={(e) =>
											handleDestinationSelect(e, dest)
										}
										className={`w-full px-[14.87px] py-3 text-left font-montserrat text-[12.08px] hover:bg-[#F0FDFC] transition-colors cursor-pointer ${
											destination === dest
												? "bg-[#E6F7F5] text-[#00A792]"
												: "text-[#112211]"
										}`}
									>
										{dest}
									</button>
								))}
							</div>
						)}
					</div>

					<div ref={calendarMobileRef} className="relative w-[301px]">
						<button
							onClick={(e) => {
								e.stopPropagation();
								setActiveDropdown((prev) =>
									prev === "calendar" ? null : "calendar",
								);
							}}
							className="w-[301px] h-[52px] bg-white rounded-full border border-black/[0.09] flex items-center pl-[15px] pr-0 cursor-pointer"
						>
							<span
								className={`flex-1 font-montserrat font-normal text-[12.08px] leading-[15px] text-left ${selectedMonth ? "text-[#1C1B1F]" : "text-[#1C1B1F]"}`}
							>
								{selectedMonth
									? getMonthDisplay()
									: "Select Month"}
							</span>
							{/* Calendar Icon Container */}
							<div className="flex items-center justify-center w-[44.6px] h-[44.6px] p-[11.15px]">
								<svg
									width="19"
									height="19"
									viewBox="0 0 19 19"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<rect
										x="2.375"
										y="3.5625"
										width="14.25"
										height="13.0625"
										rx="2"
										stroke="#00A792"
										strokeWidth="1.13"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M2.375 7.125H16.625"
										stroke="#00A792"
										strokeWidth="1.13"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M6.33337 1.1875V3.5625"
										stroke="#00A792"
										strokeWidth="1.13"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M12.6666 1.1875V3.5625"
										stroke="#00A792"
										strokeWidth="1.13"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</div>
						</button>

						{/* Month Picker Dropdown - Mobile */}
						{activeDropdown === "calendar" && (
							<div
								className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-[20px] shadow-lg z-50 p-4"
								onClick={(e) => e.stopPropagation()}
							>
								{/* Year Navigation */}
								<div className="flex items-center justify-between mb-4">
									<button
										onClick={goToPrevYear}
										className="p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
									>
										<ChevronLeft className="w-5 h-5 text-[#112211]" />
									</button>
									<span className="font-medium text-[#112211] text-[12.08px]">
										{selectedYear}
									</span>
									<button
										onClick={goToNextYear}
										className="p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
									>
										<ChevronRight className="w-5 h-5 text-[#112211]" />
									</button>
								</div>

								{/* Month Grid (4x3) */}
								<div className="grid grid-cols-4 gap-2">
									{MONTH_NAMES.map((month, index) => (
										<button
											key={month}
											onClick={(e) =>
												handleMonthSelect(e, month)
											}
											className={`py-2 rounded-lg text-[12px] font-medium transition-colors cursor-pointer ${
												selectedMonth === month
													? "bg-[#00A792] text-white"
													: "hover:bg-[#E6F7F5] text-[#112211]"
											}`}
										>
											{MONTH_SHORT[index]}
										</button>
									))}
								</div>
							</div>
						)}
					</div>

					{/* Text Field 3 - Select Duration */}
					<div
						ref={passengerMobileRef}
						className="relative w-[301px]"
					>
						<button
							onClick={(e) => {
								e.stopPropagation();
								setActiveDropdown((prev) =>
									prev === "passengers" ? null : "passengers",
								);
							}}
							className="w-[301px] h-[52px] bg-white rounded-full border border-black/[0.09] flex items-center pl-[15px] pr-0 cursor-pointer"
						>
							<span
								className={`flex-1 font-montserrat font-normal text-[12.08px] leading-[15px] text-left ${adults > 0 || children > 0 ? "text-[#1C1B1F]" : "text-[#1C1B1F]"}`}
							>
								{adults > 1 || children > 0
									? getPassengerSummary()
									: "Passengers"}
							</span>
							{/* Users Icon Container */}
							<div className="flex items-center justify-center w-[44.6px] h-[44.6px] p-[11.15px]">
								<svg
									width="19"
									height="19"
									viewBox="0 0 19 19"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M13.4583 16.625V15.0417C13.4583 14.2014 13.1244 13.3956 12.5305 12.8017C11.9366 12.2078 11.1308 11.875 10.2916 11.875H4.75C3.91083 11.875 3.10497 12.2078 2.51111 12.8017C1.91726 13.3956 1.58331 14.2014 1.58331 15.0417V16.625"
										stroke="#00A792"
										strokeWidth="1.13"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M7.52081 8.70833C9.27174 8.70833 10.6916 7.28845 10.6916 5.5375C10.6916 3.78655 9.27174 2.36667 7.52081 2.36667C5.76988 2.36667 4.35 3.78655 4.35 5.5375C4.35 7.28845 5.76988 8.70833 7.52081 8.70833Z"
										stroke="#00A792"
										strokeWidth="1.13"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M17.4167 16.625V15.0417C17.4161 14.3398 17.1854 13.6581 16.7612 13.1028C16.337 12.5475 15.7433 12.1501 15.0667 11.9696"
										stroke="#00A792"
										strokeWidth="1.13"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M12.6667 2.46958C13.3451 2.64907 13.9406 3.04665 14.366 3.60279C14.7914 4.15893 15.0226 4.84194 15.0226 5.545C15.0226 6.24806 14.7914 6.93107 14.366 7.48721C13.9406 8.04335 13.3451 8.44093 12.6667 8.62042"
										stroke="#00A792"
										strokeWidth="1.13"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</div>
						</button>

						{/* Passenger Dropdown - Mobile */}
						{activeDropdown === "passengers" && (
							<div
								className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-[20px] shadow-lg z-50 p-4"
								onClick={(e) => e.stopPropagation()}
							>
								{/* Adults Row */}
								<div className="flex items-center justify-between py-3">
									<span className="text-[#112211] font-medium text-[12.08px]">
										Adults
									</span>
									<div className="flex items-center border border-gray-200 rounded-lg">
										<button
											disabled={adults === 0}
											onClick={(e) =>
												adults > 0 &&
												handleAdultsChange(e, -1)
											}
											className="w-8 h-8 flex items-center justify-center text-[#00A792] hover:bg-gray-50 transition-colors rounded-l-lg cursor-pointer"
										>
											<Minus className="w-4 h-4" />
										</button>
										<span className="w-8 h-8 flex items-center justify-center text-[#112211] font-medium text-[12.08px] border-x border-gray-200">
											{adults}
										</span>
										<button
											onClick={(e) =>
												handleAdultsChange(e, 1)
											}
											className="w-8 h-8 flex items-center justify-center text-[#00A792] hover:bg-gray-50 transition-colors rounded-r-lg cursor-pointer"
										>
											<Plus className="w-4 h-4" />
										</button>
									</div>
								</div>

								{/* Children Row */}
								<div className="flex items-center justify-between py-3">
									<span className="text-[#112211] font-medium text-[12.08px]">
										Children
									</span>
									<div className="flex items-center border border-gray-200 rounded-lg">
										<button
											disabled={children === 0}
											onClick={(e) =>
												handleChildrenChange(e, -1)
											}
											className="w-8 h-8 flex items-center justify-center text-[#00A792] hover:bg-gray-50 transition-colors rounded-l-lg cursor-pointer"
										>
											<Minus className="w-4 h-4" />
										</button>
										<span className="w-8 h-8 flex items-center justify-center text-[#112211] font-medium text-[12.08px] border-x border-gray-200">
											{children}
										</span>
										<button
											onClick={(e) =>
												handleChildrenChange(e, 1)
											}
											className="w-8 h-8 flex items-center justify-center text-[#00A792] hover:bg-gray-50 transition-colors rounded-r-lg cursor-pointer"
										>
											<Plus className="w-4 h-4" />
										</button>
									</div>
								</div>

								{/* Done Button */}
								<div className="group pt-3">
									<button
										onClick={handlePassengerDone}
										className="relative overflow-hidden w-full bg-[#00A792] text-white rounded-[22.65px] font-montserrat font-medium h-[40px] text-[12.08px] cursor-pointer"
									>
										<span className="relative z-10">
											Done
										</span>
										<span className="absolute inset-0 bg-black rounded-[22.65px] scale-0 opacity-0 transition-all duration-700 ease-out group-hover:scale-150 group-hover:opacity-100 z-0"></span>
									</button>
								</div>
							</div>
						)}
					</div>

					{/* Search Button */}
					<button
						onClick={handleSearch}
						className="group relative w-[301px] h-[50px] bg-[#00A792] rounded-[30px] flex items-center justify-center overflow-hidden cursor-pointer"
					>
						<span className="relative z-10 font-montserrat font-medium text-[12px] leading-[15px] text-white">
							Search
						</span>
						<span className="absolute inset-0 bg-black rounded-[30px] scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-150 group-hover:opacity-100 z-0"></span>
					</button>
				</div>
			</div>
		</div>
	);
}
