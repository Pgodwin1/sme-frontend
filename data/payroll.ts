import type { Employee } from "@/data/employees";

export interface PayrollLine {
  employeeId: string;
  name: string;
  department: string;
  gross: number;
  pension: number;
  paye: number;
  netPay: number;
}

/** Simplified Nigerian statutory deductions for demo purposes — not tax advice. */
export function calculatePayroll(employee: Pick<Employee, "id" | "name" | "department" | "monthlySalary">): PayrollLine {
  const gross = employee.monthlySalary;
  const pension = Math.round(gross * 0.08); // 8% employee pension contribution
  const taxable = gross - pension;

  // Simplified progressive PAYE bands (illustrative, not the exact FIRS table)
  let paye = 0;
  if (taxable > 350000) paye = Math.round(taxable * 0.19);
  else if (taxable > 150000) paye = Math.round(taxable * 0.14);
  else if (taxable > 50000) paye = Math.round(taxable * 0.09);
  else paye = Math.round(taxable * 0.05);

  const netPay = gross - pension - paye;

  return {
    employeeId: employee.id,
    name: employee.name,
    department: employee.department,
    gross,
    pension,
    paye,
    netPay,
  };
}

export function buildPayrollRun(employees: Employee[]): PayrollLine[] {
  return employees
    .filter((e) => e.status !== "Suspended")
    .map((e) => calculatePayroll(e));
}

export const currentPayPeriod = new Date().toLocaleString("en-NG", {
  month: "long",
  year: "numeric",
});
