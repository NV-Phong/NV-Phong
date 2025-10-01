import { ArrowRight } from "lucide-react";
import { AccentPill } from "./accent-pill";

const differentiators = [
  {
    title: "Venture-grade squads",
    copy: "Cross-functional teams blend strategists, designers, and senior engineers who ship with velocity and craft.",
  },
  {
    title: "Outcomes, not artefacts",
    copy: "Every engagement anchors on measurable impact: activation uplift, cycle-time reduction, or net-new revenue.",
  },
  {
    title: "AI as a teammate",
    copy: "We embed automation, copilots, and responsible AI frameworks directly into workflows on day one.",
  },
];

const caseStudies = [
  {
    client: "Aurora Mobility",
    impact: "37% faster feature velocity",
    summary:
      "Re-architected the digital cockpit platform and introduced a unified design language across 12 markets.",
    tags: ["Automotive", "Platform", "DesignOps"],
    hue: "from-[#83FF8F]/90 via-[#5BF2BD]/80 to-[#1A1A1A]",
  },
  {
    client: "Northwind Health",
    impact: "+22 pt patient NPS",
    summary:
      "Delivered an AI-assisted care navigation experience and migrated critical services to a secure, compliant mesh.",
    tags: ["Healthcare", "AI", "Cloud"],
    hue: "from-[#8E7FF0]/80 via-[#AC9BFF]/70 to-[#1A1A1A]",
  },
];

export function DifferentiatorsSection() {
  return (
    <section className="relative overflow-hidden bg-neutral-900 py-20 text-white">
      <div className="absolute left-1/2 top-12 h-96 w-[640px] -translate-x-1/2 rounded-[48px] bg-gradient-to-br from-[#8E7FF0]/40 via-[#83FF8F]/30 to-transparent blur-3xl" />
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[0.45fr_0.55fr]">
        <div className="space-y-6">
          <AccentPill>Why partners stay</AccentPill>
          <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">
            Embedded squads obsessed with outcomes.
          </h2>
          <p className="text-neutral-300">
            We work as an extension of your leadership and product teams,
            ensuring every sprint ties back to a measurable goal. Transparent
            dashboards, shared rituals, and an AI-enabled operating model keep
            everyone aligned.
          </p>
          <div className="grid gap-6">
            {differentiators.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
              >
                <h3 className="text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-neutral-300">{item.copy}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6">
          {caseStudies.map((study) => (
            <article
              key={study.client}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur transition hover:border-white/20"
            >
              <div
                className={`pointer-events-none absolute -right-20 top-6 h-40 w-40 rounded-full bg-gradient-to-br ${study.hue} opacity-60 blur-2xl`}
              />
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.28em] text-white/60">
                <span>{study.client}</span>
                <span>Case study</span>
              </div>
              <p className="mt-4 text-sm text-neutral-200">{study.summary}</p>
              <div className="mt-6 flex flex-wrap items-center gap-2 text-xs font-medium text-white/80">
                {study.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/20 bg-white/10 px-3 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-8 flex items-center justify-between text-sm font-semibold text-white">
                <span>{study.impact}</span>
                <ArrowRight size={18} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
