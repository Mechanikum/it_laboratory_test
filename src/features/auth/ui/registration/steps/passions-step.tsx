import { Loader2 } from "lucide-react";
import { useCallback } from "react";
import { useRegistrationStepsContext } from "@/features/auth/lib/registration-steps-context";
import PassionItem from "@/features/auth/ui/registration/components/passion-item";
import RegistrationControls from "@/features/auth/ui/registration/components/registration-controls";
import { usePassions } from "@/shared/api/queries/use-passions";
import { Button } from "@/shared/ui/button";
import { Label } from "@/shared/ui/label";

const PassionsStep = () => {
	const { values, setValues, stepForward } = useRegistrationStepsContext();

	const activePassions = values.passions;
	const passions = usePassions();

	const togglePassion = useCallback(
		(passion: string) => {
			activePassions.includes(passion)
				? setValues((state) => ({
						...state,
						passions: state.passions.filter((p) => p !== passion),
					}))
				: setValues((state) => ({
						...state,
						passions: [...state.passions, passion],
					}));
		},
		[activePassions, setValues],
	);

	return (
		<>
			<RegistrationControls optional />
			<div className={"space-y-2 p-8 pt-0"}>
				<Label className={"text-[1.7rem] leading-9 font-bold mb-1"}>
					Passions
				</Label>
				<span className={"text-base text-muted-foreground"}>
					Let everyone know what you’re passionate about, by adding it
					to your profile.
				</span>
			</div>
			<div
				className={
					"flex-[1_1_0] justify-center flex flex-wrap gap-2 p-8 overflow-y-auto border-y"
				}
			>
				{passions.status === "pending" ? (
					<Loader2 className="size-6 animate-spin" />
				) : passions.status === "error" ? (
					<span>Error: {passions.error.message}</span>
				) : (
					passions.data.map((passion, i) => (
						<PassionItem
							key={`${passion}-${i}`}
							name={passion}
							active={activePassions.includes(passion)}
							onClick={() => togglePassion(passion)}
							disabled={
								!activePassions.includes(passion) &&
								activePassions.length >= 5
							}
						/>
					))
				)}
			</div>
			<div className={"p-8"}>
				<Button className={"w-full"} onClick={stepForward}>
					Continue ({activePassions.length}/5)
				</Button>
			</div>
		</>
	);
};

export default PassionsStep;
