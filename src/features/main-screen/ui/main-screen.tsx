import { Loader2 } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { useProfiles } from "@/features/main-screen/api/use-profiles";
import { useVoteProfile } from "@/features/main-screen/api/use-vote-profile";
import SwipeCardStack, {
	type SwipeCardStackRef,
} from "@/features/main-screen/ui/components/swipe-card-stack";
import VoteControls from "@/features/main-screen/ui/components/vote-controls";
import UserCard from "@/features/user-card/ui/user-card";
import type { UserData } from "@/shared/model/user";

const MainScreen = () => {
	const controls = useRef<SwipeCardStackRef>(null);

	const immutableRemoved = useRef(new Set<string>());
	const [removed, setRemoved] = useState<Set<string>>(new Set());

	const profiles = useProfiles();
	const voteProfile = useVoteProfile();

	const stack = useMemo(
		() =>
			(profiles.data?.pages.flat() ?? [])
				.filter((p) => !removed.has(p.id))
				.slice(0, 4)
				.reverse(),
		[profiles.data, removed],
	);

	const remove = (id: string) => {
		immutableRemoved.current.add(id);
		setRemoved((prev) => {
			const next = new Set(prev);
			next.add(id);
			return next;
		});
	};

	const handleVote = (item: UserData, vote: "left" | "right") => {
		remove(item.id);
		voteProfile.mutate({
			id: item.id,
			vote: vote === "left" ? "dislike" : "like",
		});

		if (
			profiles.data &&
			profiles.data.pages.flat().length <=
				immutableRemoved.current.size + 3
		)
			profiles.fetchNextPage();
	};

	const handleRollback = () =>
		setRemoved((prev) => {
			const next = new Set(prev);
			let last: string | undefined;
			for (const v of next) last = v;
			if (last !== undefined) next.delete(last);
			return next;
		});

	return (
		<div className={"flex-1 p-1"}>
			<div className={"relative flex size-full"}>
				{profiles.status === "pending" || stack.length === 0 ? (
					<Loader2 className="size-9 animate-spin m-auto" />
				) : profiles.status === "error" ? (
					<span className={"m-auto text-center"}>
						Error: {profiles.error.message}
					</span>
				) : (
					<SwipeCardStack
						ref={controls}
						items={stack}
						onVote={handleVote}
						removedHistory={immutableRemoved}
						renderItem={(item, isTop) => (
							<UserCard
								className={"bg-background"}
								paused={!isTop}
								{...item}
							>
								<div className="h-20" />
							</UserCard>
						)}
					/>
				)}
				<VoteControls
					disabled={stack.length === 0}
					canRollback={!!removed.size}
					rollback={handleRollback}
					like={() => {
						controls.current?.swipeRight();
					}}
					dislike={() => {
						controls.current?.swipeLeft();
					}}
				/>
			</div>
		</div>
	);
};

export default MainScreen;
