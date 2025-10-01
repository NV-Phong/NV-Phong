const heroMetrics = [
  { label: "Strategic transformations", value: "120+" },
  { label: "Experience-led designers", value: "48" },
  { label: "Fortune 500 partners", value: "27" },
];

const timeline = [
  {
    phase: "01",
    title: "Define catalyst",
    detail:
      "Intensive discovery, executive workshops, and hypothesis sprints align stakeholders on the sharpest opportunity.",
  },
  {
    phase: "02",
    title: "Design + validate",
    detail:
      "Parallel tracks for product experience, technical architecture, and operating model map ensure solutions are desirable and feasible.",
  },
  {
    phase: "03",
    title: "Launch + scale",
    detail:
      "We ship in market, measure relentlessly, and transition capability to your teams with training and tooling.",
  },
];

export function TimelineSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="grid gap-12 lg:grid-cols-[0.6fr_0.4fr]">
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-neutral-500">
            How we work
          </p>
          <h2 className="text-3xl font-semibold text-neutral-900 sm:text-4xl">
            A transformation frame tuned for momentum.
          </h2>
          <p className="max-w-2xl text-neutral-600">
            Every engagement is anchored by a three-phase operating rhythm. It
            creates clarity early, delivers validated value quickly, and
            leaves your teams empowered with playbooks, training, and tooling.
          </p>
          <div className="grid gap-6 sm:grid-cols-3">
            {heroMetrics.map((metric) => (
              <div key={metric.label} className="rounded-2xl bg-white p-6 shadow-sm">
                <p className="text-2xl font-semibold text-neutral-900">
                  {metric.value}
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.28em] text-neutral-500">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {timeline.map((item) => (
            <div
              key={item.phase}
              className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm"
            >
              <div className="text-sm font-semibold text-neutral-500">
                Phase {item.phase}
              </div>
              <h3 className="mt-2 text-lg font-semibold text-neutral-900">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-neutral-600">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
