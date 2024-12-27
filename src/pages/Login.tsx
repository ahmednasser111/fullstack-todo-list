import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { loginSchema } from "../validation/index";
import { ILoginInput } from "../interfaces/index";
import { loginConfig } from "../data/index";
import { axiosInstance } from "../config/axios.config";
import LoadingButton from "../components/ui/LoadingButton";

function Login() {
	const [isLoading, setIsLoading] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ILoginInput>({
		resolver: yupResolver(loginSchema),
	});

	const onSubmit: SubmitHandler<ILoginInput> = async (data: ILoginInput) => {
		setIsLoading(true);
		try {
			const res = await axiosInstance.post("/auth/local/", data);
			if (res.status === 200) {
				toast.success("Login successful! Redirecting...");
				localStorage.setItem("loggedInUser", JSON.stringify(res.data));
				window.location.replace("/");
			}
		} catch (error: any) {
			toast.error(error.response?.data.error.message || "Unknown error!");
		} finally {
			setIsLoading(false);
		}
	};

	const renderInputs = loginConfig.map((field) => (
		<div key={field.name}>
			<label
				htmlFor={field.name}
				className="block text-sm font-medium text-gray-700">
				{field.label}
			</label>
			<input
				id={field.name}
				type={field.type}
				{...register(field.name)}
				className={`mt-1 block w-full px-3 py-2 border ${
					errors[field.name] ? "border-red-500" : "border-gray-300"
				} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
			/>
			{errors[field.name] && (
				<p className="text-red-500 text-sm mt-1">
					{errors[field.name]?.message}
				</p>
			)}
		</div>
	));

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<div>
					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
						Login to get access!
					</h2>
				</div>
				<form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
					<div className="rounded-md shadow-sm -space-y-px">{renderInputs}</div>
					<div>
						<button
							type="submit"
							className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
							disabled={isLoading}>
							<LoadingButton value="Login" isLoading={isLoading} />
						</button>
					</div>
				</form>
				<div className="text-center">
					<span className="text-gray-700 mr-2">Don't have an account?</span>
					<Link
						to="/register"
						className="font-medium text-blue-600 hover:text-blue-500">
						Register
					</Link>
				</div>
			</div>
			<Toaster position="bottom-center" />
		</div>
	);
}

export default Login;
