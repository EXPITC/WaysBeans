import React, { useState, useEffect } from "react";

import Header from "../Header";
import { API, handleError } from "../../config/api";
import { Link } from "react-router-dom";
import { Card, Wrapper } from "./Products.styled";
import convertRupiah from "rupiah-format";

const ProductCard = (product) => (
  <Link
    to={`/detail/${product.id}`}
    key={product.id}
    style={{ textDecoration: "none" }}
  >
    <Card>
      <img src={product.img} alt={product.title} />
      <h3>{product.title}</h3>
      <p>{convertRupiah.convert(product.price)}</p>
      <p>Stock: {product.stock}</p>
    </Card>
  </Link>
);

const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    (async () => {
      await API.get("/products/all", { signal })
        .then((res) => {
          setProducts(res.data.data);
        })
        .catch((err) => handleError(err));
    })();
    return () => controller.abort();
  }, []);

  return (
    <>
      <Header />
      <Wrapper>{products.map((product) => ProductCard(product))}</Wrapper>
    </>
  );
};

export default Product;
