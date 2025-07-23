import { useNavigate, useRouter, useSearch } from "@tanstack/react-router";

export const useRedirectReturn = () => {
	const navigate = useNavigate();
	const router = useRouter();
	const search = useSearch({ from: "/(auth)" });

	const navigateBack = async () => {
		await router.invalidate();
		await navigate({ to: search.redirect ?? "/" });
	};

	return { navigateBack };
};
