import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";

const services = [
  {
    title: "Experience Strategy",
    description:
      "Human-centred research, service blueprints, and north-star journeys that connect ambition to reality.",
    bullets: [
      "Vision framing",
      "Opportunity mapping",
      "Metrics & operating models",
    ],
    accent: "from-[#83FF8F] via-[#9EFFCB] to-[#F7FEE7]",
  },
  {
    title: "Product Innovation",
    description:
      "Rapid concept incubation, technical validation, and go-to-market experiments that de-risk investments.",
    bullets: [
      "Prototyping and testing",
      "AI-enabled pilots",
      "Value stream acceleration",
    ],
    accent: "from-[#8E7FF0] via-[#B4A8FF] to-[#EEF2FF]",
  },
  {
    title: "Platform Engineering",
    description:
      "Composable architectures, automation, and DevEx tooling that scale with every release.",
    bullets: [
      "Cloud native delivery",
      "Design systems",
      "Observability & governance",
    ],
    accent: "from-[#F0DE7F] via-[#FFE7A8] to-[#FFFBEA]",
  },
];

export function ServicesSection() {
  return (
    <section className="mx-auto max-w-6xl space-y-12 px-6 py-20">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-neutral-500">
            What we do
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-neutral-900 sm:text-4xl">
            Strategy, delivery, and scale without the silos.
          </h2>
        </div>
        <p className="max-w-xl text-neutral-600">
          We embed with your teams to architect experiences, platforms, and
          operating models that unlock sustainable growth. Engagements are
          structured as 6–12 week outcome sprints.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {services.map((service) => (
          <div
            key={service.title}
            className="group relative overflow-hidden rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
          >
            <div
              className={`pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br ${service.accent} opacity-60 blur-2xl transition group-hover:opacity-100`}
            />
            <div className="flex h-full flex-col gap-6">
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-neutral-900">
                  {service.title}
                </h3>
                <p className="text-sm text-neutral-600">
                  {service.description}
                </p>
              </div>
              <div className="space-y-3">
                {service.bullets.map((bullet) => (
                  <div key={bullet} className="flex items-start gap-3 text-sm">
                    <div className="mt-1 rounded-full bg-[#83FF8F]/40 p-1 text-[#086f4a]">
                      <Check size={14} />
                    </div>
                    <span className="text-neutral-700">{bullet}</span>
                  </div>
                ))}
              </div>
              <Link
                href="#"
                className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-neutral-900 transition hover:gap-3"
              >
                Explore offering
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
