import React, { useState, useEffect, useRef } from "react";
import { Outlet, Link } from "react-router-dom";
import Cart from "./Cart";

function Layout() {
  // State for cart, modals, dark mode (moved from Home.js)
  const [cartItems, setCartItems] = useState([]); // Consider lifting state if needed by ProductDetail
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const modalRef = useRef(null);
  const mobileMenuRef = useRef(null);
  
  // Function to get initial dark mode setting
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

  // Effect to save dark mode preference
  useEffect(() => {
    localStorage.setItem("mode", JSON.stringify(dark));
    if (dark) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [dark]);

  // Handlers for cart operations (moved from Home.js)
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

  // Handlers for toggling modals (moved from Home.js)
  const toggleCartModal = () => {
    setIsCartModalOpen(!isCartModalOpen);
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  };
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isCartModalOpen) setIsCartModalOpen(false);
  };

  // Handler for clicks outside modals (moved from Home.js)
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsCartModalOpen(false);
    }
    if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && 
        !event.target.closest('.hamburger-menu')) {
      setIsMobileMenuOpen(false);
    }
  };

  // Effect for modal click outside listener (moved from Home.js)
  useEffect(() => {
    if (isCartModalOpen || isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCartModalOpen, isMobileMenuOpen]);

  // Calculate total cart items
  const totalCartItems = cartItems.reduce((total, item) => total + item.qty, 0);

  return (
    // Apply dark mode class to the root div or directly to body via useEffect
    <div className={dark ? "containers dark-mode" : "containers"}>
      <header className="header">
        <div className="container">
          <div className="nav">
            <button className="hamburger-menu" onClick={toggleMobileMenu}>
              <i className="fa fa-bars"></i>
            </button>
            {/* Use Link for navigation */}
            <ul>
              <li ><Link style={{color:"white"}} to="/">خانه</Link></li>
              {/* Add other links as needed */}
              <li><Link style={{color:"white"}} to="/about">درباره ما</Link></li>
              <li><Link style={{color:"white"}} to="/contact">تماس با ما</Link></li>
            </ul>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div className="cart-icon" onClick={toggleCartModal}>
                <i className="fa fa-shopping-cart"></i>
                {totalCartItems > 0 && (
                  <span className="cart-count">{totalCartItems}</span>
                )}
              </div>
              <label htmlFor="darkModeToggle" className="switch">
                <input
                  id="darkModeToggle"
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
        {/* Render the matched child route's component */}
        {/* Pass down props needed by child components */}
        <Outlet context={{ addProducts, removeProducts, cartItems }} />
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
            {/* Pass only necessary props to Cart */}
            <Cart cartItems={cartItems} removeProducts={removeProducts} />
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`} onClick={toggleMobileMenu}></div>
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`} ref={mobileMenuRef}>
        <button className="mobile-menu-close" onClick={toggleMobileMenu}>
          <i className="fa fa-times"></i>
        </button>
        <div className="mobile-menu-header">منو</div>
        <ul className="mobile-menu-items">
           <li><Link to="/" onClick={toggleMobileMenu}>خانه</Link></li>
           <li><Link to="/about" onClick={toggleMobileMenu}>درباره ما</Link></li>
           <li><Link to="/contact" onClick={toggleMobileMenu}>تماس با ما</Link></li>
           {/* Add other links here, ensure toggleMobileMenu is called onClick */}
        </ul>
      </div>
    </div>
  );
}

export default Layout;
