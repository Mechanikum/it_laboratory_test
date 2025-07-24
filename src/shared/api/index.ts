import Axios, { type AxiosResponse } from "axios";

const api = Axios.create();

api.interceptors.request.use(async (config) => {
	const { useAuthStore } = await import("@/shared/stores/auth-store");
	const { token } = useAuthStore.getState();
	if (token) config.headers.Authorization = `Bearer ${token}`;
	return config;
});

api.interceptors.response.use(
	(res: AxiosResponse) => res,
	(error) => {
		if (error.response?.status === 401) {
			import("@/shared/stores/auth-store").then(({ useAuthStore }) =>
				useAuthStore.getState().logout(),
			);
			error.config.handled = true;
		}
		return Promise.reject(error);
	},
);

export { api };
