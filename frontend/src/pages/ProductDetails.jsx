import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from "../context/CartContext";
import { ChevronDown, ChevronUp, ShieldCheck, Truck } from 'lucide-react';

const GOLD_RATES = {
  '22K': 6500,
  '18K': 5300,
  '950': 4000 // Platinum
};

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openAccordion, setOpenAccordion] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
        if (!res.ok) throw new Error('Product not found');
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="text-center py-20 font-serif text-xl">Loading...</div>;
  if (!product) return <div className="text-center py-20 text-premium-maroon">Product not found.</div>;

  // Pricing Calculation
  const baseRate = GOLD_RATES[product.purity] || 6000;
  const materialCost = product.weightInGrams * baseRate;
  const makingCharge = materialCost * (product.makingChargePercent / 100);
  const subtotal = materialCost + makingCharge;
  const gst = subtotal * 0.03;
  const finalPrice = Math.round(subtotal + gst);

  const handleAddToCart = () => {
    addToCart({ ...product, finalPrice });
    navigate('/checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Image Gallery */}
        <div className="w-full md:w-1/2">
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden shadow-md">
            <img
              src={product.imageUrl}
              alt={product.name}
              loading="lazy"
              decoding="async"
              onError={(e) => {
                e.target.src = "/fallback.jpg";
              }}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="w-full md:w-1/2 flex flex-col">
          <p className="text-sm text-premium-gold font-semibold uppercase tracking-wider mb-2">
            {product.category}
          </p>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mb-4">
            {product.name}
          </h1>

          <div className="text-2xl font-semibold text-gray-900 mb-6">
            ₹{finalPrice.toLocaleString('en-IN')}
            <span className="text-sm text-gray-500 font-normal ml-2">(Incl. of all taxes)</span>
          </div>

          <p className="text-gray-600 mb-8 leading-relaxed">
            {product.description}
          </p>

          <button
            onClick={handleAddToCart}
            className="w-full bg-premium-maroon text-white py-4 rounded-md font-medium text-lg hover:bg-red-900 transition shadow-lg mb-8"
          >
            Add to Cart & Checkout
          </button>

          <div className="grid grid-cols-2 gap-4 mb-8 text-sm text-gray-600 border-y border-gray-200 py-6">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-premium-gold" />
              <span>Certified {product.purity} {product.material}</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-premium-gold" />
              <span>Secure Shipping</span>
            </div>
          </div>

          {/* Accordions */}
          <div className="border-b border-gray-200">
            <button
              className="w-full py-4 flex justify-between items-center text-left"
              onClick={() => setOpenAccordion(openAccordion === 'specs' ? '' : 'specs')}
            >
              <span className="font-serif font-semibold text-gray-900">Product Specifications</span>
              {openAccordion === 'specs' ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
            {openAccordion === 'specs' && (
              <div className="pb-4 text-sm text-gray-600 grid grid-cols-2 gap-y-2">
                <div>Weight:</div><div className="font-medium text-gray-900">{product.weightInGrams} g</div>
                <div>Purity:</div><div className="font-medium text-gray-900">{product.purity}</div>
                <div>Material:</div><div className="font-medium text-gray-900">{product.material}</div>
              </div>
            )}
          </div>

          <div className="border-b border-gray-200">
            <button
              className="w-full py-4 flex justify-between items-center text-left"
              onClick={() => setOpenAccordion(openAccordion === 'price' ? '' : 'price')}
            >
              <span className="font-serif font-semibold text-gray-900">Price Breakdown</span>
              {openAccordion === 'price' ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
            {openAccordion === 'price' && (
              <div className="pb-4 text-sm text-gray-600 grid grid-cols-2 gap-y-2">
                <div>Material Cost:</div><div className="text-right">₹{Math.round(materialCost).toLocaleString('en-IN')}</div>
                <div>Making Charges ({product.makingChargePercent}%):</div><div className="text-right">₹{Math.round(makingCharge).toLocaleString('en-IN')}</div>
                <div>GST (3%):</div><div className="text-right">₹{Math.round(gst).toLocaleString('en-IN')}</div>
                <div className="font-semibold text-gray-900 mt-2">Total:</div><div className="text-right font-semibold text-gray-900 mt-2">₹{finalPrice.toLocaleString('en-IN')}</div>
              </div>
            )}
          </div>

          <div className="border-b border-gray-200">
            <button
              className="w-full py-4 flex justify-between items-center text-left"
              onClick={() => setOpenAccordion(openAccordion === 'care' ? '' : 'care')}
            >
              <span className="font-serif font-semibold text-gray-900">Care Information</span>
              {openAccordion === 'care' ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
            {openAccordion === 'care' && (
              <div className="pb-4 text-sm text-gray-600">
                Keep away from perfumes and harsh chemicals. Store in the provided Hanuman Jewellers soft-lined box. Clean with a soft, dry cloth.
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
