import { api } from "@/shared/api";

export async function urlToFilePromise(url: string) {
	const { data: blob } = await api.get(url, { responseType: "blob" });
	return new File([blob], url.split("/").pop() ?? "photo", {
		type: blob.type,
	});
}
