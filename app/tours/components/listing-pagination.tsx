"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface ListingPaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

const MAX_VISIBLE_PAGES = 7;

export function ListingPagination({
	currentPage,
	totalPages,
	onPageChange,
}: ListingPaginationProps) {
	const getPageNumbers = () => {
		const pages: (number | string)[] = [];

		if (totalPages <= MAX_VISIBLE_PAGES) {
			return Array.from({ length: totalPages }, (_, i) => i + 1);
		}

		// First page
		pages.push(1);

		// Left ellipsis
		if (currentPage > 3) {
			pages.push("...");
		}

		// Middle pages
		const start = Math.max(2, currentPage - 1);
		const end = Math.min(totalPages - 1, currentPage + 1);

		for (let i = start; i <= end; i++) {
			pages.push(i);
		}

		// Right ellipsis
		if (currentPage < totalPages - 2) {
			pages.push("...");
		}

		// Last page (always add if totalPages > 1)
		pages.push(totalPages);

		return pages;
	};

	const pageNumbers = getPageNumbers();

	const handlePrevious = () => onPageChange(currentPage - 1);
	const handleNext = () => onPageChange(currentPage + 1);
	const handlePageClick = (page: number | string) => {
		if (typeof page === "number") {
			onPageChange(page);
		}
	};

	return (
		<nav
			className="flex items-center justify-center gap-1 mt-8"
			aria-label="Pagination"
		>
			{/* Previous Button */}
			<button
				onClick={handlePrevious}
				disabled={currentPage === 1}
				className="flex items-center justify-center w-8 h-8 rounded-md text-[#495560] hover:bg-[#F7F7F7] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
				aria-label="Previous page"
			>
				<ChevronLeft className="w-4 h-4" />
			</button>

			{/* Page Numbers */}
			{pageNumbers.map((page, idx) => (
				<button
					key={typeof page === "number" ? `page-${page}` : `ellipsis-${idx}`}
					onClick={() => handlePageClick(page)}
					disabled={typeof page === "string"}
					className={`
            flex items-center justify-center min-w-8 h-8 text-base font-medium  transition-colors
            ${
							page === currentPage
								? "text-[#00A792] cursor-pointer"
								: typeof page === "string"
									? "text-[#495560] cursor-default"
									: "text-black hover:bg-[#F7F7F7] cursor-pointer"
						}
          `}
					aria-current={page === currentPage ? "page" : undefined}
				>
					{page}
				</button>
			))}

			{/* Next Button */}
			<button
				onClick={handleNext}
				disabled={currentPage === totalPages}
				className="flex items-center justify-center w-8 h-8 rounded-md text-[#495560] hover:bg-[#F7F7F7] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
				aria-label="Next page"
			>
				<ChevronRight className="w-4 h-4" />
			</button>
		</nav>
	);
}
