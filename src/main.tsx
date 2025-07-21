import {QueryClientProvider} from "@tanstack/react-query";
import {StrictMode} from "react";
import ReactDOM from "react-dom/client";
import {ThemeProvider} from "@/shared/ui/theme-provider";
import "./index.css";
import App from "@/App";
import {queryClient} from "@/shared/lib/query-client";

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<StrictMode>
			<ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
				<QueryClientProvider client={queryClient}>
					<App />
				</QueryClientProvider>
			</ThemeProvider>
		</StrictMode>,
	);
}
