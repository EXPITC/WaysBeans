import styled from "styled-components";

export const WrapFlex = styled.div`
  display: flex;
  padding-top: 100px;
  justify-content: center;
  .nonee {
    text-decoration: none !important;
  }
`;
export const WrapFlex2 = styled.div`
  /* animation: slide 0.8s cubic-bezier(0.17, 0.67, 0.72, 0.38) forwards;
  @keyframes slide {
    from {
      opacity: 0;
      padding-top: 100%;
    }
    to {
      opacity: 1;
      padding-top: 0;
    }
  } */
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
  /* justify-content: flex-start; */
`;
export const WrapMain = styled.div`
  margin: 0 auto;
  width: 80%;
  display: flex;
  flex-direction: column;
  margin-bottom: 62px;
  overflow: hidden;
  h1 {
    font-family: Abhaya Libre ExtraBold;
    font-style: normal;
    font-weight: 800;
    font-size: 36px;
    line-height: 42px;
    color: black;
  }
`;

export const Banner = styled.img`
  width: 100%;
  height: auto;
  margin-top: 40px;
`;
export const Card = styled.div`
  width: 241px;
  height: 410px;
  background: #f6e6da;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px,
    rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;

  p {
    font-family: "serif";
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    color: #974a4a;
    padding-left: 10px;
    margin: 0px;
    margin-bottom: 5px;
  }
  h3 {
    padding-left: 10px;
    margin-top: 14px;
    color: #613d2b;
    margin-bottom: 14px;
    font-family: "Abhaya Libre ExtraBold";
    font-style: bold;
    font-size: 18px;
  }
  img {
    background: #222;
    width: 241px;
    height: 312px;
    margin-bottom: 0;
  }
`;
