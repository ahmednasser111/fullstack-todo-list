import { useState } from "react";
import { NavLink } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Menu, X, User, Home, LogOut, List } from "lucide-react";

interface IProps {}

function NavBar({}: IProps) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const storedData = localStorage["loggedInUser"];
	const userData = storedData ? JSON.parse(storedData) : null;

	function handleLogout() {
		localStorage.removeItem("loggedInUser");
		toast.success("Logout successful! Redirecting...");
		setTimeout(() => {
			location.replace("/");
		}, 2000);
	}

	const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

	return (
		<nav className="bg-blue-600 text-white shadow-md">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					<div className="flex items-center">
						<NavLink
							to="/"
							className="flex items-center text-lg font-semibold hover:text-blue-200 transition-colors duration-200">
							<Home className="w-6 h-6 mr-2" />
							<span className="hidden sm:inline">Home</span>
						</NavLink>
					</div>
					<div className="hidden md:block">
						<div className="ml-10 flex items-baseline space-x-4">
							{userData ? (
								<>
									<NavLink
										to="/profile"
										className="text-sm font-medium hover:text-blue-200 transition-colors duration-200 flex items-center">
										<User className="w-4 h-4 mr-1" />
										Profile
									</NavLink>
									<NavLink
										to="/todos"
										className="text-sm font-medium hover:text-blue-200 transition-colors duration-200 flex items-center">
										<List className="w-4 h-4 mr-1" />
										Todos
									</NavLink>
									<button
										className="text-sm font-medium hover:text-blue-200 transition-colors duration-200 flex items-center"
										onClick={handleLogout}>
										<LogOut className="w-4 h-4 mr-1" />
										Logout
									</button>
								</>
							) : (
								<>
									<NavLink
										to="/register"
										className="text-sm font-medium hover:text-blue-200 transition-colors duration-200">
										Register
									</NavLink>
									<NavLink
										to="/login"
										className="text-sm font-medium hover:text-blue-200 transition-colors duration-200">
										Login
									</NavLink>
								</>
							)}
						</div>
					</div>
					<div className="md:hidden">
						<button
							onClick={toggleMenu}
							className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-blue-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
							{isMenuOpen ? (
								<X className="block h-6 w-6" aria-hidden="true" />
							) : (
								<Menu className="block h-6 w-6" aria-hidden="true" />
							)}
						</button>
					</div>
				</div>
			</div>

			{isMenuOpen && (
				<div className="md:hidden">
					<div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
						{userData ? (
							<>
								<NavLink
									to="/profile"
									className="block px-3 py-2 text-base font-medium hover:text-blue-200 hover:bg-blue-700 transition-colors duration-200">
									Profile
								</NavLink>
								<NavLink
									to="/todos"
									className="block px-3 py-2 text-base font-medium hover:text-blue-200 hover:bg-blue-700 transition-colors duration-200">
									Todos
								</NavLink>
								<button
									className="block w-full text-left px-3 py-2 text-base font-medium hover:text-blue-200 hover:bg-blue-700 transition-colors duration-200"
									onClick={handleLogout}>
									Logout
								</button>
							</>
						) : (
							<>
								<NavLink
									to="/register"
									className="block px-3 py-2 text-base font-medium hover:text-blue-200 hover:bg-blue-700 transition-colors duration-200">
									Register
								</NavLink>
								<NavLink
									to="/login"
									className="block px-3 py-2 text-base font-medium hover:text-blue-200 hover:bg-blue-700 transition-colors duration-200">
									Login
								</NavLink>
							</>
						)}
					</div>
				</div>
			)}
			<Toaster position="bottom-center" />
		</nav>
	);
}

export default NavBar;
