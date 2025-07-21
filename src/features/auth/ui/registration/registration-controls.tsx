import { ChevronLeft, X } from "lucide-react";
import { useRegistrationStepsContext } from "@/features/auth/lib/registration-steps-context";
import { Button } from "@/shared/ui/button";

const RegistrationControls: React.FC<{ optional?: boolean }> = ({
	optional,
}) => {
	const { progress, stepBack, stepForward } = useRegistrationStepsContext();

	return (
		<div
			className={
				"flex justify-between items-center text-muted-foreground px-6 py-4"
			}
		>
			{progress === 0 ? (
				<X className={"size-8"} onClick={stepBack} />
			) : (
				<ChevronLeft className={"size-8"} onClick={stepBack} />
			)}
			{optional && (
				<Button
					variant={"ghost"}
					onClick={stepForward}
					className={"font-bold text-sm"}
				>
					Skip
				</Button>
			)}
		</div>
	);
};

export default RegistrationControls;
