import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import {
  SiNike,
  SiAdidas,
  SiApple,
  SiNewbalance,
  SiPuma,
} from "react-icons/si";
import { GiClothes } from "react-icons/gi";

const brands = [
  { id: "nike", name: "Nike", count: 23, icon: SiNike },
  { id: "adidas", name: "Adidas", count: 58, icon: SiAdidas },
  { id: "apple", name: "Apple", count: 45, icon: SiApple },
  { id: "new-balance", name: "New Balance", count: 39, icon: SiNewbalance },
  { id: "puma", name: "Puma", count: 53, icon: SiPuma },
];

const sizes = ["XXS", "XS", "S", "M", "L", "XL", "XXL"];

const colors = [
  { name: "Black", value: "#000000" },
  { name: "Red", value: "#FF0000" },
  { name: "Yellow", value: "#FFFF00" },
  { name: "Green", value: "#00FF00" },
  { name: "Blue", value: "#0000FF" },
  { name: "Purple", value: "#800080" },
];

const SearchFilters = () => {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);

  const handleSizeClick = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleColorClick = (color) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  return (
    <div className="w-auto p-4 bg-white ">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold flex items-center">
          <GiClothes className="mr-2" />
          Filters
        </h2>
        <button className="text-blue-500 text-sm">Clear All</button>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="font-semibold mb-2">Brand</h3>
          <div className="space-y-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search brand..."
                className="w-full p-2 pl-8 border rounded text-sm"
              />
              <FaSearch className="absolute left-2 top-2.5 text-gray-400" />
            </div>
            {brands.map((brand) => (
              <label key={brand.id} className="flex items-center space-x-2">
                <input type="checkbox" className="form-checkbox" />
                <span className="flex items-center">
                  <brand.icon className="mr-1" />
                  {brand.name}
                </span>
                <span className="text-xs text-gray-500">({brand.count})</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Price</h3>
          <div>
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], parseInt(e.target.value)])
              }
              className="w-full"
            />
            <div className="flex justify-between text-sm mt-2">
              <span>{priceRange[0]} SAR</span>
              <span>{priceRange[1]} SAR</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Size</h3>
          <div className="grid grid-cols-4 gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => handleSizeClick(size)}
                className={`px-2 py-1 text-sm border rounded ${
                  selectedSizes.includes(size)
                    ? "bg-blue-500 text-white"
                    : "bg-white"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Color</h3>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <button
                key={color.name}
                onClick={() => handleColorClick(color.value)}
                className={`w-6 h-6 rounded-full border-2 ${
                  selectedColors.includes(color.value)
                    ? "border-blue-500"
                    : "border-gray-300"
                }`}
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
