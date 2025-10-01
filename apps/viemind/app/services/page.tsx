import { PageHeader } from "@/components/ui/page-header";

const serviceCatalog = [
  {
    title: "Software & Application Development",
    subtitle: "Deliver bespoke platforms, products, and interfaces that scale with your business.",
    offerings: [
      {
        name: "Enterprise applications",
        description: "Tailor-made core systems that streamline operations, automate workflows, and integrate with existing ecosystems.",
      },
      {
        name: "Web & mobile applications",
        description: "Cross-platform experiences optimised for performance, accessibility, and measurable engagement.",
      },
      {
        name: "Websites & portals",
        description: "High-performing marketing sites, partner portals, and self-service hubs with CMS flexibility.",
      },
      {
        name: "UX/UI design",
        description: "Human-centred design systems, prototypes, and user testing to ensure every journey feels effortless.",
      },
    ],
    accent: "from-[#83FF8F]/60 via-[#83FF8F]/30 to-transparent",
  },
  {
    title: "Data Solutions & Analytics",
    subtitle: "Establish resilient data foundations and decision intelligence across the organisation.",
    offerings: [
      {
        name: "Data architecture",
        description: "Design and implement DW, DL, and lakehouse solutions—on-premises, cloud, or hybrid.",
      },
      {
        name: "Data processing & integration",
        description: "Automated pipelines for ingestion, transformation, synchronisation, and governance enforcement.",
      },
      {
        name: "Intelligent analytics",
        description: "Interactive dashboards, predictive models, and self-service BI for frontline teams.",
      },
      {
        name: "Data governance",
        description: "Policies, tooling, and monitoring to ensure integrity, security, and compliance.",
      },
    ],
    accent: "from-[#8E7FF0]/60 via-[#B4A8FF]/30 to-transparent",
  },
  {
    title: "Artificial Intelligence & Machine Learning",
    subtitle: "Embed AI across operations with confidence and responsibility.",
    offerings: [
      {
        name: "AI/ML for enterprise",
        description: "Applied use cases from intelligent customer service to supply-and-demand forecasting.",
      },
      {
        name: "Model deployment",
        description: "Build, fine-tune, and operationalise models with MLOps accelerators and monitoring.",
      },
      {
        name: "AI strategy consulting",
        description: "Capability assessments, roadmap design, and change enablement for AI adoption.",
      },
    ],
    accent: "from-[#F0DE7F]/60 via-[#FFE7A8]/30 to-transparent",
  },
  {
    title: "Digital Experience Design",
    subtitle: "Design cohesive, accessible, and delightful experiences across every touchpoint.",
    offerings: [
      {
        name: "UX/UI design",
        description: "Service design, journey mapping, and UI libraries tuned for global audiences.",
      },
      {
        name: "Digital platform",
        description: "Integrated platforms that orchestrate content, commerce, and community at scale.",
      },
    ],
    accent: "from-[#83FF8F]/50 via-[#8E7FF0]/20 to-transparent",
  },
  {
    title: "Automation & Process Optimisation",
    subtitle: "Orchestrate smarter workflows, reduce manual effort, and accelerate releases.",
    offerings: [
      {
        name: "RPA & process automation",
        description: "Automate repetitive tasks with secure bots and orchestration frameworks.",
      },
      {
        name: "DevOps & CI/CD",
        description: "Toolchains, pipelines, and guardrails that keep releases fast and reliable.",
      },
      {
        name: "Workflow optimisation",
        description: "Process diagnostics and digitalisation programs, supported by change management.",
      },
      {
        name: "Training & support",
        description: "Capability uplift programs, playbooks, and on-call assistance for your teams.",
      },
    ],
    accent: "from-[#8E7FF0]/50 via-[#F0DE7F]/20 to-transparent",
  },
];

const engagementModels = [
  {
    title: "Outcome sprints",
    description:
      "6–12 week engagements focused on a specific opportunity—ideal for validating concepts, launching pilots, or accelerating stalled programs.",
  },
  {
    title: "Co-delivery squads",
    description:
      "Dedicated teams embedded with your product, technology, and business stakeholders to deliver roadmap milestones end-to-end.",
  },
  {
    title: "Advisory retainers",
    description:
      "Executive and practitioner guidance for leaders who need seasoned partners to shape strategy, review architecture, or establish governance.",
  },
];

const accelerators = [
  "AI readiness assessment",
  "Design system starter kits",
  "Composable commerce blueprints",
  "MLOps deployment templates",
  "Experience analytics dashboards",
];

export default function ServicesPage() {
  return (
    <div className="space-y-16 bg-[#F8F8F8] pb-20">
      <div className="mx-auto max-w-6xl px-6 pt-16">
        <PageHeader
          eyebrow="Services"
          title="Integrated expertise that helps you design, build, and scale transformational products."
          description="From discovery to long-term optimisation, VieMind gives you outcome-driven squads, modern architectures, and AI-enabled workflows to move confidently."
          actions={[
            { label: "Book a consultation", href: "/contact" },
            { label: "View case studies", href: "/#case-studies", variant: "ghost" },
          ]}
        />
      </div>

      <section className="mx-auto max-w-6xl space-y-10 px-6">
        <header className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-neutral-500">
            Capabilities
          </p>
          <h2 className="text-3xl font-semibold text-neutral-900 sm:text-4xl">
            Every service is engineered for measurable outcomes.
          </h2>
          <p className="max-w-3xl text-neutral-600">
            We tailor the delivery model, tech stack, and operating rhythm to your goals—whether you need a rapid prototype, platform overhaul, or enterprise-wide transformation.
          </p>
        </header>
        <div className="grid gap-6">
          {serviceCatalog.map((service) => (
            <article
              key={service.title}
              className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div
                className={`pointer-events-none absolute -right-20 top-0 h-44 w-44 rounded-full bg-gradient-to-br ${service.accent} opacity-60 blur-2xl`}
              />
              <div className="relative space-y-6">
                <div className="space-y-3">
                  <h3 className="text-2xl font-semibold text-neutral-900">
                    {service.title}
                  </h3>
                  <p className="text-sm text-neutral-600">{service.subtitle}</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {service.offerings.map((offering) => (
                    <div
                      key={offering.name}
                      className="rounded-2xl border border-neutral-100 bg-neutral-50/80 p-5"
                    >
                      <h4 className="text-sm font-semibold text-neutral-900">
                        {offering.name}
                      </h4>
                      <p className="mt-2 text-sm text-neutral-600">
                        {offering.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-10 px-6">
        <header className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-neutral-500">
            Engagement models
          </p>
          <h2 className="text-3xl font-semibold text-neutral-900 sm:text-4xl">
            Choose the partnership that fits your mission.
          </h2>
        </header>
        <div className="grid gap-6 md:grid-cols-3">
          {engagementModels.map((model) => (
            <div
              key={model.title}
              className="rounded-3xl border border-neutral-200 bg-white p-6 text-neutral-600 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-neutral-900">{model.title}</h3>
              <p className="mt-3 text-sm">{model.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-10 px-6 pb-8">
        <header className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-neutral-500">
            Delivery accelerators
          </p>
          <h2 className="text-3xl font-semibold text-neutral-900 sm:text-4xl">
            Accelerate time-to-impact with reusable IP and playbooks.
          </h2>
        </header>
        <div className="grid gap-4 rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm sm:grid-cols-3">
          {accelerators.map((accelerator) => (
            <div key={accelerator} className="rounded-2xl border border-neutral-100 bg-neutral-50 p-5 text-sm font-medium text-neutral-700">
              {accelerator}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
