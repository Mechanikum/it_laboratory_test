import {
	RegistrationStepsContextProvider,
	registrationSteps,
	useRegistrationStepsContext,
} from "@/features/auth/lib/registration-steps-context";
import { Tabs, TabsContent } from "@/shared/ui/tabs";

const RegistrationInner = () => {
	const { progress, currentStep } = useRegistrationStepsContext();

	return (
		<>
			<div className={"w-screen fixed top-0 left-0"}>
				<div
					className={
						"bg-linear-to-r from-primary to-trinary transition-all duration-600 h-2.5"
					}
					style={{ width: `${Math.max(10, progress)}%` }}
				/>
			</div>
			<Tabs value={currentStep} className={"flex-1 pt-2.5"}>
				{Object.entries(registrationSteps).map(([key, Component]) => (
					<TabsContent
						key={key}
						value={key}
						className={"h-full data-[state=active]:flex flex-col"}
					>
						<Component />
					</TabsContent>
				))}
			</Tabs>
		</>
	);
};

const Registration = () => (
	<RegistrationStepsContextProvider>
		<RegistrationInner />
	</RegistrationStepsContextProvider>
);

export default Registration;
