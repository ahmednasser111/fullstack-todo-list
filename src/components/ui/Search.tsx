import { memo, useCallback } from "react";
import { debounce } from "lodash";

interface SearchProps {
	onSearch: (query: string) => void;
	value: string;
}

function Search({ onSearch, value }: SearchProps) {
	// Debounce the onSearch function to limit rapid calls
	const debouncedSearch = useCallback(debounce(onSearch, 500), []);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		debouncedSearch(event.target.value);
	};

	return (
		<input
			type="text"
			defaultValue={value} // Use defaultValue to avoid controlled input issues
			onChange={handleChange}
			placeholder="Search todos..."
			className="border border-gray-300 rounded-md p-2 w-full"
			autoFocus
		/>
	);
}

export default memo(Search);
