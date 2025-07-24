import { createFileRoute } from "@tanstack/react-router";
import MainScreen from "@/features/main-screen/ui/main-screen";

export const Route = createFileRoute("/(app)/")({
	component: MainScreen,
});
