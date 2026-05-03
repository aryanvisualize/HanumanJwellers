import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Home = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch from backend
        const res = await fetch('http://localhost:5000/api/products');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError('Error loading products. Please ensure the backend is running.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = filter === 'All' ? products : products.filter(p => p.category === filter);

  if (loading) return <div className="text-center py-20 font-serif text-xl">Loading Masterpieces...</div>;
  if (error) return <div className="text-center py-20 text-premium-maroon">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 mb-4">
          Elegance in Every Detail
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover our exclusive collection of meticulously crafted 22K gold and precious gems & stones jewelry, celebrating the rich heritage of Bahraich.
        </p>
      </div>

      {/* Filters */}
      <div className="flex justify-center space-x-4 mb-12 overflow-x-auto pb-4">
        {['All', 'Necklaces', 'Rings', 'Bangles', 'Bracelets', 'Gems & Stones'].map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition whitespace-nowrap ${
              filter === cat 
                ? 'bg-premium-maroon text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredProducts.map(product => (
          <div key={product._id} className="group rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all bg-white flex flex-col">
            <Link to={`/product/${product._id}`} className="block flex-grow">
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    e.target.src = "/fallback.jpg";
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 left-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-premium-offwhite text-premium-maroon shadow-sm border border-premium-gold/20">
                    {product.weightInGrams > 20 ? 'Visit Store in Bahraich' : 'Home Delivery'}
                  </span>
                </div>
              </div>
              <div className="p-5 pb-4">
                <p className="text-xs text-premium-gold font-semibold uppercase tracking-wider mb-1">
                  {product.material} &bull; {product.purity}
                </p>
                <h3 className="font-serif text-lg text-gray-900 truncate">
                  {product.name}
                </h3>
              </div>
            </Link>
            <div className="px-5 pb-5 mt-auto">
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  // Simplified pricing logic to calculate final price, 
                  // or just let cart context handle it if it doesn't need finalPrice immediately.
                  // For simplicity, we just add the product. The ProductDetails has complex pricing, 
                  // we should compute a basic final price if needed, or just add the product.
                  // Let's add with a base price logic so cart doesn't break.
                  const GOLD_RATES = { '22K': 6500, '18K': 5300, '950': 4000 };
                  const baseRate = GOLD_RATES[product.purity] || 6000;
                  const materialCost = product.weightInGrams * baseRate;
                  const makingCharge = materialCost * (product.makingChargePercent / 100);
                  const finalPrice = Math.round((materialCost + makingCharge) * 1.03);
                  addToCart({ ...product, finalPrice });
                  alert("Item added to cart"); // Simple toast alternative
                }}
                className="bg-black text-white w-full py-2 rounded-lg hover:bg-gray-800 transition"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
