import React, { useEffect, useContext, useMemo } from "react";

//React router
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

//components
import DetailPage from "./DetailPage";
import ProfilePage from "./ProfilePage";
import TransactionPage from "./TransactionPage";
import CartPage from "./CartPage";
import AddProduct from "./AddProduct";
import Product from "./Product";
import LandingPage from "./LandingPage";
import Header from "./Header";
import CheckoutPage from "./Checkout";
import DetailTransPage from "./detailTrans";

import { API, handleError } from "../config/api";
import { UserContext } from "../Context/userContext";

const isNotfetch = null;
const RouterSetup = () => {
  const { state, dispatch } = useContext(UserContext);
  const { isLogin, isUserOrder, user } = state;

  const isOwner = useMemo(
    () => (user.role === "owner" ? true : false),
    [user?.role]
  );

  useEffect(() => {
    if (!localStorage?.token) {
      dispatch({ status: "isUserOrder", payload: false }); // If user doesnt have token impossible to fetch user chart;
      dispatch({ status: "isLogin", payload: false });
      return;
    }

    if (isLogin) return;

    const controller = new AbortController();
    const signal = controller.signal;
    (async () => {
      await API.get("/auth", { signal })
        .then((res) =>
          dispatch({
            status: "login",
            payload: res.data,
          })
        )
        .catch((err) => {
          dispatch({ status: "isLogin", payload: false });
          handleError(err);
        });
      if (!isLogin) return;
      await API.get("/order/count")
        .then((res) => {
          if (!res || res === 0)
            return dispatch({ status: "isUserOrder", payload: false });

          dispatch({
            status: "isUserOrder",
            payload: true,
          });
        })
        .catch((err) => {
          dispatch({ status: "isUserOrder", payload: false });
          handleError(err);
        });
    })();
    return () => controller.abort();
  }, [dispatch, isLogin]);

  // Info
  useEffect(() => {
    if (isLogin === null) return;
    if (!isLogin) {
      console.info(
        "%cYou can use this admin account for admin page, in otherhand you can also use customer acc that already created or you can just creating new acc its fine.",
        "background-color: #F6E6DA; color: #613d2b; font-weight: 600; font-size: normal; text-align: left; overflow: hidden; border-radius: 2px; padding-left:10px; padding-top: 10px; padding-bottom:10px;"
      );
    }

    console.info(
      "%c* You can always open console log for more detail/info in all my project, thankyou.",
      "color: #F6E6DA"
    );
    console.warn(
      "%c *Please understand almost all of my projects use free tier server for backend. This means that some heavy lifting processes may take time to process or build due to free tier limitations, also almost free tiers need to be 'fired' first after not waking up within the allotted time, so I'm sorry if you've ever experienced a cold start. Thank you, for reading & understanding. \n tips: you can just keep refreshing the page or waiting patiently. Recommended the second option because its actually already hit the server just takes times to process due to cold start or free tier limitations.",
      "background-color: #F6E6DA; color: #613d2b; font-weight: 600; font-size: normal; text-align: left; overflow: hidden; border-radius: 2px; padding-left:10px; padding-top: 10px; padding-bottom:10px;"
    );

    if (isLogin) return; //I know this redundant if but i want the position still print consecutive;
    console.table([
      {
        email: "owner@waysbeans.com",
        password: "12345678",
      },
      {
        email: "customer@customer.com",
        password: "12345678",
      },
    ]);
  }, [isLogin]);

  return (
    <Router>
      <Routes>
        {isLogin && (
          <>
            {/* <Route path="/Edit/Profile" element={<EditProfile/>}/> */}
            <Route path="/Detail/:id" element={<DetailPage />} />
            {isOwner ? (
              <>
                <Route path="/Store" element={<Product />} />
                <Route
                  exact
                  path="/Transaction"
                  element={<TransactionPage />}
                />
                <Route path="/Add-Product" element={<AddProduct />} />
              </>
            ) : (
              <>
                <Route path="/Profile" element={<ProfilePage />} />
                <Route
                  exact
                  path="/Cart"
                  element={
                    //This mess equal with ssr behavior
                    isUserOrder === isNotfetch ? (
                      <>
                        <h1>Loading..</h1>
                      </>
                    ) : isUserOrder === false ? (
                      <Navigate to="/" />
                    ) : (
                      <CartPage />
                    )
                  }
                />
                <Route
                  path="/Cart/Checkout"
                  element={
                    isUserOrder === isNotfetch ? (
                      <>
                        <h1>Loading..</h1>
                      </>
                    ) : isUserOrder === false ? (
                      <Navigate to="/" />
                    ) : (
                      <CheckoutPage />
                    )
                  }
                />
                <Route
                  path="/Transaction/detail/:id"
                  element={<DetailTransPage />}
                />
              </>
            )}
          </>
        )}
        <Route exact path="/" element={<LandingPage />} />
        <Route
          path="*"
          element={
            // This equal to behavior, just like NextJs skeleton components in `loading.tsx` for layout
            // in exchange for every components that fetch login to dispatch when err occur in catch i must return isLogin as false
            isLogin !== null ? (
              <>
                <Header />
                <h1>Error 404 </h1>
              </>
            ) : (
              <>
                <h1>Loading...</h1>
              </>
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default RouterSetup;
