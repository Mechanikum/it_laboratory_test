// @ts-expect-error Custom plugin
import images from "virtual:images-list";
import { z } from "zod";
import { api } from "@/shared/api";

const BackendUserSchema = z.object({
	id: z.string(),
	name: z.string().min(3).max(16),
	age: z.number().min(18),
	verified: z.boolean().optional(),
	passions: z.array(z.string()),
	photos: z.array(z.string()),
});

function getRandomInt(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
function pickRandom<T>(arr: T[], count: number) {
	const copy = [...arr],
		out: T[] = [];
	while (out.length < count && copy.length) {
		out.push(copy.splice(getRandomInt(0, copy.length - 1), 1)[0]);
	}
	return out;
}

export async function generateMockUsers(count: number) {
	const { data: passions } = await api.get<string[]>("/api/passions.json");

	return Array.from({ length: count }, () => {
		const id = crypto.randomUUID();
		const name = `user_${id.slice(0, 5)}`;
		const age = getRandomInt(18, 80);
		const verified = Math.random() < 0.5 ? undefined : Math.random() < 0.8;
		const pCount = getRandomInt(1, Math.min(5, passions.length));
		const phCount = getRandomInt(1, 4);

		const user = {
			id,
			name,
			age,
			verified,
			passions: pickRandom(passions, pCount),
			photos: pickRandom(images, phCount),
		};
		return BackendUserSchema.parse(user);
	});
}
