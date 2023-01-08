import React, { useEffect } from "react";
import { Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { buyCart, getCartThunk } from "../store/slices/cart.slice";
import "../styles/cart.css";

const Cart = ({ show, handleClose }) => {
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartThunk());
  }, []);

  const getTotal = () => {
    let total = 0;
    cart.forEach((product) => {
      total += Number(product.price) * product.productsInCart.quantity;
    });

    return total;
  };

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <div className="cart">
        <Offcanvas.Header closeButton style={{ alignItems: "baseline" }}>
          <Offcanvas.Title>Cart</Offcanvas.Title>
          <ul className="cart-products-list">
            {cart?.map((product) => (
              <li key={product.id}>
                <div className="product-info__cart">
                  <div className="details">
                    <span className="brand">{product.brand}</span>
                    <p>{product.title}</p>
                    <div className="quantity">
                      {product.productsInCart.quantity}
                    </div>
                  </div>
                </div>
                <div className="total">
                  <span className="label">Total: </span>
                  <b>$ {product.price * product.productsInCart.quantity}</b>
                </div>
              </li>
            ))}
            <div className="checkout-section">
              <div className="totals">
                {" "}
                <span className="label">Subtotal:</span>
                <b>$ {getTotal()}</b>
              </div>
              <button
                onClick={() => dispatch(buyCart())}
                className="buy-button"
              >
                Checkout
              </button>
            </div>
          </ul>
        </Offcanvas.Header>
        <Offcanvas.Body></Offcanvas.Body>
      </div>
    </Offcanvas>
  );
};

export default Cart;
