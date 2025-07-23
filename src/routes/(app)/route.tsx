import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

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
		<div className="p-2">
			<h3>Welcome Home!</h3>
			<Outlet />
		</div>
	);
}
