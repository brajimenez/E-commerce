import "../styles/styles.css";
import "../styles/styleHome.css";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getProductsThunk,
  filterProductsThunk,
  filterCategoryThunk,
  filterPriceThunk,
} from "../store/slices/products.slice";
import { useSelector } from "react-redux/es/exports";
import { ListGroup, Form, InputGroup, Button } from "react-bootstrap";
import axios from "axios";
import iconSearch from "../images/iconSearch.png";
import ProductsCart from "../components/ProductsCart";

const Home = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [categories, setCategories] = useState([]);

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const products = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProductsThunk());

    axios
      .get("https://e-commerce-api.academlo.tech/api/v1/products/categories")
      .then((res) => setCategories(res.data?.data.categories));
  }, []);
  // console.log(categories)

  const selectPrice = (e) => {
    e.preventDefault();
    dispatch(filterPriceThunk({ minPrice, maxPrice }));
    if (minPrice < 0) {
      alert("Escribir una cantidad mayor o igual a 1000");
    }
  };
  return (
    <div>
      <section className="container__input">
        <InputGroup className="mb-4 mt-5 ">
          <Form.Control
            aria-label="Text"
            style={{ marginLeft: "30rem", marginRight: ".2rem" }}
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
            placeholder="What are you looking for?"
          />
          <Button
            variant="outline-primary"
            style={{ marginRight: "12.5rem" }}
            onClick={() => dispatch(filterProductsThunk(searchValue))}
          >
            <img src={iconSearch} alt="" />
          </Button>
        </InputGroup>
      </section>
      <article className="container">
        <section className="container__category">
          <ListGroup>
            <span className="category-span">Categories</span>
            <hr />
            {categories.map((category) => (
              <ListGroup.Item
                className="category-item"
                key={category.id}
                onClick={() => dispatch(filterCategoryThunk(category.id))}
              >
                {category.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
          <section className="title-price">
            <span className="filter-price__span">Price</span> <hr />
            <form onSubmit={selectPrice}>
              <div className="container__filter-price">
                <Form.Group className="mb-3">
                  <Form.Label
                    style={{ marginLeft: "1rem", fontSize: "1.1rem" }}
                  >
                    From
                  </Form.Label>
                  <input
                    className="input__filter-price"
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                  <Form.Label
                    style={{ marginLeft: "1rem", fontSize: "1.1rem" }}
                  >
                    To
                  </Form.Label>
                  <input
                    className="input__filter-price"
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </Form.Group>
                <Button
                  style={{
                    marginLeft: "8.5rem",
                    marginTop: "1rem",
                    background: "#ffff",
                    color: "blue",
                  }}
                  type="submit"
                >
                  Filter price
                </Button>
              </div>
            </form>
          </section>
        </section>
        <section className="container-card">
          <ProductsCart products={products} />
        </section>
      </article>
    </div>
  );
};

export default Home;
