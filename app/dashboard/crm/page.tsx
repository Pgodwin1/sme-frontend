"use client";

import { useState } from "react";
import { PageHeader } from "@/components/app/PageHeader";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Field, Input, Select } from "@/components/ui/Form";
import { Badge } from "@/components/ui/Badge";
import { initialLeads, pipelineStages, type Lead, type PipelineStage } from "@/data/crm";
import { formatNaira } from "@/data/pricing";
import { cn } from "@/lib/utils";

const stageTone: Record<PipelineStage, "info" | "warning" | "success" | "danger" | "neutral"> = {
  New: "neutral",
  Contacted: "info",
  Proposal: "warning",
  Won: "success",
  Lost: "danger",
};

export default function CrmPage() {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [modalOpen, setModalOpen] = useState(false);

  function moveStage(id: string, stage: PipelineStage) {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, stage } : l)));
  }

  function handleAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const newLead: Lead = {
      id: `LD-${String(leads.length + 1).padStart(3, "0")}`,
      name: String(form.get("name")),
      company: String(form.get("company")),
      phone: String(form.get("phone")),
      email: String(form.get("email")),
      stage: "New",
      value: Number(form.get("value")),
      lastContact: new Date().toISOString().slice(0, 10),
    };
    setLeads((prev) => [newLead, ...prev]);
    setModalOpen(false);
    e.currentTarget.reset();
  }

  return (
    <div>
      <PageHeader
        title="CRM"
        description="Every lead and customer, grouped by pipeline stage, so nothing falls through."
        action={<Button onClick={() => setModalOpen(true)}>Add lead</Button>}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {pipelineStages.map((stage) => {
          const stageLeads = leads.filter((l) => l.stage === stage);
          const stageValue = stageLeads.reduce((sum, l) => sum + l.value, 0);
          return (
            <div key={stage} className="rounded-xl2 border border-line bg-white p-4 shadow-card">
              <div className="mb-3 flex items-center justify-between">
                <Badge tone={stageTone[stage]}>{stage}</Badge>
                <span className="font-mono text-[11px] text-ink-400">{stageLeads.length}</span>
              </div>
              <p className="mb-3 font-mono text-xs text-ink-400">{formatNaira(stageValue)}</p>
              <div className="space-y-2">
                {stageLeads.map((lead) => (
                  <div key={lead.id} className="rounded-lg border border-line/70 bg-paper/60 p-3">
                    <p className="font-body text-sm font-medium text-ink">{lead.company}</p>
                    <p className="font-mono text-[11px] text-ink-400">{lead.name}</p>
                    <p className="mt-1 font-mono text-[11px] text-teal-dark">{formatNaira(lead.value)}</p>
                    <select
                      value={lead.stage}
                      onChange={(e) => moveStage(lead.id, e.target.value as PipelineStage)}
                      className={cn(
                        "mt-2 w-full rounded border border-line bg-white px-2 py-1 font-mono text-[10px] text-ink-600"
                      )}
                    >
                      {pipelineStages.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                ))}
                {stageLeads.length === 0 && (
                  <p className="font-body text-xs text-ink-300">No leads here.</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add lead">
        <form onSubmit={handleAdd} className="flex flex-col gap-4">
          <Field label="Contact name" htmlFor="name">
            <Input id="name" name="name" required placeholder="e.g. Funke Alade" />
          </Field>
          <Field label="Company" htmlFor="company">
            <Input id="company" name="company" required placeholder="e.g. Alade Interiors" />
          </Field>
          <Field label="Phone" htmlFor="phone">
            <Input id="phone" name="phone" required placeholder="0800 000 0000" />
          </Field>
          <Field label="Email" htmlFor="email">
            <Input id="email" name="email" type="email" required placeholder="name@company.ng" />
          </Field>
          <Field label="Estimated value (₦)" htmlFor="value">
            <Input id="value" name="value" type="number" required min={0} placeholder="500000" />
          </Field>
          <Button type="submit" className="mt-2 w-full">Add lead</Button>
        </form>
      </Modal>
    </div>
  );
}
