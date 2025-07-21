import { createFileRoute } from '@tanstack/react-router'
import Login from "@/features/auth/ui/login";

export const Route = createFileRoute('/(auth)/login')({
  component: Login,
})
