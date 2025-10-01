import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "VieMind unlocked a product vision we'd been circling for years. Their squad executed with a founder's urgency and a craft studio's attention to detail.",
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

export function TestimonialsSection() {
  return (
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
            href="#"
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
                "{testimonial.quote}"
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
  );
}
