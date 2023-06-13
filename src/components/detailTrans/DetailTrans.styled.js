import styled from "styled-components";

export const Wrapper = styled.div`
  /* border:1px solid black; */
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  width: 80%;
  h1 {
    margin-top: 73px;
    font-size: 36px;
    color: #613d2b;
    margin-bottom: 30px;
    font-family: "Helvetica Neue", Helvetica;
  }
  h2 {
    font-size: 18px;
    line-height: 25px;
    color: #613d2b;
    margin-bottom: 15px;
  }
`;

export const WrapOrder = styled.div`
  display: flex;
  /* border:1px solid black; */
  justify-content: space-between;
  width: 100%;
  gap: 1rem;
  height: 433px;
  .over {
    padding-right: 10px;
    /* border:1px solid black; */
    overflow-x: hidden;
    overflow-y: auto;
    max-width: 660px;
    width: 100%;
    height: 433px;
    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      background-color: #f5f5f5;
    }

    &::-webkit-scrollbar {
      width: 6px;
      background-color: #f5f5f5;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #000000;
    }
  }
`;
export const WrapOrder2 = styled.table`
  display: flex;
  flex-direction: column;
  border-collapse: collapse;
  border-bottom: 0.1mm solid black;
  border-top: 0.1mm solid black;
  border-collapse: collapse;
  tbody {
    width: 100%;
    tr {
      width: 100%;
      display: block;
    }
  }
`;
export const Flex = styled.td`
  display: flex;
  max-width: 660px;
  width: 100%;
  height: 119px;
  border-bottom: 0.1mm solid black;
  border-top: 0.1mm solid black;
  border-collapse: collapse;
`;
export const Wrap1 = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  img {
    width: 70px;
    height: 90px;
    object-fit: cover;
    border-radius: 4px;
  }
`;
export const Wrap2 = styled.div`
  margin-left: 13px;
  display: flex;
  flex-direction: column;
  /* border:1px solid black; */
  width: 550px;
  /* width:100%; */
  @media only screen and (max-width: 1000px) {
    width: 450px;
  }
  @media only screen and (max-width: 800px) {
    width: 350px;
  }
  @media only screen and (max-width: 700px) {
    width: 250px;
  }
  @media only screen and (max-width: 600px) {
    width: 100%;
  }
  height: 80px;
  justify-content: space-between;
`;
export const Wrap3 = styled.div`
  flex: 100%;
  width: 100%;
  height: 30px;
  display: flex;
  padding-top: 10px;
  align-items: center;
  gap: 1rem;
  justify-content: space-between;
  p {
    padding-bottom: 10px;
    color: red;
  }
  div {
    display: flex;
  }
  button {
    background: none;
    border: none;
    color: #4f3d31;
    cursor: pointer;
    img {
      height: 25px;
      width: 12px;
    }
  }
  img {
    height: 20px;
    width: 20px;
  }
  .pinkBg {
    /* padding-top: 2px;
        margin: 0 auto; */
    text-align: center;
    width: 30px;
    height: 20px;
    background: #f6e6da;
    border-radius: 5px;
  }
`;

export const FlexCollum = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  table {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: 119px;
    border-bottom: 2px solid black;
    border-top: 2px solid black;
    border-collapse: collapse;
    tbody {
      width: 100%;
      tr {
        width: 100%;
        display: block;
        td {
          width: 100%;
          display: block;
        }
      }
    }
  }
`;
export const Pp = styled.p`
  // @import url("https://fonts.googleapis.com/css2?family=Abhaya+Libre:wght@800&family=Montserrat:ital,wght@1,100&family=Shippori+Antique+B1&display=swap");
  font-family: "Montserrat", sans-serif;
  color: ${(props) => (props.r ? "red !important" : "black !important")};
  font-size: 14px;
  font-weight: ${(props) => (props.b ? "bold" : null)};
`;
