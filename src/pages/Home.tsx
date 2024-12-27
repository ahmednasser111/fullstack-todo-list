import ErrorHandler from "../components/errors/ErrorHandler";
import useAuthQuery from "../hooks/useAuthQuery";
import Todo from "../components/ui/Todo";
import { ITodo } from "../interfaces/index";
import AddButton from "../components/ui/AddButton";
import TodoSkeleton from "../components/ui/TodoSkeleton";

function Home() {
	const userData = JSON.parse(localStorage.getItem("loggedInUser") || "{}");

	const { data, isLoading, error, refetch } = useAuthQuery({
		queryKey: ["todoList"],
		url: "/users/me?populate=todos",
		config: {
			headers: {
				Authorization: `Bearer ${userData.jwt}`,
			},
		},
	});

	if (isLoading) {
		return (
			<div className="p-4 sm:p-6 lg:p-8">
				<div className="w-full max-w-2xl list-none mx-auto bg-white shadow-md rounded-lg p-6">
					{[...Array(5)].map((_, index) => (
						<TodoSkeleton key={index} />
					))}
				</div>
			</div>
		);
	}

	if (error) {
		localStorage.removeItem("loggedInUser");
		return (
			<ErrorHandler statusCode={Number(error.name)} title={error.message} />
		);
	}

	return (
		<div className="p-4 sm:p-6 lg:p-8">
			<div className="w-full max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
				{data.todos && data.todos.length > 0 ? (
					<ul className="space-y-4">
						{data.todos.map((todo: ITodo, index: number) => (
							<Todo
								todo={todo}
								key={todo.id}
								index={index + 1}
								refetch={refetch}
							/>
						))}
					</ul>
				) : (
					<p className="text-center text-gray-600 text-lg">
						No todos available. Add your first todo!
					</p>
				)}
			</div>

			{/* Floating Action Button */}
			<AddButton refetch={refetch} />
		</div>
	);
}

export default Home;
