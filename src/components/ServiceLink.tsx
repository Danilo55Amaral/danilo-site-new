import Link from "next/link";
import type { CategoryId } from "@/engine/catalog";
import { CATALOG_PATH } from "@/engine/profile";

/** Link pra categoria do serviço no catálogo de preços (ex.: /catalogo#sites). */
export default function ServiceLink({ service, className, children }: { service: CategoryId; className?: string; children: React.ReactNode }) {
  return (
    <Link href={`${CATALOG_PATH}#${service}`} className={className}>
      {children}
    </Link>
  );
}
