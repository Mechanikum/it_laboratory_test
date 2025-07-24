import { useLocation, useNavigate, useRevalidator } from "react-router";

export const useRedirectReturn = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const revalidator = useRevalidator();

	const params = new URLSearchParams(location.search);
	const redirectTo = params.get("redirect") ?? "/";

	const navigateBack = async () => {
		await revalidator.revalidate();
		navigate(redirectTo, { replace: true });
	};

	return { navigateBack };
};
