import { PageHeader } from "@/components/ui/page-header";

const differentiators = [
  {
    title: "Deep expertise",
    description:
      "Seasoned strategists, designers, and engineers with experience across financial services, healthcare, energy, and retail transformation programs.",
  },
  {
    title: "Custom solutions",
    description:
      "Every engagement begins with business outcomes and is tailored to the unique operational, technical, and cultural context of the organisation.",
  },
  {
    title: "Advanced technology",
    description:
      "From AI copilots to composable architectures, we pilot and productionise the latest technologies with a pragmatic, security-first lens.",
  },
  {
    title: "Comprehensive support",
    description:
      "Partner from strategy through launch and beyond—governance, maintenance, and growth enablement are built into every statement of work.",
  },
  {
    title: "Cost optimisation",
    description:
      "Transparent pricing models, automated delivery accelerators, and reusable IP ensure maximum ROI per sprint.",
  },
  {
    title: "Fast turnaround",
    description:
      "Integrated squads with proven operating rituals compress discovery, validation, and launch cycles without sacrificing quality.",
  },
];

const milestones = [
  { year: "2017", title: "VieMind founded", summary: "Started as a boutique innovation studio partnering with early-stage scale-ups in Ho Chi Minh City." },
  { year: "2019", title: "Regional expansion", summary: "Delivered complex service modernisation programs for insurers and logistics enterprises across SEA." },
  { year: "2021", title: "AI & Data practice", summary: "Established a specialised team focused on applied AI, data platforms, and responsible governance frameworks." },
  { year: "2024", title: "Global partner network", summary: "Launched co-delivery alliances with hyperscalers, design studios, and integration vendors in Europe and North America." },
];

const values = [
  {
    title: "Innovation",
    description: "We experiment boldly, validate quickly, and scale what matters—every sprint produces learnings and measurable value.",
  },
  {
    title: "Quality",
    description: "Craftsmanship shows up in every artifact, from system architecture to micro-interactions and change management decks.",
  },
  {
    title: "Trust",
    description: "Transparency, open retros, and clear documentation keep stakeholders aligned and confident at each milestone.",
  },
  {
    title: "Collaboration",
    description: "We embed with your teams, share rituals, and co-own outcomes—success is built together.",
  },
  {
    title: "Learning",
    description: "Continuous improvement loops, guild sessions, and knowledge hubs ensure teams stay current and future-ready.",
  },
];

const leaders = [
  {
    name: "Linh Tran",
    role: "Founder & Chief Executive Officer",
    bio: "Former transformation lead at regional banks. Champions human-centred innovation and cross-border delivery excellence.",
  },
  {
    name: "Quang Nguyen",
    role: "Chief Technology Officer",
    bio: "Architect of large-scale platform migrations and AI infrastructure for regulated industries across APAC.",
  },
  {
    name: "Mai Pham",
    role: "Chief Experience Officer",
    bio: "Design leader with two decades across agency and client-side roles, focused on inclusive product ecosystems.",
  },
  {
    name: "Bryce Allen",
    role: "VP, Delivery & Operations",
    bio: "Scaled hybrid nearshore/offshore models and DevEx accelerators for Fortune 500 clients.",
  },
];

const partners = [
  "Aurora Mobility",
  "Northwind Health",
  "Helix Labs",
  "Atlas Financial",
  "Futura Logistics",
  "Nova Retail",
];

const news = [
  {
    title: "VieMind named Google Cloud Services Partner of the Year",
    date: "Aug 25, 2025",
    category: "Awards & Certifications",
  },
  {
    title: "Launching the Responsible AI Playbook for APAC enterprises",
    date: "Jul 10, 2025",
    category: "Press Release",
  },
  {
    title: "VieMind hosts CX Innovation Summit in Hanoi",
    date: "May 18, 2025",
    category: "Events & Seminars",
  },
];

