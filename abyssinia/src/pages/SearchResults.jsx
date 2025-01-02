import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";

function SearchResults() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q");

  // Placeholder data (replace with actual search logic)
  const [results, setResults] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `http://localhost:5000/search?query=${query}`
        );
        const data = await response.json();
        if (data.status == "success") {
          setResults(data.data);
        } else {
          alert("faild to fetch data");
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    }

    if (query) {
      fetchData();
    }
  }, [query]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Search Results for "{query}"</h1>

      {results.length === 0 ? (
        <p className="text-gray-600">No results found for "{query}".</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
                <p className="text-lg font-bold text-blue-600">
                  ${product.price.toFixed(2)}
                </p>
                <Link
                  to={`/product/${product._id}`}
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
