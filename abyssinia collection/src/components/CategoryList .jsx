const CategoryList = () => {
  return (
    <div>
      <h2 className="font-bold text-lg mb-4">Categories</h2>
      <ul>
        <li className="hover:text-yellow-500 cursor-pointer">Category 1</li>
        <li className="hover:text-yellow-500 cursor-pointer">Category 2</li>
        <li className="hover:text-yellow-500 cursor-pointer">Category 3</li>
        {/* Add more categories as needed */}
      </ul>
    </div>
  );
};

export default CategoryList;
