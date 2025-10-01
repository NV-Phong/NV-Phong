import { PageHeader } from "@/components/ui/page-header";

const contactDetails = [
  {
    label: "Headquarters",
    value: "Level 12, Innovation Tower, 123 Nguyen Hue, District 1, Ho Chi Minh City",
  },
  {
    label: "Phone",
    value: "+84 28 1234 5678",
  },
  {
    label: "Email",
    value: "hello@viemind.com",
  },
  {
    label: "Office hours",
    value: "Mon – Fri, 8:30 AM – 6:00 PM ICT",
  },
];

const supportChannels = [
  {
    title: "Partnerships",
    description: "Discuss collaborations, alliances, or media opportunities.",
    email: "partners@viemind.com",
  },
  {
    title: "Project enquiries",
    description: "Share your brief and we’ll assemble the right squad within 48 hours.",
    email: "projects@viemind.com",
  },
  {
    title: "Support",
    description: "Existing clients can reach our 24/7 operations desk for assistance.",
    email: "support@viemind.com",
  },
];

export default function ContactPage() {
  return (
    <div className="space-y-16 bg-[#F8F8F8] pb-20">
      <div className="mx-auto max-w-6xl px-6 pt-16">
        <PageHeader
          eyebrow="Contact"
          title="Let’s design the next milestone together."
          description="Share a little about your ambitions and we’ll connect you with a VieMind partner to explore possibilities, scope outcomes, and map a path forward."
          actions={[
            { label: "Schedule a consultation", href: "mailto:projects@viemind.com" },
            { label: "Download capabilities", href: "/services", variant: "ghost" },
          ]}
        />
      </div>

      <section className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[0.6fr_0.4fr]">
        <form className="space-y-6 rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
          <div>
            <h2 className="text-2xl font-semibold text-neutral-900">
              Tell us about your initiative
            </h2>
            <p className="mt-2 text-sm text-neutral-600">
              Provide a few details and our team will respond within one business day.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <label className="space-y-2 text-sm font-medium text-neutral-700">
              Full name
              <input
                type="text"
                name="name"
                placeholder="Nguyen Van A"
                className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 outline-none focus:border-[#83FF8F] focus:ring-2 focus:ring-[#83FF8F]/40"
              />
            </label>
            <label className="space-y-2 text-sm font-medium text-neutral-700">
              Work email
              <input
                type="email"
                name="email"
                placeholder="you@company.com"
                className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 outline-none focus:border-[#83FF8F] focus:ring-2 focus:ring-[#83FF8F]/40"
              />
            </label>
            <label className="space-y-2 text-sm font-medium text-neutral-700">
              Company name
              <input
                type="text"
                name="company"
                placeholder="Company"
                className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 outline-none focus:border-[#83FF8F] focus:ring-2 focus:ring-[#83FF8F]/40"
              />
            </label>
            <label className="space-y-2 text-sm font-medium text-neutral-700">
              Project timeline
              <select
                name="timeline"
                className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 outline-none focus:border-[#83FF8F] focus:ring-2 focus:ring-[#83FF8F]/40"
              >
                <option value="">Select timeline</option>
                <option value="urgent">Within 1 month</option>
                <option value="one-quarter">1–3 months</option>
                <option value="half-year">3–6 months</option>
                <option value="flexible">Exploratory / flexible</option>
              </select>
            </label>
          </div>
          <label className="space-y-2 text-sm font-medium text-neutral-700">
            How can we help?
            <textarea
              name="project-details"
              rows={4}
              placeholder="Share goals, challenges, or questions we can prepare for."
              className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 outline-none focus:border-[#83FF8F] focus:ring-2 focus:ring-[#83FF8F]/40"
            />
          </label>
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-full bg-[#83FF8F] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#72f283]"
          >
            Submit enquiry
          </button>
          <p className="text-xs text-neutral-500">
            By submitting, you consent to VieMind storing your information to respond to your enquiry. See our privacy policy for details.
          </p>
        </form>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-neutral-900">Contact details</h2>
            <div className="mt-4 space-y-4 text-sm text-neutral-600">
              {contactDetails.map((item) => (
                <div key={item.label}>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500">
                    {item.label}
                  </p>
                  <p className="mt-1">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-neutral-900">Talk to a specialist</h2>
            <div className="mt-4 space-y-4 text-sm text-neutral-600">
              {supportChannels.map((channel) => (
                <div key={channel.title}>
                  <p className="text-sm font-semibold text-neutral-900">{channel.title}</p>
                  <p className="text-sm text-neutral-600">{channel.description}</p>
                  <a
                    href={`mailto:${channel.email}`}
                    className="mt-1 inline-flex text-sm font-semibold text-neutral-900 transition hover:underline"
                  >
                    {channel.email}
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
            <div className="h-56 w-full bg-gradient-to-br from-[#8E7FF0]/40 via-[#83FF8F]/20 to-[#F0DE7F]/30" />
            <div className="p-6 text-sm text-neutral-600">
              <p className="font-semibold text-neutral-900">Visit our studio</p>
              <p className="mt-2">
                Find us in the heart of District 1. Parking is available onsite and we’re a five-minute walk from Nguyen Hue station.
              </p>
              <a
                href="https://maps.google.com"
                className="mt-4 inline-flex text-sm font-semibold text-neutral-900 transition hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                View on Google Maps →
              </a>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
