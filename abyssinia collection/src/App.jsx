import React from "react";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Exploar from "./components/Exploar";
import Account from "./components/Account";
import CategoryList from "./components/CategoryList ";
import Search from "./components/Search";
import ProductPage from "./components/ProductPage";

export default function App() {
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path="home" element={<Exploar />} />
          <Route path="/" element={<Layout />}>
            <Route path="search">
              <Route index element={<Search />} />
              <Route path=":id" element={<ProductPage />} />
            </Route>
            <Route path="categories" element={<CategoryList />} />
            <Route path="account" element={<Account />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}
