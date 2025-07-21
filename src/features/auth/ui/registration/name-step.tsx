import { useRegistrationStepsContext } from "@/features/auth/lib/registration-steps-context";
import RegistrationControls from "@/features/auth/ui/registration/registration-controls";
import { useAppForm } from "@/shared/form";
import UserSchema from "@/shared/model/user";
import { Label } from "@/shared/ui/label";

const NameSchema = UserSchema.pick({ name: true });

const NameStep = () => {
	const { values, setValues, stepForward } = useRegistrationStepsContext();

	const form = useAppForm({
		defaultValues: {
			name: values.name,
		},
		validators: {
			onChange: NameSchema,
		},
		listeners: {
			onChange: ({ formApi }) => {
				const result = NameSchema.safeParse(formApi.state.values);
				if (result.success) {
					setValues((s) => ({ ...s, name: result.data.name }));
				}
			},
		},
		onSubmit: ({ value }) => {
			setValues((state) => ({ ...state, name: value.name }));
			stepForward();
		},
	});

	return (
		<>
			<RegistrationControls />
			<form
				className={"flex flex-1 flex-col gap-2 p-8 pt-0"}
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					form.handleSubmit();
				}}
			>
				<Label
					htmlFor={"name"}
					className={"text-[1.7rem] leading-9 font-bold mb-1"}
				>
					My first name is
				</Label>
				<form.AppField
					name={"name"}
					children={(field) => (
						<field.TextField
							displayLabel={false}
							description={
								"This is how it will appear in Tinder."
							}
							autoComplete={"name"}
						/>
					)}
				/>
				<form.AppForm>
					<form.SubmitButton
						editRequired
						className={"w-full mt-auto"}
					>
						Continue
					</form.SubmitButton>
				</form.AppForm>
			</form>
		</>
	);
};

export default NameStep;
