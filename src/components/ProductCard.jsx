import { useState } from "react";
import StarRating from "./StarRating";

export default function ProductCard({ product, onAddToCart, onView }) {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-yellow-400/10 cursor-pointer group transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-yellow-400/10">
      
      {/* Image */}
      <div className="relative overflow-hidden bg-amber-50 h-52" onClick={() => onView(product)}>
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-white/90 text-xs px-2 py-1 rounded-full text-gray-500 border border-yellow-400/20">
          {product.category}
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-1">
          <h3 className="font-serif text-lg font-semibold text-gray-900">{product.name}</h3>
          <span className="text-sm font-semibold text-gray-900 ml-2">${product.price.toLocaleString()}</span>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <StarRating rating={product.rating} />
          <span className="text-xs text-gray-400">
            {product.rating} ({product.reviews >= 1000 ? (product.reviews / 1000).toFixed(0) + "k" : product.reviews} Reviews)
          </span>
        </div>

        <p className="text-xs text-gray-400 mb-4 truncate">{product.notes}</p>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleAdd}
            className={`flex-1 flex items-center justify-center gap-1.5 border text-xs font-medium py-2 rounded-full transition-colors ${
              added
                ? "border-green-400 text-green-600 bg-green-50"
                : "border-yellow-400/40 text-gray-800 hover:bg-yellow-50"
            }`}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {added ? "Added!" : "Add to Cart"}
          </button>

          <button
            onClick={() => onView(product)}
            className="flex-1 flex items-center justify-center gap-1.5 bg-amber-400 text-white text-xs font-medium py-2 rounded-full hover:bg-amber-550 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}