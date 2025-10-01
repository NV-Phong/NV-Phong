import Link from "next/link";
import { MoveRight, ArrowRight, Sparkles, Star } from "lucide-react";
import { AccentPill } from "./accent-pill";

const heroMetrics = [
  { label: "Strategic transformations", value: "120+" },
  { label: "Experience-led designers", value: "48" },
  { label: "Fortune 500 partners", value: "27" },
];

export function HeroSection() {
  return (
    <section className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr]">
      <div className="space-y-10">
        <AccentPill icon={Sparkles}>Experience-led digital ventures</AccentPill>
        <div className="space-y-6">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Build products your customers love and platforms your teams
            trust.
          </h1>
          <p className="max-w-2xl text-lg text-white/70">
            We co-create resilient digital experiences with organisations
            that need to move faster, de-risk innovation, and deliver
            measurable outcomes—from strategy through scale.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="#"
            className="inline-flex items-center gap-2 rounded-full bg-[#83FF8F] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#72f283]"
          >
            Book a working session
            <MoveRight size={16} />
          </Link>
          <Link
            href="#"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition hover:text-white"
          >
            Download capabilities deck
            <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {heroMetrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur"
            >
              <p className="text-3xl font-semibold text-white">
                {metric.value}
              </p>
              <p className="mt-2 text-sm text-white/60">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative flex items-center justify-center lg:justify-end">
        <div className="relative grid w-full max-w-[420px] gap-6">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#83FF8F]/20 via-[#8E7FF0]/10 to-transparent p-6 text-sm backdrop-blur">
            <span className="text-xs uppercase tracking-[0.2em] text-white/60">
              Snapshot • Q3 transformation
            </span>
            <p className="mt-4 text-lg font-medium text-white">
              Multi-market platform modernisation for a global financial
              exchange. Reduced release cycles from 6 weeks to 5 days.
            </p>
            <div className="mt-6 flex items-center justify-between text-xs text-white/70">
              <span>Outcome readiness</span>
              <span className="rounded-full bg-white/10 px-3 py-1 font-semibold text-white">
                94%
              </span>
            </div>
            <div className="absolute -right-12 bottom-8 hidden h-24 w-24 rounded-3xl bg-gradient-to-br from-[#83FF8F]/80 to-[#8E7FF0]/80 blur-2xl md:block" />
          </div>

          <div className="grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-white/50">
              <span>Squad health</span>
              <span>Week 12</span>
            </div>
            <div className="grid gap-3 text-sm">
              {["Design velocity", "Engineering throughput", "AI assist adoption"].map(
                (item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between rounded-xl bg-white/10 px-4 py-3 text-white/75"
                  >
                    <span>{item}</span>
                    <span className="flex items-center gap-1 text-white">
                      <Star size={14} className="fill-current text-[#83FF8F]" />
                      4.8
                    </span>
                  </div>
                ),
              )}
            </div>
            <div className="rounded-xl bg-[#83FF8F] px-4 py-3 text-sm font-semibold text-black">
              3x faster time-to-learning vs. previous releases
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
