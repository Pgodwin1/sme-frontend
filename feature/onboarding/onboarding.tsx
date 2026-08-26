"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Field, Input, Select } from "@/components/ui/Form";
import { ModuleSwitch } from "@/components/ui/ModuleSwitch";
import { Container } from "@/components/ui/Container";
import { modules as allModules, mvpModules, type ModuleKey } from "@/data/modules";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/config/routes";
import { useAuthStore } from "@/store/useAuthStore";
import { useRegister, toAuthUser } from "@/feature/auth/api";

const industries = [
	"Retail", "Pharmacy", "Hospitality", "Education", "Construction",
	"Manufacturing", "Healthcare", "Wholesale / Distribution", "Other",
];

const sizes = ["1–5 employees", "6–20 employees", "21–50 employees", "50+ employees"];

const steps = ["Business", "Account", "Modules", "Review"] as const;

export default function OnboardingPage() {
	const router = useRouter();
	const setAuth = useAuthStore((s) => s.setAuth);
	const [step, setStep] = useState(0);
	const [error, setError] = useState<string | null>(null);

	const [businessName, setBusinessName] = useState("");
	const [industry, setIndustry] = useState<string>(industries[0] ?? "");
	const [size, setSize] = useState<string>(sizes[0] ?? "");

	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [selectedModules, setSelectedModules] = useState<ModuleKey[]>(
		mvpModules.map((m) => m.key)
	);

	function toggleModule(key: ModuleKey) {
		setSelectedModules((prev) =>
			prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
		);
	}

	function next() {
		setError(null);
		if (step === 0 && !businessName.trim()) {
			setError("Business name is required.");
			return;
		}
		if (step === 1 && (!fullName.trim() || !email.trim() || password.length < 6)) {
			setError("Fill in your name, email, and a password of at least 6 characters.");
			return;
		}
		if (step === 2 && selectedModules.length === 0) {
			setError("Switch on at least one module to continue.");
			return;
		}
		setStep((s) => Math.min(s + 1, steps.length - 1));
	}

	function back() {
		setError(null);
		setStep((s) => Math.max(s - 1, 0));
	}

	const {
		mutate: registerMutate,
		isPending,
	} = useRegister({
		onSuccess: (data) => {
			setAuth({
				token: data.token,
				refreshToken: null,
				user: toAuthUser(data),
				entityId: null,
			});
			router.push(ROUTES.DASHBOARD);
		},
		onError: (registerError) => {
			setError(registerError.message);
		},
	});

	function finish() {
		setError(null);
		registerMutate({
			businessName,
			industry,
			size,
			fullName,
			email,
			password,
			modules: selectedModules,
		});
	}

	return (
		<div className="min-h-screen bg-ink-900">
			<Container className="flex min-h-screen flex-col justify-center py-16">
				<div className="mx-auto w-full max-w-xl">
					{/* Step indicator */}
					<div className="mb-8 flex items-center gap-2">
						{steps.map((label, i) => (
							<div key={label} className="flex flex-1 items-center gap-2">
								<div
									className={cn(
										"flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-mono text-[11px]",
										i <= step ? "bg-amber text-ink-900" : "bg-ink-700 text-ink-400"
									)}
								>
									{i + 1}
								</div>
								<span
									className={cn(
										"hidden font-mono text-[11px] uppercase tracking-wider sm:block",
										i <= step ? "text-paper" : "text-ink-500"
									)}
								>
									{label}
								</span>
								{i < steps.length - 1 && <div className="h-px flex-1 bg-ink-700" />}
							</div>
						))}
					</div>

					<div className="rounded-xl2 border border-ink-600/70 bg-ink-800/80 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)] sm:p-8">
						{step === 0 && (
							<div className="flex flex-col gap-5">
								<div>
									<h1 className="font-display text-xl font-semibold text-paper">Tell us about your business</h1>
									<p className="mt-1 font-body text-sm text-ink-300">This sets up your workspace.</p>
								</div>
								<Field label="Business name" htmlFor="businessName">
									<Input id="businessName" value={businessName} onChange={(e) => setBusinessName(e.target.value)} placeholder="e.g. Adebayo Foods Ltd" />
								</Field>
								<Field label="Industry" htmlFor="industry">
									<Select id="industry" value={industry} onChange={(e) => setIndustry(e.target.value)}>
										{industries.map((i) => <option key={i} value={i}>{i}</option>)}
									</Select>
								</Field>
								<Field label="Business size" htmlFor="size">
									<Select id="size" value={size} onChange={(e) => setSize(e.target.value)}>
										{sizes.map((s) => <option key={s} value={s}>{s}</option>)}
									</Select>
								</Field>
							</div>
						)}

						{step === 1 && (
							<div className="flex flex-col gap-5">
								<div>
									<h1 className="font-display text-xl font-semibold text-paper">Create your account</h1>
									<p className="mt-1 font-body text-sm text-ink-300">You&rsquo;ll use this to log in.</p>
								</div>
								<Field label="Full name" htmlFor="fullName">
									<Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="e.g. Grace Adebayo" />
								</Field>
								<Field label="Email" htmlFor="email">
									<Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@business.com" />
								</Field>
								<Field label="Password" htmlFor="password">
									<Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 6 characters" />
								</Field>
							</div>
						)}

						{step === 2 && (
							<div>
								<h1 className="font-display text-xl font-semibold text-paper">Switch on your modules</h1>
								<p className="mt-1 font-body text-sm text-ink-300">
									Start with what you need. Add more any time from settings.
								</p>
								<div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
									{allModules.map((m) => (
										<ModuleSwitch
											key={m.key}
											code={m.code}
											name={m.name}
											on={selectedModules.includes(m.key)}
											onToggle={() => toggleModule(m.key)}
										/>
									))}
								</div>
							</div>
						)}

						{step === 3 && (
							<div>
								<h1 className="font-display text-xl font-semibold text-paper">Review &amp; confirm</h1>
								<p className="mt-1 font-body text-sm text-ink-300">Everything look right?</p>

								<dl className="mt-6 space-y-3 font-body text-sm">
									<div className="flex justify-between border-b border-ink-700 pb-3">
										<dt className="text-ink-400">Business</dt>
										<dd className="text-paper">{businessName || "—"} &middot; {industry} &middot; {size}</dd>
									</div>
									<div className="flex justify-between border-b border-ink-700 pb-3">
										<dt className="text-ink-400">Account</dt>
										<dd className="text-paper">{fullName || "—"} &middot; {email || "—"}</dd>
									</div>
									<div className="flex justify-between pb-1">
										<dt className="text-ink-400">Modules</dt>
										<dd className="max-w-xs text-right text-paper">
											{allModules
												.filter((m) => selectedModules.includes(m.key))
												.map((m) => m.name)
												.join(", ")}
										</dd>
									</div>
								</dl>
							</div>
						)}

						{error && (
							<p className="mt-5 rounded-md border border-amber/40 bg-amber/10 px-3 py-2 font-body text-xs text-amber-light">
								{error}
							</p>
						)}

						<div className="mt-8 flex items-center justify-between">
							<Button
								type="button"
								variant="ghost"
								onClick={back}
								disabled={step === 0}
								className="border-ink-600 text-ink-200 disabled:opacity-30"
							>
								Back
							</Button>
							{step < steps.length - 1 ? (
								<Button type="button" onClick={next}>Continue</Button>
							) : (
								<Button type="button" onClick={finish} disabled={isPending}>
									{isPending ? "Setting up..." : "Finish setup"}
								</Button>
							)}
						</div>
					</div>

					<p className="mt-6 text-center font-body text-xs text-ink-400">
						Already have an account?{" "}
						<a href="/auth/login" className="text-amber-light hover:underline">Log in</a>
					</p>
				</div>
			</Container>
		</div>
	);
}
