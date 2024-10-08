interface IProps {
	value: string;
	isLoading: boolean;
}
function LoadingButton({ value, isLoading }: IProps) {
	return (
		<div>
			{isLoading ? (
				<div className="flex items-center justify-center">
					<div className="w-5 h-5 border-4 border-white border-t-transparent border-solid rounded-full animate-spin mr-1"></div>
					<span>Loading...</span>
				</div>
			) : (
				<span>{value}</span>
			)}
		</div>
	);
}
export default LoadingButton;
