import { Routes, Route, Link } from 'react-router-dom';
import { FaPlus, FaChartBar } from 'react-icons/fa';
import AddCategory from './admin/AddCategory';
import AddProduct from './admin/AddProduct';
import Statistics from './admin/Statistics';

function Admin() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <div className="flex space-x-4 mb-8">
        <Link to="/admin/add-category" className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition-colors duration-300 flex items-center">
          <FaPlus className="mr-2" /> Add Category
        </Link>
        <Link to="/admin/add-product" className="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 transition-colors duration-300 flex items-center">
          <FaPlus className="mr-2" /> Add Product
        </Link>
        <Link to="/admin/statistics" className="bg-purple-500 text-white py-2 px-4 rounded-full hover:bg-purple-600 transition-colors duration-300 flex items-center">
          <FaChartBar className="mr-2" /> Statistics
        </Link>
      </div>
      <Routes>
        <Route path="add-category" element={<AddCategory />} />
        <Route path="add-product" element={<AddProduct />} />
        <Route path="statistics" element={<Statistics />} />
      </Routes>
    </div>
  );
}

export default Admin;

