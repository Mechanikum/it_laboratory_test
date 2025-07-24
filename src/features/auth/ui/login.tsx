import { Link } from "@tanstack/react-router";
import { useLogin } from "@/features/auth/api/use-login";
import LoginSchema from "@/features/auth/model/login-data";
import { useAppForm } from "@/shared/form";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";

const Login = () => {
	const login = useLogin();

	const form = useAppForm({
		defaultValues: {
			email: "",
			password: "",
		},
		validators: {
			onChange: LoginSchema,
		},
		onSubmit: async ({ value }) => login.mutate(value),
	});

	return (
		<div className={"my-auto pb-16 px-8"}>
			<form
				className={"flex flex-col gap-6"}
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					form.handleSubmit();
				}}
			>
				<div className="flex flex-col items-center gap-2 text-center">
					<h1 className="text-2xl font-bold">
						Login to your account
					</h1>
					<p className="text-muted-foreground text-sm text-balance">
						Enter your email below to login to your account
					</p>
				</div>
				<div className="grid gap-6">
					<div className="grid gap-3">
						<form.AppField
							name="email"
							children={(field) => (
								<field.TextField
									type={"email"}
									placeholder="m@example.com"
								/>
							)}
						/>
					</div>
					<div className="grid gap-3">
						<Label htmlFor="password">Password</Label>
						<Input id="password" type="password" required />
					</div>
					<form.AppForm>
						<form.SubmitButton className={"w-full"}>
							Login
						</form.SubmitButton>
					</form.AppForm>
				</div>
				<div className="text-center text-sm">
					Don't have an account?{" "}
					<Link
						to="/registration"
						className="underline underline-offset-4"
					>
						Sign up
					</Link>
				</div>
			</form>
		</div>
	);
};

export default Login;
