import { z } from "zod";

const LoginSchema = z.object({
	email: z.email(),
	password: z.string(),
});

export type LoginData = z.infer<typeof LoginSchema>;

export default LoginSchema;
