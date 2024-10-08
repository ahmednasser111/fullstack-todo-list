function TodoSkeleton() {
	return (
		<li className="bg-white p-4 sm:p-6 rounded-lg shadow-md transition-all duration-200 ease-in-out">
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
				{/* Simulate the title with a loading block */}
				<div className="h-6 w-1/2 bg-gray-300 rounded animate-pulse"></div>
				{/* Simulate the status badge */}
				<span className="mt-2 sm:mt-0 h-5 w-16 bg-gray-300 rounded-full animate-pulse"></span>
			</div>

			{/* Simulate buttons */}
			<div className="flex space-x-2 mt-4">
				<div className="h-8 w-20 bg-gray-300 rounded-md animate-pulse"></div>
				<div className="h-8 w-20 bg-gray-300 rounded-md animate-pulse"></div>
			</div>

			{/* Simulate description and dates */}
			<div className="mt-3 space-y-2">
				<div className="h-4 w-3/4 bg-gray-300 rounded animate-pulse"></div>
				<div className="h-4 w-1/2 bg-gray-300 rounded animate-pulse"></div>
				<div className="h-4 w-1/2 bg-gray-300 rounded animate-pulse"></div>
			</div>
		</li>
	);
}

export default TodoSkeleton;
