import type * as React from "react";
import {
	createContext,
	type Dispatch,
	type ReactNode,
	type SetStateAction,
	useCallback,
	useContext,
	useMemo,
	useState,
} from "react";
import { useBlocker } from "react-router";
import { useRegister } from "@/features/auth/api/use-register";
import { useRedirectReturn } from "@/features/auth/lib/use-redirect-return";
import type { RegistrationData } from "@/features/auth/model/registration-data";
import NameStep from "@/features/auth/ui/registration/steps/name-step";
import PassionsStep from "@/features/auth/ui/registration/steps/passions-step";
import PhotoStep from "@/features/auth/ui/registration/steps/photo-step";

export const registrationSteps = {
	name: NameStep,
	passions: PassionsStep,
	photos: PhotoStep,
};

export const registrationStepsKeys = Object.keys(registrationSteps);

interface RegisterStepsContextProps {
	values: RegistrationData;
	setValues: Dispatch<SetStateAction<RegistrationData>>;
	progress: number;
	currentIndex: number;
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
	const register = useRegister();

	const [values, setValues] = useState<RegistrationData>({
		name: "",
		age: 22,
		passions: [],
		photos: [],
	});
	const [currentStep, setCurrentStep] = useState(registrationStepsKeys[0]);
	const currentIndex = registrationStepsKeys.indexOf(currentStep);

	const shouldBlock = useCallback(() => {
		const canGetBack = currentIndex > 0;
		if (canGetBack) {
			setCurrentStep(registrationStepsKeys[currentIndex - 1]);
		}
		return canGetBack;
	}, [currentIndex]);
	useBlocker(shouldBlock);

	const progress = useMemo(
		() =>
			Math.round(
				((currentIndex + 1) / registrationStepsKeys.length) * 100,
			),
		[currentIndex],
	);

	const stepForward = () => {
		if (currentIndex < registrationStepsKeys.length - 1) {
			setCurrentStep(registrationStepsKeys[currentIndex + 1]);
		} else {
			register.mutateAsync(values).then(() => {
				navigateBack();
			});
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
				currentIndex,
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
