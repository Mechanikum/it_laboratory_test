import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Theme = "light" | "dark" | "system";

interface ThemeState {
	theme: Theme;
	setTheme: (t: Theme) => void;
}

const STORAGE_KEY = "vite-ui-theme";

export const sanitizeTheme = (theme: Theme) => {
	if (theme === "system") {
		const isDark = window.matchMedia(
			"(prefers-color-scheme: dark)",
		).matches;
		return isDark ? "dark" : "light";
	}
	return theme;
};

const applyTheme = (theme: Theme) => {
	const root = document.documentElement;
	root.classList.remove("light", "dark");

	const sanitizedTheme = sanitizeTheme(theme);

	root.classList.add(sanitizedTheme);
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
