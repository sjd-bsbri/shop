import React, { useState } from "react";
import { useOutletContext } from "react-router-dom"; // Import useOutletContext
import Filter from "./Filter";
import Products from "./Products"; // Assuming Products_new.js was renamed or its content merged
import Cart from "./Cart";
import { products as initialProducts } from "../data"; // Rename to avoid conflict

function Home() {
  // Get props/context from Layout via Outlet
  const { addProducts, removeProducts, cartItems } = useOutletContext();
  
  // State specific to Home page (product filtering/sorting)
  const [item, setItem] = useState(initialProducts);
  const [sort, setSort] = useState("asc");
  const [brand, setBrand] = useState("");
  
  // Sorting logic (remains in Home as it controls the product list here)
  const sortProducts = (event) => {
    const currentSort = event.target.value;
    setSort(currentSort);
    let sortedItems = [...item]; // Create a copy to sort
    if (currentSort === "asc") {
      // Assuming ID based sorting for asc/desc
      sortedItems.sort((a, b) => a.price - b.price); // Example: sort by price ascending
    } else if (currentSort === "desc") {
      sortedItems.sort((a, b) => b.price - a.price); // Example: sort by price descending
    } else {
      // Optional: handle 'latest' or other sorts, or reset to default
      // For now, assume 'latest' means sort by ID descending (newest first)
      sortedItems.sort((a, b) => b.id - a.id); 
    }
    setItem(sortedItems);
  };

  // Filtering logic (remains in Home)
  const filterProducts = (event) => {
    const selectedBrand = event.target.value;
    setBrand(selectedBrand);
    if (selectedBrand === "") {
      // Reset to all products if filter is cleared, potentially re-apply sort
      let resetItems = [...initialProducts];
      // Re-apply current sort to the full list
      if (sort === "asc") resetItems.sort((a, b) => a.price - b.price);
      else if (sort === "desc") resetItems.sort((a, b) => b.price - a.price);
      else resetItems.sort((a, b) => b.id - a.id); // Default/latest sort
      setItem(resetItems);
    } else {
      // Filter from the original list
      let filtered = initialProducts.filter(
        (product) => product.availableBrand.includes(selectedBrand)
      );
      // Apply current sort to the filtered list
      if (sort === "asc") filtered.sort((a, b) => a.price - b.price);
      else if (sort === "desc") filtered.sort((a, b) => b.price - a.price);
      else filtered.sort((a, b) => b.id - a.id); // Default/latest sort
      setItem(filtered);
    }
  };

  // Removed state: cartItems, dark, modals - Managed by Layout
  // Removed functions: addProducts, removeProducts, toggleCartModal, toggleMobileMenu, handleClickOutside, getMode - Managed by Layout
  // Removed useEffects for dark mode and modal listeners - Managed by Layout

  return (
    // The main content structure, header/footer are now in Layout
    <div className="content">
      <div className="main">
        <Filter
          count={item.length}
          sort={sort} // Pass sort state
          sortProducts={sortProducts}
          brand={brand}
          filterProducts={filterProducts}
        />
        {/* Pass addProducts down to Products component */}
        <Products item={item} addProducts={addProducts} />
      </div>
      <div className="sidebar">
        {/* Cart component now receives its props from Layout via context */}
        <Cart cartItems={cartItems} removeProducts={removeProducts} />
      </div>
    </div>
    // Removed Header, Footer, Modals - Managed by Layout
  );
}

export default Home;