import { useState } from "react";
import ProductCard from "../components/ProductCard";
import { PRODUCTS, CATEGORIES } from "../data/products";

export default function HomePage({ setPage, onAddToCart, onViewProduct }) {
  const [category, setCategory] = useState("All Category");
  const [search, setSearch] = useState("");

  const filtered = PRODUCTS.filter(
    (p) =>
      (category === "All Category" || p.category === category) &&
      (p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.notes.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div>
      {/* Hero Section */}
      <section
        className="min-h-[520px] flex items-center relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, rgba(26,18,8,0.85) 0%, rgba(80,55,15,0.6) 100%), url('https://images.unsplash.com/photo-1541643600914-78b084683702?w=1400&q=80') center/cover no-repeat",
        }}
      >
        <div
          className="mx-6 md:mx-16 rounded-3xl p-8 md:p-14 max-w-2xl"
          style={{
            background: "rgba(255,255,255,0.12)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          <h1 className="font-serif text-4xl md:text-6xl font-semibold text-white leading-tight mb-4">
            Perfume with<br />
            <em>Personality</em>
          </h1>
          <p className="text-white/80 text-sm md:text-base mb-8 max-w-md">
            Explore our curated collection of exquisite fragrances, crafted to capture your unique essence.
          </p>
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => setPage("collections")}
              className="bg-yellow-500 text-gray-900 font-semibold px-6 py-3 rounded-full hover:bg-yellow-400 transition-all text-sm"
            >
              Shop Now
            </button>
            <button
              onClick={() => setPage("ai")}
              className="text-white font-medium px-6 py-3 rounded-full text-sm border border-white/30 hover:bg-white/20 transition-all"
              style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)" }}
            >
              ✨ AI Scent Advisor
            </button>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        {/* Filters */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-8">
          {/* Category Dropdown */}
          <div className="relative">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="appearance-none bg-sky-400 text-white text-sm px-4 py-2.5 pr-8 rounded-full cursor-pointer focus:outline-none"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <svg className="absolute right-2.5 top-3 w-3 h-3 text-white pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {/* Search Bar */}
          <div className="flex flex-1 max-w-lg">
            <div className="relative flex-1">
              <svg className="absolute left-3 top-3 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Scent..."
                className="w-full pl-9 pr-4 py-2.5 border border-yellow-400/20 rounded-l-full text-sm focus:outline-none focus:border-yellow-400/50 bg-white"
              />
            </div>
            <button className="bg-sky-400 text-white px-5 py-2.5 rounded-r-full text-sm font-medium hover:bg-sky-500 transition-colors">
              Search
            </button>
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <p className="text-center text-gray-400 py-16">No fragrances found. Try a different search.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onAddToCart={onAddToCart}
                onView={onViewProduct}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}