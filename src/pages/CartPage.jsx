export default function CartPage({ cart, onRemove }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

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
                    ₦{item.price.toLocaleString()} × {item.qty}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900 mb-2">
                    ₦{(item.price * item.qty).toLocaleString()}
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

          {/* Summary */}
          <div className="bg-amber-50 rounded-2xl p-6 border border-yellow-400/10">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-400">Subtotal ({cart.length} items)</span>
              <span className="font-serif text-xl font-semibold text-gray-900">₦{total.toLocaleString()}</span>
            </div>
            <button className="w-full bg-yellow-500 text-white font-semibold py-3.5 rounded-full hover:bg-yellow-400 transition-colors">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}