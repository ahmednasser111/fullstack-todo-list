import { useState } from "react"; // Import useState for managing loading state
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IRegisterInput } from "../interfaces/index";
import { RegisterConfig } from "../data/index";
import { registerSchema } from "../validation/index";
import { axiosInstance } from "../config/axios.config";
import toast, { Toaster } from "react-hot-toast";
import { AxiosError } from "axios";
import { Link, useNavigate } from "react-router-dom";
import LoadingButton from "../components/ui/LoadingButton";

function Register() {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false); // Add loading state

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IRegisterInput>({
		resolver: yupResolver(registerSchema),
	});

	const onSubmit: SubmitHandler<IRegisterInput> = async (
		data: IRegisterInput
	) => {
		console.log(data);
		setIsLoading(true);
		try {
			// success (fulfilled)
			const res = await axiosInstance.post("/auth/local/register", data);
			// console.log(res);
			if (res.status === 200) {
				toast.success("Registration successful! Welcome aboard.");
				setTimeout(() => navigate("/login"), 2000);
			}
		} catch (error: AxiosError) {
			const errorMessage = error.response?.data?.error?.message;
			// console.log(errorMessage);
			toast.error(errorMessage);
		} finally {
			setIsLoading(false);
		}
	};

	const renderInputs = RegisterConfig.map((field) => (
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
				Register to get access!
			</h2>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				{renderInputs}
				<button
					type="submit"
					className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:cursor-not-allowed"
					disabled={isLoading}>
					<LoadingButton value="Register" isLoading={isLoading} />
				</button>
			</form>
			<div className="text-center mt-4">
				<span className="text-gray-700 mr-2">Have an account?</span>
				<Link
					to="/login"
					className="text-blue-500 hover:text-blue-700 font-semibold">
					Login
				</Link>
			</div>

			<Toaster position="bottom-center" duration="1500" />
		</div>
	);
}

export default Register;
