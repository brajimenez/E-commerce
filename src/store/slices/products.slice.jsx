import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setIsLoading } from "./isLoading.slice";

export const productsSlice = createSlice({
  name: "products",
  initialState: [],
  reducers: {
    setProducts: (_state, action) => {
      const products = action.payload;
      return products;
    },
    filterProductsByPrice: (state, action) => {
      return state.filter(
        (product) =>
          product.price >= action.payload.minPrice &&
          product.price <= action.payload.maxPrice
      );
    },
  },
});

export const getProductsThunk = () => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios
    .get("https://e-commerce-api.academlo.tech/api/v1/products")
    .then((res) => dispatch(setProducts(res.data?.data.products)))
    .finally(() => dispatch(setIsLoading(false)));
};

export const filterProductsThunk = (searchValue) => (dispatch) => {
  dispatch(setIsLoading(true));
  return (
    axios
      .get(
        `https://e-commerce-api.academlo.tech/api/v1/products/?query=${searchValue}`
      )
      .then((res) => dispatch(setProducts(res.data?.data.products)))
      // .catch(error=> console.log(error))
      .finally(() => dispatch(setIsLoading(false)))
  );
};

export const filterCategoryThunk = (categoryId) => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios
    .get(
      `https://e-commerce-api.academlo.tech/api/v1/products/?category=${categoryId}`
    )
    .then((res) => dispatch(setProducts(res.data?.data.products)))
    .finally(() => dispatch(setIsLoading(false)));
};

export const filterPriceThunk =
  ({ minPrice, maxPrice }) =>
  (dispatch) => {
    dispatch(setIsLoading(true));
    axios
      .get("https://e-commerce-api.academlo.tech/api/v1/products")
      .then((res) => dispatch(setProducts(res.data.data.products)))
      .then(() => dispatch(filterProductsByPrice({ minPrice, maxPrice })))
      .finally(() => dispatch(setIsLoading(false)));
  };

export const { setProducts, filterProductsByPrice } = productsSlice.actions;

export default productsSlice.reducer;
