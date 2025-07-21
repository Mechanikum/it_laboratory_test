import type * as React from "react";
import {
	createContext,
	type Dispatch,
	type ReactNode,
	type SetStateAction,
	useContext,
	useMemo,
	useState,
} from "react";
import { useRedirectReturn } from "@/features/auth/lib/use-redirect-return";
import NameStep from "@/features/auth/ui/registration/name-step";
import PassionsStep from "@/features/auth/ui/registration/passions-step";
import type { UserData } from "@/shared/model/user";

export const registrationSteps = {
	name: NameStep,
	passions: PassionsStep,
	photos: () => <></>,
};

export const registrationStepsKeys = Object.keys(registrationSteps);

type RegistrationUserData = Omit<UserData, "id" | "verified">;

interface RegisterStepsContextProps {
	values: RegistrationUserData;
	setValues: Dispatch<SetStateAction<RegistrationUserData>>;
	progress: number;
	currentStep: string;
	setCurrentStep: Dispatch<SetStateAction<string>>;
	stepForward: () => void;
	stepBack: () => void;
}

export const RegistrationStepsContext =
	createContext<RegisterStepsContextProps | null>(null);

export const useRegistrationStepsContext = () => {
	const context = useContext(RegistrationStepsContext);
	if (!context) {
		throw new Error(
			"useRegistrationStepsContext must be used within a RegistrationStepsContext.Provider",
		);
	}
	return context;
};

export const RegistrationStepsContextProvider: React.FC<{
	children: ReactNode;
}> = ({ children }) => {
	const { navigateBack } = useRedirectReturn();

	const [values, setValues] = useState<RegistrationUserData>({
		name: "",
		age: 22,
		passions: [],
		photos: [],
	});
	const [currentStep, setCurrentStep] = useState(registrationStepsKeys[1]);

	const currentIndex = registrationStepsKeys.indexOf(currentStep);

	const progress = useMemo(
		() => Math.round((currentIndex / registrationStepsKeys.length) * 100),
		[currentIndex],
	);

	const stepForward = () => {
		if (currentIndex < registrationStepsKeys.length - 1) {
			setCurrentStep(registrationStepsKeys[currentIndex + 1]);
		} else {
			navigateBack();
		}
	};

	const stepBack = () => {
		if (currentIndex > 0) {
			setCurrentStep(registrationStepsKeys[currentIndex - 1]);
		} else {
			navigateBack();
		}
	};

	return (
		<RegistrationStepsContext.Provider
			value={{
				values,
				setValues,
				currentStep,
				setCurrentStep,
				progress,
				stepForward,
				stepBack,
			}}
		>
			{children}
		</RegistrationStepsContext.Provider>
	);
};
