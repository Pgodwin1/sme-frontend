"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/app/PageHeader";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Field, Input, Select } from "@/components/ui/Form";
import { StatCard } from "@/components/ui/StatCard";
import {
  initialEmployees,
  departments as allDepartments,
  type Employee,
  type EmployeeStatus,
} from "@/data/employees";
import { formatNaira } from "@/data/pricing";

const statusTone: Record<EmployeeStatus, "success" | "warning" | "danger"> = {
  Active: "success",
  "On leave": "warning",
  Suspended: "danger",
};

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [department, setDepartment] = useState<string>("All");
  const [status, setStatus] = useState<string>("All");
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = useMemo(
	() =>
	  employees.filter(
		(e) =>
		  (department === "All" || e.department === department) &&
		  (status === "All" || e.status === status)
	  ),
	[employees, department, status]
  );

  function handleAdd(e: React.FormEvent<HTMLFormElement>) {
	e.preventDefault();
	const form = new FormData(e.currentTarget);
	const newEmployee: Employee = {
	  id: `EMP-${String(employees.length + 1).padStart(3, "0")}`,
	  name: String(form.get("name")),
	  role: String(form.get("role")),
	  department: String(form.get("department")),
	  email: String(form.get("email")),
	  status: "Active",
	  monthlySalary: Number(form.get("salary")),
	  dateJoined: new Date().toISOString().slice(0, 10),
	};
	setEmployees((prev) => [newEmployee, ...prev]);
	setModalOpen(false);
	e.currentTarget.reset();
  }

  const columns: Column<Employee>[] = [
	{ header: "Employee", accessor: (r) => (
	  <div>
		<p className="font-medium text-ink">{r.name}</p>
		<p className="font-mono text-[11px] text-ink-400">{r.email}</p>
	  </div>
	) },
	{ header: "Role", accessor: (r) => r.role },
	{ header: "Department", accessor: (r) => r.department },
	{ header: "Monthly salary", accessor: (r) => formatNaira(r.monthlySalary), align: "right" },
	{ header: "Status", accessor: (r) => <Badge tone={statusTone[r.status]}>{r.status}</Badge> },
	{ header: "Joined", accessor: (r) => r.dateJoined },
  ];

  return (
	<div>
	  <PageHeader
		title="Employee Management"
		description="Every employee, their role, and their status — kept in one place instead of a notebook."
		action={<Button onClick={() => setModalOpen(true)}>Add employee</Button>}
	  />

	  <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
		<StatCard label="Total employees" value={String(employees.length)} />
		<StatCard label="Active" value={String(employees.filter((e) => e.status === "Active").length)} />
		<StatCard label="On leave" value={String(employees.filter((e) => e.status === "On leave").length)} />
	  </div>

	  <div className="mb-5 flex flex-wrap gap-3">
		<Select value={department} onChange={(e) => setDepartment(e.target.value)} className="w-auto">
		  <option value="All">All departments</option>
		  {allDepartments.map((d) => (
			<option key={d} value={d}>{d}</option>
		  ))}
		</Select>
		<Select value={status} onChange={(e) => setStatus(e.target.value)} className="w-auto">
		  <option value="All">All statuses</option>
		  <option value="Active">Active</option>
		  <option value="On leave">On leave</option>
		  <option value="Suspended">Suspended</option>
		</Select>
	  </div>

	  <DataTable columns={columns} rows={filtered} emptyLabel="No employees match these filters." />

	  <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add employee">
		<form onSubmit={handleAdd} className="flex flex-col gap-4">
		  <Field label="Full name" htmlFor="name">
			<Input id="name" name="name" required placeholder="e.g. Ngozi Umeh" />
		  </Field>
		  <Field label="Role" htmlFor="role">
			<Input id="role" name="role" required placeholder="e.g. Sales Associate" />
		  </Field>
		  <Field label="Department" htmlFor="department">
			<Input id="department" name="department" required placeholder="e.g. Sales" />
		  </Field>
		  <Field label="Email" htmlFor="email">
			<Input id="email" name="email" type="email" required placeholder="name@business.demo" />
		  </Field>
		  <Field label="Monthly salary (₦)" htmlFor="salary">
			<Input id="salary" name="salary" type="number" required min={0} placeholder="150000" />
		  </Field>
		  <Button type="submit" className="mt-2 w-full">Add employee</Button>
		</form>
	  </Modal>
	</div>
  );
}
