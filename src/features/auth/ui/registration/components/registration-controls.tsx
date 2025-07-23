import { ChevronLeft, X } from "lucide-react";
import { useRegistrationStepsContext } from "@/features/auth/lib/registration-steps-context";
import { Button } from "@/shared/ui/button";

const RegistrationControls: React.FC<{ optional?: boolean }> = ({
	optional,
}) => {
	const { currentIndex, stepBack, stepForward } =
		useRegistrationStepsContext();

	return (
		<div
			className={
				"flex justify-between items-center text-muted-foreground px-6 py-3"
			}
		>
			{currentIndex === 0 ? (
				<Button variant={"ghost"} onClick={stepBack} size={"icon"}>
					<X className={"size-8"} />
				</Button>
			) : (
				<Button variant={"ghost"} onClick={stepBack} size={"icon"}>
					<ChevronLeft className={"size-8"} />
				</Button>
			)}
			{optional && (
				<Button
					variant={"ghost"}
					onClick={stepForward}
					className={"font-bold text-sm h-fit"}
				>
					Skip
				</Button>
			)}
		</div>
	);
};

export default RegistrationControls;
