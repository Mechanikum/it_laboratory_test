import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";

// import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

interface RouterContext {
	isAuthenticated: boolean | undefined;
}

export const Route = createRootRouteWithContext<RouterContext>()({
	component: () => (
		<div
			className={
				"h-screen w-screen max-w-xl mx-auto overflow-hidden flex flex-col justify-center"
			}
		>
			<Outlet />
			{/*<TanStackRouterDevtools />*/}
		</div>
	),
});
