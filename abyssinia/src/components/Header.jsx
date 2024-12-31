import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          Abyssinia
        </Link>
        <div className="hidden md:flex items-center space-x-4">
          <form className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="py-2 px-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              🔍
            </button>
          </form>
          <Link to="/cart" className="text-gray-600 hover:text-gray-800">
            Cart
          </Link>
          {isLoggedIn ? (
            <Link to="/account" className="text-gray-600 hover:text-gray-800">
              Profile
            </Link>
          ) : (
            <Link to="/login" className="text-gray-600 hover:text-gray-800">
              Login
            </Link>
          )}
        </div>
        <button
          className="md:hidden text-gray-600 hover:text-gray-800"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white py-2">
          <div className="container mx-auto px-4 flex flex-col space-y-2">
            <Link to="/cart" className="text-gray-600 hover:text-gray-800">
              Cart
            </Link>
            {isLoggedIn ? (
              <Link to="/profile" className="text-gray-600 hover:text-gray-800">
                Profile
              </Link>
            ) : (
              <Link to="/login" className="text-gray-600 hover:text-gray-800">
                Login
              </Link>
            )}
            <form className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full py-2 px-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                🔍
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
