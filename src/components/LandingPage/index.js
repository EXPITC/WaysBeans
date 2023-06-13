import { React, useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { API, handleError } from "../../config/api";
import convertRupiah from "rupiah-format";

//components
import Header from "../Header";

//img
import banner from "../../img/banner.png";

import {
  Banner,
  WrapFlex,
  WrapFlex2,
  Card,
  WrapMain,
} from "./LandingPage.styled";
import { UserContext } from "../../Context/userContext";
import { AuthModalContext } from "../../Context/authModalContext";

const ProductsCard = (isLogin, product, authModalToggle) => {
  const ProductCard = () => (
    <Card
      key={product.id + product.title}
      onClick={isLogin ? null : authModalToggle}
    >
      <img
        src={product.img.replace("q_auto:good", "q_auto:eco")}
        alt={product.title}
      />
      <h3>{product.title}</h3>
      <p>{convertRupiah.convert(product.price)}</p>
      <p>Stock: {product.stock}</p>
    </Card>
  );

  if (!isLogin) return <ProductCard key={product.id + product.title + 2} />;
  return (
    <Link
      key={product.id + product.title + 3}
      to={`/detail/${product.id}`}
      style={{ textDecoration: "none" }}
    >
      <ProductCard />
    </Link>
  );
};

const LandingPage = () => {
  const { state } = useContext(UserContext);
  const { isLogin } = state;

  const { dispatch } = useContext(AuthModalContext);
  const authModalToggle = () => dispatch("openLoginModal");

  const [products, setProducts] = useState([]);
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    (async () => {
      await API.get("/products/all", { signal })
        .then((res) => {
          setProducts(res.data.data);
        })
        .catch((err) => {
          handleError(err);
        });
    })();
    return () => controller.abort();
  }, []);

  return (
    <>
      <Header isTroll={true} />
      <WrapMain>
        <Banner src={banner} alt="banner" />
        <WrapFlex>
          <WrapFlex2>
            {products.map((product) =>
              ProductsCard(isLogin, product, authModalToggle)
            )}
          </WrapFlex2>
        </WrapFlex>
      </WrapMain>
    </>
  );
};

export default LandingPage;
