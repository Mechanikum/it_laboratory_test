import type { AnyFieldMeta } from "@tanstack/react-form";
import type { ZodError } from "zod";

type FieldErrorsProps = {
	meta: AnyFieldMeta;
};

const FieldErrors: React.FC<FieldErrorsProps> = ({ meta }) => {
	if (!meta.isTouched) return null;
	return meta.errors.map(({ message }: ZodError) => {
		if (message)
			return (
				<p
					key={message}
					className={"pl-[1ch] text-sm font-medium text-destructive"}
				>
					{message}
				</p>
			);
	});
};

export default FieldErrors;
