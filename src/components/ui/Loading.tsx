interface IProps {}
function Loading({}: IProps) {
	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="text-center">
				<svg
					className="animate-spin h-8 w-8 text-blue-600 mx-auto mb-4"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24">
					<circle
						className="opacity-25"
						cx="12"
						cy="12"
						r="10"
						stroke="currentColor"
						strokeWidth="4"
					/>
					<path
						className="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8v8l4.28 4.28A8 8 0 014 12z"
					/>
				</svg>
				<h3 className="text-xl font-semibold text-blue-600">Loading...</h3>
			</div>
		</div>
	);
}
export default Loading;
