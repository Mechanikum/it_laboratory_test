import type * as React from "react";
import { type InputOmit, useFieldContext } from "@/shared/form";
import FieldErrors from "@/shared/form/ui/field-errors";
import { cn } from "@/shared/lib/utils";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";

type TextFieldProps = Omit<
	React.ComponentPropsWithRef<typeof Input>,
	InputOmit
> & {
	inputClassName?: string;
	displayLabel?: boolean;
	description?: string;
};

const TextField: React.FC<TextFieldProps> = ({
	className,
	name,
	inputClassName,
	onBlur,
	displayLabel = true,
	description,
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
				onChange={(e) => field.handleChange(e.target.value)}
				onBlur={(e) => {
					field.handleBlur();
					onBlur?.(e);
				}}
			/>
			{description && (
				<p
					className={
						"text-sm pl-[1ch] font-medium text-muted-foreground"
					}
				>
					{description}
				</p>
			)}
			<FieldErrors meta={field.state.meta} />
		</div>
	);
};

export default TextField;
