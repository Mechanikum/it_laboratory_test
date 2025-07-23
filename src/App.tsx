import { RouterProvider } from "@tanstack/react-router";
import router from "@/shared/lib/router";
import { useAuthStore } from "@/shared/stores/auth-store";

import "@fontsource-variable/inter/index.css";
import "@fontsource-variable/inter/wght.css";
import "@fontsource-variable/inter/wght-italic.css";

const App = () => {
	const isAuthenticated = useAuthStore((state) => !!state.token);

	return <RouterProvider router={router} context={{ isAuthenticated }} />;
};

export default App;
