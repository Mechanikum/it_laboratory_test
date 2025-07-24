import { z } from "zod";

const UserSchema = z.object({
	id: z.string(),
	name: z.string().min(3).max(16),
	age: z.number().min(18),
	verified: z.boolean().optional(),
	passions: z.array(z.string()),
	photos: z.array(z.union([z.file(), z.promise(z.file())])),
});

const UserSettingsSchema = z.object({
	theme: z.enum(["light", "dark", "system"]),
});

export type UserData = z.input<typeof UserSchema>;
export type BackendUserData = z.infer<typeof UserSchema> & { photos: string[] };

export type UserSettings = z.infer<typeof UserSettingsSchema>;

export default UserSchema;
