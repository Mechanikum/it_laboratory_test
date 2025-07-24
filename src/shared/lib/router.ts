import {
	createBrowserRouter,
	type LoaderFunctionArgs,
	redirect,
} from "react-router";
import AppRoot from "@/routes/app/app-root";
import MainScreen from "@/routes/app/main-screen";
import Login from "@/routes/auth/login";
import Registration from "@/routes/auth/registration";
import Root from "@/routes/root";
import { useAuthStore } from "@/shared/stores/auth-store";

export async function requireAuthLoader({ request }: LoaderFunctionArgs) {
	const token = useAuthStore.getState().token;
	if (!token) {
		const { pathname, search } = new URL(request.url);
		const redirectTo = pathname + search;
		throw redirect(`/login?redirect=${encodeURIComponent(redirectTo)}`);
	}
	return null;
}

const router = createBrowserRouter([
	{
		path: "/",
		Component: Root,
		children: [
			{
				Component: AppRoot,
				children: [{ index: true, Component: MainScreen }],
				loader: requireAuthLoader,
			},
			{ path: "login", Component: Login },
			{ path: "registration", Component: Registration },
		],
	},
]);

export default router;
