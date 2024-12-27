import { useState, useEffect, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import { NavLink } from "react-router-dom";

interface IProps {}

function NavBar({}: IProps) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const storedData = localStorage["loggedInUser"];
	const userData = storedData ? JSON.parse(storedData) : null;

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsDropdownOpen(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	function handleLogout() {
		localStorage.removeItem("loggedInUser");
		toast.success("Logout successful! Redirecting...");
		setTimeout(() => {
			window.location.href = "/";
		}, 1000);
	}

	const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
	const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

	return (
		<nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
			<div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					<div className="flex items-center">
						<NavLink
							to="/"
							className="flex items-center text-xl font-bold hover:text-blue-200 transition-colors duration-200">
							<svg
								className="w-8 h-8 mr-2"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
								/>
							</svg>
							<span className="hidden sm:inline">TaskMaster</span>
						</NavLink>
					</div>
					<div className="hidden md:block">
						<div className="ml-10 flex items-baseline space-x-4">
							{userData ? (
								<>
									<NavLink
										to="/todos"
										className="text-sm font-medium hover:text-blue-200 transition-colors duration-200 flex items-center">
										<svg
											className="w-4 h-4 mr-1"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
											/>
										</svg>
										Todos
									</NavLink>
									<div className="relative" ref={dropdownRef}>
										<button
											onClick={toggleDropdown}
											className="flex items-center text-sm font-medium hover:text-blue-200 transition-colors duration-200">
											<svg
												className="w-4 h-4 mr-1"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
												xmlns="http://www.w3.org/2000/svg">
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
												/>
											</svg>
											{userData.name}
											<svg
												className="w-4 h-4 ml-1"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
												xmlns="http://www.w3.org/2000/svg">
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M19 9l-7 7-7-7"
												/>
											</svg>
										</button>
										{isDropdownOpen && (
											<div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
												<NavLink
													to="/profile"
													className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
													Profile
												</NavLink>
												<button
													onClick={handleLogout}
													className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
													Logout
												</button>
											</div>
										)}
									</div>
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
							className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-blue-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors duration-200"
							aria-expanded={isMenuOpen}>
							<span className="sr-only">Open main menu</span>
							{isMenuOpen ? (
								<svg
									className="block h-6 w-6"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									aria-hidden="true">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							) : (
								<svg
									className="block h-6 w-6"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									aria-hidden="true">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M4 6h16M4 12h16M4 18h16"
									/>
								</svg>
							)}
						</button>
					</div>
				</div>
			</div>

			<div
				className={`md:hidden transition-all duration-300 ease-in-out ${
					isMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
				} overflow-hidden`}>
				<div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
					{userData ? (
						<>
							<NavLink
								to="/todos"
								className="block px-3 py-2 text-base font-medium hover:text-blue-200 hover:bg-blue-700 transition-colors duration-200">
								Todos
							</NavLink>
							<NavLink
								to="/profile"
								className="block px-3 py-2 text-base font-medium hover:text-blue-200 hover:bg-blue-700 transition-colors duration-200">
								Profile
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
			<Toaster position="bottom-center" />
		</nav>
	);
}

export default NavBar;
