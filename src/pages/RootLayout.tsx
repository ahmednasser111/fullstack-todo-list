import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const RootLayout: React.FC = () => {
	return (
		<div className="min-h-screen flex flex-col">
			<NavBar />
			<main className="flex-grow">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
					<Outlet />
				</div>
			</main>
			<Footer />
		</div>
	);
};

export default RootLayout;
