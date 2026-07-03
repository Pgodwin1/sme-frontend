export interface PricingPlan {
  id: string;
  name: string;
  price: number | "custom";
  cadence: "month" | "custom";
  bestFor: string;
  highlighted?: boolean;
  includes: string[];
}

export const pricingPlans: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    price: 15000,
    cadence: "month",
    bestFor: "Micro businesses getting started",
    includes: ["Up to 2 modules", "Up to 10 staff accounts", "WhatsApp support"],
  },
  {
    id: "growth",
    name: "Growth",
    price: 35000,
    cadence: "month",
    bestFor: "Growing SMEs running multiple modules",
    highlighted: true,
    includes: [
      "Up to 5 modules",
      "Up to 50 staff accounts",
      "Priority WhatsApp support",
      "Monthly business reports",
    ],
  },
  {
    id: "business",
    name: "Business",
    price: 80000,
    cadence: "month",
    bestFor: "Established SMEs on the full module suite",
    includes: [
      "All 9 modules",
      "Unlimited staff accounts",
      "Dedicated customer success manager",
      "Accounting exports",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "custom",
    cadence: "custom",
    bestFor: "Large operations with custom needs",
    includes: [
      "Custom module configuration",
      "Multi-branch support",
      "Custom integrations",
      "SLA-backed support",
    ],
  },
];

export function formatNaira(value: number): string {
  return `\u20A6${value.toLocaleString("en-NG")}`;
}
