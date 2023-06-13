import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  /* border: 1px solid black; */
  .rating {
    margin-left: 20px;
  }
`;

export const InputSection = styled.textarea`
  width: 350px;
  padding-bottom: 30px;
  height: 0;
  overflow: hidden;
  margin-top: 10px;
  margin-left: 8px;
  display: block;
  background: none;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 2px solid #613d2b;
  color: #613d2b;
  font-family: "Helvetica Neue", Helvetica;
  font-weight: bold;
  font-size: 14px;
  &:focus {
    outline: none;
    border-bottom: 2px solid #613d2b;
  }
  &::placeholder {
    color: #613d2b;
  }
`;

export const Rate = styled.img`
  width: ${(props) => (props.R ? "30px" : "60px")};
  ${(props) => (props.R ? "padding-top:4px;" : "cursor:pointer;")}
`;

export const ReviewsWrapper = styled.div`
  padding: 10px;
  /* border:1px solid red; */
  display: flex;
  flex-direction: column;
  gap: 10px;
  h1 {
    padding-left: 10px;
    margin-right: 27%;
    border-bottom: 3px solid #613d2b;
    margin-bottom: 0;
  }
`;

export const RatingComments = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 0;
  margin-left: 5px;
  /* border: 1px solid blue; */
  overflow-y: auto;
  height: 433px;
  padding-left: 4px;
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #f5f5f5;
  }
  &::-webkit-scrollbar {
    width: 4px;
    background-color: #f5f5f5;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--lightGrey);
  }
`;
export const Comments = styled.div`
  border-radius: 5px;
  padding: 10px;
  text-align: left;
  border: 1px solid #613d2b;
  color: var(--lightGrey);
  font-family: "Helvetica Neue", Helvetica;
  font-weight: bold;
  border-bottom: 3px solid #613d2b;
  border-right: 3px solid #613d2b;
  h4 {
    margin: 0;
    font-family: "Helvetica Neue", Helvetica;
    font-weight: bold;
    font-size: 14px;
  }
`;
export const AutoComments = styled.div`
  margin-top: 5px;
  margin-left: 5px;
  display: flex;
`;
