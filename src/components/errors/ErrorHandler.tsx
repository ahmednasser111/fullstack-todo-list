import { Link, useLocation } from "react-router-dom";

interface IProps {
	statusCode?: number;
	title?: string;
}

function ErrorHandler({ statusCode = 500, title = "Server Error" }: IProps) {
	const { pathname } = useLocation();
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
			<div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
				<h1 className="text-6xl font-extrabold text-red-600 mb-4 text-center">
					{statusCode}
				</h1>
				<p className="text-xl font-semibold text-gray-700 mb-6 text-center">
					{title}
				</p>
				<div className="flex justify-center space-x-6">
					<Link
						to="/"
						className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition">
						Go to Home
					</Link>
					<Link
						to={pathname}
						className="px-6 py-2 text-white bg-green-600 hover:bg-green-700 rounded-lg transition"
						reloadDocument>
						Refresh
					</Link>
				</div>
			</div>
		</div>
	);
}

export default ErrorHandler;
