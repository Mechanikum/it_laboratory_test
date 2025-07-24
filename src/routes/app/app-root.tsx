import { Outlet } from "react-router";
import NavigationPanel from "@/features/navigation/ui/navigation-panel";

const AppRoot = () => (
	<>
		<Outlet />
		<NavigationPanel />
	</>
);

export default AppRoot;
