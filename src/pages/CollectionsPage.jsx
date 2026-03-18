import { useState } from "react";
import ProductCard from "../components/ProductCard";
import { PRODUCTS, CATEGORIES } from "../data/products";

export default function CollectionsPage({ onAddToCart, onViewProduct }) {
  const [category, setCategory] = useState("All Category");

  const filtered = PRODUCTS.filter(
    (p) => category === "All Category" || p.category === category
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-sm text-yellow-500 uppercase tracking-widest mb-2">Our Fragrances</p>
        <h2 className="font-serif text-4xl md:text-5xl font-semibold text-gray-900">The Full Collection</h2>
        <p className="text-gray-400 mt-3 max-w-xl mx-auto text-sm">
          Every bottle tells a story. Find the scent that speaks to yours.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-3 justify-center mb-10 flex-wrap">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`text-sm px-5 py-2 rounded-full border transition-colors ${
              category === c
                ? "bg-yellow-500 text-white border-yellow-500"
                : "border-yellow-400/30 text-gray-400 hover:border-yellow-400/60"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Product Grid */}
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
    </div>
  );
}