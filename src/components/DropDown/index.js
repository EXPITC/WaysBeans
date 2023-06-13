import { React, useContext, useMemo } from "react";
import { UserContext } from "../../Context/userContext";

import { Wrapper, Wrapper2, Icon, JustWrap, Logout } from "./DropDown.styled";
import userIcon from "../../img/user.svg";
import logoutIcon from "../../img/logout.svg";
import seed from "../../img/seed.svg";
import Transaction from "../../img/transaction.png";
import { Link } from "react-router-dom";

const DropDown = ({ set }) => {
  const { state, dispatch } = useContext(UserContext);
  const handleLogout = () => {
    dispatch({
      status: "logout",
    });
  };
  const { user } = state;
  const isOwner = useMemo(
    () => (user?.role === "owner" ? true : false),
    [user?.role]
  );

  return (
    <>
      {isOwner ? (
        <>
          <Wrapper2>
            <Wrapper>
              <Link to="/Add-Product" style={{ textDecoration: "none" }}>
                <JustWrap onClick={set} style={{ textDecoration: "none" }}>
                  <Icon src={seed} />
                  <p>Add Product</p>
                </JustWrap>
              </Link>
              <Link to="/Transaction" style={{ textDecoration: "none" }}>
                <JustWrap onClick={set}>
                  <Icon src={Transaction} />
                  <p>Transaction</p>
                </JustWrap>
              </Link>
            </Wrapper>
            <Logout>
              <Link to="/" style={{ textDecoration: "none" }}>
                <JustWrap onClick={handleLogout}>
                  <Icon src={logoutIcon} />
                  <p>Logout</p>
                </JustWrap>
              </Link>
            </Logout>
          </Wrapper2>
        </>
      ) : (
        <Wrapper2 h>
          <Wrapper h>
            <Link to="/Profile" style={{ textDecoration: "none" }}>
              <JustWrap h onClick={set}>
                <Icon src={userIcon} />
                <p>Profile</p>
              </JustWrap>
            </Link>
          </Wrapper>
          <Logout h>
            <Link to="/" style={{ textDecoration: "none" }}>
              <JustWrap onClick={handleLogout}>
                <Icon src={logoutIcon} />
                <p>Logout</p>
              </JustWrap>
            </Link>
          </Logout>
        </Wrapper2>
      )}
    </>
  );
};

export default DropDown;
