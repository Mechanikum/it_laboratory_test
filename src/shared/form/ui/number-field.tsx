import type * as React from "react";
import { type InputOmit, useFieldContext } from "@/shared/form";
import FieldErrors from "@/shared/form/ui/field-errors";
import { sanitizeStringToFloat } from "@/shared/lib/sanitizers";
import { cn } from "@/shared/lib/utils";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";

type NumberFieldProps = Omit<
	React.ComponentPropsWithRef<typeof Input>,
	InputOmit
> & {
	inputClassName?: string;
	decimals?: number;
	displayLabel?: boolean;
	description?: string;
};

const NumberField: React.FC<NumberFieldProps> = ({
	className,
	name,
	inputClassName,
	decimals = 0,
	displayLabel = true,
	description,
	onBlur,
	...props
}) => {
	const field = useFieldContext<string>();

	return (
		<div className={cn("space-y-3", className)}>
			{displayLabel && (
				<Label htmlFor={field.name} className={"capitalize"}>
					{field.name}
				</Label>
			)}
			<Input
				{...props}
				id={field.name}
				className={inputClassName}
				defaultValue={field.state.value}
				onChange={(e) =>
					field.handleChange(
						sanitizeStringToFloat(e.target.value, decimals),
					)
				}
				onBlur={(e) => {
					field.handleBlur();
					onBlur?.(e);
				}}
			/>
			{description && (
				<p className={"text-sm font-medium text-destructive"}>
					{description}
				</p>
			)}
			<FieldErrors meta={field.state.meta} />
		</div>
	);
};

export default NumberField;
