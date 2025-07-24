import { useInfiniteQuery } from "@tanstack/react-query";
import { generateMockUsers } from "@/mocks/profiles";
import { api } from "@/shared/api";
import type { UserData } from "@/shared/model/user";

async function urlToFile(url: string) {
	const { data: blob } = await api.get(url, { responseType: "blob" });
	return new File([blob], url.split("/").pop() ?? "photo", {
		type: blob.type,
	});
}

const fetchProfiles = async () => {
	const profiles = await generateMockUsers(10);

	return profiles.map<UserData>(
		(u) =>
			({
				...u,
				photos: u.photos.map(urlToFile),
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
	});
};
