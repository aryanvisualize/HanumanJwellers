const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-12">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-serif text-xl font-bold mb-4 tracking-wider text-premium-gold">HANUMAN JEWELLERS</h3>
            <p className="text-gray-400 text-sm">
              Crafting timeless elegance and preserving heritage through exquisite jewelry.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-lg font-semibold mb-4 text-premium-offwhite">Contact Us</h3>
            <ul className="text-gray-400 text-sm space-y-2">
              <li>Bahraich, Uttar Pradesh</li>
              <li>India</li>
              <li>Email: akarui.aryan@gmail.com</li>
            </ul>
          </div>
          <div>
            <h3 className="font-serif text-lg font-semibold mb-4 text-premium-offwhite">Policies</h3>
            <ul className="text-gray-400 text-sm space-y-2">
              <li><a href="#" className="hover:text-premium-gold transition">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-premium-gold transition">Returns & Exchanges</a></li>
              <li><a href="#" className="hover:text-premium-gold transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-premium-gold transition">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Hanuman Jewellers. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
