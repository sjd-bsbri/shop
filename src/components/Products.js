import React from "react";
import formatCurrency from "./Util";
import {Fade} from 'react-awesome-reveal';

function Products({ item, addProducts }) {
  return (
    <div>
      <Fade direction="down"  duration={650}>
      <ul className="products">
        {item.map((x) => {
          // eslint-disable-next-line no-unused-vars
          const { id, title, image, price, availableBrand, qty } = x;
          return (
            <li key={id}>
              <div className="product">
                <img src={image} alt={title}/>
                <p>{title}</p>
                <div className="product-price">
                  <button onClick={()=> addProducts(x)}>افزودن به سبد خرید</button>
                  <div className="price">{formatCurrency(price)}</div>
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
