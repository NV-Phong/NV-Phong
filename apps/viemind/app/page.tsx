"use client";

import Link from "next/link";
import {
  ArrowRight,
  Check,
  LucideIcon,
  MoveRight,
  Sparkles,
  Star,
} from "lucide-react";
import { type ReactNode, useEffect, useState } from "react";

type PillProps = {
  icon?: LucideIcon;
  children: ReactNode;
};

const navItems = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
  { label: "FAQ", href: "/faq" },
  { label: "Admin", href: "/admin" },
  { label: "Contact", href: "/contact" },
];

const heroMetrics = [
  { label: "Strategic transformations", value: "120+" },
  { label: "Experience-led designers", value: "48" },
  { label: "Fortune 500 partners", value: "27" },
];

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

const testimonials = [
  {
    quote:
      "VieMind unlocked a product vision we’d been circling for years. Their squad executed with a founder’s urgency and a craft studio’s attention to detail.",
    author: "Riya Banerjee",
    role: "Chief Digital Officer, Atlas Financial",
  },
  {
    quote:
      "From discovery to launch, they embedded with our teams, automated the boring parts, and left a playbook we now run every quarter.",
    author: "Marco Esposito",
    role: "VP Engineering, Helix Labs",
  },
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

const footerLinks = [
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/about" },
      { label: "Diversity", href: "/careers" },
    ],
  },
  {
    title: "Expertise",
    links: [
      { label: "Experience Strategy", href: "/services" },
      { label: "Platform Engineering", href: "/services" },
      { label: "AI Studio", href: "/services" },
      { label: "Transformation", href: "/services" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Insights", href: "/blog" },
      { label: "Events", href: "/blog" },
      { label: "Playbooks", href: "/services" },
      { label: "Newsletter", href: "/contact" },
    ],
  },
];


function AccentPill({ icon: Icon, children }: PillProps) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-sm font-medium text-white backdrop-blur">
      {Icon ? <Icon size={16} /> : null}
      {children}
    </span>
  );
}

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-[#F8F8F8] text-neutral-900">
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "border-b border-white/10 bg-black/75 backdrop-blur"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-4 text-white">
          <Link href="#" className="flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#83FF8F] to-[#8E7FF0] text-lg font-semibold text-black">
              VM
            </span>
            <span className="text-lg font-semibold">VieMind</span>
          </Link>
          <nav className="hidden items-center gap-8 text-sm font-medium text-white/70 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            href="#"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
          >
            Start a project
            <ArrowRight size={16} />
          </Link>
        </div>
      </header>

      <div className="relative isolate overflow-hidden bg-[#1A1A1A] pb-24 pt-40 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-20 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-gradient-to-br from-[#8E7FF0]/40 via-[#83FF8F]/20 to-transparent blur-3xl" />
          <div className="absolute -left-32 top-40 h-64 w-64 rotate-6 rounded-3xl bg-gradient-to-br from-[#F0DE7F]/40 via-[#FEEA9D]/30 to-transparent blur-[120px]" />
          <div className="absolute -right-40 bottom-10 h-[420px] w-[420px] -rotate-12 rounded-3xl bg-gradient-to-br from-[#83FF8F]/30 via-[#8E7FF0]/20 to-transparent blur-3xl" />
        </div>

        <main className="relative mx-auto flex max-w-6xl flex-col gap-16 px-6">
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
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-[#83FF8F] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#72f283]"
                >
                  Book a working session
                  <MoveRight size={16} />
                </Link>
                <Link
                  href="/services"
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
        </main>
      </div>

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
                  href="/services"
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

      <section className="bg-[#F5F5F5] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-neutral-500">
                Voices
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-neutral-900 sm:text-4xl">
                Partners talk about working with VieMind.
              </h2>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-900 transition hover:gap-3"
            >
              Browse all stories
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {testimonials.map((testimonial) => (
              <figure
                key={testimonial.author}
                className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm"
              >
                <div className="absolute -top-10 right-6 h-24 w-24 rounded-full bg-gradient-to-br from-[#83FF8F]/40 via-[#8E7FF0]/40 to-transparent blur-2xl" />
                <Star size={32} className="mb-6 text-[#F0DE7F]" />
                <blockquote className="text-lg text-neutral-700">
                  “{testimonial.quote}”
                </blockquote>
                <figcaption className="mt-6 text-sm">
                  <div className="font-semibold text-neutral-900">
                    {testimonial.author}
                  </div>
                  <div className="text-neutral-500">{testimonial.role}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-neutral-900 py-20 text-white">
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#1A1A1A]" />
        <div className="absolute -left-16 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#83FF8F]/50 via-transparent to-transparent blur-3xl" />
        <div className="absolute -right-12 top-10 h-48 w-48 rounded-full bg-gradient-to-br from-[#8E7FF0]/40 via-transparent to-transparent blur-3xl" />
        <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-8 px-6 text-center">
          <AccentPill icon={Sparkles}>Let’s build what’s next</AccentPill>
          <h2 className="text-3xl font-semibold sm:text-4xl">
            Bring us your boldest initiative. We’ll help you design it, build it,
            and scale it.
          </h2>
          <p className="max-w-2xl text-white/70">
            Share your brief and we’ll assemble a bespoke squad to co-create the
            roadmap, stand up the stack, and launch with confidence in eight
            weeks or less.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-[#83FF8F] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#72f283]"
            >
              Schedule an intro call
              <MoveRight size={16} />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              Get the transformation playbook
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-[#111111] py-16 text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[0.4fr_0.6fr]">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 text-xl font-semibold">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#83FF8F] to-[#8E7FF0] text-lg font-semibold text-black">
                VM
              </span>
              VieMind
            </Link>
            <p className="text-sm text-white/60">
              VieMind partners with ambitious leaders to design, ship, and scale
              products that matter.
            </p>
            <div className="flex gap-4 text-sm text-white/60">
              <Link href="mailto:hello@viemind.com" className="transition hover:text-white">
                hello@viemind.com
              </Link>
              <span>•</span>
              <Link href="tel:+14155550132" className="transition hover:text-white">
                +1 (415) 555-0132
              </Link>
            </div>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {footerLinks.map((column) => (
              <div key={column.title} className="space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-[0.28em] text-white/50">
                  {column.title}
                </h3>
                <ul className="space-y-3 text-sm text-white/70">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="transition hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mx-auto mt-12 flex max-w-6xl flex-col gap-4 px-6 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} VieMind. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="transition hover:text-white">
              Privacy
            </Link>
            <Link href="#" className="transition hover:text-white">
              Terms
            </Link>
            <Link href="#" className="transition hover:text-white">
              Accessibility
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
