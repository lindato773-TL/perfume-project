export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <div
        className="py-24 px-6 text-center"
        style={{
          background:
            "linear-gradient(135deg, rgba(26,18,8,0.85) 0%, rgba(80,55,15,0.6) 100%), url('https://images.unsplash.com/photo-1541643600914-78b084683702?w=1400&q=80') center/cover no-repeat",
        }}
      >
        <div
          className="inline-block px-10 py-8 rounded-3xl"
          style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.2)" }}
        >
          <h1 className="font-serif text-5xl font-semibold text-white mb-3">Our Story</h1>
          <p className="text-white/70 text-sm max-w-sm mx-auto">Crafting extraordinary fragrances since 2020</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <p className="text-xs uppercase tracking-widest text-yellow-500 mb-3">Who We Are</p>
            <h2 className="font-serif text-3xl font-semibold text-gray-900 mb-4">
              Born from Passion, Crafted with Purpose
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              ScentSational was born from a deep love for the art of perfumery. We believe fragrance is more than
              a scent — it's an identity, an emotion, a memory waiting to be made.
            </p>
          </div>
          <div className="rounded-3xl overflow-hidden aspect-video bg-amber-50">
            <img
              src="https://i.pinimg.com/1200x/cf/00/9e/cf009e0ea67a5aef5a1c07f410674a02.jpg"
              alt="Perfume crafting"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 text-center">
          {[
            ["500+", "Fragrances Crafted"],
            ["50k+", "Happy Customers"],
            ["6+", "Years of Excellence"],
          ].map(([stat, label]) => (
            <div key={stat} className="bg-white rounded-2xl p-6 border border-yellow-400/10">
              <p className="font-serif text-3xl font-semibold text-yellow-500 mb-1">{stat}</p>
              <p className="text-xs text-gray-400">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}