export default function AboutPage() {
  return (
    <div className="space-y-16 bg-[#F8F8F8] pb-20">
      <div className="mx-auto max-w-6xl px-6 pt-16">
        <PageHeader
          eyebrow="About"
          title="We are a transformation partner for organisations that need to move faster and smarter."
          description="VieMind exists to help Vietnamese and regional enterprises design visionary experiences, engineer resilient platforms, and scale impact. Our mission is to pair deep craft with measurable outcomes across every engagement."
          actions={[
            { label: "Explore our services", href: "/services" },
            { label: "Meet the team", href: "#leadership", variant: "ghost" },
          ]}
        />
      </div>

      <section className="mx-auto max-w-6xl space-y-10 px-6">
        <header className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-neutral-500">
            Why choose VieMind
          </p>
          <h2 className="text-3xl font-semibold text-neutral-900 sm:text-4xl">
            Distinct advantages you can activate from the first sprint.
          </h2>
          <p className="max-w-3xl text-neutral-600">
            From co-creating AI strategy to accelerating cloud-native launches, we bring a full stack of capabilities and a bias toward action.
          </p>
        </header>
        <div className="grid gap-6 md:grid-cols-2">
          {differentiators.map((item) => (
            <article
              key={item.title}
              className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <h3 className="text-lg font-semibold text-neutral-900">{item.title}</h3>
              <p className="mt-2 text-sm text-neutral-600">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-10 px-6">
        <header className="grid gap-3 lg:grid-cols-[0.5fr_0.5fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-neutral-500">
              Our story & mission
            </p>
            <h2 className="text-3xl font-semibold text-neutral-900 sm:text-4xl">
              Built to champion sustainable digital transformation.
            </h2>
          </div>
          <p className="text-neutral-600">
            We help Vietnamese businesses harness technology confidently. Our mission is to co-create solutions that unlock growth, strengthen resilience, and empower teams long after launch.
          </p>
        </header>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {milestones.map((milestone) => (
            <div
              key={milestone.year}
              className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500">
                {milestone.year}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-neutral-900">
                {milestone.title}
              </h3>
              <p className="mt-2 text-sm text-neutral-600">{milestone.summary}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-10 px-6">
        <header className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-neutral-500">
            Vision & values
          </p>
          <h2 className="text-3xl font-semibold text-neutral-900 sm:text-4xl">
            Our vision is to be the region’s most trusted digital transformation partner.
          </h2>
          <p className="max-w-3xl text-neutral-600">
            Every decision is anchored by the values that define our culture and the experiences we build with clients.
          </p>
        </header>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {values.map((value) => (
            <div
              key={value.title}
              className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-neutral-900">{value.title}</h3>
              <p className="mt-2 text-sm text-neutral-600">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="leadership" className="mx-auto max-w-6xl space-y-10 px-6">
        <header className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-neutral-500">
            Leadership team
          </p>
          <h2 className="text-3xl font-semibold text-neutral-900 sm:text-4xl">
            Guided by leaders who bridge vision with disciplined delivery.
          </h2>
        </header>
        <div className="grid gap-6 md:grid-cols-2">
          {leaders.map((leader) => (
            <article
              key={leader.name}
              className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-neutral-900">{leader.name}</h3>
              <p className="text-sm font-medium text-neutral-500">{leader.role}</p>
              <p className="mt-4 text-sm text-neutral-600">{leader.bio}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-10 px-6">
        <header className="grid gap-3 lg:grid-cols-[0.45fr_0.55fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-neutral-500">
              Partners & clients
            </p>
            <h2 className="text-3xl font-semibold text-neutral-900 sm:text-4xl">
              Trusted by ambitious teams across industries.
            </h2>
          </div>
          <p className="text-neutral-600">
            We co-create with enterprises, scale-ups, and public sector innovators—building lasting relationships grounded in results and respect.
          </p>
        </header>
        <div className="grid gap-4 rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm sm:grid-cols-3">
          {partners.map((partner) => (
            <div key={partner} className="flex items-center justify-center rounded-2xl border border-neutral-100 bg-neutral-50 p-6 text-sm font-semibold text-neutral-600">
              {partner}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-10 px-6 pb-8">
        <header className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-neutral-500">
            News & events
          </p>
          <h2 className="text-3xl font-semibold text-neutral-900 sm:text-4xl">
            Stay updated with what we’re building and celebrating.
          </h2>
        </header>
        <div className="grid gap-6 md:grid-cols-3">
          {news.map((item) => (
            <article key={item.title} className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500">
                {item.category}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-neutral-900">{item.title}</h3>
              <p className="mt-2 text-xs text-neutral-500">{item.date}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
