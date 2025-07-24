import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import NumberField from "@/shared/form/ui/number-field";
import SubmitButton from "@/shared/form/ui/submit-button";
import TextField from "@/shared/form/ui/text-field";

export const { fieldContext, useFieldContext, formContext, useFormContext } =
	createFormHookContexts();

export const { useAppForm } = createFormHook({
	fieldComponents: {
		TextField,
		NumberField,
	},
	formComponents: {
		SubmitButton,
	},
	fieldContext,
	formContext,
});

export type InputOmit = "value" | "defaultValue" | "onChange";
