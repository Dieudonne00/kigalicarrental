"use client";

import { useState, useEffect } from "react";

const FILTERS = [
  { label: "All Vehicles", value: "all" },
  { label: "SUV", value: "suv" },
  { label: "Luxury", value: "luxury" },
  { label: "Van", value: "van" },
  { label: "Sedan", value: "sedan" },
];

// Deliberately not a full React-rendered filter: the fleet grid is large
// (25 static server-rendered cards), so this toggles visibility via direct
// DOM manipulation instead of conditionally rendering the whole card list,
// keeping this "use client" island's hydration cost tiny (just 5 buttons)
// instead of hydrating every card.
export default function FleetFilterTabs() {
  const [active, setActive] = useState("all");

  useEffect(() => {
    const grid = document.getElementById("fleet-grid");
    if (!grid) return;
    const cards = grid.querySelectorAll<HTMLElement>("[data-category]");
    let visibleCount = 0;
    cards.forEach((card) => {
      const match = active === "all" || card.dataset.category === active;
      card.style.display = match ? "" : "none";
      if (match) visibleCount++;
    });
    const emptyMsg = document.getElementById("fleet-empty-msg");
    if (emptyMsg) emptyMsg.style.display = visibleCount === 0 ? "" : "none";
  }, [active]);

  return (
    <div className="flex gap-2 flex-wrap justify-center mb-8 md:mb-10">
      {FILTERS.map((f) => (
        <button
          key={f.value}
          type="button"
          onClick={() => setActive(f.value)}
          className={`px-5 py-2.5 rounded-lg text-sm font-semibold border transition-all ${
            active === f.value
              ? "bg-[#1e3a8a] text-white border-[#1e3a8a]"
              : "bg-white text-gray-600 border-gray-200 hover:border-[#1e3a8a] hover:text-[#1e3a8a]"
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
