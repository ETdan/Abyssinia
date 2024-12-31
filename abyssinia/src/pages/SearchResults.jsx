import { useLocation, Link } from 'react-router-dom';

function SearchResults() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q');

  // Placeholder data (replace with actual search logic)
  const results = [
    { id: 1, name: 'Product 1', price: 99.99, image: 'https://source.unsplash.com/random/400x300/?product1' },
    { id: 2, name: 'Product 2', price: 149.99, image: 'https://source.unsplash.com/random/400x300/?product2' },
    { id: 3, name: 'Product 3', price: 79.99, image: 'https://source.unsplash.com/random/400x300/?product3' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Search Results for "{query}"</h1>

      {results.length === 0 ? (
        <p className="text-gray-600">No results found for "{query}".</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <p className="text-lg font-bold text-blue-600">${product.price.toFixed(2)}</p>
                <Link
                  to={`/product/${product.id}`}
                  className="mt-4 block w-full bg-blue-500 text-white text-center py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8">
        <Link to="/" className="text-blue-500 hover:text-blue-700">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}

export default SearchResults;

