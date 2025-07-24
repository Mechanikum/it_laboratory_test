import { Outlet } from "react-router";

const Root = () => (
	<div
		className={
			"h-dvh w-screen max-w-xl mx-auto overflow-hidden flex flex-col justify-center"
		}
	>
		<Outlet />
	</div>
);

export default Root;
