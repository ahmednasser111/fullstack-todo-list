import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
	identifier: Yup.string()
		.email("Invalid email format")
		.required("Email is required"),
	password: Yup.string()
		.required("Password is required")
		.min(6, "Password must be at least 6 characters"),
});

export const registerSchema = Yup.object().shape({
	email: Yup.string()
		.email("Invalid email format")
		.required("Email is required"),
	username: Yup.string()
		.required("Username is required")
		.min(3, "Username must be at least 3 characters")
		.matches(/^\S*$/, "Username cannot contain spaces") // No spaces
		.matches(
			/^[a-zA-Z0-9_]*$/,
			"Username can only contain letters, numbers, and underscores"
		), // Alphanumeric with underscores
	password: Yup.string()
		.required("Password is required")
		.min(6, "Password must be at least 6 characters")
		.matches(/[a-z]/, "Password must contain at least one lowercase letter")
		.matches(/[A-Z]/, "Password must contain at least one uppercase letter")
		.matches(/\d/, "Password must contain at least one number")
		.matches(
			/[!@#$%^&*]/,
			"Password must contain at least one special character"
		),
});

export const EditSchema = Yup.object().shape({
	title: Yup.string()
		.required("Title is required")
		.min(6, "Title must be at least 6 characters"),
	description: Yup.string(),
});
