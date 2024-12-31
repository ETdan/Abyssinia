import { useState } from 'react';
import { FaStar } from 'react-icons/fa';

function Product() {
  const [currentImage, setCurrentImage] = useState(0);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  // Placeholder data (replace with actual data fetching logic)
  const product = {
    id: '1',
    name: 'Classic White T-Shirt',
    price: 29.99,
    description: 'A comfortable and versatile white t-shirt made from 100% organic cotton.',
    images: [
      '/images/white-tshirt-1.jpg',
      '/images/white-tshirt-2.jpg',
      '/images/white-tshirt-3.jpg',
    ],
    rating: 4.5,
    reviews: 28,
  };

  const handleImageChange = (index) => {
    setCurrentImage(index);
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    // Handle review submission logic here
    console.log('Review submitted:', { rating, review });
    // Reset form
    setRating(0);
    setReview('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <img src={product.images[currentImage]} alt={product.name} className="w-full h-auto rounded-lg" />
          <div className="flex space-x-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => handleImageChange(index)}
                className={`w-20 h-20 border-2 rounded ${currentImage === index ? 'border-blue-500' : 'border-gray-300'}`}
              >
                <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400 mr-2">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'} />
              ))}
            </div>
            <span className="text-gray-600">({product.reviews} reviews)</span>
          </div>
          <p className="text-2xl font-bold text-blue-600 mb-4">${product.price.toFixed(2)}</p>
          <p className="text-gray-600 mb-6">{product.description}</p>
          
          <div className="mb-6">
            <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-2">Size</label>
            <select id="size" className="w-full p-2 border rounded">
              <option>Small</option>
              <option>Medium</option>
              <option>Large</option>
              <option>X-Large</option>
            </select>
          </div>

          <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300">
            Add to Cart
          </button>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
        <form onSubmit={handleSubmitReview} className="mb-8">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Your Rating</label>
            <div className="flex">
              {[...Array(5)].map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setRating(index + 1)}
                  className={`text-2xl ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                >
                  <FaStar />
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-2">Your Review</label>
            <textarea
              id="review"
              rows="4"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="w-full p-2 border rounded"
              required
            ></textarea>
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300">
            Submit Review
          </button>
        </form>

        <div className="space-y-4">
          {/* Placeholder reviews */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400 mr-2">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
              </div>
              <span className="font-semibold">John Doe</span>
            </div>
            <p className="text-gray-600">Great t-shirt! Comfortable and fits well. Highly recommended.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400 mr-2">
                <FaStar /><FaStar /><FaStar /><FaStar /><span className="text-gray-300"><FaStar /></span>
              </div>
              <span className="font-semibold">Jane Smith</span>
            </div>
            <p className="text-gray-600">Nice quality, but runs a bit small. Consider sizing up.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
