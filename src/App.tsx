import router from "@/shared/lib/router";

import "@fontsource-variable/inter/index.css";
import "@fontsource-variable/inter/wght.css";
import "@fontsource-variable/inter/wght-italic.css";
import { RouterProvider } from "react-router";

const App = () => {
	return <RouterProvider router={router} />;
};

export default App;
