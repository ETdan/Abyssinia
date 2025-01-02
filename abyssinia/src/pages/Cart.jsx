import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch("http://localhost:5000/cart", {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!response.ok) {
          alert("Failed to fetch cart items");
          return;
        }
        const data = await response.json();
        const items = data?.data?.[0]?.items ?? [];
        setCartItems(items);
        console.log(items);
      } catch (error) {
        alert(error.message);
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  const updateQuantity = (id, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item?.product?._id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item?.product?._id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item?.product?.price ?? 0) * (item?.quantity ?? 0),
    0
  );
  const tax = subtotal * 0.1; // Assuming 10% tax
  const total = subtotal + tax;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {cartItems.map((item) => (
              <div
                key={item?._id ?? Math.random()}
                className="flex items-center border-b py-4"
              >
                <img
                  src={item?.product?.images?.[0] ?? ""}
                  alt={item?.product?.name ?? "Product Image"}
                  className="w-20 h-20 object-cover rounded mr-4"
                />
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold">
                    {item?.product?.name ?? "Product Name"}
                  </h3>
                  <p className="text-gray-600">
                    ${item?.product?.price?.toFixed(2) ?? "0.00"}
                  </p>
                </div>
                <div className="flex items-center">
                  <button
                    className="px-2 py-1 border rounded"
                    onClick={() =>
                      updateQuantity(
                        item?.product?._id,
                        Math.max(1, (item?.quantity ?? 1) - 1)
                      )
                    }
                  >
                    -
                  </button>
                  <span className="mx-2">{item?.quantity ?? 0}</span>
                  <button
                    className="px-2 py-1 border rounded"
                    onClick={() =>
                      updateQuantity(
                        item?.product?._id,
                        (item?.quantity ?? 0) + 1
                      )
                    }
                  >
                    +
                  </button>
                </div>
                <button
                  className="ml-4 text-red-500 hover:text-red-700"
                  onClick={() => removeItem(item?.product?._id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="bg-gray-100 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <Link
              to="/checkout"
              className="block w-full bg-blue-500 text-white text-center py-2 px-4 rounded-full mt-6 hover:bg-blue-600 transition duration-300"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}

      <Link
        to="/"
        className="inline-block mt-8 text-blue-500 hover:text-blue-700"
      >
        ← Continue Shopping
      </Link>
    </div>
  );
}

export default Cart;
