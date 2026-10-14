"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useBulkImportInventory } from "@/feature/inventory/api";

interface BulkImportModalProps {
  open: boolean;
  onClose: () => void;
}

export function BulkImportModal({ open, onClose }: BulkImportModalProps) {
  const [file, setFile] = useState<File | null>(null);

  const {
    mutate: importFile,
    isPending,
    data: result,
    error,
    reset,
  } = useBulkImportInventory();

  function handleClose() {
    setFile(null);
    reset();
    onClose();
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    reset();
    setFile(e.target.files?.[0] ?? null);
  }

  function handleImport() {
    if (file) importFile(file);
  }

  return (
    <Modal open={open} onClose={handleClose} title="Bulk import products">
      <div className="flex flex-col gap-4">
        <p className="font-body text-sm text-ink-500">
          Upload a .csv, .xlsx, or .xls file (max 10MB) with columns: name, description,
          quantity, price, category, location, supplier, reorderLevel, reorderQuantity,
          lastOrderedDate, lastReceivedDate, status.
        </p>

        <input
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={handleFileChange}
          className="block w-full font-body text-sm text-ink-600 file:mr-3 file:rounded-md file:border-0 file:bg-ink file:px-3 file:py-1.5 file:font-body file:text-xs file:font-medium file:text-paper file:hover:bg-ink-700"
        />

        {error && (
          <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 font-body text-xs text-red-700">
            {error.message}
          </p>
        )}

        {result && (
          <div className="rounded-md border border-line bg-paper-dim/60 p-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="success">{`${result.imported} imported`}</Badge>
              {result.skipped > 0 && (
                <Badge tone="warning">{`${result.skipped} skipped`}</Badge>
              )}
            </div>
            {result.errors.length > 0 && (
              <ul className="mt-3 max-h-40 space-y-1 overflow-y-auto font-mono text-[11px] text-red-700">
                {result.errors.map((e, i) => (
                  <li key={i}>
                    Row {e.row}: {e.message}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        <Button
          type="button"
          onClick={handleImport}
          disabled={!file || isPending}
          className="mt-1 w-full"
        >
          {isPending ? "Importing..." : "Import"}
        </Button>
      </div>
    </Modal>
  );
}
