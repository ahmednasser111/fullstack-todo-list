import axios from "axios";

export const axiosInstance = axios.create({
	baseURL: "https://todo-strapi-api-production.up.railway.app/api",
	timeout: 2000,
});
