import { formatNaira } from "@/data/pricing";
import type { Sale } from "@/feature/sales/api";

interface ReceiptProps {
  sale: Sale;
  businessName?: string;
}

// Only ever visible when printing (hidden on screen) — the rest of the page
// is marked print:hidden so this is the only thing that comes out of the
// printer.
export function Receipt({ sale, businessName }: ReceiptProps) {
  return (
    <div className="hidden print:block">
      <h1 className="font-display text-lg font-semibold">{businessName ?? "Receipt"}</h1>
      <p className="font-mono text-xs">{sale.receiptNumber}</p>
      <p className="font-mono text-xs">{new Date(sale.createdAt).toLocaleString()}</p>

      {(sale.customerName || sale.customerPhone) && (
        <p className="mt-3 text-sm">
          {sale.customerName}
          {sale.customerName && sale.customerPhone ? " · " : ""}
          {sale.customerPhone}
        </p>
      )}

      <table className="mt-4 w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-black">
            <th className="py-1 text-left">Item</th>
            <th className="py-1 text-right">Qty</th>
            <th className="py-1 text-right">Price</th>
            <th className="py-1 text-right">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {sale.items.map((item, i) => (
            <tr key={i} className="border-b border-black/20">
              <td className="py-1">{item.name}</td>
              <td className="py-1 text-right">{item.quantity}</td>
              <td className="py-1 text-right">{formatNaira(item.unitPrice)}</td>
              <td className="py-1 text-right">{formatNaira(item.subtotal)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex flex-col items-end gap-0.5 text-sm">
        <p className="font-semibold">Total: {formatNaira(sale.totalAmount)}</p>
        <p>Paid: {formatNaira(sale.amountPaid)}</p>
        {sale.balanceDue > 0 && <p>Balance due: {formatNaira(sale.balanceDue)}</p>}
        <p className="font-mono text-xs uppercase">{sale.paymentStatus}</p>
      </div>

      <p className="mt-6 text-center text-xs">Thank you for your business.</p>
    </div>
  );
}
