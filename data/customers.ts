export interface CustomerSegment {
  name: string;
}

export const customerSegments: CustomerSegment[] = [
  { name: "Retail businesses" },
  { name: "Pharmacies" },
  { name: "Hotels" },
  { name: "Schools" },
  { name: "Restaurants" },
  { name: "Construction companies" },
  { name: "Manufacturing" },
  { name: "Agencies" },
  { name: "Clinics" },
  { name: "Wholesalers" },
];

export interface ProblemTool {
  old: string;
  consequence: string;
}

export const problemTools: ProblemTool[] = [
  { old: "Excel", consequence: "Poor financial visibility" },
  { old: "WhatsApp", consequence: "Lost customers" },
  { old: "Paper files", consequence: "Delayed approvals" },
  { old: "Manual payroll", consequence: "Employee fraud" },
  { old: "Manual inventory", consequence: "Inventory losses" },
  { old: "Cash records", consequence: "Poor decision-making" },
];

export interface AcquisitionPhase {
  phase: string;
  title: string;
  items: string[];
}

export const acquisitionPhases: AcquisitionPhase[] = [
  {
    phase: "Phase 1",
    title: "Direct sales",
    items: ["Walk into businesses", "Offer free setup"],
  },
  {
    phase: "Phase 2",
    title: "Paid acquisition",
    items: ["Facebook Ads", "Google Ads", "LinkedIn", "Cold email", "Cold calling"],
  },
  {
    phase: "Phase 3",
    title: "Referral & partnerships",
    items: [
      "Referral program — existing customers earn free months",
      "Accountants",
      "HR consultants",
      "Business coaches",
      "Banks",
      "Coworking spaces",
    ],
  },
];

export const retentionLevers: string[] = [
  "Customer success manager",
  "Monthly business reports",
  "Training videos",
  "WhatsApp support",
  "Free onboarding",
  "Quarterly feature releases",
  "Payments integration",
  "Accounting exports",
  "SMS",
  "Email",
];
