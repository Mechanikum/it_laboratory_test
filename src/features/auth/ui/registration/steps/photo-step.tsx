import { useState } from "react";
import { useRegistrationStepsContext } from "@/features/auth/lib/registration-steps-context";
import PhotoItem from "@/features/auth/ui/registration/components/photo-item";
import RegistrationControls from "@/features/auth/ui/registration/components/registration-controls";
import UserCard from "@/features/user-card/ui/user-card";
import {
	convertImagesToWebp,
	getImages,
	isFileError,
} from "@/shared/lib/image-upload-helpers";
import { Button } from "@/shared/ui/button";
import { Label } from "@/shared/ui/label";
import { Switch } from "@/shared/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";

const CARD_AMOUNT = 9;

type Slot = { loading: boolean; error: string | null };

const PhotoStep = () => {
	const { values, setValues, stepForward } = useRegistrationStepsContext();
	const [slots, setSlots] = useState<Slot[]>(() =>
		Array.from({ length: 9 }, () => ({ loading: false, error: null })),
	);

	const upload = async () => {
		const free = [...Array(9).keys()].filter((i) => !values.photos[i]);
		if (!free.length) return;

		const firstFree = free[0];
		setSlots((slots) =>
			slots.map((slot, i) =>
				i === firstFree
					? { ...slot, loading: true, error: null }
					: slot,
			),
		);

		let files: FileList;
		try {
			files = await getImages();
			if (!files.length) {
				setSlots((slots) =>
					slots.map((slot, i) =>
						i === firstFree ? { ...slot, loading: false } : slot,
					),
				);
				return;
			}
		} catch (err) {
			const msg =
				isFileError(err) && err.type !== "interaction"
					? err.message
					: null;
			setSlots((slots) =>
				slots.map((slot, i) =>
					i === firstFree
						? { ...slot, loading: false, error: msg }
						: slot,
				),
			);
			return;
		}

		const toFill = free.slice(0, files.length);
		setSlots((slots) =>
			slots.map((slot, i) =>
				toFill.includes(i)
					? { ...slot, loading: true, error: null }
					: slot,
			),
		);

		const results = await convertImagesToWebp(files);

		setValues((state) => {
			const photos = [...state.photos];
			results.forEach((res, idx) => {
				if (res.converted) photos[toFill[idx]] = res.converted;
			});
			return { ...state, photos };
		});

		setSlots((slots) =>
			slots.map((slot, i) => {
				const idx = toFill.indexOf(i);
				if (idx === -1) return slot;
				const { error } = results[idx];
				return {
					...slot,
					loading: false,
					error: error ? error.message : null,
				};
			}),
		);
	};

	const remove = (idx: number) =>
		setValues((s) => ({
			...s,
			photos: s.photos.filter((_, i) => i !== idx),
		}));

	return (
		<>
			<RegistrationControls />
			<Tabs
				defaultValue="edit"
				className={"flex flex-[1_1_0] gap-0 flex-col -mt-3"}
			>
				<TabsList
					className={
						"w-full bg-transparent p-0 h-fit border-b rounded-none"
					}
				>
					<TabsTrigger
						value="edit"
						className={
							"data-[state=active]:bg-transparent! border-0 rounded-none text-lg py-3 h-fit"
						}
					>
						Edit
					</TabsTrigger>
					<span className={"h-full w-[1px] bg-border"} />
					<TabsTrigger
						value="preview"
						className={
							"data-[state=active]:bg-transparent! border-0 rounded-none text-lg py-3 h-fit"
						}
						disabled={!values.photos.length}
					>
						Preview
					</TabsTrigger>
				</TabsList>

				<TabsContent
					value="edit"
					className={
						"flex-[1_1_0] bg-card justify-center data-[state=active]:overflow-y-auto"
					}
				>
					<div
						className={
							"grid grid-cols-3 sm:grid-cols-4 auto-rows-min gap-2 p-2 "
						}
					>
						{Array.from({ length: CARD_AMOUNT }, (_, i) => (
							<PhotoItem
								key={`gallery-${i}`}
								photo={values.photos[i]}
								loading={slots[i].loading}
								error={slots[i].error}
								addPhoto={() => upload()}
								removePhoto={() => remove(i)}
							/>
						))}
					</div>

					<div className={"col-span-full space-y-7 p-2 mb-7 "}>
						<p
							className={
								"text-muted-foreground text-center text-sm"
							}
						>
							Add a video, pic or Loop to get 4% closer to
							completing your profile and you may even get more
							Likes.
						</p>
						<Button
							className={"w-full"}
							onClick={() => {
								if (values.photos.length < CARD_AMOUNT)
									upload();
								else stepForward();
							}}
							disabled={slots.some((s) => s.loading)}
						>
							{values.photos.length < CARD_AMOUNT
								? "Add media"
								: "Finish"}
						</Button>
					</div>
					<div
						className={
							"bg-background border-y flex p-4 justify-between"
						}
					>
						<Label htmlFor="smart-photos" className={"text-base"}>
							Smart Photos
						</Label>
						<Switch id="smart-photos" />
					</div>
				</TabsContent>
				<TabsContent
					value="preview"
					className={
						"flex-[1_1_0] bg-card justify-center data-[state=active]:flex p-3 overflow-hidden"
					}
				>
					<UserCard id={""} verified={false} {...values}>
						<Button
							className={"w-full mx-auto max-w-3/4 mt-8"}
							onClick={stepForward}
							disabled={slots.some((s) => s.loading)}
						>
							Finish
						</Button>
					</UserCard>
				</TabsContent>
			</Tabs>
		</>
	);
};

export default PhotoStep;
