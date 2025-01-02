import { Link } from "react-router-dom";
import { FaHeart, FaShoppingCart } from "react-icons/fa";

function ProductCard({ product }) {
  const handleOnclick = async (id) => {
    try {
      const response = await fetch("http://localhost:5000/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          productId: id,
          quantity: 1,
        }),
      });
      const data = await response.json();
      alert(`Response: ${data.message}`);
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };
  return (
    <div className="group relative bg-white rounded-lg shadow-md overflow-hidden">
      <Link to={`/product/${product._id}`}>
        <div className="relative">
          <img
            src={product.images[0] || ""}
            alt={product.name}
            className="w-full h-64 object-cover"
          />
          <img
            src={product.images[1] || product.images[0] || "0"}
            alt={`${product.name} alternate view`}
            className="w-full h-64 object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
          <p className="text-gray-600 mb-2">{product.description}</p>
          <p className="text-lg font-bold text-blue-600">${product.price}</p>
        </div>
      </Link>
      <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-300">
          <FaHeart className="w-6 h-6 text-red-500" />
        </button>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white bg-opacity-90 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={() => handleOnclick(product._id)}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center"
        >
          <FaShoppingCart className="w-5 h-5 mr-2" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
