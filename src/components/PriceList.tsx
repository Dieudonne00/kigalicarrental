interface CategoryPrice {
  category: string;
  fromDaily: number;
  fromWeekly: number | null;
  fromMonthly: number | null;
  example: string;
}

const CATEGORY_LABELS: Record<string, string> = {
  sedan: "Economy Sedan",
  suv: "SUV & 4x4",
  luxury: "Luxury / Land Cruiser",
  van: "Van & Minibus",
  economy: "Economy",
};

export default function PriceList({ prices }: { prices: CategoryPrice[] }) {
  if (prices.length === 0) return null;

  return (
    <section className="py-14 md:py-20 bg-gray-50 border-t border-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-10">
          <span className="inline-block text-[#1e3a8a] text-xs font-bold uppercase tracking-widest mb-3">
            Pricing
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-plus-jakarta)]">
            Kigali Car Rental Price List
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Real rates from our current fleet — no hidden fees, insurance included.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#1e3a8a] text-white text-left">
                  <th className="px-4 md:px-6 py-3 font-bold">Vehicle Category</th>
                  <th className="px-4 md:px-6 py-3 font-bold">Daily</th>
                  <th className="px-4 md:px-6 py-3 font-bold hidden sm:table-cell">Weekly</th>
                  <th className="px-4 md:px-6 py-3 font-bold hidden md:table-cell">Monthly</th>
                  <th className="px-4 md:px-6 py-3 font-bold hidden md:table-cell">Example</th>
                </tr>
              </thead>
              <tbody>
                {prices.map((p, i) => (
                  <tr key={p.category} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-4 md:px-6 py-4 font-semibold text-gray-900">
                      {CATEGORY_LABELS[p.category] || p.category}
                    </td>
                    <td className="px-4 md:px-6 py-4 font-bold text-[#1e3a8a]">from ${p.fromDaily}</td>
                    <td className="px-4 md:px-6 py-4 text-gray-600 hidden sm:table-cell">
                      {p.fromWeekly ? `from $${p.fromWeekly}` : "—"}
                    </td>
                    <td className="px-4 md:px-6 py-4 text-gray-600 hidden md:table-cell">
                      {p.fromMonthly ? `from $${p.fromMonthly}` : "—"}
                    </td>
                    <td className="px-4 md:px-6 py-4 text-gray-500 hidden md:table-cell">{p.example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 md:px-6 py-4 bg-gray-50 border-t border-gray-100 text-xs text-gray-500">
            Prices reflect current fleet availability and may vary by vehicle condition and season. All Kigali car rental rates include comprehensive insurance and free hotel delivery in Kigali.
          </div>
        </div>
      </div>
    </section>
  );
}
