import { type LucideIcon } from "lucide-react";
import { type ReactNode } from "react";

type AccentPillProps = {
  icon?: LucideIcon;
  children: ReactNode;
};

export function AccentPill({ icon: Icon, children }: AccentPillProps) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-sm font-medium text-white backdrop-blur">
      {Icon ? <Icon size={16} /> : null}
      {children}
    </span>
  );
}
