import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

function AddCategory() {
  const [categoryName, setCategoryName] = useState('');
  const [categoryIcon, setCategoryIcon] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle category submission logic here
    console.log('Category submitted:', { categoryName, categoryIcon });
    // Reset form
    setCategoryName('');
    setCategoryIcon('');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Add New Category</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 mb-1">
            Category Name
          </label>
          <input
            type="text"
            id="categoryName"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="categoryIcon" className="block text-sm font-medium text-gray-700 mb-1">
            Category Icon (Font Awesome class)
          </label>
          <input
            type="text"
            id="categoryIcon"
            value={categoryIcon}
            onChange={(e) => setCategoryIcon(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition-colors duration-300 flex items-center">
          <FaPlus className="mr-2" /> Add Category
        </button>
      </form>
    </div>
  );
}

export default AddCategory;

