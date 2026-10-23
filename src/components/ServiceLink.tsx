"use client";

import type { ServiceId } from "@/engine/services";
import { pickService } from "@/engine/store";

/** Link que leva pro formulário de contato com o serviço já marcado. */
export default function ServiceLink({ service, className, children }: { service: ServiceId; className?: string; children: React.ReactNode }) {
  return (
    <a href="#contato" onClick={() => pickService(service)} className={className}>
      {children}
    </a>
  );
}
