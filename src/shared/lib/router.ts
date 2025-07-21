import {createRouter} from "@tanstack/react-router";
import {routeTree} from "@/routeTree.gen";

const router = createRouter({
	routeTree,
	context: {isAuthenticated: undefined},
});

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

export default router