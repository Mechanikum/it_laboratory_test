import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import NavigationPanel from "@/features/navigation/ui/navigation-panel";

export const Route = createFileRoute("/(app)")({
	component: App,
	beforeLoad: ({ context, location }) => {
		if (!context.isAuthenticated) {
			throw redirect({
				to: "/login",
				search: {
					redirect: location.href,
				},
			});
		}
	},
});

function App() {
	return (
		<>
			<Outlet />
			<NavigationPanel />
		</>
	);
}
