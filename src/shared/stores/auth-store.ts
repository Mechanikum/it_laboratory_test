import Cookies from "universal-cookie";
import { create } from "zustand";

import {queryClient} from "@/shared/lib/query-client";

const cookies = new Cookies(null, { path: "/" });

export interface AuthStoreState {
	token: string | undefined;
	setToken: (token: string) => void;
	logout: () => void;
}

export const useAuthStore = create<AuthStoreState>((set) => ({
	token: cookies.get("access_token"),
	setToken: (token: string) => {
		const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
		cookies.set("access_token", token, { expires: expires });
		set({ token: token });
	},
	logout: () => {
		cookies.remove("access_token");
		set({ token: undefined });
		queryClient.invalidateQueries();
	},
}));
