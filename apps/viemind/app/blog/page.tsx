import Link from "next/link";
import { PageHeader } from "@/components/ui/page-header";

const featuredPosts = [
  {
    title: "Designing AI copilots that teams actually adopt",
    excerpt:
      "A practical framework for bringing conversational AI into regulated enterprises without derailing adoption or compliance.",
    category: "AI & ML",
    date: "September 12, 2025",
  },
  {
    title: "The data lakehouse blueprint for Vietnamese enterprises",
    excerpt:
      "How to step beyond legacy warehouses and prepare for real-time analytics with a staged, value-driven approach.",
    category: "Data & Analytics",
    date: "August 28, 2025",
  },
  {
    title: "Reimagining CX in financial services with journey orchestration",
    excerpt:
      "Three case studies showing measurable uplift across activation, cross-sell, and retention metrics in under 6 months.",
    category: "Experience Strategy",
    date: "July 9, 2025",
  },
];

const resourceLibrary = [
  {
    title: "Responsible AI Playbook",
    type: "E-book",
    description:
      "Policy templates, capability maturity models, and use-case validation checklists tailored for APAC organisations.",
  },
  {
    title: "2025 State of Digital Transformation in Vietnam",
    type: "Industry Report",
    description:
      "Benchmark insights and investment signals from over 150 technology leaders across the region.",
  },
  {
    title: "DevOps North Star Metrics Workshop",
    type: "Webinar",
    description:
      "A 60-minute recorded session detailing how elite teams instrument delivery pipelines for transparency and speed.",
  },
  {
    title: "Service Blueprint Template",
    type: "Template",
    description:
      "Figma and Miro resources to map end-to-end experiences and identify automation opportunities.",
  },
];

const topics = [
  "AI & Machine Learning",
  "Experience Design",
  "Data Platforms",
  "Automation",
  "Product Leadership",
  "Cloud Engineering",
];

export default function BlogPage() {
  return (
    <div className="space-y-16 bg-[#F8F8F8] pb-20">
      <div className="mx-auto max-w-6xl px-6 pt-16">
        <PageHeader
          eyebrow="Insights"
          title="Ideas, frameworks, and resources for transformation leaders."
          description="Deep dives on technology trends, practical playbooks from recent engagements, and conversations with the practitioners shaping the next wave of digital experiences."
          actions={[
            { label: "Subscribe to newsletter", href: "/contact" },
            { label: "Submit a topic", href: "/contact", variant: "ghost" },
          ]}
        />
      </div>

      <section className="mx-auto max-w-6xl space-y-10 px-6">
        <header className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-neutral-500">
            Featured articles
          </p>
          <h2 className="text-3xl font-semibold text-neutral-900 sm:text-4xl">
            Stay ahead of the curve with practitioner-led insights.
          </h2>
        </header>
        <div className="grid gap-6 md:grid-cols-3">
          {featuredPosts.map((post) => (
            <article
              key={post.title}
              className="flex h-full flex-col rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500">
                {post.category}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-neutral-900">
                {post.title}
              </h3>
              <p className="mt-3 text-sm text-neutral-600">{post.excerpt}</p>
              <p className="mt-4 text-xs text-neutral-500">{post.date}</p>
              <Link href="#" className="mt-6 text-sm font-semibold text-neutral-900 transition hover:underline">
                Read article →
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-10 px-6">
        <header className="grid gap-3 lg:grid-cols-[0.45fr_0.55fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-neutral-500">
              Resource library
            </p>
            <h2 className="text-3xl font-semibold text-neutral-900 sm:text-4xl">
              Downloadable assets to guide your next initiative.
            </h2>
          </div>
          <p className="text-neutral-600">
            Curated reports, templates, and recorded events to help you champion transformation inside your organisation.
          </p>
        </header>
        <div className="grid gap-6 md:grid-cols-2">
          {resourceLibrary.map((resource) => (
            <article key={resource.title} className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500">
                {resource.type}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-neutral-900">
                {resource.title}
              </h3>
              <p className="mt-2 text-sm text-neutral-600">{resource.description}</p>
              <Link href="/contact" className="mt-4 inline-flex items-center text-sm font-semibold text-neutral-900 transition hover:underline">
                Request access →
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-10 px-6 pb-8">
        <header className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-neutral-500">
            Explore by topic
          </p>
          <h2 className="text-3xl font-semibold text-neutral-900 sm:text-4xl">
            Browse curated collections and go deeper.
          </h2>
        </header>
        <div className="flex flex-wrap gap-3">
          {topics.map((topic) => (
            <span
              key={topic}
              className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 shadow-sm"
            >
              {topic}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
