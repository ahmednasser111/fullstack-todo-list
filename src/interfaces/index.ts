export interface ILoginInput {
	identifier: string;
	password: string;
}

export interface IRegisterInput {
	email: string;
	username: string;
	password: string;
}

export interface IEditTodo {
	title: string;
	description: string;
}

export interface IFieldConfig<T> {
	name: keyof T;
	type: string;
	label: string;
}

export interface ITodo {
	id: string;
	title: string;
	description: string;
	completed: boolean;
	createdAt: string;
	updatedAt: string;
}
