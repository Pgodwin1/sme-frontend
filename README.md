# BusinessOS Nigeria — Marketing Site + App

Built with Next.js (App Router), TypeScript and Tailwind CSS. Two things live in this project:

1. **Marketing site** (`/`) — the landing page.
2. **The product itself** — onboarding, auth, and six working modules with mock data, built from `docs/USER_STORIES.md`.

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

**Try the full flow:** click "Get started" → complete the 4-step onboarding wizard (business details → account → pick your modules → review) → you land on `/dashboard`. Log out and back in with the same email/password to see auth working. Only the modules you switched on during onboarding appear in the sidebar.

> This is a frontend demo: accounts and all module data (employees, payroll, leads, invoices, stock) are mock/in-memory, seeded on load and kept in React state or `localStorage` for the session. There's no real backend, database, or payment processing — see `docs/USER_STORIES.md` for what's explicitly out of scope.

## Project structure

```
app/
  page.tsx                  Marketing landing page
  onboarding/page.tsx       4-step signup wizard (business → account → modules → review)
  login/page.tsx            Login
  signup/page.tsx           Redirects to /onboarding
  dashboard/
    layout.tsx              Auth guard + Sidebar/Topbar shell
    page.tsx                Dashboard home (stat cards + charts)
    employees/page.tsx      Employee Management module
    payroll/page.tsx        Payroll module
    crm/page.tsx             CRM module
    sales/page.tsx           Sales module
    inventory/page.tsx       Inventory module
components/
  layout/                   Marketing site Header, Footer
  sections/                 Marketing landing-page sections
  app/                      Product UI: Sidebar, Topbar, PageHeader, charts
  ui/                       Shared primitives: Button, DataTable, Modal, Form fields, Badge, StatCard, ModuleSwitch
data/                       Typed mock content: modules, employees, payroll, crm, sales, inventory, pricing
lib/
  auth.tsx                  Mock auth context (signup/login/logout), backed by localStorage
  utils.ts                  cn() class-merge helper
docs/
  USER_STORIES.md           The user stories this build was implemented against
```

### Why it's modular

- **Content lives in `data/*.ts`, not in JSX.** Add a 10th module, a new employee field, or a pricing tier by editing one typed array.
- **Every section/page is a standalone component.** The Sidebar reads `account.modules` and only renders nav items for modules the account switched on — add a 7th module by adding one entry to `data/modules.ts` and one nav item in `components/app/Sidebar.tsx`.
- **`ui/` primitives (`DataTable`, `Modal`, `Badge`, `StatCard`, `Form`) are content-agnostic** and reused across all five modules instead of each module rolling its own table/form/modal.
- **Auth and onboarding are decoupled from any one module** — `lib/auth.tsx` only knows about `Account` and `ModuleKey[]`, so adding a module never touches the auth layer.

### Adding a module

1. Add an entry to `data/modules.ts` (drives the onboarding module-picker and hero switchboard automatically).
2. Add a nav item to `navItems` in `components/app/Sidebar.tsx`.
3. Create `app/dashboard/<module>/page.tsx` using the existing modules as a template (`DataTable` + `Modal` + `StatCard` cover most cases).

## Design system

| Token | Value | Use |
|---|---|---|
| `ink` | `#0B1C2C` | Dark section backgrounds, sidebar, primary text on light |
| `paper` | `#F7F5F0` | Light section/app backgrounds |
| `amber` | `#E8A33D` | Primary accent — the "switch on" color |
| `teal` | `#1B6E5B` | Secondary accent — success/active states |
| Display font | Space Grotesk | Headings |
| Body font | Inter | Paragraphs, UI text |
| Mono font | IBM Plex Mono | Labels, prices, module codes, data tables |

All tokens are defined once in `tailwind.config.ts`.

## Notes

- Fully responsive from 360px mobile up through desktop; the dashboard sidebar collapses into a topbar menu below the `lg` breakpoint.
- Dashboard charts use [Recharts](https://recharts.org) (revenue vs. expenses line chart, sales-by-category bar chart).
- Keyboard focus states are visible; `prefers-reduced-motion` is respected.
- Payroll's PAYE/pension figures use simplified illustrative bands — not tax advice.

