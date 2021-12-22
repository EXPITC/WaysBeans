import styled from 'styled-components';

export const WrapperYellow = styled.div`
    top: 0;
    width: 100%;
    height:558px;
    position: relative;
    background: #FFC700;
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
    padding-top: 27px;
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
    button {
        width: 100px;
        height: 30px;
        background: #433434;
        border-radius: 5px;
        margin-left: 16px;
        border:0px;
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
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    gap:1rem;
    margin-bottom: 91px;
    .nonee{
        text-decoration: none !important;
    }
`
export const WrapFlex3 = styled.div`
    display:flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap:1rem;
    justify-content: space-between;
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
export const CardResto = styled.div`
    width: 250px;
    height: 95px;
    background: #FFFFFF;
    border-radius: 5px;
    display:flex;
    align-items: center;

    h2 {
        font-family: Abhaya Libre ExtraBold;
        font-style: normal;
        font-weight: 800;
        font-size: var(--fontMed);
        line-height: 28px;
        margin-left:19px;
        color:black;
    }
    img {
        width: 65px;
        height: 65px;
        margin-left: 16px;
    }
`
export const CardNear = styled.div`
    width: 245px;
    height: 221px;
    background: #FFFFFF;
    border-radius: 5px;
    display:flex;
    flex-direction: column;
    padding: 10px;
    p {
        font-family: 'serif';
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        color:black;
        margin-top: 6px;
    }
    h3 {
        margin-top:14px;
        margin-bottom: 0;
        font-family: 'Abhaya Libre ExtraBold';
        font-style: normal;
        font-size: 18px;
    }
    img {
        background: #222;
        width: 224px;
        height: 134px;
        margin-bottom: 0;
    }
`