import { useQuery } from "@tanstack/react-query";
import { api } from "@/shared/api";
import { queryClient } from "@/shared/lib/query-client";
import type { UserDataWithSettings } from "@/shared/model/user";
import { useThemeStore } from "@/shared/stores/theme-store";

const fetchUser = async () => {
	const { data } = await api.get<UserDataWithSettings>("/api/user.json");

	useThemeStore.getState().setTheme(data.settings.theme);

	return data;
};

const useUser = () => {
	return useQuery({
		queryKey: ["user"],
		queryFn: fetchUser,
		staleTime: 60_000,
		retryOnMount: false,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
	});
};

const prefetchUser = async () => {
	await queryClient.prefetchQuery({
		queryKey: ["user"],
		queryFn: fetchUser,
	});
};

export { useUser, prefetchUser };
