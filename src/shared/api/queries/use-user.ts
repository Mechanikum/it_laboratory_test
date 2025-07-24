import { useQuery } from "@tanstack/react-query";
import { api } from "@/shared/api";
import { urlToFilePromise } from "@/shared/api/helpers/url-to-file-promise";
import { queryClient } from "@/shared/lib/query-client";
import type { BackendUserData, UserSettings } from "@/shared/model/user";
import { useThemeStore } from "@/shared/stores/theme-store";

type Response = BackendUserData & {
	settings: UserSettings;
};

const fetchUser = async () => {
	const { data } = await api.get<Response>("/api/user.json");

	useThemeStore.getState().setTheme(data.settings.theme);

	return {
		...data,
		photos: data.photos.map(urlToFilePromise),
	};
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
