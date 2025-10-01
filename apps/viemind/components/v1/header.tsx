"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  "Services",
  "Capabilities",
  "Case Studies",
  "Insights",
  "Contact",
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? "bg-black/50 backdrop-blur" 
        : "bg-transparent"
    }`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
      <Link href="#" className="flex items-center gap-2">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#83FF8F] to-[#8E7FF0] text-lg font-semibold text-black">
          VM
        </span>
        <span className="text-lg text-white font-semibold">VieMind</span>
      </Link>
      <nav className="hidden items-center gap-10 text-sm font-medium text-white/70 lg:flex">
        {navItems.map((item) => (
          <Link
            key={item}
            href="#"
            className="transition hover:text-white"
          >
            {item}
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
  );
}
