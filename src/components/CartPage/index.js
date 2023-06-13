import { React, useState, useEffect, useMemo, useContext } from "react";
import { API, handleError } from "../../config/api";
import convertRupiah from "rupiah-format";
// import { UserContext } from "../../Context/userContext";
// import { io } from "socket.io-client";
import { Link, useNavigate, useLocation } from "react-router-dom";

import {
  Wrapper,
  // WrapContent,
  WrapOrder,
  Orderbtn,
  Pp,
  WrapOrder2,
  Flex,
  FlexCollum,
  Wrap1,
  Wrap2,
  Wrap3,
} from "./CartPage.styled";

import plus from "../../img/+.svg";
import min from "../../img/-.svg";
import trash from "../../img/Trash.svg";
import Header from "../Header";
import { UserContext } from "../../Context/userContext";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

const CartPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHistory = location.key !== "default";
  const {
    state: { isUserOrder },
    dispatch,
  } = useContext(UserContext);

  const [transaction, setTransaction] = useState(null);

  const [total, setTotal] = useState(null);
  // Navigate back if there is no orders left in example when delete or minus the order until it left nothing

  const [orders, setOrders] = useState([]);
  const orderStatus = useMemo(
    () =>
      transaction?.status === "Waiting Approve" ||
      transaction?.status === "On The Way"
        ? true
        : false,
    [transaction?.status]
  );

  const [refresh, setReresh] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    (async () => {
      await API.get("/order/count", { signal })
        .then((res) => {
          setTotal(res.data.total);

          if (!res || res.data.total === 0) {
            // Bring back user to previous history
            isHistory ? navigate(-1) : navigate("/");

            // Close access to cart page
            dispatch({ status: "isUserOrder", payload: false });
          }

          // In case isUserOrder status alredy true we do not need to dispatch
          if (isUserOrder === true) return;
        })
        .catch((err) => handleError(err));
      await API.get("/transaction/active", { signal })
        .then((res) => {
          // Seems DESC by createdAt not working at sequelize, so do it in client
          res.data.data.transaction.product.sort((a, b) =>
            a.id <= b.id ? -1 : a.id >= b.id ? 1 : 0
          );

          setOrders(res.data.data.transaction.product); //orders is contain the product;
          setTransaction(res.data.data.transaction);
        })
        .catch((err) => handleError(err));
    })();
    return () => controller.abort();
  }, [refresh, isHistory, dispatch, navigate, isUserOrder]);

  const orderDelete = async (orderId) => {
    if (!orderId) return;
    try {
      if (orderStatus === true) return null;

      await API.delete(`/order/${orderId}`);

      setReresh(!refresh);
    } catch (err) {
      handleError(err);
    }
  };

  const addHandle = async (productId) => {
    try {
      if (orderStatus === true) return null;

      const form = {
        transactionId: transaction.id,
        products: [
          {
            productId,
            qty: 1,
          },
        ],
      };

      // Post add order this api adjust from transaction table, product table, to delete its order
      await API.post("/add/order", form, config);
      setReresh((prev) => !prev);
    } catch (err) {
      handleError(err);
    }
  };
  const lessHandle = async (productId) => {
    try {
      if (orderStatus === true) return null;

      const form = {
        transactionId: transaction.id,
        products: [
          {
            productId,
            qty: 1,
          },
        ],
      };

      // Post less order this api adjust from transaction table, product table, to delete its order
      await API.post("/less/order", form, config);
      setReresh((prev) => !prev);
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <>
      <Header />
      <Wrapper>
        <h1>My Chart</h1>
        <h2>Review Your Order</h2>
        <WrapOrder>
          <div className="over">
            <WrapOrder2>
              {/* TC~REPEAT */}
              <tbody>
                {orders.length > 0 ? (
                  orders.map((product) => {
                    return (
                      <tr key={product.img}>
                        <Flex>
                          <Wrap1>
                            <img
                              src={product.img.replace(
                                "q_auto:good",
                                "q_auto:eco"
                              )}
                              key={product.title}
                              alt="product"
                            />
                            <Wrap2>
                              <Wrap3>
                                <h4>{product?.title || "loading..."}</h4>
                                <p>
                                  {convertRupiah.convert(
                                    product.order.qty * product.price
                                  )}
                                </p>
                              </Wrap3>
                              <Wrap3>
                                <div>
                                  <button
                                    onClick={() => {
                                      lessHandle(product.id);
                                    }}
                                  >
                                    <img src={min} alt="minus" />
                                  </button>
                                  <h4 className="pinkBg">
                                    {product.order.qty}
                                  </h4>
                                  <button
                                    onClick={() => {
                                      addHandle(product.id);
                                    }}
                                  >
                                    <img src={plus} alt="plust" />
                                  </button>
                                </div>
                                <button
                                  onClick={() => {
                                    orderDelete(product?.order?.id);
                                  }}
                                >
                                  <img src={trash} alt="trash" />
                                </button>
                              </Wrap3>
                            </Wrap2>
                          </Wrap1>
                        </Flex>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td>
                      <h2>Loading...</h2>
                    </td>
                  </tr>
                )}
              </tbody>
            </WrapOrder2>
          </div>
          <FlexCollum>
            <table>
              <tbody>
                <tr>
                  <td>
                    <Wrap3>
                      <Pp>Subtotal</Pp>
                      <Pp>
                        {transaction?.price
                          ? convertRupiah.convert(transaction.price)
                          : "Loading..."}
                      </Pp>
                    </Wrap3>
                    <Wrap3>
                      <Pp>Ongkir</Pp>
                      <Pp>{convertRupiah.convert(10000)}</Pp>
                    </Wrap3>
                    <Wrap3>
                      <Pp>Qty</Pp>
                      <Pp>{total}</Pp>
                    </Wrap3>
                  </td>
                </tr>
              </tbody>
            </table>
            <Wrap1>
              <Pp b>TOTAL</Pp>
              <Pp b>
                {transaction?.price
                  ? convertRupiah.convert(transaction.price + 10000)
                  : "Loading..."}
              </Pp>
            </Wrap1>
          </FlexCollum>
        </WrapOrder>
        <Orderbtn>
          <Link to="checkout">
            <button>
              {orderStatus ? "See Checkout" : "Process To Checkout"}
            </button>
          </Link>
        </Orderbtn>
      </Wrapper>
    </>
  );
};

export default CartPage;
