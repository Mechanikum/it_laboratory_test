import { motion, useAnimate } from "motion/react";
import { type ComponentPropsWithRef, memo } from "react";
import {
	Back,
	Boost,
	Dislike,
	Favorite,
	Like,
} from "@/features/main-screen/assets/ControlsIcons";
import { cn } from "@/shared/lib/utils";

interface VoteControlsProps {
	canRollback: boolean;
	rollback: () => void;
	like: () => void;
	dislike: () => void;
	disabled: boolean;
}

const ControlsButton: React.FC<ComponentPropsWithRef<typeof motion.button>> = ({
	onClick,
	className,
	children,
	...props
}) => {
	const [scope, animate] = useAnimate();

	const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
		animate(scope.current, { scale: [1, 1.07, 1] }, { duration: 0.2 });
		onClick?.(event);
	};

	return (
		<motion.button
			ref={scope}
			type={"button"}
			onClick={handleClick}
			className={cn(
				`rounded-full bg-transparent hover:bg-current/20 transition-colors disabled:pointer-events-none disabled:opacity-50`,
				className,
			)}
			{...props}
		>
			{children}
		</motion.button>
	);
};

const VoteControls: React.FC<VoteControlsProps> = ({
	disabled,
	canRollback,
	rollback,
	like,
	dislike,
}) => (
	<div
		className={
			"absolute bottom-0 left-0 w-full p-3 gap-4 flex justify-between items-center"
		}
	>
		<ControlsButton
			className={"size-12 !border-[#C8720B] border-2 text-[#C8720B]"}
			disabled={!canRollback || disabled}
			onClick={rollback}
		>
			<Back className={"size-5.5 mx-auto"} />
		</ControlsButton>
		<ControlsButton
			className={"size-15 !border-[#F3485B] border-2 text-[#F3485B]"}
			disabled={disabled}
			onClick={dislike}
		>
			<Dislike className={"size-8 mx-auto"} />
		</ControlsButton>
		<ControlsButton
			className={"size-12 !border-[#1B86F9] border-2 text-[#1B86F9]"}
			disabled={disabled}
			onClick={like}
		>
			<Favorite className={"size-5.5 mx-auto"} />
		</ControlsButton>

		<ControlsButton
			className={"size-15 !border-[#199A6A] border-2 text-[#199A6A]"}
			disabled={disabled}
			onClick={like}
		>
			<Like className={"size-8 mx-auto"} />
		</ControlsButton>
		<ControlsButton
			className={"size-12 !border-[#B555EE] border-2 text-[#B555EE]"}
			disabled={disabled}
			onClick={like}
		>
			<Boost className={"size-5.5 mx-auto"} />
		</ControlsButton>
	</div>
);

export default memo(VoteControls);
