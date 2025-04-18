import React, { useState } from "react";
import formatCurrency from "./Util";
import {Fade} from 'react-awesome-reveal';

function Products({ item, addProducts }) {
  const [clickedButtons, setClickedButtons] = useState({});
  const [addedMessages, setAddedMessages] = useState({});
  
  const handleAddToCart = (product) => {
    // Set this product's button as clicked
    setClickedButtons(prev => ({
      ...prev,
      [product.id]: true
    }));
    
    // Show success message
    setAddedMessages(prev => ({
      ...prev,
      [product.id]: true
    }));
    
    // Add product to cart
    addProducts(product);
    
    // Reset animation after 700ms
    setTimeout(() => {
      setClickedButtons(prev => ({
        ...prev,
        [product.id]: false
      }));
      
      // Hide message after 1500ms
      setTimeout(() => {
        setAddedMessages(prev => ({
          ...prev,
          [product.id]: false
        }));
      }, 1000);
    }, 700);
  };

  return (
    <div>
      <Fade direction="down" duration={650}>
      <ul className="products">
        {item.map((x) => {
          // eslint-disable-next-line no-unused-vars
          const { id, title, image, price, availableBrand, qty } = x;
          return (
            <li key={id} className="product-item-wrapper">
              <div className="product">
                <div className="product-image-container">
                  <img src={image} alt={title} className="product-image"/>
                </div>
                <div className="product-details">
                  <p className="product-title">{title}</p>
                  <div className="product-price-section">
                    <div className="price-container">
                      <span className="price">{formatCurrency(price)}</span>
                    </div>
                    <div className="button-container">
                      <button 
                        onClick={() => handleAddToCart(x)}
                        className={clickedButtons[id] ? "clicked" : ""}
                      >
                        <i className="fa fa-shopping-cart"></i> <span className="button-text">افزودن به سبد خرید</span>
                      </button>
                      {addedMessages[id] && (
                        <span className="added-message success-toast">
                          <i className="fa fa-check-circle success-icon"></i> به سبد اضافه شد
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      </Fade>
    </div>
  );
}

export default Products;
