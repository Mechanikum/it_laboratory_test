import { motion, useAnimate, useMotionValue, useTransform } from "motion/react";
import { type ComponentPropsWithRef, memo, useEffect } from "react";

const OFFSET_THRESHOLD = 75;

export type SwipeDirection = "left" | "right";

export type SwipeCardProps = ComponentPropsWithRef<typeof motion.div> & {
	isTop: boolean;
	isRestored: boolean;
	leavingDirection: SwipeDirection | null;
	onSwipe: (dir: SwipeDirection) => void;
	onLeave: () => void;
	children: React.ReactNode;
};

const SwipeCard: React.FC<SwipeCardProps> = ({
	isTop,
	isRestored,
	leavingDirection,
	onSwipe,
	onLeave,
	children,
}) => {
	const x = useMotionValue(0);
	const rotate = useTransform(x, [-200, 0, 200], [-15, 0, 15]);
	const [scope, animate] = useAnimate();

	const drag = isTop ? "x" : false;
	const pointerEvents = isTop ? "auto" : "none";

	const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
		if (!isTop) return;
		const offsetX = info.offset.x;
		if (Math.abs(offsetX) > OFFSET_THRESHOLD) {
			const dir = offsetX > 0 ? "right" : "left";
			onSwipe(dir);
		} else {
			animate(
				scope.current,
				{ x: 0, rotate: 0 },
				{ type: "spring", stiffness: 200 },
			);
		}
	};

	useEffect(() => {
		if (leavingDirection) {
			const exitX = leavingDirection === "right" ? 500 : -500;
			animate(
				scope.current,
				{
					x: exitX,
					opacity: 0,
					rotate: leavingDirection === "right" ? 15 : -15,
				},
				{ duration: 0.3 },
			).then(() => onLeave());
		}
	}, [leavingDirection, animate, onLeave, scope]);

	return (
		<motion.div
			className={"absolute size-full"}
			variants={{
				initial: { opacity: 0, y: 50 },
				animate: { opacity: 1, y: 0 },
			}}
			initial={isRestored ? "initial" : false}
			animate="animate"
			exit="exit"
			layout
		>
			<motion.div
				ref={scope}
				drag={drag}
				dragMomentum={false}
				onDragEnd={handleDragEnd}
				whileDrag={{ cursor: "grabbing" }}
				style={{ x, rotate, pointerEvents }}
				className={
					"size-full relative flex drop-shadow-[0_0_8px_rgba(0,0,0,0.7)]"
				}
			>
				{children}
			</motion.div>
		</motion.div>
	);
};

export default memo(SwipeCard);
