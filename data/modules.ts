export type ModuleKey =
  | "hr"
  | "payroll"
  | "crm"
  | "sales"
  | "inventory"
  | "accounting"
  | "procurement"
  | "approvals"
  | "reports";

export interface BusinessModule {
  key: ModuleKey;
  code: string;
  name: string;
  description: string;
  features: string[];
  /** Whether this module is switched on by default in the hero switchboard illustration */
  defaultOn: boolean;
  /** Included in the MVP launch scope */
  inMvp: boolean;
}

export const modules: BusinessModule[] = [
  {
    key: "hr",
    code: "M1",
    name: "HR",
    description: "Employee records, attendance, leave and reviews in one place.",
    features: [
      "Employee records",
      "Attendance",
      "Leave management",
      "Performance reviews",
      "Recruitment tracking",
    ],
    defaultOn: true,
    inMvp: true,
  },
  {
    key: "payroll",
    code: "M2",
    name: "Payroll",
    description: "Run payroll and stay compliant without a spreadsheet.",
    features: [
      "Salary processing",
      "PAYE calculations",
      "Pension deductions",
      "Payslips",
      "Bank transfers",
    ],
    defaultOn: true,
    inMvp: true,
  },
  {
    key: "crm",
    code: "M3",
    name: "CRM",
    description: "Track every lead and customer so no follow-up gets missed.",
    features: [
      "Customer database",
      "Sales pipeline",
      "Lead tracking",
      "Follow-ups",
      "Customer support",
    ],
    defaultOn: true,
    inMvp: true,
  },
  {
    key: "sales",
    code: "M4",
    name: "Sales",
    description: "Quote, invoice and get paid — with reminders built in.",
    features: ["Quotations", "Invoices", "Receipts", "Payment reminders"],
    defaultOn: true,
    inMvp: true,
  },
  {
    key: "inventory",
    code: "M5",
    name: "Inventory",
    description: "Know what's in stock, where, and when it's running low.",
    features: [
      "Products",
      "Warehouses",
      "Barcode support",
      "Stock movements",
      "Low-stock alerts",
    ],
    defaultOn: true,
    inMvp: true,
  },
  {
    key: "accounting",
    code: "M6",
    name: "Accounting",
    description: "Real financial visibility, not a guess at month end.",
    features: ["Income", "Expenses", "Cash flow", "Profit & Loss", "Balance Sheet"],
    defaultOn: false,
    inMvp: false,
  },
  {
    key: "procurement",
    code: "M7",
    name: "Procurement",
    description: "Control what gets bought, from request to delivery.",
    features: [
      "Purchase requests",
      "Vendor management",
      "Purchase orders",
      "Goods received",
    ],
    defaultOn: false,
    inMvp: false,
  },
  {
    key: "approvals",
    code: "M8",
    name: "Approval Workflow",
    description: "Every expense, purchase and leave request routed and logged.",
    features: ["Expense approvals", "Purchase approvals", "Leave approvals"],
    defaultOn: false,
    inMvp: false,
  },
  {
    key: "reports",
    code: "M9",
    name: "Reports",
    description: "One dashboard for the numbers that run the business.",
    features: [
      "Real-time dashboard",
      "Revenue",
      "Profit",
      "Inventory",
      "Cash flow",
      "Sales",
      "Expenses",
      "Payroll",
    ],
    defaultOn: true,
    inMvp: true,
  },
];

export const mvpModules = modules.filter((m) => m.inMvp);
