import styled from "styled-components";

export const Wrapper = styled.div`
    /* border:1px solid black; */
    z-index:-1;
    display:block;
    width:85%;
    margin:0 auto;
    display:flex;
    gap:92px;
    flex-wrap:wrap;
    align-items: center;
    margin-top: 92px;
    margin-bottom: 80px;
    justify-content:center;
` 
export const Preview = styled.img`
    margin-bottom: 40px;
    width: 436px;
    height: 555px;
    background:#dddcdb;
    border-radius:10px;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
`
export const InputSide = styled.div` 
    margin-top: 40px;
    /* border:1px solid black; */
    width: 472px;
    h2 {
        font-family: "Helvetica Neue",Helvetica;
        font-size: 24px;
        color: #613D2B;
        margin-bottom: 31px;
    }
    input {
        width: 472px;
        height: 50px;
        margin-bottom:20px;
        border-radius: 5px;
        background: rgba(97, 61, 43, 0.25);
        border: 2px solid #613D2B;
        ::placeholder{
            font-size: 15px;
        }
        padding-left:10px;
    }
    textarea {
        margin-bottom:20px;
        border-radius: 5px;
        background: rgba(97, 61, 43, 0.25);
        border: 2px solid #613D2B;
        width: 472px;
        height: 122px;
        padding-left:10px;
        ::placeholder{
            font-size: 15px;
        }
    }
    label {
        padding-left:10px;
        padding-right:10px;
        color:rgba(97, 61, 43, 0.50);
        display:flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 5px;
        border: 2px solid #613D2B;
        height: 50px;
        width: 190px;
        left: 195px;
        background: rgba(97, 61, 43, 0.25);
    }
    button {
        width: 260px;
        height: 40px;
        background: #613D2B;
        border-radius: 5px;
        border:none;
        color:white;
        font-size:15px;
        font-family: "Helvetica Neue",Helvetica;
        font-weight: bold;
        &:hover {
            border: 2px solid #433434;
            color: #433434;
            background:transparent;
        }
    }
`
export const Flex = styled.div` 
    margin-top: 54px;
    display: flex;
    justify-content: center;
`
export const Popout = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
     width: 100%;
     height: 100%;
     position: fixed;
     justify-content: center;
     align-items: center;
     animation: anibg 1s linear forwards;
     @keyframes anibg {
        from {
            background: rgba(0, 0, 0, 0.8);
        } to{
            background: rgba(0, 0, 0, 0.5);
        }
    }
`
export const Modal = styled.div`
    width: 742px;
    height: 142px;
    background: #FFFFFF;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    p {
        font-family: Abhaya Libre ExtraBold;
        font-size: 24px;
        display: flex;
        text-align: center;
        color: #469F74;
    }
`