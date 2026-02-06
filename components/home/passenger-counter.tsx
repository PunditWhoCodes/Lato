import { Minus, Plus } from "lucide-react";
import React from "react";

type Props = {
	label: string;
	value: number;
	onChange: (e: React.MouseEvent<Element, MouseEvent>, delta: number) => void;
	size?: "desktop" | "mobile";
};

export function PassengerCounter({
	label,
	value,
	onChange,
	size = "desktop",
}: Props) {
	const isMobile = size === "mobile";

	const btnSize = isMobile ? "w-8 h-8" : "w-9 h-9";
	const textSize = isMobile ? "text-[12.08px]" : "";

	return (
		<div className="flex items-center justify-between py-3">
			<span className={`text-[#112211] ${textSize}`}>{label}</span>

			<div className="flex items-center border border-gray-200 rounded-lg">
				<button
					disabled={value === 0}
					onClick={(e) => value > 0 && onChange(e, -1)}
					className={`${btnSize} flex items-center justify-center ${
						value === 0
							? "text-gray-400 cursor-not-allowed"
							: "text-[#00A792] hover:bg-gray-50 cursor-pointer"
					} transition-colors rounded-l-lg`}
				>
					<Minus className="w-4 h-4" />
				</button>

				<span
					className={`${btnSize} flex items-center justify-center text-[#112211] font-medium border-x border-gray-200`}
				>
					{value}
				</span>

				<button
					onClick={(e) => onChange(e, 1)}
					className={`${btnSize} flex items-center justify-center text-[#00A792] hover:bg-gray-50 transition-colors rounded-r-lg cursor-pointer`}
				>
					<Plus className="w-4 h-4" />
				</button>
			</div>
		</div>
	);
}
