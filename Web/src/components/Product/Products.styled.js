import styled from "styled-components";

export const Card = styled.div`
    width: 241px;
    height: 410px;
    background: #F6E6DA;
    border-radius: 5px;
    display:flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
   cursor: pointer;
    p {
        font-family: 'serif';
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        color: #974A4A;
        padding-left: 10px;
        margin:0px;
        margin-bottom:5px;
    }
    h3 {
        padding-left: 10px;
        margin-top:14px;
        color: #613D2B;
        margin-bottom:14px;
        font-family: 'Abhaya Libre ExtraBold';
        font-style: bold;
        font-size: 18px;
    }
    img {
        background: #222;
        width: 241px;
        height: 312px;
        margin-bottom: 0;
        box-shadow:rgba(0, 0, 0, 0.15) 0px 0px 3px 0px;
    }
`

export const Wrapper = styled.div`
    margin:0 auto;
    margin-top:40px;
    width:80%;
    display:flex;
    gap:1rem;
    flex-wrap: wrap;
    flex:1;
    justify-content:space-between;
    /* border:1px solid black; */
    padding:20px;
    border-radius:10px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`