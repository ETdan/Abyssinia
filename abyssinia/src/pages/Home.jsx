import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

function Home() {
  const featuredProducts = [
    {
      id: 1,
      name: 'Classic White T-Shirt',
      price: 29.99,
      description: 'Essential cotton tee for everyday wear',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      hoverImage: 'https://images.unsplash.com/photo-1622445275576-721325763afe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 2,
      name: 'Slim Fit Jeans',
      price: 59.99,
      description: 'Modern slim fit denim jeans',
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      hoverImage: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 3,
      name: 'Floral Summer Dress',
      price: 49.99,
      description: 'Light and breezy floral print dress',
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      hoverImage: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 4,
      name: 'Leather Jacket',
      price: 129.99,
      description: 'Classic leather jacket for a timeless look',
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      hoverImage: 'https://images.unsplash.com/photo-1520975954732-35dd22299614?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <div className="relative h-96 rounded-lg overflow-hidden">
          <img src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="Hero Banner" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Welcome to Abyssinia</h1>
              <p className="text-xl text-white mb-8">Discover amazing deals on all your favorite products</p>
              <Link to="/categories" className="bg-white text-gray-800 py-2 px-6 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300">
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Shop by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <Link to="/categories" className="bg-gray-100 rounded-lg p-6 text-center hover:bg-gray-200 transition duration-300">
            <h3 className="text-xl font-semibold">View All Categories</h3>
          </Link>
          <Link to="/category/t-shirts" className="bg-gray-100 rounded-lg p-6 text-center hover:bg-gray-200 transition duration-300">
            <h3 className="text-xl font-semibold">T-Shirts</h3>
          </Link>
          <Link to="/category/jeans" className="bg-gray-100 rounded-lg p-6 text-center hover:bg-gray-200 transition duration-300">
            <h3 className="text-xl font-semibold">Jeans</h3>
          </Link>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6">Customer Reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((review) => (
            <div key={review} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <img src={`https://images.unsplash.com/photo-${review === 1 ? '1438761681033-6461ffad8d80' : '1494790108377-be9c29b29330'}?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&h=100&q=80`} alt={`Customer ${review}`} className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h4 className="font-semibold">Customer {review}</h4>
                  <div className="text-yellow-400">★★★★★</div>
                </div>
              </div>
              <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;

