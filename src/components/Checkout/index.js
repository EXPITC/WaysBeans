import { React, useState, useEffect, useMemo } from "react";
import { API, handleError } from "../../config/api";
import convertRupiah from "rupiah-format";
import Header from "../Header";
import Icon from "../../img/Icon.svg";

import {
  Wrapper,
  Preview,
  InputSide,
  Flex,
  FlexCollum,
  Pp,
  Popout,
  Modal,
  WrapperFlex,
} from "./Checkout.styled";
import { useNavigate, useLocation } from "react-router-dom";
import convertStamp from "../../utils/convertStamp";
import useSocket from "../../config/socket";

const WAITING_APPROVE = "Waiting Approve";
const DEFAULT_FORM = {
  name: "",
  email: "",
  phone: "",
  address: "",
  postcode: "",
  // attachment: "",
};
const PAYMENT_CLIENT_KEY = process.env.REACT_APP_CLIENT_KEY;
const SNAP_SRC_URL = process.env.REACT_APP_SNAP_SRC_URL;
const SHIPPING_COST = parseInt(process.env.REACT_APP_SHIPPING_COST);

const CheckoutPage = () => {
  // For navigate
  const navigate = useNavigate();
  const location = useLocation();
  const isHistory = location.key !== "default";

  const socket = useSocket();

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    // Init payment
    const paymentScriptElement = document.createElement("script");
    paymentScriptElement.src = SNAP_SRC_URL;
    paymentScriptElement.setAttribute("data-client-key", PAYMENT_CLIENT_KEY);
    paymentScriptElement.async = true;

    // Append payment element to the body
    document.body.appendChild(paymentScriptElement); // integrate with the handle payment

    console.info(
      "%cfor completely follow along waysbeans lifecyle, please refer to the link below for full payment testing, thankyou ( ✧≖ ͜ʖ≖)",
      "background-color: #F6E6DA; color: #613d2b; font-weight: bold; font-size: medium; text-align: center; overflow: hidden; border-radius: 3px; padding: 5px;"
    );
    console.info(
      "%chttps://docs.midtrans.com/docs/testing-payment-on-sandbox",
      "background-color: #613d2b; color: #F6E6DA;padding: 5px; overflow: hidden; border-radius: 2px;"
    );

    // Connect socket
    socket.on("connect", () => {
      console.info("socket alive: ", socket.connected);
    });

    socket.on("connect_error", (err) => {
      console.error(err.message);
    });

    return () => {
      // remove payment element
      document.body.removeChild(paymentScriptElement);

      // disconnecting the socket
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // About the transaction data
  const [order, setOrder] = useState([]);
  const [transaction, setTransaction] = useState({ status: "Order" });
  const isOrderWaitingApprove = useMemo(
    () => (transaction.status === WAITING_APPROVE ? true : false),
    [transaction]
  );

  // Form for update Transaction payment data
  const [form, setForm] = useState(DEFAULT_FORM);
  // Pre render Image *manual payment
  // const [pre, setPre] = useState(Clip);

  // Populate transaction data
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    (async () => {
      await API.get("/transaction/active", { signal })
        .then((res) => {
          const t = res.data.data.transaction;
          const p = t.product;

          setOrder(p);
          setTransaction(t);

          // Set form default value from transaction
          setForm((prev) => ({
            ...prev,
            name: t.name || "",
            email: t.email || "",
            phone: t.phone || "",
            address: t.address || "",
            postcode: t.postcode || "",
          }));
        })
        .catch((err) => {
          handleError(err);
          navigate("/");
        });
    })();
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // handles
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    }));
    // Manual payment image
    // if (e.target.type === "file") {
    //   try {
    //     setPre(URL.createObjectURL(e.target.files[0]));
    //   } catch (e) {
    //     setPre(Clip);
    //   }
    // }
  };

  const handlePay = async (e) => {
    if (!PAYMENT_CLIENT_KEY || !SNAP_SRC_URL || !SHIPPING_COST)
      return console.error("cannot retrive payment envoriment variable");
    const transactionId = transaction?.id;
    if (!transactionId) return console.error("cannot get transaction id");

    if (isLoading) return;

    // Make sure form not empty
    for (const property in form) {
      if (form[property] === "") return;
    }

    try {
      setLoading(true);
      e.preventDefault();
      const config = {
        headers: {
          // "Content-Type": "multipart/form-data",
          "Content-Type": "application/json",
        },
      };

      // This comment for manual payment

      // const formData = new FormData();
      // If manual payment
      // Init multipart form data
      // if (form.attachment) {
      //   formData.set(
      //     "attachment",
      //     form?.attachment[0],
      //     form?.attachment[0]?.name
      //   );
      // }
      // if (form.name !== transaction.name) formData.set("name", form.name);
      // if (form.email !== transaction.email) formData.set("email", form.email);
      // formData.set("phone", form.phone);
      // formData.set("address", form.address);
      // formData.set("postcode", form.postcode);

      // Update transaction
      // if use manual payment use formData with multipart for img
      await API.patch(`/transaction/${transactionId}`, form, config);

      const handleSuccessPayment = () => {
        socket.emit("order", transactionId); // Trigger emit `socket.on("orderData")`;
        socket.on("orderData", (data) => {
          if (!data)
            return console.error(
              "can't get order Data after update transaction"
            );

          setTransaction(data);
          setLoading(false);
          socket.emit("newTransaction"); // Send new transaction to admin
        }); // Takes emit `socket.emit("order")` to check transaction status;
      };

      const paymentData = {
        ...transaction,
        total:
          order.reduce((total, b) => total + b.price * b.order.qty, 0) +
          SHIPPING_COST,
      };

      socket.emit("pay", paymentData);
      socket.on("paymentToken", (token) => {
        if (!token) return console.error("payment token cannot be retrive");

        window?.snap.pay(token, {
          onSuccess: handleSuccessPayment,
          onPending: (result) => {
            setLoading(false);
            console.info("pending transaction: ", result);
          },
          onError: (err) => {
            setLoading(false);
            console.error("error transaction: ", err);
          },
          onClose: () => {
            setLoading(false);
            console.info(
              "Customer close the popup window without finishing the payment"
            );
          },
        });
      });
    } catch (err) {
      setLoading(false);
      handleError(err);
    }
  };

  return (
    <>
      {isOrderWaitingApprove && (
        <Popout onClick={() => (isHistory ? navigate(-1) : navigate("/"))}>
          <Modal>
            <p>
              Thank you for ordering in us, please wait 1 x 24 hours to verify
              you order
            </p>
          </Modal>
        </Popout>
      )}
      <>
        <Header isTroll={false} />
        <Wrapper>
          <InputSide>
            <h2>Shipping</h2>
            <input
              required
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChange}
              value={form.name}
            />
            <input
              required
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              value={form.email}
            />
            <input
              required
              type="tel"
              name="phone"
              pattern="[0-9]{4}-[0-9]{4}-[0-9]{4}"
              placeholder="Phone"
              onChange={(e) => {
                let regex =
                  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

                e.target.value = e.target.value.replace(regex, "");
                handleChange(e);
              }}
              value={form.phone}
            />
            <textarea
              required
              type="text"
              name="address"
              placeholder="Address"
              onChange={handleChange}
              value={form.address}
            />
            <input
              required
              className="postcode"
              type="number"
              name="postcode"
              placeholder="Post Code"
              onChange={(e) => {
                // prevent negative number and set limit 4 digit
                e.target.value =
                  e.target.value > -1
                    ? Math.abs(e.target.value.slice(0, 4))
                    : undefined;
                handleChange(e);
              }}
              value={form.postcode}
            />
            {
              // Manual transaction prove
              // <label className="second" htmlFor="imgFile">
              //   Attache of transaction
              //   <img src={pre} alt="payment proof" />
              //   <input
              //     required
              //     type="file"
              //     name="attachment"
              //     id="imgFile"
              //     onChange={handleChange}
              //     hidden
              //   />
              // </label>
            }
          </InputSide>
          <WrapperFlex>
            <Flex wrapper>
              {order.map((product) => {
                return (
                  <Flex w key={product.img}>
                    <Preview
                      src={product.img.replace("q_auto:good", "q_auto:eco")}
                    />
                    <FlexCollum btwn>
                      <div>
                        <h1>{product.title}</h1>
                        <Pp n b>
                          {convertStamp(product.order.createdAt)[0]}{" "}
                        </Pp>
                        <Pp n a>
                          {convertStamp(product.order.createdAt)[1]}
                        </Pp>
                      </div>
                      <Pp>Qty : {product.order.qty}</Pp>
                      <Pp>Price : {convertRupiah.convert(product.price)}</Pp>
                      <Pp bb b>
                        Sub Total :{" "}
                        {convertRupiah.convert(
                          product.price * product.order.qty
                        )}
                      </Pp>
                    </FlexCollum>
                    <Preview I src={Icon} />
                  </Flex>
                );
              })}
            </Flex>
            <button
              type="submit"
              onClick={isOrderWaitingApprove ? null : handlePay}
            >
              {isLoading ? "Loading..." : "Pay"}
            </button>
            *hint: console log
          </WrapperFlex>
        </Wrapper>
      </>
    </>
  );
};

export default CheckoutPage;
