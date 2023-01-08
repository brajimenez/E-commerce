import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addCartThunk } from "../store/slices/cart.slice";
import "../styles/productCard.css";
import shoppingcart from "../images/shoppingcart.png";

const ProductsCart = ({ products }) => {
  const dispatch = useDispatch();

  const showImage = (event) => {
    event.target.childNodes[1]?.classList.add("hover");
  };

  const hiddeImage = (event) => {
    event.target.childNodes[1]?.classList?.remove("hover");
  };

  const addToCart = (id, quantity) => {
    dispatch(addCartThunk(id, quantity));
  };

  return (
    <div>
      <ul className="products-wrapper">
        {products?.map((product) => (
          <li className="product-card" key={product.id}>
            <Link to={`/product/${product.id}`}>
              <div
                onMouseEnter={(e) => showImage(e)}
                onMouseLeave={(e) => hiddeImage(e)}
                className="image-wrapp"
              >
                <img src={product.productImgs[0]} alt="" />
                <img src={product.productImgs[1]} alt="" />
              </div>
            </Link>
            <div className="product-info">
              <span className="brand"></span>
              <strong>{product.title}</strong>
              <span className="price">Price</span>
              <span className="amount">$ {product.price}</span>
              <button onClick={() => addToCart(product.id, 1)}>
                <i className="fa-solid fa-cart-shopping"></i>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsCart;
