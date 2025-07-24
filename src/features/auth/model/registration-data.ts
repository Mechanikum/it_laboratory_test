import type { z } from "zod";
import type UserSchema from "@/shared/model/user";

export type RegistrationData = Omit<
	z.infer<typeof UserSchema>,
	"id" | "verified"
>;
