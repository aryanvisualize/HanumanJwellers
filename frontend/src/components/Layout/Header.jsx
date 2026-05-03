import { Link } from 'react-router-dom';
import { ShoppingCart, Search, Menu } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const Header = () => {
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none">
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {/* Logo */}
          <div className="flex-1 flex justify-center sm:justify-start">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="font-serif text-2xl font-bold text-premium-maroon">
                HANUMAN
              </span>
              <span className="font-serif text-2xl ml-1 text-premium-gold">
                JEWELLERS
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden sm:flex space-x-8">
            <Link to="/" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-premium-gold text-sm font-medium uppercase tracking-wider">
              Collections
            </Link>
            <Link to="/" className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-premium-gold text-sm font-medium uppercase tracking-wider">
              Gold
            </Link>
            <Link to="/" className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-premium-gold text-sm font-medium uppercase tracking-wider">
              Gems & Stones
            </Link>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center space-x-6 sm:ml-6">
            <button className="text-gray-400 hover:text-premium-gold">
              <Search className="h-6 w-6" />
            </button>
            <Link to="/checkout" className="text-gray-400 hover:text-premium-gold relative">
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform bg-premium-maroon rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
