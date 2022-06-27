import styled from 'styled-components';

export const WrapperYellow = styled.div`
    width: 100%;
    height: 91px;
    position: relative;
    background: #F5F5F5;
    display:flex;
    justify-content: center;
    animation: apprears 1s ease-in forwards;
    @keyframes apprears {
        from{
            opacity:0;
        }to{
            opacity:1;
        }
    };
    box-shadow: 0px 10px 30px 0px #00000040;
`
export const Polyy = styled.div`
    position:absolute;
    right:175px;
    top: 90px;
    .poly {
        opacity:0;
        position:absolute;
        animation: a 1s ease-out forwards;
        animation-delay: 0.3s;
        @keyframes a { 
        0%{
            opacity:0;
            transform: translateX(60px)translateY(0px);
        }
        80%{
            transform: translateX(60px)translateY(0px);
        }
        90%{
            opacity:0.3;
        }
        100% {
            transform: translateX(60px)translateY(-30px);
            opacity:1;
        }
        }
    }
`
export const OneLineFlexTop = styled.div`
   @import url('https://fonts.googleapis.com/css2?family=Shippori+Antique+B1&display=swap');
    margin-bottom: 10px;
    padding-left:4%;
    padding-right:4%;
    width:100%;
    position:sticky;
    top: 0px;
    z-index:999;
    display: flex;
    flex-wrap: wrap;
    height: 84px;
    /* border:1px solid black; */
    justify-content: space-between;
    align-items: center;
    &:hover{
        p {
            opacity: 0.5;
        }
    }
    p{
        background:red;
        height:15px;
        width:15px;
        border-radius: 50%;
        font-size: 12px;
        color:white;
        text-align:center;
        /* margin-top: 0px; */
        margin-left: 20px !important;
        z-index:99 !important;
        position:absolute !important;
    }
    /* .poly {
        opacity:0;
        position:absolute;
        animation: a 1s ease-out forwards;
        animation-delay: 0.3s;
        @keyframes a { 
        0%{
            opacity:0;
            transform: translateX(60px)translateY(0px);
        }
        80%{
            transform: translateX(60px)translateY(0px);
        }
        90%{
            opacity:0.5;
        }
        100% {
            transform: translateX(60px)translateY(-30px);
            opacity:1;
        }
    }
    } */
    .login {
        background: none !important;
        border: 2px solid #613D2B;
        color: #433434;
        &:hover {
            border: 2px solid #433434;
            color: white;
            background: #613D2B !important;
        }
    }
    button {
        width: 100px;
        height: 30px;
        background: #613D2B;
        border-radius: 5px;
        margin-left: 16px;
        border: 2px solid #613D2B
        font-size:var(--FontSmall);
        color:white;
        font-weight: bold;
        font-family: 'Shippori Antique B1', sans-serif;
        &:hover {
            border: 2px solid #433434;
            color: #433434;
            background:transparent;
        }
    }
`
export const TextAndPizza = styled.div`
    display:flex;
    position: absolute;
    max-width: 1066px;
    height: 393px;
    padding-left:20px;
    padding-right:20px;
    bottom: 60px;
    /* border:1px solid black; */
`
export const Text = styled.div`
    flex:60;
    width:60%;
    height:100%;
    /* border:1px solid red; */
    h1 {
        font-size: var(--fontBig);
        font-size: 55px;
        line-height: 65px;
    }
    h2 {
        position: inline;
        width: 150px;
        height: 3px;
        background: var(--lightGrey);
    }
    p {
        position:inline;
        margin-left:26px;
        width: 274px;
        height: 76px;
        font-size: 14px;
        line-height: 19px;
        font-size: var(--fontSmall);
        color: black;
    }
`
export const ImgPizza = styled.img`
    flex:40;
    padding-left: 26px;
    width: 40%;
    height:100%;
`
export const ImgProfile = styled.img`
    width: 60px;
    height: 60px;
    border: 2px solid #433434;
    border-radius: 50%;
`
export const ImgTrolly = styled.img`
    /* &:after {
        content: '3';
    } */
    padding-bottom: 10%;
    /* width: 60px;
    height: 60px; */
    margin-right: 23px;
    &:hover {
        opacity: 0.5;
    }
`
export const WrapFlex = styled.div`
    display:flex;
    flex-direction: row;
    /* border:1px solid blue; */

`
export const WrapFlex2 = styled.div`
    display:flex;
    padding-top:100px;
    justify-content:center;
    border:1px solid black;
    .nonee{
        text-decoration: none !important;
    }
`
export const WrapFlex3 = styled.div`
    animation: slide .8s ease-in forwards;
    @keyframes slide {
        from{
            padding-top: 100%
        }to{
            padding-top: 0%
        }
    };
   border:1px solid red;
   width:80%;
    /* justify-content:space-between; */
    display:flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: flex-start;
`
export const WrapMain = styled.div`
    margin:0 auto;
    width:80%;
    /* border:1px solid red; */
    display:flex;
    flex-direction: column;
    margin-bottom: 62px;
    h1 {
        font-family: Abhaya Libre ExtraBold;
        font-style: normal;
        font-weight: 800;
        font-size: 36px;
        line-height: 42px;
        color:black;
    }
`

export const Banner = styled.img` 
    width:100%;
    margin-top:40px;
`
export const Card = styled.div`
    width: 241px;
    height: 410px;
    background: #F6E6DA;
    border-radius: 5px;
    display:flex;
    flex-direction: column;
    overflow: hidden;
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
    
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
    }
`