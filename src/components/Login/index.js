import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/userContext";
import { API, handleError } from "../../config/api";

import Xbtns from "../../img/close.png";

import { Wrapper, Bg } from "./Login.styled";

const Login = ({ isModal, handleCloseModal, handleModalRegister }) => {
  const navigate = useNavigate();
  const {
    state: { isLogin },
    dispatch,
  } = useContext(UserContext);
  const [isLoading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const handelChange = (e) => {
    if (isLoading) return;
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handelLogin = async (e) => {
    if (isLogin) return; // Just in case
    if (form.email === "" || form.password === "") return;
    if (isLoading) return;
    try {
      setLoading(true);
      e.preventDefault();
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify(form);
      await API.post("/login", body, config).then((res) => {
        if (!res || !res?.data?.token) return;
        dispatch({
          status: "login",
          payload: res.data,
        });
        if (res.data?.role === "owner") {
          navigate("/Transaction");
        }
      });

      handleCloseModal();
    } catch (err) {
      setLoading(false);
      handleError(err);
    }
  };

  if (!isModal) return <></>;
  return (
    <Bg>
      <Wrapper>
        <div className="login-container">
          <img
            className="x-button-login2"
            onClick={isLoading ? null : handleCloseModal}
            src={Xbtns}
            alt="close"
          />
          <form>
            <h2>Login</h2>
            <input
              required
              type="email"
              name="email"
              placeholder="email"
              onChange={handelChange}
              disabled={isLoading}
            />
            <input
              required
              type="password"
              name="password"
              placeholder="password"
              onChange={handelChange}
              disabled={isLoading}
            />
            <button
              type="submit"
              className="btnlogin2"
              onClick={isLoading ? null : handelLogin}
            >
              {isLoading ? "Loading..." : "LOGIN"}
            </button>
            <p className="dont-have-acc">
              Don't have an account ? Klik{" "}
              <span
                className="singup-here"
                onClick={isLoading ? null : handleModalRegister}
              >
                Here
              </span>
            </p>
          </form>
        </div>
      </Wrapper>
    </Bg>
  );
};

export default Login;
