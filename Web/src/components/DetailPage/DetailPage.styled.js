import styled from 'styled-components';

export const Main = styled.div` 
    width: 100%;
    height:100%;
`
export const Wrapper = styled.div`
    /* border:1px solid black; */
    z-index:-1;
    display:block;
    width:85%;
    margin:0 auto;
    display:flex;
    /* justify-content: space-between; */
    gap:54px;
    flex-wrap:wrap;
    align-items: center;
    margin-top: 92px;
    margin-bottom: 80px;
    /* border:1px solid black; */
    justify-content:center;
   
`
export const Product = styled.img` 
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
    width: 436px;
    height: 555px;
    background: #2222;
    border-bottom-left-radius: 10px;
    border-top-left-radius: 10px;
    overflow: hidden;
`
export const DetailProduct = styled.div` 
    /* border:1px solid red; */
    width: 544px;
    height: 555px;
    display:flex;
    flex-direction: column;
    justify-content:space-between;
    padding-top: 40px;
    padding-bottom: 40px;
    h1 {
        margin-top:0px;
        font-size: 48px;
        margin-bottom:5px;
        color: #613D2B;
        font-family: "Helvetica Neue",Helvetica;
    }
    h2 {
        text-align: right;
        right: 0;
        font-family: "Helvetica Neue",Helvetica;
        color: #613D2B;
    }
    h3 {
        margin-top:21;
        margin-bottom:55;
        color: #613D2B;
        font-family: "Helvetica Neue",Helvetica;
        font-weight:normal;
        margin-bottom:35px;
    }
    button {
        margin-top:55px;
        margin-bottom:0px;
        background:#613D2B;
        border:1px solid black;
        width:inherit;
        color:white;
        border-radius: 5px;
        height: 40px;
        &:hover {
            color:#613D2B;
            border:2px solid #613D2B;
            background: none;
        }
    }
`