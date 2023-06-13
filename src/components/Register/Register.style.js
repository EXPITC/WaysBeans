import styled from "styled-components";

export const Bg = styled.div`
  z-index: 999;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  position: fixed;

  justify-content: center;
  align-items: center;
  animation: anibg 1s linear forwards;
  @keyframes anibg {
    from {
      background: rgba(0, 0, 0, 0.8);
    }
    to {
      background: rgba(0, 0, 0, 0.5);
    }
  }
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  background: white;
  z-index: 998;
  border-radius: 100;
  width: 100vw;
  height: 100vh;
  background: none;

  .singup-cointainer {
    background: #ffff;
    display: flex;
    width: 416px;
    height: 450px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: sticky;
    margin: 0 auto;
    margin-top: 50%;
    border-radius: 10px;

    animation: singupIn 0.6s ease-out forwards;
    transition: 0.6s ease-out;
    @keyframes singupIn {
      from {
        margin-top: 50%;
      }
      to {
        margin-top: 0;
      }
    }

    .x-button-singup2 {
      cursor: pointer;
      width: 5%;
      top: 2.5%;
      right: 5px;
      position: absolute;
      transform: translateZ(999);
    }

    .dont-have-acc {
      padding-top: 0px;
      color: black;
      cursor: default;

      .login-here {
        color: black !important;
        cursor: pointer;
        font-weight: bold;
      }
    }

    button {
      margin-top: 3%;
      margin-bottom: 0px;
      width: 20vw;

      background: #613d2b;
      border: 1px solid #433434;
      border-radius: 6px;
      box-shadow: rgba(0, 0, 0, 0.1) 1px 2px 4px;
      box-sizing: border-box;
      color: #ffffff;
      cursor: pointer;
      display: inline-block;
      font-family: nunito, roboto, proxima-nova, "proxima nova", sans-serif;
      font-size: 16px;
      font-weight: 800;
      width: 95%;
      line-height: 16px;
      min-height: 40px;
      outline: 0;
      padding: 12px 14px;
      text-align: center;
      text-rendering: geometricprecision;
      text-transform: none;
      user-select: none;
      -webkit-user-select: none;
      touch-action: manipulation;
      vertical-align: middle;

      &:hover {
        background-color: initial;
        background-position: 0 0;
        color: #433434;
      }
      &:active {
        opacity: 0.5;
      }
    }
  }

  form {
    display: flex;
    flex-direction: column;
    width: 90%;
    justify-self: center;
    align-items: center;
    position: sticky;
    gap: 0.3rem;

    input {
      margin-bottom: 20px;
      display: block;
      max-width: 350px;
      width: 100%;
      height: 50px;
      background: rgba(97, 61, 43, 0.25);
      border: 2px solid #d2d2d2;
      border-radius: 5px;
      padding-left: 5px;
      border: 2px solid #613d2b;
      color: #613d2b;

      font-family: "Shippori Antique B1", sans-serif;
      text-align: left;
      font-weight: bold;
      color: #613d2b;
      font-size: 18px;
    }

    input::placeholder {
      font-family: "Shippori Antique B1", sans-serif;
      text-align: left;
      font-weight: bold;
      color: #613d2b;
      font-size: 18px;
    }
  }

  h2 {
    font-family: "Shippori Antique B1", sans-serif;
    font-style: normal;
    font-weight: 900;
    font-size: 36px;
    line-height: 49px;
    margin-right: 180px;
    color: #613d2b;
  }
`;
