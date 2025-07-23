import type { UserData } from "@/shared/model/user";

export type RegistrationData = Omit<UserData, "id" | "verified">;
