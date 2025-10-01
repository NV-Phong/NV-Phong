import { PageHeader } from "@/components/ui/page-header";

const faqs = [
  {
    question: "What types of organisations does VieMind typically work with?",
    answer:
      "We partner with enterprises, high-growth scale-ups, and mission-driven public organisations across financial services, healthcare, energy, logistics, and retail. Projects range from strategic discovery to multi-year platforms.",
  },
  {
    question: "How do engagements usually kick off?",
    answer:
      "During a complimentary working session we clarify goals, constraints, and success metrics. From there we co-design an outcome sprint or squad model that fits your timeline and budget.",
  },
  {
    question: "Do you provide post-launch support?",
    answer:
      "Yes. We operate managed services, enablement programs, and advisory retainers tailored to your internal capabilities. Knowledge transfer and documentation are part of every engagement.",
  },
  {
    question: "How does VieMind approach AI responsibly?",
    answer:
      "We apply a responsible AI framework covering governance, data privacy, fairness assessments, and human-in-the-loop design. Each solution is audited against compliance and ethics requirements.",
  },
  {
    question: "Can you work with existing vendors or in-house teams?",
    answer:
      "Absolutely. Co-delivery is core to our model—we embed alongside your teams and partner ecosystem, establishing rituals and tooling that keep everyone aligned.",
  },
];

const categories = [
  {
    title: "Getting started",
    description: "Understand our engagement models, pricing, and collaboration styles.",
  },
  {
    title: "Services",
    description: "Learn how we activate strategy, delivery, and operations across the digital lifecycle.",
  },
  {
    title: "Support",
    description: "Discover how we stay with you post-launch and continue to evolve platforms together.",
  },
];

export default function FAQPage() {
  return (
    <div className="space-y-16 bg-[#F8F8F8] pb-20">
      <div className="mx-auto max-w-6xl px-6 pt-16">
        <PageHeader
          eyebrow="FAQ"
          title="Answers to the questions we hear most often."
          description="Have another? Reach out and we’ll respond within one business day."
          actions={[
            { label: "Contact support", href: "/contact" },
            { label: "See services", href: "/services", variant: "ghost" },
          ]}
        />
      </div>

      <section className="mx-auto max-w-6xl space-y-10 px-6">
        <header className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-neutral-500">
            Browse by category
          </p>
          <h2 className="text-3xl font-semibold text-neutral-900 sm:text-4xl">
            Start with the area you’re exploring.
          </h2>
        </header>
        <div className="grid gap-6 md:grid-cols-3">
          {categories.map((category) => (
            <article key={category.title} className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-neutral-900">{category.title}</h3>
              <p className="mt-2 text-sm text-neutral-600">{category.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl space-y-6 px-6 pb-8">
        <div className="space-y-3 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-neutral-500">
            Frequently asked questions
          </p>
          <h2 className="text-3xl font-semibold text-neutral-900 sm:text-4xl">
            Still curious? Here’s more detail.
          </h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm"
            >
              <summary className="cursor-pointer text-left text-lg font-semibold text-neutral-900 outline-none transition group-open:text-[#1A1A1A]">
                {faq.question}
              </summary>
              <p className="mt-3 text-sm text-neutral-600">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
