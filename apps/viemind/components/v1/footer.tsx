import Link from "next/link";

const footerLinks = [
  {
    title: "Company",
    links: ["About", "Careers", "Diversity", "Press"],
  },
  {
    title: "Expertise",
    links: ["Experience Strategy", "Platform Engineering", "AI Studio", "Transformation"],
  },
  {
    title: "Resources",
    links: ["Insights", "Events", "Playbooks", "Newsletter"],
  },
];

export function Footer() {
  return (
    <footer className="bg-[#111111] py-16 text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[0.4fr_0.6fr]">
        <div className="space-y-6">
          <Link href="#" className="flex items-center gap-2 text-xl font-semibold">
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
            <Link href="#" className="transition hover:text-white">
              hello@viemind.com
            </Link>
            <span>•</span>
            <Link href="#" className="transition hover:text-white">
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
                  <li key={link}>
                    <Link href="#" className="transition hover:text-white">
                      {link}
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
  );
}
