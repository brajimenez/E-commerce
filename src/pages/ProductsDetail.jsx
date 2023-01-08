import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProductsThunk } from "../store/slices/products.slice";
import { Card, Row, Col } from "react-bootstrap";
import "../styles/stylesProductDetail.css";
import { addCartThunk, getCartThunk } from "../store/slices/cart.slice";
import axios from "axios";

const ProductsDetail = () => {
  const products = useSelector((state) => state.products);
  const [productDetail, setProductDetail] = useState({});
  const [suggestedProducts, setSuggestedProduct] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProductsThunk());
    dispatch(getCartThunk());
  }, []);

  useEffect(() => {
    const URL = `https://e-commerce-api.academlo.tech/api/v1/products/${id}`;
    axios
      .get(URL)
      .then((res) => setProductDetail(res.data.data.product))
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    const product = products.find(
      (productShop) => productShop.id === Number(id)
    );
    setProductDetail(product);
    const filteredProducts = products.filter(
      (productShop) => productShop.category.id === product.category.id
    );
    setSuggestedProduct(filteredProducts);
  }, [products, id]);

  // useEffect(() => {
  //   if (products && suggestedProducts) {
  //     const pivot = products.filter(
  //       (prod) => prod.category.name === product.category
  //     );
  //     setSuggestedProduct(pivot);
  //   }
  // }, [products, suggestedProducts]);

  const addToCart = (id, quantity) => {
    dispatch(addCartThunk(id, quantity));
  };

  // sumar productos
  const add = () => {
    if (quantity > 0 && quantity < 5) {
      setQuantity(quantity + 1);
    }
  };

  // quitar del carrito
  const subtract = () => {
    if (quantity > 1 && quantity <= 5) {
      setQuantity(quantity - 1);
    }
  };
  // efecto de imagen
  const showImage = (event) => {
    event.target.childNodes[1]?.classList.add("hover");
  };

  const hiddeImage = (event) => {
    event.target.childNodes[1]?.classList?.remove("hover");
  };

  // fin efecto de imagen

  return (
    <section>
      <div className="title">
        <h4>Home</h4>
        <div className="circle"></div>
      </div>
      <article className="container__product-detail">
        <section
          className="product-img__detail"
          onMouseEnter={(e) => showImage(e)}
          onMouseLeave={(e) => hiddeImage(e)}
        >
          <div className="image-wrapp__detail">
            {/* <img src={productDetail?.productImgs?.[1]} alt="" /> */}
            {/* <img src={productDetail?.productImgs?.[2]} alt="" /> */}
          </div>
        </section>
        <section className="products__description">
          <h4>{productDetail?.title}</h4> <hr />
          <h4 className="title__product-detail__pAbsolute">
            {productDetail?.title}
          </h4>
          <div className="products__description-text">
            <p>
              Description:
              {productDetail?.description}
            </p>
            <p>Price: {productDetail?.price}</p>
          </div>
          <div className="quantity">
            <span className="label-quantity">Quantity</span>
            <div className="quantity__add-sub">
              <button className="btn-quantity" onClick={() => subtract()}>
                -
              </button>
              <div className="value">{quantity}</div>
              <button className="btn-quantity" onClick={() => add()}>
                +
              </button>
            </div>
          </div>
          <div className="btn__cart-detail">
            <button
              className="button__cart-detail"
              onClick={() => addToCart(productDetail.id, 1)}
            >
              Add to cart
            </button>
          </div>
        </section>
      </article>

      <section className="products-seggested">
        <Row xs={1} md={2} xl={4} className="g-4">
          {suggestedProducts?.map((product) => (
            <Col key={product.id}>
              <Card onClick={() => navigate(`/product/${product.id}`)}>
                <div className="product-img">
                  <div
                    onMouseEnter={(e) => showImage(e)}
                    onMouseLeave={(e) => hiddeImage(e)}
                    className="image-wrapp"
                  >
                    <img src={product.productImgs[0]} alt="" />
                    <img src={product.productImgs[1]} alt="" />
                  </div>
                </div>
                <Card.Body className="product-description">
                  <Card.Title>{product.title}</Card.Title>
                  <p>
                    <b>Price</b>
                  </p>
                  <Card.Text> {product.price}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </section>
    </section>
  );
};

export default ProductsDetail;
