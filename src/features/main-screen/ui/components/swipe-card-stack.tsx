import { AnimatePresence } from "motion/react";
import {
	memo,
	type RefObject,
	useCallback,
	useImperativeHandle,
	useState,
} from "react";
import SwipeCard, {
	type SwipeDirection,
} from "@/features/main-screen/ui/components/swipe-card";
import type { UserData } from "@/shared/model/user";

export interface SwipeCardStackProps {
	items: UserData[];
	onVote: (item: UserData, direction: SwipeDirection) => void;
	renderItem: (item: UserData, isTop: boolean) => React.ReactNode;
	removedHistory: RefObject<Set<string>>;
	ref: RefObject<SwipeCardStackRef | null>;
}

export interface SwipeCardStackRef {
	swipeLeft: () => void;
	swipeRight: () => void;
}

const SwipeCardStack: React.FC<SwipeCardStackProps> = ({ ...props }) => {
	const { items, onVote, renderItem } = props;
	const [leavingId, setLeavingId] = useState<string | null>(null);
	const [leavingDirection, setLeavingDirection] =
		useState<SwipeDirection | null>(null);

	const currentTop = items.at(-1);

	const triggerSwipe = useCallback(
		(direction: SwipeDirection) => {
			if (!currentTop || leavingId === currentTop.id) return;
			setLeavingId(currentTop.id);
			setLeavingDirection(direction);
		},
		[currentTop, leavingId],
	);

	useImperativeHandle(
		props.ref,
		() => ({
			swipeLeft: () => triggerSwipe("left"),
			swipeRight: () => triggerSwipe("right"),
		}),
		[triggerSwipe],
	);

	const handleCardLeft = () => {
		if (leavingId && currentTop?.id === leavingId && leavingDirection) {
			onVote(currentTop, leavingDirection);
		}
		setLeavingDirection(null);
		setLeavingId(null);
	};

	return (
		<div className={"relative size-full overflow-hidden flex"}>
			<AnimatePresence initial={false}>
				{items.map((item, index) => {
					const isTop = index === items.length - 1;
					const isRestored = props.removedHistory.current.has(
						item.id,
					);

					return (
						<SwipeCard
							key={item.id}
							isTop={isTop}
							leavingDirection={
								isTop && leavingId === item.id
									? leavingDirection
									: null
							}
							isRestored={isRestored}
							onSwipe={triggerSwipe}
							onLeave={handleCardLeft}
						>
							{renderItem(item, isTop)}
						</SwipeCard>
					);
				})}
			</AnimatePresence>
		</div>
	);
};

export default memo(SwipeCardStack);
