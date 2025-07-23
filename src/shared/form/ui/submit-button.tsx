import { useStore } from "@tanstack/react-form";
import type { ComponentProps } from "react";
import { useFormContext } from "@/shared/form";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";

type SubmitButtonProps = ComponentProps<typeof Button> & {
	editRequired?: boolean;
};

const SubmitButton: React.FC<SubmitButtonProps> = ({
	children,
	editRequired,
	className,
	...props
}) => {
	const form = useFormContext();

	const [isSubmitting, canSubmit, isDirty] = useStore(form.store, (state) => [
		state.isSubmitting,
		state.canSubmit,
		state.isDirty,
	]);

	return (
		<Button
			{...props}
			className={cn(className)}
			type="submit"
			variant={"default"}
			disabled={
				isSubmitting ||
				props.disabled ||
				!canSubmit ||
				(editRequired ? !isDirty : false)
			}
		>
			{children}
		</Button>
	);
};

export default SubmitButton;
