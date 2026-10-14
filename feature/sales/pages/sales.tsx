"use client";

import { useState } from "react";
import { PageHeader } from "@/components/app/PageHeader";
import { Button } from "@/components/ui/Button";
import { NewSaleForm } from "@/feature/sales/components/NewSaleForm";
import { SalesHistory } from "@/feature/sales/components/SalesHistory";

type View = "new" | "history";

export default function SalesPage() {
  const [view, setView] = useState<View>("new");

  return (
    <div>
      <PageHeader
        title="Sales"
        description={
          view === "new"
            ? "Record a sale — pick products, set payment, save and print a receipt."
            : "Every sale, and what's still outstanding."
        }
        action={
          <Button
            type="button"
            variant="ghost"
            onClick={() => setView((v) => (v === "new" ? "history" : "new"))}
            className="border-line text-ink-600 print:hidden"
          >
            {view === "new" ? "View sales" : "New sale"}
          </Button>
        }
      />

      {view === "new" ? <NewSaleForm /> : <SalesHistory />}
    </div>
  );
}
