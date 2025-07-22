import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Theme = "light" | "dark" | "system";

interface ThemeState {
	theme: Theme;
	setTheme: (t: Theme) => void;
}

const STORAGE_KEY = "vite-ui-theme";

const applyTheme = (theme: Theme) => {
	const root = document.documentElement;
	root.classList.remove("light", "dark");

	if (theme === "system") {
		const isDark = window.matchMedia(
			"(prefers-color-scheme: dark)",
		).matches;
		root.classList.add(isDark ? "dark" : "light");
	} else {
		root.classList.add(theme);
	}
};

export const useThemeStore = create<ThemeState>()(
	persist(
		(set) => ({
			theme: "system",
			setTheme: (theme) => {
				set({ theme });
				applyTheme(theme);
			},
		}),
		{
			name: STORAGE_KEY,
			onRehydrateStorage: () => (state) => {
				if (state?.theme) {
					applyTheme(state.theme);
				}
			},
		},
	),
);

if (typeof window !== "undefined") {
	const { theme } = useThemeStore.getState();
	applyTheme(theme);
}
