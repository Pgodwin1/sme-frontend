"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Field, Input } from "@/components/ui/Form";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/config/routes";
import { useForgotPassword } from "./api";
import { useToast } from "@/components/ui/Toast";

const forgotPasswordSchema = z.object({
	email: z.string().min(1, "Email is required").email("Enter a valid email address"),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export const ForgotPassword = () => {
	const router = useRouter();
	const { showToast } = useToast();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ForgotPasswordFormValues>({
		resolver: zodResolver(forgotPasswordSchema),
		defaultValues: { email: "" },
	});

	const {
		mutate: forgotPasswordMutate,
		isPending,
		error,
	} = useForgotPassword({
		onSuccess: (_data, variables) => {
			showToast("If an account exists for that email, a reset code has been sent.", "success");
			router.push(`${ROUTES.RESET_PASSWORD}?email=${encodeURIComponent(variables.email)}`);
		},
		onError: (forgotPasswordError) => {
			showToast(forgotPasswordError.message);
		},
	});

	const onSubmit = (values: ForgotPasswordFormValues) => {
		forgotPasswordMutate(values);
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

					<h1 className="font-display text-xl font-semibold text-paper">Forgot your password?</h1>
					<p className="mt-1 font-body text-sm text-ink-300">
						Enter your email and we&apos;ll send you a code to reset your password.
					</p>

					<form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-6 flex flex-col gap-4">
						<Field label="Email" htmlFor="email" error={errors.email?.message}>
							<Input
								id="email"
								type="email"
								placeholder="you@business.com"
								{...register("email")}
							/>
						</Field>

						{error && (
							<p className="rounded-md border border-amber/40 bg-amber/10 px-3 py-2 font-body text-xs text-amber-light">
								{error.message}
							</p>
						)}

						<Button type="submit" disabled={isPending} className="mt-2 w-full">
							{isPending ? "Sending code..." : "Send reset code"}
						</Button>
					</form>

					<p className="mt-6 text-center font-body text-xs text-ink-400">
						Remember your password?{" "}
						<a href={ROUTES.LOGIN} className="text-amber-light hover:underline">Log in</a>
					</p>
				</div>
			</div>
		</div>
	);
};