import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/index";

interface IProps {}
function RootLayout({}: IProps) {
	return (
		<div className="min-h-screen flex flex-col">
			{/* Navigation bar */}
			<NavBar />

			{/* Main content */}
			<main className="flex-grow">
				<Outlet />
			</main>

			{/* Footer */}
			<footer className="p-4 bg-gray-100 text-center">
				<p>© 2024 My Website. All rights reserved.</p>
			</footer>
		</div>
	);
}
export default RootLayout;
