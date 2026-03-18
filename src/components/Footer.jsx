export default function Footer({ setPage }) {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">

        {/* Brand */}
        <div>
          <div className="flex items-baseline gap-0.5 mb-3">
            <span className="font-serif text-2xl font-semibold">
              <span className="text-yellow-400">S</span>cent
            </span>
            <span className="font-serif text-base italic text-white/40 ml-1">ational</span>
          </div>
          <p className="text-xs text-white/50 leading-relaxed">
            Exquisite fragrances crafted to capture your unique essence.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <p className="text-xs uppercase tracking-widest text-yellow-400 mb-4">Quick Links</p>
          <div className="flex flex-col gap-2">
            {[
              { key: "home", label: "Home" },
              { key: "collections", label: "Collections" },
              { key: "ai", label: "AI Advisor" },
              { key: "contact", label: "Contact" },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setPage(key)}
                className="text-left text-xs text-white/50 hover:text-white transition-colors"
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <p className="text-xs uppercase tracking-widest text-yellow-400 mb-4">Contact</p>
          <p className="text-xs text-white/50">Lagos, Nigeria</p>
          <p className="text-xs text-white/50 mt-1">hello@scentsational.ng</p>
          <p className="text-xs text-white/50 mt-1">+234 800 000 0000</p>
        </div>
      </div>

      <div className="border-t border-white/5 px-6 py-4 text-center">
        <p className="text-xs text-white/30">© 2026 ScentSational. All rights reserved.</p>
      </div>
    </footer>
  );
}