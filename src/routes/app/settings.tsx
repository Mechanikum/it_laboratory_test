import { Loader2 } from "lucide-react";
import UserCard from "@/features/user-card/ui/user-card";
import { useUser } from "@/shared/api/queries/use-user";
import { sanitizeTheme, useThemeStore } from "@/shared/stores/theme-store";
import { Label } from "@/shared/ui/label";
import { Switch } from "@/shared/ui/switch";

const Settings = () => {
	const user = useUser();
	const { theme, setTheme } = useThemeStore();

	return (
		<>
			{user.status === "pending" ? (
				<Loader2 className="size-6 animate-spin" />
			) : user.status === "error" ? (
				<span>Error: {user.error.message}</span>
			) : (
				<UserCard {...user.data}>
					<div className={"h-3"} />
				</UserCard>
			)}
			<div
				className={
					"bg-background border-y flex p-4 justify-between my-4"
				}
			>
				<Label htmlFor="theme-switcher" className={"text-base"}>
					Dark mode
				</Label>
				<Switch
					checked={sanitizeTheme(theme) === "dark"}
					onCheckedChange={(value) =>
						setTheme(value ? "dark" : "light")
					}
					id="theme-switcher"
				/>
			</div>
		</>
	);
};

export default Settings;
