import { useContext } from "react";
import { AuthModalContext } from "../../Context/authModalContext";
import { UserContext } from "../../Context/userContext";

const AuthButtons = () => {
  const { dispatch } = useContext(AuthModalContext);
  const { state: userState } = useContext(UserContext);
  const { isLogin } = userState;

  const handleModalLogin = () => dispatch("openLoginModal");
  const handleModalRegister = () => dispatch("openRegisterModal");

  if (isLogin) return <></>;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div>
        <button onClick={handleModalLogin} className="login">
          Login
        </button>
        <button onClick={handleModalRegister}>Register</button>
      </div>
      <p
        style={{
          fontWeight: "normal",
          background: "transparent",
          color: "#433434",
          minWidth: "fit-content",
          bottom: 0,
        }}
      >
        *hint open console
      </p>
    </div>
  );
};

export default AuthButtons;
