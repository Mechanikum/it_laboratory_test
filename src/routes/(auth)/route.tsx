import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { z } from "zod";

export const Route = createFileRoute("/(auth)")({
	component: App,
	validateSearch: z.object({
		redirect: z.string().optional(),
	}),
	beforeLoad: ({ context }) => {
		if (context.isAuthenticated) {
			throw redirect({
				to: "/",
			});
		}
	},
});

function App() {
	return <Outlet />;
}
