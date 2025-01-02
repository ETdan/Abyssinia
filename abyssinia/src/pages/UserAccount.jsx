import { useEffect, useState } from "react";

function UserAccount() {
  const [activeTab, setActiveTab] = useState("profile");

  // Placeholder data (replace with actual user data and order history)
  const [user, setUser] = useState({});
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Fetch user data
    fetch("http://localhost:5000/account", {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          alert("Please login to view this page");
        }
        return response.json();
      })
      .then((data) => {
        setUser(data.data);
        console.log(data);
      })
      .catch((error) => console.error("Error fetching user data:", error));

    // Fetch order history
    fetch("http://localhost:5000/orders", {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setOrders(data.data))
      .catch((error) => console.error("Error fetching orders:", error));

    // Fetch wishlist
    fetch("http://localhost:5000/wishlist", {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setWishlist(data.data))
      .catch((error) => console.error("Error fetching wishlist:", error));
  }, []);

  const handleUpdate = () => {
    preventdefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch("http://localhost:5000/account", {
      method: "PUT",
      headers: {
        "Content-Type": "x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          alert("Profile updated successfully");
        } else {
          alert("Profile update failed");
        }
      })
      .catch((error) => console.error("Error updating profile:", error));
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Account</h1>

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-1/4">
          <nav className="bg-white shadow-md rounded-lg overflow-hidden">
            <button
              className={`w-full text-left px-4 py-2 ${
                activeTab === "profile"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("profile")}
            >
              Profile
            </button>
            <button
              className={`w-full text-left px-4 py-2 ${
                activeTab === "orders"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("orders")}
            >
              Order History
            </button>
            <button
              className={`w-full text-left px-4 py-2 ${
                activeTab === "wishlist"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("wishlist")}
            >
              Wishlist
            </button>
          </nav>
        </aside>

        <main className="w-full md:w-3/4">
          {activeTab === "profile" && (
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Profile Details</h2>
              <form onSubmit={() => handleUpdate()} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    defaultValue={user.username}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    defaultValue={user.email}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      defaultValue={user.password}
                      className="w-full p-2 border rounded"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 px-3 py-2"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                <div className="">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300"
                  >
                    Update Profile
                  </button>
                  <button
                    onClick={() => handleLogout()}
                    className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300"
                  >
                    LogOut
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === "orders" && (
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Order History</h2>
              <div className="overflow-x-auto">
                {orders.length === 0 ? (
                  <p>No orders</p>
                ) : (
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="px-4 py-2 text-left">Order ID</th>
                        <th className="px-4 py-2 text-left">Date</th>
                        <th className="px-4 py-2 text-left">Total</th>
                        <th className="px-4 py-2 text-left">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id} className="border-b">
                          <td className="px-4 py-2">{order.id}</td>
                          <td className="px-4 py-2">{order.date}</td>
                          <td className="px-4 py-2">
                            ${order.total.toFixed(2)}
                          </td>
                          <td className="px-4 py-2">{order.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}

          {activeTab === "wishlist" && (
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Wishlist</h2>
              {wishlist === null ? (
                <p>Your wishlist is empty.</p>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {wishlist.map((product) => (
                    <div
                      key={product.id}
                      className="bg-gray-100 p-4 rounded-lg shadow-md"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover mb-4"
                      />
                      <h3 className="text-lg font-semibold mb-2">
                        {product.name}
                      </h3>
                      <p className="text-gray-500">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default UserAccount;
