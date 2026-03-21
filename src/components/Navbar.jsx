import { useState } from "react";

export default function Navbar({ page, setPage, cartCount }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-yellow-400/20 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <button onClick={() => setPage("home")} className="flex items-baseline gap-0.5">
          <span className="font-serif text-3xl font-semibold text-gray-900">
            <span className="text-yellow-500">L</span>ady
          </span>
          <span className="font-serif text-lg italic text-gray-400 ml-1">Aroma House</span>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { key: "home", label: "Home" },
            { key: "collections", label: "Collections" },
            { key: "about", label: "About Us" },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setPage(key)}
              className={`text-sm font-sans tracking-wide transition-colors hover:text-yellow-500 ${
                page === key ? "text-yellow-500" : "text-gray-600"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setPage("contact")}
            className="hidden md:block bg-sky-400 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-sky-500 transition-colors"
          >
            Contact Us
          </button>

          {/* Cart */}
          <button onClick={() => setPage("cart")} className="relative p-2">
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-yellow-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Hamburger */}
          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-yellow-400/20 px-6 py-4 flex flex-col gap-4">
          {[
            { key: "home", label: "Home" },
            { key: "collections", label: "Collections" },
            { key: "about", label: "About Us" },
            { key: "contact", label: "Contact Us" },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => { setPage(key); setMenuOpen(false); }}
              className="text-left text-sm text-gray-600 hover:text-yellow-500 transition-colors"
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}