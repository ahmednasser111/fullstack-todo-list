import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../validation/index";
import { ILoginInput } from "../interfaces/index";
import { loginConfig } from "../data/index";
import { axiosInstance } from "../config/axios.config";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
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
			console.log(res);
			if (res.status === 200) {
				toast.success("Login successful! Redirecting...");
				localStorage["loggedInUser"] = JSON.stringify(res.data);
				location.replace("/");
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
		<div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white">
			<h2 className="text-2xl font-bold mb-4 text-center">
				Login to get access!
			</h2>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				{renderInputs}
				<button
					type="submit"
					className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 c"
					disabled={isLoading}>
					<LoadingButton value="Login" isLoading={isLoading} />
				</button>
			</form>
			<Toaster position="bottom-center" />
		</div>
	);
}

export default Login;
