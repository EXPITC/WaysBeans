import { React, useState, useContext } from "react";
import { API, handleError } from "../../config/api";
import { Wrapper, Bg } from "./Register.style";
import Xbtns from "../../img/close.png";
import { UserContext } from "../../Context/userContext";
import { useNavigate } from "react-router-dom";

const Register = ({ isModal, handleCloseModal, handleModalLogin }) => {
  const navigate = useNavigate();
  const { dispatch } = useContext(UserContext);
  const [isLoading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
    fullname: "",
  });

  const handelChange = (e) => {
    if (isLoading) return;
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handelSubmit = async (e) => {
    if (form.email === "" || form.password === "" || form.fullname === "")
      return;
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
      const response = await API.post("/register", body, config);
      if (response?.status === 201) {
        return alert(response.data.message);
      }

      if (response?.status === 200) {
        dispatch({
          status: "login",
          payload: response.data.data.user,
        });
      }

      if (response.data.data.user.role === "owner") {
        navigate("/Transaction");
      }

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
        <div className="singup-cointainer">
          <img
            className="x-button-singup2"
            onClick={handleCloseModal}
            src={Xbtns}
            alt="close"
          />
          <form>
            <h2>Register</h2>
            <input
              required
              type="email"
              name="email"
              placeholder="Email"
              onChange={handelChange}
              disabled={isLoading}
            />
            <input
              required
              type="password"
              name="password"
              placeholder="Password"
              onChange={handelChange}
              disabled={isLoading}
            />
            <input
              required
              type="text"
              name="fullname"
              placeholder="Full name"
              onChange={handelChange}
              disabled={isLoading}
            />
            <button
              type="submit"
              className="btnsingup2"
              onClick={isLoading ? null : handelSubmit}
            >
              {isLoading ? "Loading..." : "SINGUP"}
            </button>
            <p className="dont-have-acc">
              Don't have an account ? Klik{" "}
              <span
                className="login-here"
                onClick={isLoading ? null : handleModalLogin}
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

export default Register;
