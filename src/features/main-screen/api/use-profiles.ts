import { useInfiniteQuery } from "@tanstack/react-query";
import { generateMockUsers } from "@/mocks/profiles";
import { urlToFilePromise } from "@/shared/api/helpers/url-to-file-promise";
import type { UserData } from "@/shared/model/user";

const fetchProfiles = async () => {
	const profiles = await generateMockUsers(10);

	return profiles.map<UserData>(
		(u) =>
			({
				...u,
				photos: u.photos.map(urlToFilePromise),
			}) as UserData,
	);
};

export const useProfiles = () => {
	return useInfiniteQuery({
		queryKey: ["profiles"],
		queryFn: fetchProfiles,
		initialPageParam: 1,
		getNextPageParam: (lastPage, _, lastPageParam) => {
			if (lastPage.length === 0) {
				return undefined;
			}
			return lastPageParam + 1;
		},
		getPreviousPageParam: (_, __, firstPageParam) => {
			if (firstPageParam <= 1) {
				return undefined;
			}
			return firstPageParam - 1;
		},
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
	});
};
