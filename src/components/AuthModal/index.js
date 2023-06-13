import { useContext } from "react";
import { AuthModalContext } from "../../Context/authModalContext";
import Login from "../Login";
import Register from "../Register";

const AuthModal = () => {
  const { state: modalState, dispatch } = useContext(AuthModalContext);
  const { isModalLogin, isModalRegister } = modalState;

  const handleCloseModal = () => dispatch("closeAuthModal");

  const handleModalLogin = () => dispatch("openLoginModal");
  const handleModalRegister = () => dispatch("openRegisterModal");

  return (
    <>
      <Login
        isModal={isModalLogin}
        handleCloseModal={handleCloseModal}
        handleModalRegister={handleModalRegister}
      />
      <Register
        isModal={isModalRegister}
        handleCloseModal={handleCloseModal}
        handleModalLogin={handleModalLogin}
      />
    </>
  );
};

export default AuthModal;
