import React from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import SearchFilters from "./SearchFilters";
import CategoryList from "./CategoryList ";
import AccountPaths from "./AccountPaths";
import ProductDetails from "./ProductDetails"; // Assuming this is the component for /search/:id

const Layout = () => {
  const location = useLocation();
  const { id } = useParams(); // Access dynamic parameters

  return (
    <div className="h-screen flex">
      {/* Dynamic Sidebar */}
      <aside className="w-1/6 bg-white h-auto">
        {location.pathname === "/search" && <SearchFilters />}
        {location.pathname.startsWith("/search/") && id && (
          <ProductDetails productId={id} />
        )}
        {location.pathname === "/categories" && <CategoryList />}
        {location.pathname === "/account" && <AccountPaths />}
        {/* Add more conditions for other pages as needed */}
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8 bg-white shadow">
        <Outlet /> {/* Renders the matched child route */}
      </main>
    </div>
  );
};

export default Layout;
