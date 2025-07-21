import { z } from "zod";

const UserSchema = z.object({
	id: z.string(),
	name: z.string().min(3).max(128),
	age: z.number().min(18),
	verified: z.boolean().optional(),
	passions: z.array(z.string()),
	photos: z.array(z.file()),
});

export type UserData = z.infer<typeof UserSchema>;

export default UserSchema;
