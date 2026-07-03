export type EmployeeStatus = "Active" | "On leave" | "Suspended";

export interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  status: EmployeeStatus;
  monthlySalary: number;
  dateJoined: string;
}

export const initialEmployees: Employee[] = [
  { id: "EMP-001", name: "Amaka Okafor", role: "Store Manager", department: "Retail", email: "amaka@business.demo", status: "Active", monthlySalary: 250000, dateJoined: "2023-02-14" },
  { id: "EMP-002", name: "Tunde Bakare", role: "Sales Associate", department: "Sales", email: "tunde@business.demo", status: "Active", monthlySalary: 130000, dateJoined: "2023-06-01" },
  { id: "EMP-003", name: "Ifeoma Chukwu", role: "Accountant", department: "Finance", email: "ifeoma@business.demo", status: "Active", monthlySalary: 220000, dateJoined: "2022-11-20" },
  { id: "EMP-004", name: "Segun Adeyemi", role: "Warehouse Assistant", department: "Inventory", email: "segun@business.demo", status: "On leave", monthlySalary: 110000, dateJoined: "2024-01-08" },
  { id: "EMP-005", name: "Chiamaka Eze", role: "HR Officer", department: "HR", email: "chiamaka@business.demo", status: "Active", monthlySalary: 180000, dateJoined: "2023-09-12" },
  { id: "EMP-006", name: "Bola Fashina", role: "Delivery Rider", department: "Operations", email: "bola@business.demo", status: "Active", monthlySalary: 95000, dateJoined: "2024-03-19" },
  { id: "EMP-007", name: "Emeka Nnadi", role: "Cashier", department: "Retail", email: "emeka@business.demo", status: "Suspended", monthlySalary: 100000, dateJoined: "2023-04-25" },
];

export const departments = Array.from(new Set(initialEmployees.map((e) => e.department)));
