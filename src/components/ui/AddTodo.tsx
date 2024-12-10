import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast, { Toaster } from "react-hot-toast";
import { IEditTodo } from "../../interfaces/index";
import { editConfig } from "../../data/index";
import { EditSchema } from "../../validation/index";
import { useState } from "react";
import LoadingButton from "./LoadingButton";
import { axiosInstance } from "../../config/axios.config";

interface IProps {
	close: () => void;
}

function AddTodo({ close }: IProps) {
	const [isLoading, setIsLoading] = useState(false);

	const userData = JSON.parse(localStorage["loggedInUser"]);
	const userId = userData.user.id;
	const userJwt = userData.jwt;

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IEditTodo>({
		resolver: yupResolver(EditSchema),
	});

	const onSubmit: SubmitHandler<IEditTodo> = async (data: IEditTodo) => {
		setIsLoading(true);
		try {
			const res = await axiosInstance.post(
				`/todos/`,
				{ data: { ...data, user: [+userId] } },
				{
					headers: {
						Authorization: `Bearer ${userJwt}`,
					},
				}
			);

			// Check if the request was successful
			if (res.status === 200 || res.status === 204) {
				toast.success("Todo added successfully!");
				close(); // Close modal or navigate away after success
			} else {
				toast("Todo was added but something went wrong!");
			}
		} catch (error: any) {
			// Detailed error handling
			if (!error.response) {
				// Network error or timeout
				toast.error("Network error! Please try again later.");
			} else {
				// Server-side error
				toast.error(
					error.response.data.error.message || "Something went wrong!"
				);
			}
		} finally {
			setIsLoading(false);
		}
	};

	const renderInputs = editConfig.map((field) => (
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
		<>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				{renderInputs}
				<div className="flex justify-between items-center mt-6">
					<button
						type="submit"
						className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
						disabled={isLoading}>
						<LoadingButton value="Add" isLoading={isLoading} />
					</button>
					<button
						type="button"
						onClick={close}
						className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
						Close
					</button>
				</div>
			</form>
			<Toaster position="bottom-center" />
		</>
	);
}

export default AddTodo;
