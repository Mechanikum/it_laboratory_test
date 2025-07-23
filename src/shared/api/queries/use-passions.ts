import { useQuery } from "@tanstack/react-query";
import { api } from "@/shared/api";
import { queryClient } from "@/shared/lib/query-client";

const fetchPassions = async () => {
	const { data } = await api.get<string[]>("/api/passions.json");

	return data;
};

const usePassions = () => {
	return useQuery({
		queryKey: ["passions"],
		queryFn: fetchPassions,
		staleTime: 600000,
		retryOnMount: false,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
	});
};

const prefetchPassions = async () => {
	await queryClient.prefetchQuery({
		queryKey: ["passions"],
		queryFn: fetchPassions,
	});
};

export { usePassions, prefetchPassions };
