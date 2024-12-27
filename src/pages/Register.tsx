import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { IRegisterInput } from "../interfaces/index";
import { RegisterConfig } from "../data/index";
import { registerSchema } from "../validation/index";
import { axiosInstance } from "../config/axios.config";
import LoadingButton from "../components/ui/LoadingButton";

function Register() {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);

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
		setIsLoading(true);
		try {
			const res = await axiosInstance.post("/auth/local/register", data);
			if (res.status === 200) {
				toast.success("Registration successful! Welcome aboard.");
				setTimeout(() => navigate("/login"), 2000);
			}
		} catch (error: any) {
			const errorMessage =
				error.response?.data?.error?.message || "Unknown error occurred";
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
		<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<div>
					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
						Register to get access!
					</h2>
				</div>
				<form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
					<div className="rounded-md shadow-sm -space-y-px">{renderInputs}</div>
					<div>
						<button
							type="submit"
							className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
							disabled={isLoading}>
							<LoadingButton value="Register" isLoading={isLoading} />
						</button>
					</div>
				</form>
				<div className="text-center">
					<span className="text-gray-700 mr-2">Already have an account?</span>
					<Link
						to="/login"
						className="font-medium text-blue-600 hover:text-blue-500">
						Login
					</Link>
				</div>
			</div>
			<Toaster position="bottom-center" />
		</div>
	);
}

export default Register;
