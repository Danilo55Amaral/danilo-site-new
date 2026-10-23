"use client";

import { PickMode, pickCatalogItem } from "@/engine/store";

/**
 * Botão dos cartões do catálogo: marca o serviço no painel de pedido e rola
 * até ele (#pedido). `mode` escolhe a aba: orçamento ou agendamento.
 */
export default function PickButton({
  itemId,
  mode,
  note,
  className,
  children,
}: {
  itemId: string;
  mode: PickMode;
  note?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a href="#pedido" onClick={() => pickCatalogItem(itemId, mode, note)} className={className}>
      {children}
    </a>
  );
}
