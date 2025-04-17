import React, { useState, useEffect, useRef } from "react";
import Filter from "./Filter";
import Products from "./Products";
import Cart from "./Cart";
import { products } from "../data";
function Home() {
  const [item, setItem] = useState(products);
  const [sort, setSort] = useState("asc");
  const [brand, setBrand] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const modalRef = useRef(null);
  
  const sortProducts = (event) => {
    setSort(event.target.value);
    if (sort === "asc") {
      setItem(products.sort((a, b) => (a.id < b.id ? 1 : -1)));
    }
    if (sort === "desc") {
      setItem(products.sort((a, b) => (a.id > b.id ? 1 : -1)));
    }
  };

  const filterProducts = (event) => {
    if (event.target.value === "") {
      setBrand(event.target.value);
      setItem(products);
    } else {
      setBrand(event.target.value);
      setItem(
        products.filter(
          (product) => product.availableBrand.indexOf(event.target.value) >= 0
        )
      );
    }
  };

  const addProducts = (product) => {
    const exist = cartItems.find((element) => element.id === product.id);
    if (exist) {
      setCartItems(
        cartItems.map((element) =>
          element.id === product.id ? { ...exist, qty: exist.qty + 1 } : element
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };

  const removeProducts = (product) => {
    const exist = cartItems.find((element) => element.id === product.id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((element) => element.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((element) =>
          element.id === product.id ? { ...exist, qty: exist.qty - 1 } : element
        )
      );
    }
  };

  const toggleCartModal = () => {
    setIsCartModalOpen(!isCartModalOpen);
  };
  
  // Close modal when clicking outside
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsCartModalOpen(false);
    }
  };

  useEffect(() => {
    // Add event listener when modal is open
    if (isCartModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    
    // Clean up the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCartModalOpen]);

  const getMode = () => {
    const initialMode = localStorage.getItem("mode");
    if (initialMode == null) {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return true;
      } else {
        return false;
      }
    } else {
      return JSON.parse(localStorage.getItem("mode"));
    }
  };

  const [dark, setDark] = useState(getMode());

  useEffect(() => {
    localStorage.setItem("mode", JSON.stringify(dark));
  }, [dark]);

  // Calculate total cart items
  const totalCartItems = cartItems.reduce((total, item) => total + item.qty, 0);

  return (
    <div className={dark ? "containers dark-mode" : "containers"}>
      <header className="header">
        <div className="container">
          <div className="nav">
            <ul>
              <li>خانه</li>
              <li>درباره ما</li>
              <li>تماس با ما</li>
            </ul>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {/* Cart Icon for Mobile */}
              <div className="cart-icon" onClick={toggleCartModal}>
                <i className="fa fa-shopping-cart"></i>
                {totalCartItems > 0 && (
                  <span className="cart-count">{totalCartItems}</span>
                )}
              </div>
              <label htmlFor="q" className="switch">
                <input
                  id="q"
                  type="checkbox"
                  onChange={() => setDark(!dark)}
                  checked={dark}
                />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
        </div>
      </header>
      <main>
        <div className="content">
          <div className="main">
            <Filter
              count={item.length}
              sortProducts={sortProducts}
              brand={brand}
              filterProducts={filterProducts}
            />
            <Products item={item} addProducts={addProducts} />
          </div>
          <div className="sidebar">
            <Cart cartItems={cartItems} removeProducts={removeProducts} />
          </div>
        </div>
      </main>
      <footer>طراحی توسط خودمون :) </footer>

      {/* Mobile Cart Modal */}
      <div className={`mobile-cart-modal ${isCartModalOpen ? 'open' : ''}`}>
        <div className="mobile-cart-content" ref={modalRef}>
          <div className="mobile-cart-header">
            <h2>سبد خرید</h2>
            <button className="mobile-cart-close" onClick={toggleCartModal}>
              <i className="fa fa-times"></i>
            </button>
          </div>
          <div className="mobile-cart-body">
            <Cart cartItems={cartItems} removeProducts={removeProducts} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
