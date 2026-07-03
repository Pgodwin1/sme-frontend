export interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  stock: number;
  reorderLevel: number;
  unitPrice: number;
};

export const initialProducts: Product[] = [
  { id: "PRD-001", sku: "RIC-50KG", name: "Rice (50kg bag)", category: "Grocery", stock: 42, reorderLevel: 15, unitPrice: 65000 },
  { id: "PRD-002", sku: "CEM-42.5", name: "Cement (42.5 grade)", category: "Building materials", stock: 8, reorderLevel: 20, unitPrice: 8500 },
  { id: "PRD-003", sku: "PAR-500ML", name: "Paracetamol Syrup 500ml", category: "Pharmacy", stock: 120, reorderLevel: 40, unitPrice: 1200 },
  { id: "PRD-004", sku: "FAB-ANK-1", name: "Ankara Fabric (per yard)", category: "Textiles", stock: 5, reorderLevel: 25, unitPrice: 3500 },
  { id: "PRD-005", sku: "GEN-3.5KVA", name: "Generator 3.5KVA", category: "Electronics", stock: 14, reorderLevel: 5, unitPrice: 210000 },
  { id: "PRD-006", sku: "SOD-50CL", name: "Soft Drinks (crate)", category: "Grocery", stock: 60, reorderLevel: 30, unitPrice: 3200 },
];
