import styled from "styled-components";

export const Bg = styled.div`
  z-index: 999;
  width: 100%;
  height: 100%;
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
  /* border:1px solid black; */
  border-radius: 100;
  width: 100vw;
  height: 100vh;
  background: none;

  .login-container {
    animation: enterIn 0.6s ease-out forwards;
    transition: 0.6s ease-out;
    background: #ffff;
    /* border:1px solid red; */
    /* background-position: 50%; */
    /* transform: skewY(-50%); */
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 416px;
    height: 408px;
    align-items: center;
    position: sticky;
    margin: 0 auto;
    margin-top: 50%;
    border-radius: 10px;
    @keyframes enterIn {
      from {
        margin-top: 50%;
      }
      to {
        margin-top: 0;
      }
    }
    /* top: 0; */
    /* margin: 10px solid black; */
    .x-button-login2 {
      cursor: pointer;
      /* filter: brightness(0) invert(1); */
      width: 5%;
      top: 2.5%;
      right: 5px;
      position: absolute;
      transform: translateZ(999);
    }
    .dont-have-acc {
      padding-top: 10px;
      color: #b1b1b1;
      cursor: default;
    }
    .singup-here {
      color: black !important;
      cursor: pointer;
      font-weight: bold;
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
    }

    button:hover {
      background-color: initial;
      background-position: 0 0;
      color: #433434;
    }

    button:active {
      opacity: 0.5;
    }
  }

  /* Form */
  form {
    /* border:1px solid black; */
    display: flex;
    flex-direction: column;
    width: 90%;
    /* margin-top: 30%; */
    justify-self: center;
    align-items: center;
    position: sticky;
    gap: 0.3rem;

    input {
      /* @import url("https://fonts.googleapis.com/css2?family=Abhaya+Libre:wght@800&family=Shippori+Antique+B1&display=swap"); */
      font-family: "Shippori Antique B1", sans-serif;
      margin-bottom: 20px;
      /* background-color: transparent; */
      display: block;
      max-width: 350px;
      width: 100%;
      height: 50px;
      background: rgba(97, 61, 43, 0.25);
      border-radius: 5px;
      padding-left: 5px;
      border: 2px solid #613d2b;
      color: #613d2b;
      font-weight: bold;
    }
    input::placeholder {
      /* @import url("https://fonts.googleapis.com/css2?family=Abhaya+Libre:wght@800&family=Shippori+Antique+B1&display=swap"); */
      font-family: "Shippori Antique B1", sans-serif;
      text-align: left;
      font-weight: bold;
      color: #613d2b;
      font-size: 18px;
    }
  }

  h2 {
    /* @import url("https://fonts.googleapis.com/css2?family=Abhaya+Libre:wght@800&family=Shippori+Antique+B1&display=swap"); */
    font-family: "Shippori Antique B1", sans-serif;
    font-style: normal;
    font-weight: 900;
    font-size: 36px;
    line-height: 49px;
    margin-right: 65%;
    color: #613d2b;
  }

  p {
    color: black !important;
  }
`;
