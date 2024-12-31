import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">About Us</h3>
            <p className="text-gray-600">Abyssinia is your one-stop shop for all your needs. We offer a wide range of products at competitive prices.</p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-gray-600 hover:text-gray-800">Contact Us</Link></li>
              <li><Link to="/faq" className="text-gray-600 hover:text-gray-800">FAQ</Link></li>
              <li><Link to="/shipping" className="text-gray-600 hover:text-gray-800">Shipping</Link></li>
              <li><Link to="/returns" className="text-gray-600 hover:text-gray-800">Returns</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-600 hover:text-gray-800">About Us</Link></li>
              <li><Link to="/blog" className="text-gray-600 hover:text-gray-800">Blog</Link></li>
              <li><Link to="/careers" className="text-gray-600 hover:text-gray-800">Careers</Link></li>
              <li><Link to="/privacy" className="text-gray-600 hover:text-gray-800">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Newsletter</h3>
            <p className="text-gray-600 mb-2">Subscribe to our newsletter for the latest updates and offers.</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-grow py-2 px-4 rounded-l-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-r-full hover:bg-blue-600 transition duration-300">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-600">&copy; 2023 Abyssinia. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

