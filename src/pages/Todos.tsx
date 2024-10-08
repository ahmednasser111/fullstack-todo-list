import { axiosInstance } from "../config/axios.config";
import { faker } from "@faker-js/faker";
import Paginator from "../components/ui/Paginator";
import ErrorHandler from "../components/errors/ErrorHandler";
import TodoSkeleton from "../components/ui/TodoSkeleton";
import useAuthQuery from "../hooks/useAuthQuery";
import { useState } from "react";
import Search from "../components/ui/Search";

interface IProps {}

function Todos({}: IProps) {
	const userData = JSON.parse(localStorage["loggedInUser"]);
	const userId = userData.user.id;
	const userJwt = userData.jwt;

	const [page, setPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [sortBy, setSortBy] = useState<string>("createdAt"); // State for sorting by property
	const [sortOrder, setSortOrder] = useState<string>("ASC"); // State for sorting order

	const handlePage = (page: number) => {
		setPage(page);
	};

	const handleItemsPerPageChange = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		setItemsPerPage(Number(event.target.value));
		setPage(1); // Reset to the first page when items per page changes
	};

	const handleSearch = (query: string) => {
		setSearchQuery(query);
		setPage(1);
	};

	const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSortBy(event.target.value);
		setPage(1); // Reset to the first page when sort changes
	};

	const handleSortOrderChange = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		setSortOrder(event.target.value);
		setPage(1); // Reset to the first page when sort order changes
	};

	const generateTodos = async (n: number) => {
		for (let i = 0; i < n; i++) {
			try {
				await axiosInstance.post(
					`/todos/`,
					{
						data: {
							title: faker.word.words(),
							description: faker.lorem.paragraph(1),
							user: [userId],
						},
					},
					{
						headers: {
							Authorization: `Bearer ${userJwt}`,
						},
					}
				);
			} catch (error) {}
		}
	};

	const { data, isLoading, error, isFetching } = useAuthQuery({
		queryKey: [
			`todoPage-${page}`,
			`${itemsPerPage}`,
			searchQuery,
			sortBy,
			sortOrder,
		], // Track sort order in query key
		url: `/todos/?pagination[pageSize]=${itemsPerPage}&pagination[page]=${page}&filters[title][$contains]=${searchQuery}&sort=${sortBy}:${sortOrder}`, // Add sorting order here
		config: {
			headers: {
				Authorization: `Bearer ${userJwt}`,
			},
		},
	});

	if (isLoading)
		return (
			<div className="w-full max-w-md mx-auto bg-white shadow-md rounded-lg p-4 list-none my-4">
				<div className="space-y-2">
					<TodoSkeleton />
					<TodoSkeleton />
					<TodoSkeleton />
					<TodoSkeleton />
					<TodoSkeleton />
				</div>
			</div>
		);

	if (error) {
		return <ErrorHandler statusCode={error.status} title={error.message} />;
	}

	return (
		<div>
			<div className="w-full max-w-2xl mx-auto bg-white shadow-md rounded-lg p-4">
				<Search onSearch={handleSearch} value={searchQuery} />
				<div className="my-4 flex flex-col md:flex-row justify-between items-center">
					<div className="flex items-center mb-2 md:mb-0">
						<label htmlFor="itemsPerPage" className="mr-2 text-sm">
							Items per page:
						</label>
						<select
							id="itemsPerPage"
							value={itemsPerPage}
							onChange={handleItemsPerPageChange}
							className="border border-gray-300 rounded-md p-2 text-sm">
							<option value="5">5</option>
							<option value="10">10</option>
							<option value="20">20</option>
							<option value="50">50</option>
						</select>
					</div>
					<div className="flex items-center mb-2 md:mb-0">
						<label htmlFor="sortBy" className="mr-2 text-sm">
							Sort by:
						</label>
						<select
							id="sortBy"
							value={sortBy}
							onChange={handleSortChange}
							className="border border-gray-300 rounded-md p-2 text-sm">
							<option value="createdAt">Creation Date</option>
							<option value="title">Title</option>
						</select>
					</div>
					<div className="flex items-center">
						<label htmlFor="sortOrder" className="mr-2 text-sm">
							Order:
						</label>
						<select
							id="sortOrder"
							value={sortOrder}
							onChange={handleSortOrderChange}
							className="border border-gray-300 rounded-md p-2 text-sm">
							<option value="ASC">Ascending</option>
							<option value="DESC">Descending</option>
						</select>
					</div>
				</div>

				{data.data.length ? (
					<ul className="space-y-4">
						{data.data.map((todo, index: number) => (
							<li
								key={todo.id}
								className={`p-4 rounded-md shadow ${
									todo.attributes.completed ? "bg-green-100" : "bg-gray-100"
								}`}>
								<div className="flex items-center">
									<span
										className={`mr-2 p-2 rounded-full text-white font-bold ${
											todo.attributes.completed ? "bg-green-500" : "bg-gray-500"
										}`}>
										{index + 1 + (page - 1) * itemsPerPage}
									</span>
									<h3 className="text-lg font-medium">
										{todo.attributes.title}
									</h3>
								</div>
							</li>
						))}
					</ul>
				) : (
					<p className="text-center text-gray-600 text-lg">
						No todos available
					</p>
				)}
			</div>

			<Paginator
				totalItems={data.meta.pagination.total}
				itemsPerPage={itemsPerPage}
				currentPage={page}
				onPageChange={handlePage}
				isFetching={isFetching}
				isLoading={isLoading}
			/>

			{/* Button to generate todos */}
			<div className="flex justify-center mt-4">
				<button
					onClick={() => generateTodos(100)}
					className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 text-sm">
					Generate Todos
				</button>
			</div>
		</div>
	);
}

export default Todos;
