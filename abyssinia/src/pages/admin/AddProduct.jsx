import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

function AddProduct() {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productImage, setProductImage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle product submission logic here
    console.log('Product submitted:', { productName, productDescription, productPrice, productCategory, productImage });
    // Reset form
    setProductName('');
    setProductDescription('');
    setProductPrice('');
    setProductCategory('');
    setProductImage('');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-1">
            Product Name
          </label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="productDescription" className="block text-sm font-medium text-gray-700 mb-1">
            Product Description
          </label>
          <textarea
            id="productDescription"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            required
            className="w-full p-2 border rounded"
            rows="3"
          ></textarea>
        </div>
        <div>
          <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700 mb-1">
            Product Price
          </label>
          <input
            type="number"
            id="productPrice"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            required
            className="w-full p-2 border rounded"
            min="0"
            step="0.01"
          />
        </div>
        <div>
          <label htmlFor="productCategory" className="block text-sm font-medium text-gray-700 mb-1">
            Product Category
          </label>
          <select
            id="productCategory"
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
            required
            className="w-full p-2 border rounded"
          >
            <option value="">Select a category</option>
            <option value="t-shirts">T-Shirts</option>
            <option value="jeans">Jeans</option>
            <option value="dresses">Dresses</option>
            <option value="jackets">Jackets</option>
            <option value="shoes">Shoes</option>
            <option value="accessories">Accessories</option>
          </select>
        </div>
        <div>
          <label htmlFor="productImage" className="block text-sm font-medium text-gray-700 mb-1">
            Product Image URL
          </label>
          <input
            type="url"
            id="productImage"
            value={productImage}
            onChange={(e) => setProductImage(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 transition-colors duration-300 flex items-center"
        >
          <FaPlus className="mr-2" /> Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;

