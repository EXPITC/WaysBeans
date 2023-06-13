import {
  React,
  useEffect,
  useState,
  useContext,
  useMemo,
  useCallback,
} from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../Context/userContext";
import { API, handleError } from "../../config/api";

import Icon from "../../img/Icon.svg";
import Trolly from "../../img/coffee-bean.png";
import Shop from "../../img/beans.png";
import poly from "../../img/poly.svg";

import { Head, TopFlex, Wrap, Polyy, Specialdrop } from "./Header.styled";
import DropDown from "../DropDown";

import AuthModal from "../AuthModal";
import AuthButtons from "../AuthButtons";

const DEFAULT_PROFILE_URL = process.env.REACT_APP_DEFAULT_PROFILE;

const Header = ({ refresh, isTroll = false }) => {
  const { state, dispatch } = useContext(UserContext);
  const { user, isLogin, isUserOrder } = state;

  const [show, setShow] = useState(false);
  const toggle = useCallback(() => setShow((prev) => !prev), []);

  const isOwner = useMemo(
    () => (user.role === "owner" ? true : false),
    [user?.role]
  );

  const [isTotal, setTotal] = useState(0);

  useEffect(() => {
    if (!isLogin) return;
    if (!isTroll) return;

    const controller = new AbortController();
    const signal = controller.signal;

    (async () => {
      await API.get("/order/count", { signal })
        .then((res) => {
          setTotal(res.data.total);

          // This dispatch set for access cart page,
          // for more can be seen in  router setup
          if (!res || res.data.total === 0)
            return dispatch({ status: "isUserOrder", payload: false });

          // In case isUserOrder status alredy true we do not need to dispatch
          if (isUserOrder === true) return;

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
  }, [refresh, isLogin, isTroll, dispatch, isUserOrder]);

  return (
    <>
      <AuthModal />
      <Head>
        <TopFlex>
          <Link to="/">
            <img
              src={Icon}
              className="shake"
              alt="logo"
              width="100%"
              height="auto"
            />
          </Link>
          <Wrap>
            {isLogin && (
              <>
                {isOwner && (
                  <Link className="cart mt-10" to="/Store">
                    <img height="40px" width="40px" src={Shop} alt="cart" />
                  </Link>
                )}
                {!isOwner && isTroll && (
                  <div className="hover-opacity05">
                    {isTotal > 0 && <p>{isTotal}</p>}
                    <Link className="cart" to="/Cart">
                      <img
                        src={Trolly}
                        alt="trolly"
                        width="38px"
                        height="38px"
                      />
                    </Link>
                  </div>
                )}
                <img
                  className="profile"
                  onClick={toggle}
                  src={
                    user.image.replace("q_auto:good", "q_auto:eco") ||
                    DEFAULT_PROFILE_URL
                  }
                  alt="profile"
                />
              </>
            )}
            <AuthButtons />
          </Wrap>
        </TopFlex>
        {isLogin && show && (
          <>
            <Polyy>
              <div className="poly">
                <img src={poly} alt="poly" />
              </div>
            </Polyy>
            <Specialdrop>
              <DropDown className="drop" />
            </Specialdrop>
          </>
        )}
      </Head>
    </>
  );
};

export default Header;
