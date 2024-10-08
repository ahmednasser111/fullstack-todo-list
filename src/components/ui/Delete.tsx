import toast, { Toaster } from "react-hot-toast";
import { AxiosError } from "axios";
import { IEditTodo, ITodo } from "../../interfaces/index";
import { editConfig } from "../../data/index";
import { useState } from "react";
import LoadingButton from "./LoadingButton";
import { axiosInstance } from "../../config/axios.config";

interface IProps {
	close: () => void;
	todo: ITodo;
}

function Delete({ close, todo }: IProps) {
	const [isLoading, setIsLoading] = useState(false);

	const onSubmit = async () => {
		setIsLoading(true);
		try {
			const res = await axiosInstance.delete(`/todos/${todo.id}`, {
				headers: {
					Authorization: `Bearer ${
						JSON.parse(localStorage["loggedInUser"]).jwt
					}`,
				},
			});

			// Check if the request was successful
			if (res.status === 200 || res.status === 204) {
				toast.success("Todo Deleted successfully!");
				close(); // Close modal or navigate away after success
			} else {
				toast.warn("Todo was Deleted but something went wrong!");
			}
		} catch (error: AxiosError) {
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

	return (
		<>
			<p>Are you sure you want to delete this todo?</p>
			<div className="flex justify-between items-center mt-6">
				<button
					onClick={onSubmit}
					className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
					disabled={isLoading}>
					<LoadingButton value="Delete" isLoading={isLoading} />
				</button>
				<button
					type="button"
					onClick={close}
					className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
					Close
				</button>
			</div>
			<Toaster position="bottom-center" duration={1500} />
		</>
	);
}

export default Delete;
