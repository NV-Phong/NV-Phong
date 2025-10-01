import Link from "next/link";
import { Sparkles, MoveRight, ArrowRight } from "lucide-react";
import { AccentPill } from "./accent-pill";

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-neutral-900 py-20 text-white">
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#1A1A1A]" />
      <div className="absolute -left-16 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#83FF8F]/50 via-transparent to-transparent blur-3xl" />
      <div className="absolute -right-12 top-10 h-48 w-48 rounded-full bg-gradient-to-br from-[#8E7FF0]/40 via-transparent to-transparent blur-3xl" />
      <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-8 px-6 text-center">
        <AccentPill icon={Sparkles}>Let's build what's next</AccentPill>
        <h2 className="text-3xl font-semibold sm:text-4xl">
          Bring us your boldest initiative. We'll help you design it, build it,
          and scale it.
        </h2>
        <p className="max-w-2xl text-white/70">
          Share your brief and we'll assemble a bespoke squad to co-create the
          roadmap, stand up the stack, and launch with confidence in eight
          weeks or less.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="#"
            className="inline-flex items-center gap-2 rounded-full bg-[#83FF8F] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#72f283]"
          >
            Schedule an intro call
            <MoveRight size={16} />
          </Link>
          <Link
            href="#"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
          >
            Get the transformation playbook
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
