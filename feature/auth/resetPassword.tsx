"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { Container } from "@/components/ui/Container";
import { Field, Input } from "@/components/ui/Form";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/config/routes";
import { Eye, EyeOff } from "lucide-react";

type Step = "code" | "password";

export const ResetPassword = () => {
	// const { verifyResetCode, resetPassword } = useAuth();
	const router = useRouter();
	const searchParams = useSearchParams();
	const email = searchParams.get("email") ?? "";

	const [step, setStep] = useState<Step>("code");
	const [code, setCode] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	async function handleCodeSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setError(null);
		setIsSubmitting(true);
		try {
			// const result = await verifyResetCode(email, code);
			// if (!result.ok) {
			// 	setError(result.error ?? "Invalid or expired code.");
			// 	return;
			// }
			setStep("password");
		} finally {
			setIsSubmitting(false);
		}
	}

	async function handlePasswordSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setError(null);

		if (password.length < 8) {
			setError("Password must be at least 8 characters.");
			return;
		}
		if (password !== confirmPassword) {
			setError("Passwords do not match.");
			return;
		}

		setIsSubmitting(true);
		try {
			// const result = await resetPassword(email, code, password);
			// if (!result.ok) {
			// 	setError(result.error ?? "Something went wrong. Please try again.");
			// 	return;
			// }
			router.push(ROUTES.LOGIN);
		} finally {
			setIsSubmitting(false);
		}
	}

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

					{step === "code" ? (
						<>
							<h1 className="font-display text-xl font-semibold text-paper">Check your email</h1>
							<p className="mt-1 font-body text-sm text-ink-300">
								Enter the code we sent {email ? <span className="text-paper">{email}</span> : "to your email"}.
							</p>

							<form onSubmit={handleCodeSubmit} className="mt-6 flex flex-col gap-4">
								<Field label="Verification code" htmlFor="code">
									<Input
										id="code"
										type="text"
										inputMode="numeric"
										autoComplete="one-time-code"
										required
										value={code}
										onChange={(e) => setCode(e.target.value)}
										placeholder="Enter the 6-digit code"
									/>
								</Field>

								{error && (
									<p className="rounded-md border border-amber/40 bg-amber/10 px-3 py-2 font-body text-xs text-amber-light">
										{error}
									</p>
								)}

								<Button type="submit" className="mt-2 w-full" disabled={isSubmitting}>
									{isSubmitting ? "Verifying…" : "Verify code"}
								</Button>
							</form>
						</>
					) : (
						<>
							<h1 className="font-display text-xl font-semibold text-paper">Reset your password</h1>
							<p className="mt-1 font-body text-sm text-ink-300">
								Enter your new password and we&apos;ll update it for you.
							</p>

							<form onSubmit={handlePasswordSubmit} className="mt-6 flex flex-col gap-4">
								<Field label="New password" htmlFor="password">
									<div className="relative">
										<Input
											id="password"
											type={showPassword ? "text" : "password"}
											required
											value={password}
											onChange={(e) => setPassword(e.target.value)}
											placeholder="At least 8 characters"
											className="pr-10"
										/>
										<button
											type="button"
											onClick={() => setShowPassword((v) => !v)}
											className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-200"
											aria-label={showPassword ? "Hide password" : "Show password"}
											tabIndex={-1}
										>
											{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
										</button>

									</div>
								</Field>
								<Field label="Confirm password" htmlFor="confirmPassword">
									<div className="relative">
										<Input
											id="confirmPassword"
											type={showConfirmPassword ? "text" : "password"}
											required
											value={confirmPassword}
											onChange={(e) => setConfirmPassword(e.target.value)}
											placeholder="Confirm your password"
										/>
										<button
											type="button"
											onClick={() => setShowConfirmPassword((v) => !v)}
											className="absolute right-0 top-[3px] text-ink-400 hover:text-ink-200"
											aria-label={showConfirmPassword ? "Hide password" : "Show password"}
											tabIndex={-1}
										>
											{showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
										</button>
									</div>
								</Field>

								{error && (
									<p className="rounded-md border border-amber/40 bg-amber/10 px-3 py-2 font-body text-xs text-amber-light">
										{error}
									</p>
								)}

								<Button type="submit" className="mt-2 w-full" disabled={isSubmitting}>
									{isSubmitting ? "Saving…" : "Reset password"}
								</Button>
							</form>
						</>
					)}

					<p className="mt-6 text-center font-body text-xs text-ink-400">
						Remember your password?{" "}
						<a href={ROUTES.LOGIN} className="text-amber-light hover:underline">Log in</a>
					</p>
				</div>
			</div>
		</div>
	);
}