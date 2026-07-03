# BusinessOS — User Stories

Format: `As a [role], I want to [action], so that [benefit].`
Each story lists the acceptance criteria used to build the corresponding screen.

---

## Epic 0 — Onboarding & Authentication

**US-01** As a business owner, I want to sign up with my business name, industry, and my own details, so that I get a workspace set up for my company.
- Given I'm on `/onboarding`, when I complete Step 1 (business name, industry, size) and Step 2 (my name, email, password), then my account is created.

**US-02** As a business owner, I want to choose which modules to switch on during signup, so that I only pay for and see what I actually need.
- Given I'm on the module-selection step, when I toggle modules on/off, then only the selected modules appear in my dashboard sidebar after signup.
- Employee Management, Payroll, CRM, Sales, Inventory and Dashboard are pre-selected as the recommended starting set.

**US-03** As a business owner, I want to review my choices before finishing setup, so that I can confirm everything is correct.
- Given I've completed the previous steps, when I reach the review step, then I see a summary of my business details and selected modules before confirming.

**US-04** As a returning user, I want to log in with my email and password, so that I can access my dashboard.
- Given I have an existing account, when I enter matching credentials on `/login`, then I'm redirected to `/dashboard`.
- Given I enter an email with no matching account, when I submit, then I see an error telling me to sign up instead.

**US-05** As a logged-in user, I want to be redirected to login if my session ends, so that my business data stays private.
- Given I'm not logged in, when I visit any `/dashboard/*` route, then I'm redirected to `/login`.

**US-06** As a logged-in user, I want to log out from anywhere in the dashboard, so that I can secure my account on a shared device.

---

## Epic 1 — Employee Management

**US-07** As an HR admin, I want to see a list of all employees with their role, department and status, so that I have one place to check headcount.

**US-08** As an HR admin, I want to add a new employee with their basic details and salary, so that they're ready to be included in the next payroll run.
- Given I open "Add employee," when I submit name, role, department and salary, then the employee appears in the list immediately.

**US-09** As an HR admin, I want to filter employees by department and status, so that I can find who I'm looking for quickly.

---

## Epic 2 — Payroll

**US-10** As a business owner, I want to see a payroll summary (gross, deductions, net) for the current run, so that I know exactly what payday will cost.

**US-11** As a business owner, I want to see each employee's PAYE, pension and net pay calculated automatically, so that I don't have to calculate statutory deductions by hand.

**US-12** As a business owner, I want to trigger a payroll run for the current month, so that payslips and a bank transfer file are ready to go.
- Given payroll hasn't run this month, when I click "Run payroll," then the run status changes to "Processed" and totals are locked in.

---

## Epic 3 — CRM

**US-13** As a sales rep, I want to see all leads and customers grouped by pipeline stage, so that I know what needs follow-up.

**US-14** As a sales rep, I want to add a new lead with contact details and a starting stage, so that it's tracked from first contact.

**US-15** As a sales rep, I want to move a lead to a different stage, so that the pipeline reflects reality.

---

## Epic 4 — Sales

**US-16** As a business owner, I want to see all quotations/invoices with their status (draft, sent, paid, overdue), so that I know what revenue is outstanding.

**US-17** As a sales rep, I want to create a new invoice for a customer, so that I can bill them for a job.

**US-18** As a business owner, I want a quick summary of revenue collected vs outstanding this month, so that I can gauge cash flow at a glance.

---

## Epic 5 — Inventory

**US-19** As an inventory manager, I want to see stock levels for every product, so that I know what's available to sell.

**US-20** As an inventory manager, I want low-stock items flagged automatically, so that I can reorder before running out.

**US-21** As an inventory manager, I want to add a new product with SKU, category and stock level, so that it's tracked from the moment it arrives.

---

## Epic 6 — Dashboard & Reporting

**US-22** As a business owner, I want a single dashboard showing headcount, payroll cost, pipeline value, sales revenue and low-stock alerts, so that I get a full picture without opening every module.

**US-23** As a business owner, I want to see revenue trend and sales-by-category as charts, so that I can spot patterns without reading raw numbers.

**US-24** As a business owner, I want the dashboard to only show cards relevant to the modules I've switched on, so that it isn't cluttered with modules I don't use.

---

## Out of scope for this build
Real payment processing, real bank transfer integration, multi-user roles/permissions, real backend/database persistence (this build uses in-memory/local mock data to demonstrate the full flow), and the Accounting / Procurement / Approval Workflow modules (shown as "coming soon" if selected).
