"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { Container } from "@/components/ui/Container";
import { Field, Input } from "@/components/ui/Form";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/config/routes";

export const ForgotPassword = () => {
	const { login } = useAuth();
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const result = login(email, password);
		if (!result.ok) {
			setError(result.error ?? "Something went wrong.");
			return;
		}
		router.push(ROUTES.RESET_PASSWORD);
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

					<h1 className="font-display text-xl font-semibold text-paper">Forgot your password?</h1>
					<p className="mt-1 font-body text-sm text-ink-300">Enter your email and we'll send you a code to reset your password.</p>

					<form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
						<Field label="Email" htmlFor="email">
							<Input
								id="email"
								type="email"
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="you@business.com"
							/>
						</Field>

						{error && (
							<p className="rounded-md border border-amber/40 bg-amber/10 px-3 py-2 font-body text-xs text-amber-light">
								{error}
							</p>
						)}

						<Button type="submit" className="mt-2 w-full">Continue</Button>
					</form>

					<p className="mt-6 text-center font-body text-xs text-ink-400">
						Remember your password?{" "}
						<a href={ROUTES.LOGIN} className="text-amber-light hover:underline">Log in</a>
					</p>
				</div>
			</div>
		</div>
	);
}
