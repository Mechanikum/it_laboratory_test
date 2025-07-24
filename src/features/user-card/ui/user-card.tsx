import Autoplay from "embla-carousel-autoplay";
import { Check, Loader2 } from "lucide-react";
import type * as React from "react";
import { type ComponentPropsWithRef, memo, useEffect, useState } from "react";
import { cn } from "@/shared/lib/utils";
import type { UserData } from "@/shared/model/user";
import {
	Carousel,
	type CarouselApi,
	CarouselContent,
	CarouselItem,
} from "@/shared/ui/carousel";

const UserCard: React.FC<
	UserData & ComponentPropsWithRef<"div"> & { paused?: boolean }
> = ({
	id,
	name,
	photos,
	age,
	verified,
	passions,
	className,
	children,
	paused = false,
	...props
}) => {
	const [items, setItems] = useState<{ file: File; url: string }[]>([]);
	const [carouselApi, setCarouselApi] = useState<CarouselApi>();
	const [current, setCurrent] = useState(0);

	useEffect(() => {
		if (!carouselApi) {
			return;
		}

		setCurrent(carouselApi.selectedScrollSnap());

		carouselApi.on("select", () => {
			setCurrent(carouselApi.selectedScrollSnap());
		});
	}, [carouselApi]);

	useEffect(() => {
		let isMounted = true;
		const createdUrls: string[] = [];

		Promise.all(photos.map((p) => Promise.resolve(p))).then((files) => {
			if (!isMounted) return;
			const mapped = files.map((file) => {
				const url = URL.createObjectURL(file);
				createdUrls.push(url);
				return { file, url };
			});
			setItems(mapped);
		});

		return () => {
			isMounted = false;
			createdUrls.forEach(URL.revokeObjectURL);
		};
	}, [photos]);

	return (
		<div
			className={cn(
				"flex-[1_1_0] flex rounded-lg overflow-hidden relative select-none",
				className,
			)}
			{...props}
		>
			<Carousel
				className="size-full flex [&>div]:flex-[1_1_0] pointer-events-none"
				setApi={setCarouselApi}
				opts={{
					watchDrag: false,
					loop: true,
				}}
				plugins={[
					Autoplay({
						active: !paused,
						delay: 2000,
					}),
				]}
			>
				<CarouselContent className={"size-full ml-0"}>
					{items.length === 0 ? (
						<Loader2 className="size-9 animate-spin m-auto" />
					) : (
						items.map(({ file, url }) => (
							<CarouselItem
								key={`carousel-${file.name}`}
								className="pl-0"
							>
								<img
									src={url}
									alt={file.name}
									className="object-cover size-full"
								/>
							</CarouselItem>
						))
					)}
				</CarouselContent>
			</Carousel>
			{photos.length > 1 && (
				<div className={"absolute w-full top-1 px-2.5 flex gap-1"}>
					{photos.map((_, i) => (
						<div
							key={`progress-${i}`}
							data-active={i === current}
							className={
								"flex-1 bg-badge data-[active=true]:bg-badge-foreground h-1 duration-500 rounded-full transition-all"
							}
						/>
					))}
				</div>
			)}
			<div
				className={
					"absolute flex flex-col justify-end px-4 py-3 w-full min-h-[366px] bottom-0 bg-linear-to-t/longer from-black via-30% via-[#303030]/30 to-white/0"
				}
			>
				<div
					className={"flex items-center text-start gap-2 text-white"}
				>
					<p
						className={cn(
							"text-[2.125rem] min-w-0 leading-11 font-bold text-balance",
							{ "pr-6": verified },
						)}
					>
						<span className={"relative"}>
							<span>{name}</span>
							<span
								className={"ml-2 text-[1.625rem] font-normal"}
							>
								{age}
							</span>
							{verified && (
								<span
									className={
										"absolute left-[calc(100%+0.75rem)] top-1/2 -translate-y-1/2 flex-0 aspect-square size-6 bg-[#1786FF] rounded-full text-white text-center p-1"
									}
								>
									<Check className={"size-full"} />
								</span>
							)}
						</span>
					</p>
					<div
						className={
							"flex-0 ml-auto aspect-square size-6 bg-white rounded-full text-black text-center"
						}
					>
						i
					</div>
				</div>
				{!!passions.length && (
					<div className={"flex flex-wrap gap-1.5 mt-2.5"}>
						{passions.map((passion) => (
							<div
								key={passion}
								className={
									"px-3 py-1 bg-badge text-badge-foreground border font-light border-badge-foreground rounded-full text-sm "
								}
							>
								{passion}
							</div>
						))}
					</div>
				)}
				{children}
			</div>
		</div>
	);
};

export default memo(UserCard);
