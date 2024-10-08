import { axiosInstance } from "../config/axios.config";
import { useQuery } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";

interface IProps {
	queryKey: string[];
	url: string;
	config?: AxiosRequestConfig;
}

// fetch data + auth token
const useAuthQuery = ({ queryKey, url, config }: IProps) => {
	return useQuery({
		queryKey,
		queryFn: async () => {
			const result = await axiosInstance.get(url, config);
			return result.data;
		},
	});
};
export default useAuthQuery;
