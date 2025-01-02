import { FaUsers, FaShoppingCart, FaDollarSign } from "react-icons/fa";
import { useEffect, useState } from "react";

function Statistics() {
  // Placeholder data (replace with actual data fetching logic)
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:5000/admin/statistics", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        setStats(data.data);
        console.log(data, "////////////////");
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Users</p>
              <p className="text-3xl font-bold">{stats.totalUsers}</p>
            </div>
            <FaUsers className="text-4xl text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Orders</p>
              <p className="text-3xl font-bold">{stats.totalOrders}</p>
            </div>
            <FaShoppingCart className="text-4xl text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Revenue</p>
              <p className="text-3xl font-bold">${stats.totalRevenue || 0}</p>
            </div>
            <FaDollarSign className="text-4xl text-yellow-500" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
