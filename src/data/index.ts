import {
	IEditTodo,
	IFieldConfig,
	ILoginInput,
	IRegisterInput,
} from "../interfaces/index";

export const loginConfig: IFieldConfig<ILoginInput>[] = [
	{
		name: "identifier",
		type: "email",
		label: "Email",
	},
	{
		name: "password",
		type: "password",
		label: "Password",
	},
];

export const RegisterConfig: IFieldConfig<IRegisterInput>[] = [
	{
		name: "email",
		type: "email",
		label: "Email",
	},
	{
		name: "username",
		type: "string",
		label: "Username",
	},
	{
		name: "password",
		type: "password",
		label: "Password",
	},
];

export const editConfig: IFieldConfig<IEditTodo>[] = [
	{
		name: "title",
		type: "text",
		label: "Title",
	},
	{
		name: "description",
		type: "text",
		label: "Description",
	},
];
