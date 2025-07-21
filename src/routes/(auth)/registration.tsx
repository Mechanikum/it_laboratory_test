import { createFileRoute } from "@tanstack/react-router";
import Registration from "@/features/auth/ui/registration";

export const Route = createFileRoute("/(auth)/registration")({
	component: Registration,
});
