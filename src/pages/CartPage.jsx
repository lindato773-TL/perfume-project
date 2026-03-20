import { useState } from "react";
import abaQR from "../assets/aba-qr.png";

// ★ ប្តូរ QR Code របស់អ្នកនៅត្រង់នេះ ↓ ★
// អ្នកអាចដាក់ជា:
// 1. KHQR / ABA QR image URL
// 2. រូបភាពដែល upload: "/src/assets/my-qr.png"
// 3. PayWay / Wing / TrueMoney link
const YOUR_QR_CODE_IMAGE = abaQR; // ← ប្តូរទីនេះជារូបភាព QR Code របស់អ្នក
const YOUR_NAME = "Lady Shop";       // ← ឈ្មោះហាង
const YOUR_ACCOUNT = "0719061336";           // ← លេខគណនី ឬ លេខទូរស័ព្ទ

export default function CartPage({ cart, onRemove }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const [showCheckout, setShowCheckout] = useState(false);
  const [paid, setPaid] = useState(false);

  return (
    <div className="max-w-2xl mx-auto px-6 py-14">
      <h2 className="font-serif text-3xl font-semibold text-gray-900 mb-8">Your Cart</h2>

      {cart.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🛒</div>
          <p className="text-gray-400">Your cart is empty. Start exploring our fragrances!</p>
        </div>
      ) : (
        <>
          {/* Cart Items */}
          <div className="flex flex-col gap-4 mb-8">
            {cart.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl p-4 flex items-center gap-4 border border-yellow-400/10">
                <img src={item.img} alt={item.name} className="w-16 h-16 rounded-xl object-cover bg-amber-50" />
                <div className="flex-1">
                  <h4 className="font-serif text-lg font-semibold text-gray-900">{item.name}</h4>
                  <p className="text-xs text-gray-400">{item.notes}</p>
                  <p className="text-sm font-medium text-gray-700 mt-1">
                    ${item.price.toLocaleString()} × {item.qty}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900 mb-2">
                    ${ (item.price * item.qty).toLocaleString() }
                  </p>
                  <button onClick={() => onRemove(item.id)} className="text-red-400 hover:text-red-600 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-amber-50 rounded-2xl p-6 border border-yellow-400/10 mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-400 text-sm">Subtotal ({cart.length} items)</span>
              <span className="font-serif text-xl font-semibold text-gray-900">${total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-yellow-400/10">
              <span className="text-gray-400 text-sm">Shipping</span>
              <span className="text-green-500 text-sm font-medium">Free</span>
            </div>
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-700 font-semibold">Total</span>
              <span className="font-serif text-2xl font-semibold text-yellow-500">${total.toLocaleString()}</span>
            </div>

            {/* Checkout Button */}
            {!showCheckout && !paid && (
              <button
                onClick={() => setShowCheckout(true)}
                className="w-full bg-yellow-500 text-white font-semibold py-3.5 rounded-full hover:bg-yellow-400 transition-colors"
              >
                Proceed to Checkout →
              </button>
            )}
          </div>

          {/* ══════════════════════════════
              QR CODE PAYMENT SECTION
              ══════════════════════════════ */}
          {showCheckout && !paid && (
            <div className="bg-white rounded-2xl border border-yellow-400/20 overflow-hidden shadow-sm">

              {/* Header */}
              <div className="bg-yellow-500 px-6 py-4 text-center">
                <h3 className="font-serif text-xl font-semibold text-white">Scan to Pay 📱</h3>
                <p className="text-yellow-100 text-xs mt-1">
                  Use your banking app to scan the QR code below
                </p>
              </div>

              <div className="p-6">

                {/* Supported Banks */}
                <div className="flex justify-center gap-2 mb-6 flex-wrap fs-6 fw-bold ">
                
                  {["ABA",].map((bank) => (
                    <span key={bank}
                      className="text-xs bg-amber-50 border border-yellow-400/20 px-3 py-1 rounded-full text-gray-500 font-medium">
                      {bank}
                    </span>
                  ))}
                </div>

                {/* QR Code Image */}
                <div className="flex flex-col items-center mb-6">
                  <div className="border-4 border-yellow-400 rounded-2xl p-2 shadow-md">
                    <img
                      src={YOUR_QR_CODE_IMAGE}
                      alt="Payment QR Code"
                      className="w-48 h-48 rounded-xl"
                    />
                  </div>
                  {/* Shop Info */}
                  <div className="text-center mt-3">
                    <p className="font-semibold text-gray-800 text-sm">{YOUR_NAME}</p>
                    <p className="text-xs text-gray-400">{YOUR_ACCOUNT}</p>
                  </div>
                  <p className="text-xs text-gray-300 mt-1">QR Code valid for this order only</p>
                </div>

                {/* Total Amount */}
                <div className="bg-amber-50 rounded-xl p-4 mb-5 text-center border border-yellow-400/10">
                  <p className="text-xs text-gray-400 mb-1">Amount to Pay</p>
                  <p className="font-serif text-3xl font-semibold text-yellow-500">
                    ${total.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">Please enter the exact amount</p>
                </div>

                {/* Steps */}
                <div className="flex flex-col gap-2 mb-6">
                  {[
                    "1. បើក App ធនាគាររបស់អ្នក (Open your banking app)",
                    "2. ចុច Scan / QR Pay",
                    "3. Scan QR Code ខាងលើ",
                    "4. បញ្ចូលចំនួនទឹកប្រាក់ត្រឹមត្រូវ",
                    "5. Confirm ការទូទាត់",
                  ].map((step) => (
                    <div key={step} className="flex items-start gap-2 text-xs text-gray-500">
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 flex-shrink-0 mt-1.5" />
                      {step}
                    </div>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowCheckout(false)}
                    className="flex-1 py-3 rounded-full border border-yellow-400/30 text-gray-500 text-sm hover:bg-amber-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => { setPaid(true); setShowCheckout(false); }}
                    className="flex-1 py-3 rounded-full bg-green-500 text-white text-sm font-semibold hover:bg-green-400 transition-colors"
                  >
                    ✓ I've Paid
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════════════
              PAYMENT SUCCESS SCREEN
              ══════════════════════════════ */}
          {paid && (
            <div className="bg-white rounded-2xl border border-green-200 p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl font-semibold text-gray-900 mb-2">
                Payment Confirmed! 🎉
              </h3>
              <p className="text-gray-400 text-sm mb-1">សូមអរគុណសម្រាប់ការទិញ 🌸</p>
              <p className="text-gray-400 text-sm">We will contact you for delivery soon.</p>
              <div className="mt-4 bg-amber-50 rounded-xl p-4 border border-yellow-400/10">
                <p className="text-xs text-gray-400 mb-1">Order Total Paid</p>
                <p className="font-serif text-2xl font-semibold text-yellow-500">
                  ${total.toLocaleString()}
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}