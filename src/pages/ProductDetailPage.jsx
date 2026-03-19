import { useState } from "react";
import StarRating from "../components/StarRating";

export default function ProductDetailPage({ product, onAddToCart, setPage }) {
  const [added, setAdded] = useState(false);

  if (!product) return (
    <div className="text-center py-20 text-gray-400">
      No product selected.{" "}
      <button onClick={() => setPage("collections")} className="text-yellow-500 underline">
        Browse collections
      </button>
    </div>
  );

  const handleAdd = () => {
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-14">
      {/* Back Button */}
      <button
        onClick={() => setPage("collections")}
        className="flex items-center gap-2 text-gray-400 text-sm mb-8 hover:text-yellow-500 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Collections
      </button>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <div className="rounded-3xl overflow-hidden bg-amber-50 aspect-square">
          <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
        </div>

        {/* Details */}
        <div>
          <span className="text-xs uppercase tracking-widest text-sky-400 mb-2 block">{product.category}</span>
          <h1 className="font-serif text-4xl font-semibold text-gray-900 mb-3">{product.name}</h1>

          <div className="flex items-center gap-3 mb-4">
            <StarRating rating={product.rating} />
            <span className="text-sm text-gray-400">
              {product.rating} · {product.reviews.toLocaleString()} Reviews
            </span>
          </div>

          <p className="text-gray-400 text-sm mb-6 leading-relaxed">{product.desc}</p>

          <div className="bg-amber-50 rounded-2xl p-4 mb-6">
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Scent Notes</p>
            <p className="font-serif text-lg text-gray-900 italic">{product.notes}</p>
          </div>

          <div className="mb-8">
            <span className="font-serif text-3xl font-semibold text-gray-900">
              ${product.price.toLocaleString()}
            </span>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleAdd}
              className={`flex-1 py-3 rounded-full font-medium text-sm border transition-colors ${
                added
                  ? "border-green-400 text-green-600 bg-green-50"
                  : "border-yellow-400/40 text-gray-800 hover:bg-yellow-50"
              }`}
            >
              {added ? "✓ Added to Cart" : "Add to Cart"}
            </button>
            <button
              onClick={handleAdd}
              className="flex-1 py-3 rounded-full bg-yellow-500 text-white font-medium text-sm hover:bg-yellow-400 transition-colors"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}