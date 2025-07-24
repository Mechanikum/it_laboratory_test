const QUALITY = 0.8;

export type GetFileError =
	| { type: "interaction"; message: string }
	| { type: "upload"; message: string }
	| { type: "conversion"; message: string };

function isFileError(err: unknown): err is GetFileError {
	return (
		typeof err === "object" &&
		err !== null &&
		"type" in err &&
		"message" in err &&
		typeof (err as any).message === "string" &&
		["interaction", "upload", "conversion"].includes((err as any).type)
	);
}

const convertToWebP = (file: File): Promise<File> =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);

		reader.onload = () => {
			const img = new Image();
			img.src = reader.result as string;

			img.onload = () => {
				const canvas = document.createElement("canvas");
				canvas.width = img.width;
				canvas.height = img.height;
				const ctx = canvas.getContext("2d");
				if (!ctx) {
					return reject({
						type: "conversion",
						message: "Canvas context not available",
					} as GetFileError);
				}

				ctx.drawImage(img, 0, 0);
				canvas.toBlob(
					(blob) => {
						if (!blob) {
							return reject({
								type: "conversion",
								message: "Blob conversion failed",
							} as GetFileError);
						}
						const webpFile = new File(
							[blob],
							file.name.replace(/\.[^/.]+$/, "") + ".webp",
							{ type: "image/webp" },
						);
						resolve(webpFile);
					},
					"image/webp",
					QUALITY,
				);
			};

			img.onerror = () =>
				reject({
					type: "conversion",
					message: "Image load failed",
				} as GetFileError);
		};

		reader.onerror = () =>
			reject({
				type: "conversion",
				message: "File reading failed",
			} as GetFileError);
	});

type SelectOptions = { multiple?: boolean };

export function selectFiles(options: { multiple: false }): Promise<File>;
export function selectFiles(options: { multiple: true }): Promise<FileList>;
export function selectFiles(options?: SelectOptions): Promise<File | FileList> {
	const { multiple = false } = options ?? {};
	return new Promise((resolve, reject) => {
		const input = document.createElement("input");
		input.type = "file";
		input.accept = "image/*";
		input.multiple = multiple;
		input.style.display = "none";

		let done = false;
		const cleanup = () => {
			done = true;
			window.removeEventListener("focus", onWindowFocus);
			input.remove();
		};

		input.onchange = () => {
			if (done) return;
			cleanup();

			const files = input.files;
			if (!files?.length) {
				return reject({
					type: "interaction",
					message: "File selection was cancelled.",
				} as GetFileError);
			}

			if (multiple) {
				resolve(files);
			} else {
				resolve(files[0]);
			}
		};

		const onWindowFocus = () => {
			setTimeout(() => {
				if (!done) {
					cleanup();
					reject({
						type: "interaction",
						message: "File dialog closed without selecting a file.",
					} as GetFileError);
				}
			}, 100);
		};
		window.addEventListener("focus", onWindowFocus);

		document.body.appendChild(input);
		input.click();
	});
}

type ConversionResult =
	| { original: File; converted: File; error: null }
	| { original: File; converted: null; error: GetFileError };

async function convertImagesToWebp(files: FileList) {
	const arr = Array.from(files);
	const settled = await Promise.allSettled(
		arr.map((f) =>
			convertToWebP(f).then(
				(conv) =>
					({
						original: f,
						converted: conv,
						error: null,
					}) as ConversionResult,
				(err: GetFileError) =>
					({
						original: f,
						converted: null,
						error: err,
					}) as ConversionResult,
			),
		),
	);

	return (settled as PromiseFulfilledResult<ConversionResult>[]).map(
		(r) => r.value,
	);
}

const getImage = () => selectFiles({ multiple: false });
const getImages = () => selectFiles({ multiple: true });

export { getImage, getImages, convertImagesToWebp, isFileError };
