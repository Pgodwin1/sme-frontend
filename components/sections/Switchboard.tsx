"use client";

import { useState } from "react";
import { ModuleSwitch } from "@/components/ui/ModuleSwitch";
import { modules, type ModuleKey } from "@/data/modules";

export function Switchboard() {
  const [on, setOn] = useState<ModuleKey[]>(
    modules.filter((m) => m.defaultOn).map((m) => m.key)
  );

  function toggle(key: ModuleKey) {
    setOn((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));
  }

  return (
    <div className="rounded-xl2 border border-ink-600/70 bg-ink-800/80 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <span className="font-mono text-[11px] uppercase tracking-widest text-ink-300">
          Your control panel
        </span>
        <span className="flex items-center gap-1.5 font-mono text-[11px] text-teal-light">
          <span className="h-1.5 w-1.5 rounded-full bg-teal-light" />
          live
        </span>
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {modules.map((m) => (
          <ModuleSwitch
            key={m.key}
            code={m.code}
            name={m.name}
            on={on.includes(m.key)}
            size="sm"
            onToggle={() => toggle(m.key)}
          />
        ))}
      </div>
      <p className="mt-4 font-mono text-[11px] text-ink-300">
        Tap a switch &mdash; this is what &ldquo;modular&rdquo; means.
      </p>
    </div>
  );
}
