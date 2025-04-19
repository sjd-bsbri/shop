import React, { useState, useEffect, useRef } from "react";
import { Outlet, Link } from "react-router-dom";
import Cart from "./Cart";

function Layout() {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cartItems');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Failed to parse cart items from localStorage", error);
      return []; 
    }
  });

  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const modalRef = useRef(null);
  const mobileMenuRef = useRef(null);
  
  const getMode = () => {
    const initialMode = localStorage.getItem("mode");
    if (initialMode == null) {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return true;
      } else {
        return false;
      }
    } else {
      try {
        return JSON.parse(initialMode);
      } catch (error) {
        console.error("Failed to parse dark mode setting from localStorage", error);
        return false; 
      }
    }
  };
  const [dark, setDark] = useState(getMode());

  useEffect(() => {
    localStorage.setItem("mode", JSON.stringify(dark));
    if (dark) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [dark]);

  useEffect(() => {
    try {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } catch (error) {
      console.error("Failed to save cart items to localStorage", error);
    }
  }, [cartItems]);

  const addProducts = (product) => {
    setCartItems(prevCartItems => {
        const exist = prevCartItems.find((element) => element.id === product.id);
        if (exist) {
        return prevCartItems.map((element) =>
            element.id === product.id ? { ...exist, qty: exist.qty + 1 } : element
        );
        } else {
        return [...prevCartItems, { ...product, qty: 1 }];
        }
    });
  };

  const removeProducts = (product) => {
    setCartItems(prevCartItems => {
        const exist = prevCartItems.find((element) => element.id === product.id);
        if (exist.qty === 1) {
        return prevCartItems.filter((element) => element.id !== product.id);
        } else {
        return prevCartItems.map((element) =>
            element.id === product.id ? { ...exist, qty: exist.qty - 1 } : element
        );
        }
    });
  };

  const toggleCartModal = () => {
    setIsCartModalOpen(!isCartModalOpen);
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  };
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isCartModalOpen) setIsCartModalOpen(false);
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target) && !event.target.closest('.cart-icon')) {
      setIsCartModalOpen(false);
    }
    if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && 
        !event.target.closest('.hamburger-menu')) {
      setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isCartModalOpen || isMobileMenuOpen) {
      document.addEventListener('click', handleClickOutside, true); // Use capture phase
    } else {
      document.removeEventListener('click', handleClickOutside, true);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [isCartModalOpen, isMobileMenuOpen]);

  const totalCartItems = cartItems.reduce((total, item) => total + item.qty, 0);

  // Footer data
  const socialLinks = [
    { icon: 'fa-facebook-f', url: '#', name: 'Facebook' },
    { icon: 'fa-twitter', url: '#', name: 'Twitter' },
    { icon: 'fa-instagram', url: '#', name: 'Instagram' },
    { icon: 'fa-linkedin-in', url: '#', name: 'LinkedIn' },
    { icon: 'fa-github', url: '#', name: 'GitHub' },
  ];
  const currentYear = new Date().getFullYear();

  return (
    <div className={dark ? "dark-mode" : ""}> 
      <div className="containers"> 
        <header className="header">
          <div className="container">
            <div className="nav">
              <button className="hamburger-menu" onClick={toggleMobileMenu}>
                <i className="fa fa-bars"></i>
              </button>
              <ul>
                <li><Link style={{color:"white"}} to="/">خانه</Link></li>
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
          <Outlet context={{ addProducts, removeProducts, cartItems }} />
        </main>

        {/* New Footer Structure */}
        <footer className="site-footer">
          <div className="footer-container">
            <div className="footer-section about">
              <h2>درباره ما</h2>
              <p>
                ما یک فروشگاه آنلاین پیشرو در ارائه جدیدترین و باکیفیت‌ترین لپ‌تاپ‌ها و لوازم جانبی هستیم. هدف ما ارائه بهترین تجربه خرید به مشتریان عزیز است.
              </p>
            </div>

            <div className="footer-section links">
              <h2>لینک‌های مفید</h2>
              <ul>
                <li><Link to="/">صفحه اصلی</Link></li>
                {/* Add placeholders based on your actual routes */}
                <li><Link to="/about">درباره ما</Link></li>
                <li><Link to="/contact">تماس با ما</Link></li>
                              </ul>
            </div>

            <div className="footer-section contact-social">
              <h2> شبکه‌های اجتماعی</h2>
              <div className="social-icons">
                {socialLinks.map((link, index) => (
                  <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.name}>
                    <i className={`fab ${link.icon}`}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {currentYear} تمامی حقوق محفوظ است. طراحی شده با ❤️</p>
          </div>
        </footer>

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
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Layout;
