import { PageHeader } from "@/components/ui/page-header";

const openings = [
  {
    title: "Lead Product Designer",
    location: "Ho Chi Minh City • Hybrid",
    type: "Full-time",
    summary:
      "Pair research, strategy, and design craft to deliver next-generation digital experiences across finance and mobility.",
  },
  {
    title: "Senior Platform Engineer",
    location: "Remote • Vietnam",
    type: "Full-time",
    summary:
      "Design and implement resilient cloud-native architectures, CI/CD pipelines, and observability practices for enterprise clients.",
  },
  {
    title: "Data & AI Strategist",
    location: "Hanoi • On-site",
    type: "Full-time",
    summary:
      "Connect business objectives to actionable AI roadmaps, data governance frameworks, and measurable value streams.",
  },
];

const cultureHighlights = [
  {
    title: "Shared outcomes",
    description: "We co-own goals with clients and celebrate wins together—success is a team sport at VieMind.",
  },
  {
    title: "Continuous learning",
    description: "Guilds, lunch-and-learns, certification support, and conference opportunities keep skills sharp and curiosity alive.",
  },
  {
    title: "Inclusive community",
    description: "Respect, empathy, and open communication power our collaboration across time zones and disciplines.",
  },
];

const benefits = [
  "Competitive compensation with transparent bands",
  "Hybrid working model and remote-first tooling",
  "Private healthcare for you and your family",
  "Education stipend and professional certifications",
  "Wellness support and quarterly recharge days",
];

export default function CareersPage() {
  return (
    <div className="space-y-16 bg-[#F8F8F8] pb-20">
      <div className="mx-auto max-w-6xl px-6 pt-16">
        <PageHeader
          eyebrow="Careers"
          title="Build products, platforms, and futures with VieMind."
          description="Join a team of technologists, designers, and strategists obsessed with meaningful outcomes. We're looking for curious minds ready to elevate the digital landscape across Vietnam and beyond."
          actions={[
            { label: "See open roles", href: "#openings" },
            { label: "Meet the team", href: "/about", variant: "ghost" },
          ]}
        />
      </div>

      <section id="openings" className="mx-auto max-w-6xl space-y-10 px-6">
        <header className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-neutral-500">
            Current opportunities
          </p>
          <h2 className="text-3xl font-semibold text-neutral-900 sm:text-4xl">
            Roles we’re hiring for right now.
          </h2>
        </header>
        <div className="space-y-4">
          {openings.map((opening) => (
            <article
              key={opening.title}
              className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900">{opening.title}</h3>
                  <p className="text-sm text-neutral-500">
                    {opening.location} • {opening.type}
                  </p>
                </div>
                <a
                  href="mailto:talent@viemind.com"
                  className="inline-flex items-center text-sm font-semibold text-neutral-900 transition hover:underline"
                >
                  Apply now →
                </a>
              </div>
              <p className="mt-4 text-sm text-neutral-600">{opening.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-10 px-6">
        <header className="grid gap-3 lg:grid-cols-[0.45fr_0.55fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-neutral-500">
              Life at VieMind
            </p>
            <h2 className="text-3xl font-semibold text-neutral-900 sm:text-4xl">
              A culture built on collaboration, experimentation, and care.
            </h2>
          </div>
          <p className="text-neutral-600">
            We believe the best solutions emerge when people feel supported, trusted, and empowered to do their best work.
          </p>
        </header>
        <div className="grid gap-6 md:grid-cols-3">
          {cultureHighlights.map((highlight) => (
            <article key={highlight.title} className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-neutral-900">{highlight.title}</h3>
              <p className="mt-2 text-sm text-neutral-600">{highlight.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-10 px-6 pb-8">
        <header className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-neutral-500">
            Policies & benefits
          </p>
          <h2 className="text-3xl font-semibold text-neutral-900 sm:text-4xl">
            Comprehensive support for you and your ambitions.
          </h2>
        </header>
        <div className="grid gap-4 rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm sm:grid-cols-2">
          {benefits.map((benefit) => (
            <div key={benefit} className="flex gap-3 text-sm text-neutral-700">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#83FF8F]" />
              <span>{benefit}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
