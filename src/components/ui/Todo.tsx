import { useState } from "react";
import { formatDate } from "../../functions/index";
import { ITodo } from "../../interfaces/index";
import Delete from "./Delete";
import Edit from "./Edit";
import Modal from "./Modal";

interface IProps {
	todo: ITodo;
	index: number;
	refetch: () => void;
}

function Todo({ todo, index, refetch }: IProps) {
	let [isEditOpen, setIsEditOpen] = useState(false);
	let [isDeleteOpen, setIsDeleteOpen] = useState(false);

	function openEdit() {
		setIsEditOpen(true);
	}
	function closeEdit() {
		setIsEditOpen(false);
	}

	function openDelete() {
		setIsDeleteOpen(true);
	}
	function closeDelete() {
		setIsDeleteOpen(false);
	}

	return (
		<li
			className={`bg-white p-6 rounded-lg shadow-md transition-all duration-200 ease-in-out hover:shadow-xl hover:bg-gray-50 ${
				todo.completed
					? "border-l-4 border-green-500"
					: "border-l-4 border-gray-400"
			}`}>
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
				{/* Add the index before the todo title */}
				<h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
					{index}. {todo.title}
				</h2>
				<span
					className={`mt-1 sm:mt-0 px-3 py-1 rounded-full text-sm font-medium ${
						todo.completed
							? "bg-green-100 text-green-600"
							: "bg-gray-100 text-gray-600"
					}`}>
					{todo.completed ? "Completed" : "Pending"}
				</span>
			</div>
			<div className="flex space-x-2 mt-4">
				<button
					onClick={openEdit}
					className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition">
					Edit
				</button>
				<button
					onClick={openDelete}
					className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition">
					Delete
				</button>
			</div>
			<div className="mt-3 text-sm text-gray-500">
				{todo.description && (
					<p className="mb-1">Description: {todo.description}</p>
				)}
				<p>Created at: {formatDate(todo.createdAt)}</p>
				<p>Updated at: {formatDate(todo.updatedAt)}</p>
			</div>

			{/* Edit modal */}
			<Modal title="Edit this todo" isOpen={isEditOpen} close={closeEdit}>
				<Edit close={closeEdit} todo={todo} refetch={refetch} />
			</Modal>

			{/* Delete modal */}
			<Modal title="Delete this todo" isOpen={isDeleteOpen} close={closeDelete}>
				<Delete close={closeDelete} todo={todo} refetch={refetch} />
			</Modal>
		</li>
	);
}

export default Todo;
