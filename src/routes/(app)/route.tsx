import {createFileRoute, Outlet} from '@tanstack/react-router'

export const Route = createFileRoute('/(app)')({
	component: App,
})

function App() {
	return (
		<div className="p-2">
			<h3>Welcome Home!</h3>
			<Outlet/>
		</div>
	)
}