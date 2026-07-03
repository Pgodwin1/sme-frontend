export type InvoiceStatus = "Draft" | "Sent" | "Paid" | "Overdue";

export interface Invoice {
  id: string;
  customer: string;
  amount: number;
  status: InvoiceStatus;
  issueDate: string;
  dueDate: string;
}

export const initialInvoices: Invoice[] = [
  { id: "INV-1042", customer: "Adebayo Foods Ltd", amount: 850000, status: "Paid", issueDate: "2026-06-02", dueDate: "2026-06-16" },
  { id: "INV-1043", customer: "Uche Textiles", amount: 1500000, status: "Paid", issueDate: "2026-06-05", dueDate: "2026-06-19" },
  { id: "INV-1044", customer: "Nwosu Autos", amount: 400000, status: "Sent", issueDate: "2026-06-20", dueDate: "2026-07-04" },
  { id: "INV-1045", customer: "Bello Hotels", amount: 600000, status: "Overdue", issueDate: "2026-05-28", dueDate: "2026-06-11" },
  { id: "INV-1046", customer: "Danladi Pharmacy", amount: 320000, status: "Draft", issueDate: "2026-07-01", dueDate: "2026-07-15" },
  { id: "INV-1047", customer: "Obi Construction", amount: 2100000, status: "Sent", issueDate: "2026-06-27", dueDate: "2026-07-11" },
];

export interface MonthlyRevenue {
  month: string;
  revenue: number;
  expenses: number;
}

export const revenueTrend: MonthlyRevenue[] = [
  { month: "Jan", revenue: 3200000, expenses: 2100000 },
  { month: "Feb", revenue: 3600000, expenses: 2300000 },
  { month: "Mar", revenue: 3100000, expenses: 2050000 },
  { month: "Apr", revenue: 4200000, expenses: 2600000 },
  { month: "May", revenue: 4700000, expenses: 2750000 },
  { month: "Jun", revenue: 5300000, expenses: 3100000 },
];

export interface CategorySales {
  category: string;
  amount: number;
}

export const salesByCategory: CategorySales[] = [
  { category: "Retail", amount: 1800000 },
  { category: "Wholesale", amount: 2600000 },
  { category: "Services", amount: 1200000 },
  { category: "Construction", amount: 4200000 },
];
