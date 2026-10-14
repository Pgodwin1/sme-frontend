"use client";

import { Modal } from "@/components/ui/Modal";
import { Field, Input } from "@/components/ui/Form";
import { Button } from "@/components/ui/Button";

interface AddItemModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
  error: string | null;
  onBulkImportClick: () => void;
}

export function AddItemModal({
  open,
  onClose,
  onSubmit,
  isSubmitting,
  error,
  onBulkImportClick,
}: AddItemModalProps) {
  return (
    <Modal open={open} onClose={onClose} title="Add product">
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <Field label="Product name" htmlFor="name">
          <Input id="name" name="name" required placeholder="e.g. Vegetable Oil (5L)" />
        </Field>
        <Field label="Description" htmlFor="description">
          <Input id="description" name="description" placeholder="e.g. 5-litre bottle, refined" />
        </Field>
        <Field label="Category" htmlFor="category">
          <Input id="category" name="category" placeholder="e.g. Grocery" />
        </Field>
        <Field label="Unit price (₦)" htmlFor="price">
          <Input id="price" name="price" type="number" required min={0} placeholder="4500" />
        </Field>
        <Field label="Quantity" htmlFor="quantity">
          <Input id="quantity" name="quantity" type="number" required min={0} placeholder="50" />
        </Field>
        {/* <Field label="Reorder level" htmlFor="reorderLevel">
          <Input id="reorderLevel" name="reorderLevel" type="number" min={0} placeholder="15" />
        </Field>
        <Field label="Reorder quantity" htmlFor="reorderQuantity">
          <Input id="reorderQuantity" name="reorderQuantity" type="number" min={0} placeholder="50" />
        </Field>
        <Field label="Location" htmlFor="location">
          <Input id="location" name="location" placeholder="e.g. Main Store" />
        </Field>
        <Field label="Supplier" htmlFor="supplier">
          <Input id="supplier" name="supplier" placeholder="e.g. Dangote Foods" />
        </Field> */}

        {error && (
          <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 font-body text-xs text-red-700">
            {error}
          </p>
        )}

        <Button type="submit" className="mt-2 w-full" disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add product"}
        </Button>

        <button
          type="button"
          onClick={onBulkImportClick}
          className="font-body text-xs font-medium text-ink-500 underline-offset-2 hover:text-ink hover:underline"
        >
          Adding many products? Bulk import from a spreadsheet
        </button>
      </form>
    </Modal>
  );
}
