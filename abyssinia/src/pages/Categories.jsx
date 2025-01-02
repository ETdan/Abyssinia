import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Categories() {
  const [categoriesList, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/categories")
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "success") {
          setCategories(result.data);
        } else {
          console.error(
            "Error fetching categoriesList: Unexpected response status"
          );
        }
      })
      .catch((error) => console.error("Error fetching categoriesList:", error));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Categories</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {categoriesList.map((category, index) => (
          <Link
            key={category._id || index}
            to={`/category/${category.name.toLowerCase()}`}
            className="relative overflow-hidden rounded-lg shadow-md group"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="text-white text-center">
                <h2 className="text-lg font-semibold">{category.name}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Categories;
