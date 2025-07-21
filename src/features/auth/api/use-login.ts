import { useMutation } from "@tanstack/react-query";
import { useRedirectReturn } from "@/features/auth/lib/use-redirect-return";
import type { LoginData } from "@/features/auth/model/loginData";
import { api } from "@/shared/api";
import { useAuthStore } from "@/shared/stores/auth-store";

interface LoginResponse {
	access_token: string;
}

export const useLogin = () => {
	const setToken = useAuthStore((state) => state.setToken);
	const { navigateBack } = useRedirectReturn();

	return useMutation({
		mutationFn: async (data: LoginData) => {
			const response = await api.post<LoginResponse>(
				"/api/auth.json",
				data,
			);
			return response.data;
		},
		onSuccess: async (data) => {
			setToken(data.access_token);
			navigateBack();
		},
		onError: (error) => {
			console.error("Login failed:", error);
		},
	});
};
