"use client";

import { useRouter } from "next/navigation";
import { useForm, type SubmitErrorHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Field, Input } from "@/components/ui/Form";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/config/routes";
import { useAuthStore } from "@/store/useAuthStore";
import { useLogin, toAuthUser } from "./api";
import { useToast } from "@/components/ui/Toast";

const loginSchema = z.object({
	email: z.string().min(1, "Email is required").email("Enter a valid email address"),
	password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginPage = () => {
	const router = useRouter();
	const setAuth = useAuthStore((s) => s.setAuth);
	const { showToast } = useToast();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: { email: "", password: "" },
	});

	const {
		mutate: loginMutate,
		isPending,
		error,
	} = useLogin({
		onSuccess: (data) => {
			setAuth({
				token: data.token,
				refreshToken: null,
				user: toAuthUser(data),
			});
			router.push(ROUTES.DASHBOARD);
		},
		onError: (loginError) => {
			showToast(loginError.message);
		},
	});

	const onSubmit = (values: LoginFormValues) => {
		loginMutate(values);
	};

	const onInvalid: SubmitErrorHandler<LoginFormValues> = (formErrors) => {
		if (process.env.NODE_ENV === "development") {
			console.warn("[Auth] Login request was not sent: client validation failed.", {
				email: formErrors.email?.message,
				password: formErrors.password?.message,
			});
		}
	};

	return (
		<div className="flex min-h-screen items-center bg-ink-900">
			<div className="flex justify-center mx-auto w-full max-w-xl lg:px-8">
				<div className="w-full max-w-sm p-4 rounded-xl2 border border-ink-600/70 bg-ink-800/80 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
					<div className="mb-6 flex items-center gap-2">
						<span className="flex h-7 w-7 items-center justify-center rounded bg-amber font-mono text-xs font-bold text-ink-900">
							OS
						</span>
						<span className="font-display text-base font-semibold text-paper">BusinessOS</span>
					</div>

					<h1 className="font-display text-xl font-semibold text-paper">Welcome back</h1>
					<p className="mt-1 font-body text-sm text-ink-300">Log in to your workspace.</p>

					<form onSubmit={handleSubmit(onSubmit, onInvalid)} noValidate className="mt-6 flex flex-col gap-4">
						<Field label="Email" htmlFor="email" error={errors.email?.message}>
							<Input
								id="email"
								type="email"
								placeholder="you@business.com"
								{...register("email")}
							/>
						</Field>

						<Field label="Password" htmlFor="password" error={errors.password?.message}>
							<Input
								id="password"
								type="password"
								placeholder="Your password"
								{...register("password")}
							/>
						</Field>

						{error && (
							<p className="rounded-md border border-amber/40 bg-amber/10 px-3 py-2 font-body text-xs text-amber-light">
								{error.message}
							</p>
						)}

						<Button type="submit" disabled={isPending} className="mt-2 w-full">
							{isPending ? "Logging in..." : "Log in"}
						</Button>
					</form>
					<p className="mt-6 text-right font-body text-xs text-ink-400">
						<a href={ROUTES.FORGOT_PASSWORD} className="text-amber-light hover:underline">
							Forgot Password?
						</a>
					</p>

					<p className="mt-6 text-center font-body text-xs text-ink-400">
						No account yet?{" "}
						<a href={ROUTES.ONBOARDING} className="text-amber-light hover:underline">
							Set up your business
						</a>
					</p>
				</div>
			</div>
		</div>
	);
};
