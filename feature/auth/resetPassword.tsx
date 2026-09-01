"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Field, Input } from "@/components/ui/Form";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/config/routes";
import { useVerifyOtp, useResetPassword } from "./api";
import { Eye, EyeOff } from "lucide-react";

type Step = "code" | "password";

export const ResetPassword = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const email = searchParams.get("email") ?? "";

	const [step, setStep] = useState<Step>("code");
	const [code, setCode] = useState("");
	const [resetToken, setResetToken] = useState<string | null>(null);
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [formError, setFormError] = useState<string | null>(null);

	const {
		mutate: verifyOtpMutate,
		isPending: isVerifying,
		error: verifyError,
	} = useVerifyOtp({
		onSuccess: (data) => {
			setResetToken(data.resetToken);
			setStep("password");
		},
	});

	const {
		mutate: resetPasswordMutate,
		isPending: isResetting,
		error: resetError,
	} = useResetPassword({
		onSuccess: () => {
			router.push(ROUTES.LOGIN);
		},
	});

	function handleCodeSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setFormError(null);

		if (!email) {
			setFormError("Missing email. Please restart the reset process.");
			return;
		}
		if (code.trim().length < 4) {
			setFormError("Enter the code we sent to your email.");
			return;
		}

		verifyOtpMutate({ email, otp: code.trim() });
	}

	function handlePasswordSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setFormError(null);

		if (!resetToken) {
			setFormError("Your session expired. Please verify the code again.");
			setStep("code");
			return;
		}
		if (password.length < 8) {
			setFormError("Password must be at least 8 characters.");
			return;
		}
		if (password !== confirmPassword) {
			setFormError("Passwords do not match.");
			return;
		}

		resetPasswordMutate({ resetToken, newPassword: password });
	}

	const displayedError =
		formError ?? (step === "code" ? verifyError?.message : resetError?.message) ?? null;

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

								{displayedError && (
									<p className="rounded-md border border-amber/40 bg-amber/10 px-3 py-2 font-body text-xs text-amber-light">
										{displayedError}
									</p>
								)}

								<Button type="submit" className="mt-2 w-full" disabled={isVerifying}>
									{isVerifying ? "Verifying…" : "Verify code"}
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
											className="pr-10"
										/>
										<button
											type="button"
											onClick={() => setShowConfirmPassword((v) => !v)}
											className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-200"
											aria-label={showConfirmPassword ? "Hide password" : "Show password"}
											tabIndex={-1}
										>
											{showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
										</button>
									</div>
								</Field>

								{displayedError && (
									<p className="rounded-md border border-amber/40 bg-amber/10 px-3 py-2 font-body text-xs text-amber-light">
										{displayedError}
									</p>
								)}

								<Button type="submit" className="mt-2 w-full" disabled={isResetting}>
									{isResetting ? "Saving…" : "Reset password"}
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
};