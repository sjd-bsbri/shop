import React, { useState, useEffect } from "react";
import Filter from "./Filter";
import Products from "./Products";
import Cart from "./Cart";
import { products } from "../data";
function Home() {
  const [item, setItem] = useState(products);
  const [sort, setSort] = useState("asc");
  const [brand, setBrand] = useState("");
  const [cartItems, setCartItems] = useState([]);
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
    </div>
  );
}

export default Home;
