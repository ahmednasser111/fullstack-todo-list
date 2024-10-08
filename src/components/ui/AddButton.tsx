import { useState } from "react";
import Modal from "./Modal"; // Assuming you have a reusable Modal component
import AddTodo from "./AddTodo"; // The form for adding a new todo

function AddButton() {
	const [isModalOpen, setIsModalOpen] = useState(false);

	function openModal() {
		setIsModalOpen(true);
	}

	function closeModal() {
		setIsModalOpen(false);
	}

	return (
		<div>
			{/* Floating Action Button */}
			<button
				onClick={openModal}
				className="fixed bottom-8 right-8  bg-blue-500  text-white p-7 rounded-full shadow-2xl hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-60 transition-transform transform hover:scale-110 active:scale-95">
				<span className="text-4xl font-bold">+</span>
			</button>

			{/* Modal for Adding a New Todo */}
			<Modal title="Add New Todo" isOpen={isModalOpen} close={closeModal}>
				<AddTodo close={closeModal} />
			</Modal>
		</div>
	);
}

export default AddButton;
