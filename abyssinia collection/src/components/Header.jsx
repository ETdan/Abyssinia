import React from "react";
import logo from "../assets/abyssinia-high-resolution-logo-grayscale.svg";
import { MdOutlineAccountCircle, MdShoppingCart } from "react-icons/md";

const Header = () => {
  return (
    <header className="sticky top-0 z-10 flex justify-between items-center p-4 px-12 bg-white shadow-md">
      <img
        src={logo}
        alt="Abyssinia Logo"
        className="max-w-20 max-h-20 object-contain"
      />

      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Search..."
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        <button className="p-2 bg-yellow-600 rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500">
          search
        </button>
      </div>

      <div className="flex items-center gap-8 ">
        <div className="text-3xl cursor-pointer hover:scale-110 transition-transform text-yellow-600">
          <MdShoppingCart />
        </div>

        <div className="text-3xl cursor-pointer hover:scale-110 transition-transform text-yellow-600">
          <MdOutlineAccountCircle />
        </div>
      </div>
    </header>
  );
};

export default Header;
