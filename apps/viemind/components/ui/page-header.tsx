import Link from "next/link";
import { type ReactNode } from "react";

export type PageHeaderAction = {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "ghost";
};

interface PageHeaderProps {
  eyebrow?: ReactNode;
  title: string;
  description?: ReactNode;
  actions?: PageHeaderAction[];
}

const actionStyles: Record<Required<PageHeaderAction>["variant"], string> = {
  primary:
    "inline-flex items-center gap-2 rounded-full bg-[#83FF8F] px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-[#72f283]",
  secondary:
    "inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/20",
  ghost:
    "inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition hover:text-white",
};

function getVariantClass(variant: PageHeaderAction["variant"]) {
  if (!variant) return actionStyles.primary;
  return actionStyles[variant];
}

export function PageHeader({ eyebrow, title, description, actions }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#1A1A1A] px-8 py-16 text-white shadow-sm">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-10 h-64 w-64 rotate-6 rounded-3xl bg-gradient-to-br from-[#8E7FF0]/40 via-[#83FF8F]/20 to-transparent blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-64 w-64 -rotate-12 rounded-3xl bg-gradient-to-br from-[#F0DE7F]/40 via-transparent to-transparent blur-3xl" />
      </div>
      <div className="relative mx-auto flex max-w-4xl flex-col gap-6">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.38em] text-white/60">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">{title}</h1>
        {description ? (
          <div className="max-w-3xl text-base text-white/70">{description}</div>
        ) : null}
        {actions && actions.length > 0 ? (
          <div className="flex flex-wrap items-center gap-3">
            {actions.map((action) => (
              <Link key={action.href} href={action.href} className={getVariantClass(action.variant)}>
                {action.label}
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
