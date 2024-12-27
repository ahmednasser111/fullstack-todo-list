import {
	createBrowserRouter,
	Route,
	createRoutesFromElements,
} from "react-router-dom";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import ErrorHandler from "../components/errors/ErrorHandler";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import RootLayout from "../pages/RootLayout";
import Todos from "../pages/Todos";

const storedUser = localStorage.getItem("loggedInUser");
const userData = storedUser ? JSON.parse(storedUser) : null;
console.log(userData);

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path="/" element={<RootLayout />} errorElement={<ErrorHandler />}>
				<Route
					index
					element={
						<ProtectedRoute condition={userData} path="/login">
							<Home />
						</ProtectedRoute>
					}
				/>
				<Route
					path="profile"
					element={
						<ProtectedRoute condition={userData} path="/login">
							<Profile />
						</ProtectedRoute>
					}
				/>
				<Route
					path="todos"
					element={
						<ProtectedRoute condition={userData} path="/login">
							<Todos />
						</ProtectedRoute>
					}
				/>
				<Route
					path="login"
					element={
						<ProtectedRoute condition={!userData} path="/">
							<Login />
						</ProtectedRoute>
					}
				/>
				<Route path="register" element={<Register />} />
			</Route>

			<Route
				path="*"
				element={
					<ErrorHandler
						title="Oops! The page you’re looking for doesn’t exist."
						statusCode={404}
					/>
				}></Route>
		</>
	)
);

export default router;
