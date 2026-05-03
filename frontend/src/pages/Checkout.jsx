import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from "../context/CartContext";

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    shippingAddress: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const totalPrice = cartItems.reduce((acc, item) => acc + (item.finalPrice * item.qty), 0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      setError('Your cart is empty');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const orderPayload = {
        ...formData,
        totalPrice,
        orderItems: cartItems.map(item => ({
          product: item._id,
          name: item.name,
          priceAtPurchase: item.finalPrice
        }))
      };

      const res = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });

      if (!res.ok) throw new Error('Failed to process order');
      const data = await res.json();

      setSuccess(`Order Successful! Your ID is: ${data.orderId}`);
      clearCart();
    } catch (err) {
      setError('Error placing order. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="bg-green-50 text-green-800 p-8 rounded-lg shadow-sm">
          <h2 className="text-3xl font-serif font-bold mb-4">Thank You!</h2>
          <p className="text-lg mb-6">{success}</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-premium-maroon text-white rounded hover:bg-red-900 transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8">Checkout</h1>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Form */}
        <div className="w-full lg:w-2/3">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-xl font-serif font-semibold mb-6">Shipping Information</h2>
            {error && <div className="mb-4 text-red-600 bg-red-50 p-3 rounded text-sm">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  required type="text" name="customerName" value={formData.customerName} onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-premium-gold focus:border-premium-gold"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    required type="email" name="email" value={formData.email} onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-premium-gold focus:border-premium-gold"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    required type="tel" name="phone" value={formData.phone} onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-premium-gold focus:border-premium-gold"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Address</label>
                <textarea
                  required name="shippingAddress" rows="3" value={formData.shippingAddress} onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-premium-gold focus:border-premium-gold"
                ></textarea>
              </div>

              <div className="pt-6 mt-6 border-t border-gray-200">
                <h3 className="text-lg font-serif font-semibold mb-4">Payment Information (Dummy)</h3>
                <div className="p-4 bg-gray-50 rounded text-sm text-gray-600 mb-6">
                  This is a dummy checkout. No real payment will be processed.
                </div>
                <button
                  type="submit" disabled={loading || cartItems.length === 0}
                  className="w-full bg-premium-maroon text-white py-3 rounded-md font-medium hover:bg-red-900 transition disabled:opacity-50"
                >
                  {loading ? 'Processing...' : `Place Order (₹${totalPrice.toLocaleString('en-IN')})`}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-1/3">
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 sticky top-24">
            <h2 className="text-xl font-serif font-semibold mb-6">Order Summary</h2>
            {cartItems.length === 0 ? (
              <p className="text-gray-500 text-sm">Your cart is empty.</p>
            ) : (
              <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-2">
                {cartItems.map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded" />
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                      <p className="text-xs text-gray-500">Qty: {item.qty}</p>
                      <p className="text-sm font-semibold text-gray-900 mt-1">₹{item.finalPrice.toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="border-t border-gray-200 pt-4 flex justify-between items-center text-lg font-bold">
              <span>Total</span>
              <span>₹{totalPrice.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
