import { useMutation } from "@tanstack/react-query";
import { useRedirectReturn } from "@/features/auth/lib/use-redirect-return";
import type { RegistrationData } from "@/features/auth/model/registration-data";
import { api } from "@/shared/api";
import { prefetchUser } from "@/shared/api/queries/use-user";
import { useAuthStore } from "@/shared/stores/auth-store";
import { useThemeStore } from "@/shared/stores/theme-store";

interface RegisterResponse {
	access_token: string;
}

export const useRegister = () => {
	const setToken = useAuthStore((state) => state.setToken);
	const { navigateBack } = useRedirectReturn();

	return useMutation({
		mutationFn: async (data: RegistrationData) => {
			const response = await api.post<RegisterResponse>(
				"/api/register.json",
				data,
			);
			return response.data;
		},
		onSuccess: async (data) => {
			setToken(data.access_token);
			prefetchUser();
			navigateBack();
		},
		onError: (error) => {
			console.error("Login failed:", error);
		},
	});
};
