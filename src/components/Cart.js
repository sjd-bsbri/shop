import React from "react";
import formatCurrency from "./Util";
import {Slide} from 'react-awesome-reveal';

function Cart(props) {
  const { cartItems , removeProducts} = props;
  const itemPrice = cartItems.reduce((a,c)=> a + c.price * c.qty, 0);
  const totalPrice = itemPrice

  return (
    <div className="cart">
        {
          cartItems.length === 0 ? 
          <div className="empty-price alert alert-info">سبد خرید خالی است.</div>:
          <div className="show-price alert alert-success">شما {cartItems.length} محصول در سبد خرید دارید</div>
        }
      <div className="cart-item">
        {cartItems.map((item) => 
          <Slide direction="left" key={item.id}>
            <div className="product-item card mb-2">
              <div className="product-detail card-body d-flex align-items-center">
                <img src={item.image} alt="" className="img-fluid me-2" style={{maxWidth: "60px"}} />
                <div className="cart-item-details">
                  <h5 className="card-title mb-0">{item.title}</h5>
                </div>
              </div>
              <div className="product-price card-footer d-flex justify-content-between align-items-center">
                <div className="price">
                  <span>{formatCurrency(item.price)}</span>
                  <span className="qty badge bg-secondary ms-2"> {item.qty} خرید</span>
                </div>
                <div className="remove-item">
                  <button className="delete-button" onClick={() => removeProducts(item)}>
                    <i className="fa fa-trash"></i> حذف
                  </button>
                </div>
              </div>
            </div>
          </Slide>
        )}
      </div>
      {cartItems.length > 0 && (
        <div className="total-price card mt-3">
          <div className="card-body text-center">
            <div className="total-amount">
              <div className="total-label">مجموع قیمت :</div>
              <div className="total-value">{formatCurrency(totalPrice)}</div>
            </div>
            <button className="checkout-button mt-3">
              <i className="fa fa-credit-card"></i> تکمیل خرید
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
