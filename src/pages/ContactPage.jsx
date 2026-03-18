import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (form.name && form.email && form.message) {
      setSent(true);
      setForm({ name: "", email: "", message: "" });
    }
  };

  return (
    <div className="max-w-xl mx-auto px-6 py-14">
      <div className="text-center mb-10">
        <h2 className="font-serif text-4xl font-semibold text-gray-900">Get in Touch</h2>
        <p className="text-gray-400 text-sm mt-2">We'd love to hear from you</p>
      </div>

      {sent ? (
        <div className="text-center py-12 bg-white rounded-3xl border border-yellow-400/10">
          <div className="text-4xl mb-3">💌</div>
          <h3 className="font-serif text-xl text-gray-900 mb-2">Message Sent!</h3>
          <p className="text-gray-400 text-sm">We'll get back to you within 24 hours.</p>
          <button
            onClick={() => setSent(false)}
            className="mt-4 text-sm text-yellow-500 hover:underline"
          >
            Send another message
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-yellow-400/10 p-8 flex flex-col gap-4">
          {/* Name */}
          <div>
            <label className="text-xs text-gray-400 uppercase tracking-wide block mb-1.5">Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              placeholder="Your full name"
              className="w-full border border-yellow-400/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-400/50 bg-amber-50"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-xs text-gray-400 uppercase tracking-wide block mb-1.5">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
              placeholder="your@email.com"
              className="w-full border border-yellow-400/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-400/50 bg-amber-50"
            />
          </div>

          {/* Message */}
          <div>
            <label className="text-xs text-gray-400 uppercase tracking-wide block mb-1.5">Message</label>
            <textarea
              value={form.message}
              onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
              placeholder="How can we help you?"
              rows={4}
              className="w-full border border-yellow-400/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-400/50 bg-amber-50 resize-none"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-yellow-500 text-white font-semibold py-3.5 rounded-full hover:bg-yellow-400 transition-colors mt-2"
          >
            Send Message
          </button>
        </div>
      )}
    </div>
  );
}