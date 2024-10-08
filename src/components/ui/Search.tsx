// In your Search component
interface SearchProps {
	onSearch: (query: string) => void;
	value: string; // Add value prop to capture the current input value
}

export default function Search({ onSearch, value }: SearchProps) {
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		onSearch(event.target.value); // Call the onSearch with the input value
	};

	return (
		<input
			type="text"
			value={value} // Set the value of the input
			onChange={handleChange}
			placeholder="Search todos..."
			className="border border-gray-300 rounded-md p-2 w-full"
			autoFocus
		/>
	);
}
