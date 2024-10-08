import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { ReactNode } from "react";

interface IProps {
	title: string;
	isOpen: boolean;
	close: () => void;
	children: ReactNode;
}

export default function Modal({ title, isOpen, close, children }: IProps) {
	return (
		<Dialog open={isOpen} as="div" className="relative z-10" onClose={close}>
			{/* The background overlay with blur effect */}
			<div
				className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm"
				aria-hidden="true"
			/>

			<div className="fixed inset-0 z-10 flex items-center justify-center">
				<DialogPanel className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg transform transition-all">
					{/* Title of the modal */}
					<DialogTitle className="text-xl font-semibold text-gray-800 mb-4">
						{title}
					</DialogTitle>

					{/* Modal content */}
					<div className="mb-4">{children}</div>
				</DialogPanel>
			</div>
		</Dialog>
	);
}
