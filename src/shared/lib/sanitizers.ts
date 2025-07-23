export const sanitizeStringToFloat = (
	val: string,
	decimals: number,
): string => {
	let sanitized = val.replace(/[^\d.-]/g, "");
	if (decimals > 0 && sanitized.includes(".")) {
		const [int, dec] = sanitized.split(".");
		sanitized = `${int}.${dec.slice(0, decimals)}`;
	}
	return sanitized;
};
