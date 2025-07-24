import { Loader2 } from "lucide-react";
import { memo, useMemo } from "react";

interface PhotoItemProps {
	photo?: File;
	loading: boolean;
	error: string | null;
	addPhoto: () => void;
	removePhoto: () => void;
}

const PhotoItem: React.FC<PhotoItemProps> = ({
	photo,
	loading,
	error,
	addPhoto,
	removePhoto,
}) => {
	const imgUrl = useMemo(
		() => (photo ? URL.createObjectURL(photo) : undefined),
		[photo],
	);

	return (
		// biome-ignore lint/a11y/useKeyWithClickEvents lint/a11y/noStaticElementInteractions: Click event handlers are redundant here for better UX and main way of interaction is a11y compatible button
		<div
			onClick={() => {
				if (!photo) addPhoto();
			}}
			data-empty={!photo}
			className={
				"group/card dark:bg-[#21262E] bg-[#E9EBEE] relative border-dashed border-4 aspect-[3/4] data-[empty=true]:cursor-pointer data-[empty=false]:border-transparent data-[empty=false]:border-0 transition-all rounded-xl"
			}
		>
			{photo && (
				<img
					src={imgUrl}
					alt={photo.name}
					className="object-cover w-full h-full rounded-xl transition-all"
				/>
			)}
			{loading && (
				<div className="absolute inset-0 flex items-center justify-center dark:bg-black/50 bg-white/30 rounded-lg">
					<Loader2 className="size-6 animate-spin" />
				</div>
			)}
			{error && (
				<div className="absolute top-1/2 left-1/2 -translate-1/2 w-3/4 text-center text-destructive text-xs font-medium tracking-wide rounded">
					{error}
				</div>
			)}
			<button
				type={"button"}
				className={
					"absolute size-7 -bottom-1 -right-1 group-data-[empty=false]/card:bottom-0 group-data-[empty=false]/card:right-0 transition-all border border-white group-data-[empty=false]/card:border-border  text-primary-foreground group-data-[empty=false]/card:text-muted-foreground rounded-full"
				}
				onClick={(e) => {
					e.stopPropagation();
					if (!photo) addPhoto();
					else removePhoto();
				}}
			>
				<div
					className={
						"size-full relative flex justify-center items-center z-0"
					}
				>
					<div
						className={
							"rounded-full size-full absolute bg-white z-[-1] opacity-0 group-data-[empty=false]/card:opacity-100 transition-all duration-500"
						}
					/>
					<div
						className={
							"rounded-full size-full absolute bg-linear-to-tr z-[-1] opacity-0 group-data-[empty=true]/card:opacity-100 transition-all duration-500 hover:contrast-115 hover:saturation-105 to-secondary from-trinary"
						}
					/>
					<svg
						width="16"
						height="16"
						viewBox="0 0 16 16"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						className="transition-transform duration-600 origin-center group-data-[empty=false]/card:rotate-135"
					>
						<line
							x1="8"
							y1="14.75"
							x2="8"
							y2="1.25"
							stroke="currentColor"
							className="transition-[stroke-width] duration-600 stroke-[2.5px] group-data-[empty=false]/card:stroke-[3px]"
							strokeLinecap="round"
						/>
						<line
							x1="1.25"
							y1="8"
							x2="14.75"
							y2="8"
							stroke="currentColor"
							className="transition-[stroke-width] duration-600 stroke-[2.5px] group-data-[empty=false]/card:stroke-[3px]"
							strokeLinecap="round"
						/>
					</svg>
				</div>
			</button>
		</div>
	);
};

export default memo(PhotoItem);
