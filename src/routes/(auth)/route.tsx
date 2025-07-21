import {createFileRoute, Outlet} from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)')({
	component: App,
})

function App() {
	return (
		<div className="p-2">
			<h3>Welcome to login!</h3>
			<Outlet/>
		</div>
	)
}