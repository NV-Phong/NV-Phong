import { PageHeader } from "@/components/ui/page-header";

const adminModules = [
  {
    title: "Content management",
    description:
      "Manage homepage hero copy, service descriptions, featured projects, team bios, and partner showcases from a single workspace.",
    capabilities: [
      "Drag-and-drop media library",
      "CTA button configuration",
      "Localization-ready fields",
    ],
  },
  {
    title: "Blog & news",
    description:
      "Create, schedule, and optimise articles with rich text editing, SEO tooling, and comment workflows.",
    capabilities: [
      "WYSIWYG editor with media embeds",
      "Category & tag management",
      "Publishing calendar",
    ],
  },
  {
    title: "Recruitment",
    description:
      "Publish new roles, manage applicants, and keep culture content current to attract top talent.",
    capabilities: [
      "Job posting templates",
      "Resume inbox and notes",
      "Status tracking & notifications",
    ],
  },
  {
    title: "Contact & leads",
    description:
      "View form submissions, sync to CRM, and orchestrate email nurture campaigns.",
    capabilities: [
      "Lead tagging and assignment",
      "CRM integrations",
      "Newsletter composer",
    ],
  },
  {
    title: "Analytics & reporting",
    description:
      "Monitor site health, funnel performance, and marketing attribution in real time.",
    capabilities: [
      "Google Analytics dashboards",
      "Conversion & bounce insights",
      "Lead source breakdowns",
    ],
  },
  {
    title: "System settings",
    description:
      "Stay secure and on-brand with admin controls for users, branding, SEO, and performance.",
    capabilities: [
      "Role-based permissions",
  "Logo, favicon, and contact info",
      "Backup scheduling",
    ],
  },
];

const seoToolkit = [
  "On-page meta editor",
  "Structured data controls",
  "SEO score and keyword density",
  "Core Web Vitals monitoring",
  "Google Search Console integration",
  "Local SEO management (Google Business Profile)",
];

export default function AdminPage() {
  return (
    <div className="space-y-16 bg-[#0F0F0F] pb-20 text-white">
      <div className="mx-auto max-w-6xl px-6 pt-16">
        <PageHeader
          eyebrow="Admin Panel"
          title="Operate VieMind.com with confidence and flexibility."
          description="Secure tools for administrators to publish content, manage leads, track performance, and tune the digital experience—no engineering ticket required."
          actions={[
            { label: "Sign in", href: "#", variant: "secondary" },
            { label: "Request access", href: "/contact", variant: "ghost" },
          ]}
        />
      </div>

      <section className="mx-auto max-w-6xl space-y-10 px-6">
        <header className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/60">
            Administration modules
          </p>
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">
            Everything you need to orchestrate content and performance.
          </h2>
        </header>
        <div className="grid gap-6 md:grid-cols-2">
          {adminModules.map((module) => (
            <article
              key={module.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-sm backdrop-blur"
            >
              <h3 className="text-lg font-semibold text-white">{module.title}</h3>
              <p className="mt-2 text-sm text-white/70">{module.description}</p>
              <ul className="mt-4 space-y-2 text-sm text-white/70">
                {module.capabilities.map((capability) => (
                  <li key={capability} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#83FF8F]" />
                    <span>{capability}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-10 px-6 pb-8">
        <header className="grid gap-3 lg:grid-cols-[0.45fr_0.55fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/60">
              SEO & performance toolkit
            </p>
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">
              Built-in optimisation features keep the site fast and findable.
            </h2>
          </div>
          <p className="text-white/70">
            Administrators can fine-tune SEO, monitor Core Web Vitals, and ensure every page meets brand and accessibility guidelines.
          </p>
        </header>
        <div className="grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-sm backdrop-blur sm:grid-cols-2">
          {seoToolkit.map((item) => (
            <div key={item} className="flex gap-3 text-sm text-white/80">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#F0DE7F]" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
