import Axios, { type AxiosResponse } from "axios";
import { useAuthStore } from "@/shared/stores/auth-store";

export const api = Axios.create();

api.interceptors.request.use(async (config) => {
	const { token } = useAuthStore.getState();

	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}

	return config;
});

api.interceptors.response.use(
	(response: AxiosResponse) => response,
	(error) => {
		if (error.response && error.response.status === 401) {
			useAuthStore.getState().logout();
			error.config.handled = true;
		}

		return Promise.reject(error);
	},
);
