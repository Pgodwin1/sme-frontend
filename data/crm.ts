export type PipelineStage = "New" | "Contacted" | "Proposal" | "Won" | "Lost";

export interface Lead {
  id: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  stage: PipelineStage;
  value: number;
  lastContact: string;
}

export const pipelineStages: PipelineStage[] = ["New", "Contacted", "Proposal", "Won", "Lost"];

export const initialLeads: Lead[] = [
  { id: "LD-001", name: "Grace Adebayo", company: "Adebayo Foods Ltd", phone: "0803 111 2222", email: "grace@adebayofoods.ng", stage: "Proposal", value: 850000, lastContact: "2026-06-25" },
  { id: "LD-002", name: "Michael Obi", company: "Obi Construction", phone: "0805 222 3333", email: "michael@obiconstruction.ng", stage: "Contacted", value: 4200000, lastContact: "2026-06-28" },
  { id: "LD-003", name: "Ruth Danladi", company: "Danladi Pharmacy", phone: "0807 333 4444", email: "ruth@danladipharm.ng", stage: "New", value: 320000, lastContact: "2026-07-01" },
  { id: "LD-004", name: "Emeka Uche", company: "Uche Textiles", phone: "0809 444 5555", email: "emeka@uchetextiles.ng", stage: "Won", value: 1500000, lastContact: "2026-06-15" },
  { id: "LD-005", name: "Aisha Bello", company: "Bello Hotels", phone: "0811 555 6666", email: "aisha@bellohotels.ng", stage: "Lost", value: 600000, lastContact: "2026-06-10" },
  { id: "LD-006", name: "Peter Nwosu", company: "Nwosu Autos", phone: "0813 666 7777", email: "peter@nwosuautos.ng", stage: "Contacted", value: 980000, lastContact: "2026-06-30" },
];
