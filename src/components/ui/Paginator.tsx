interface PaginatorProps {
	totalItems: number;
	itemsPerPage: number;
	currentPage: number;
	onPageChange: (page: number) => void;
	isLoading: boolean;
	isFetching: boolean;
}

const Paginator = ({
	totalItems,
	itemsPerPage,
	currentPage,
	onPageChange,
	isLoading,
	isFetching,
}: PaginatorProps) => {
	const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

	// Calculate start and end indices for the current page
	const startItem = (currentPage - 1) * itemsPerPage + 1;
	const endItem = Math.min(currentPage * itemsPerPage, totalItems);

	const handlePageChange = (page: number) => {
		if (page > 0 && page <= totalPages && !isLoading && !isFetching) {
			onPageChange(page);
		}
	};

	// Determine the range of page numbers to display
	const displayPages = Array.from({ length: 3 }, (_, index) => {
		const page = currentPage - 1 + index; // Start from the current page
		if (page < 1) return; // Ensure at least the first page is displayed
		if (page > totalPages) return; // Ensure no more than the total pages
		return page;
	});

	return (
		<div className="flex flex-col items-center mt-4">
			<div className="mb-2 text-sm md:text-base">
				{`Showing ${startItem} to ${endItem} of ${totalItems} entries`}
			</div>
			<div className="flex items-center space-x-1 md:space-x-2">
				<button
					onClick={() => handlePageChange(currentPage - 1)}
					disabled={currentPage === 1 || isLoading || isFetching}
					className="px-2 py-1 text-xs md:px-3 md:py-1 bg-gray-200 rounded-md disabled:opacity-50">
					Previous
				</button>

				{/* Render only 3 page numbers */}
				{displayPages.map((page) => (
					<button
						key={page}
						onClick={() => handlePageChange(page)}
						className={`px-2 py-1 text-xs md:px-3 md:py-1 rounded-md ${
							currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200"
						}`}>
						{page}
					</button>
				))}

				<button
					onClick={() => handlePageChange(currentPage + 1)}
					disabled={currentPage === totalPages || isLoading || isFetching}
					className="px-2 py-1 text-xs md:px-3 md:py-1 bg-gray-200 rounded-md disabled:opacity-50">
					Next
				</button>
			</div>
		</div>
	);
};

export default Paginator;
