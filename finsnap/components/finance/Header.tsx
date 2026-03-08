"use client";

import { useState } from "react";

type View = "dashboard" | "add" | "budgets";

interface HeaderProps {
  view: View;
  onNavigate: (view: View) => void;
}

const navItems: { label: string; view: View }[] = [
  { label: "Overview", view: "dashboard" },
  { label: "+ Add",    view: "add"       },
  { label: "Budgets",  view: "budgets"   },
];

export function Header({ view, onNavigate }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigate = (v: View) => {
    onNavigate(v);
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-ink">
      <div className="px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <div className="font-display text-xl text-paper tracking-tight">
          Fin<span className="text-warning">·</span>Snap
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-1">
          {navItems.map((item) => (
            <button
              key={item.view}
              onClick={() => handleNavigate(item.view)}
              className={`
                px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200
                ${view === item.view
                  ? "bg-warning text-ink"
                  : "text-muted hover:text-paper"
                }
              `}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="md:hidden flex flex-col gap-1.5 p-2 -mr-2"
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-0.5 bg-paper rounded-full transition-all duration-300
            ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span className={`block w-5 h-0.5 bg-paper rounded-full transition-all duration-300
            ${menuOpen ? "opacity-0" : ""}`}
          />
          <span className={`block w-5 h-0.5 bg-paper rounded-full transition-all duration-300
            ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      {/* Mobile dropdown */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out
        ${menuOpen ? "max-h-48" : "max-h-0"}`}
      >
        <nav className="px-4 pb-4 flex flex-col gap-1">
          {navItems.map((item) => (
            <button
              key={item.view}
              onClick={() => handleNavigate(item.view)}
              className={`
                w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium
                transition-all duration-200
                ${view === item.view
                  ? "bg-warning text-ink"
                  : "text-muted hover:text-paper hover:bg-white/5"
                }
              `}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}