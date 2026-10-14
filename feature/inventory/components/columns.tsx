import { type Column } from "@/components/ui/DataTable";
import { Badge } from "@/components/ui/Badge";
import { formatNaira } from "@/data/pricing";
import type { InventoryItem } from "@/feature/inventory/api";

// DataTable requires each row to have an `id`; the backend uses `_id`.
export type InventoryRow = InventoryItem & { id: string };

export const inventoryColumns: Column<InventoryRow>[] = [
  {
    header: "Product",
    accessor: (r) => (
      <div>
        <p className="font-medium text-ink">{r.name}</p>
        {r.description && (
          <p className="font-mono text-[11px] text-ink-400">{r.description}</p>
        )}
      </div>
    ),
  },
  { header: "Category", accessor: (r) => r.category ?? "—" },
  { header: "Unit price", accessor: (r) => formatNaira(r.price), align: "right" },
  {
    header: "Quantity",
    accessor: (r) => (
      <span
        className={
          r.reorderLevel && r.quantity <= r.reorderLevel
            ? "font-semibold text-amber-dark"
            : "text-ink-700"
        }
      >
        {r.quantity}
      </span>
    ),
    align: "right",
  },
  {
    header: "Status",
    accessor: (r) =>
      r.reorderLevel && r.quantity <= r.reorderLevel ? (
        <Badge tone="warning">Reorder now</Badge>
      ) : (
        <Badge tone="success">{r.status ?? "In stock"}</Badge>
      ),
  },
];
