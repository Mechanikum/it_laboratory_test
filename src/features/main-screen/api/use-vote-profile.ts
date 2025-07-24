import { useMutation } from "@tanstack/react-query";
import { api } from "@/shared/api";

interface VoteProfileRequest {
	id: string;
	vote: "like" | "dislike";
}

export const useVoteProfile = () =>
	useMutation({
		mutationFn: async (data: VoteProfileRequest) => {
			const response = await api.post("/api/vote.json", data);
			return response.data;
		},
	});
