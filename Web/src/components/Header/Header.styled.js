import styled from 'styled-components';


export const Head = styled.div`
    position:sticky;
    top:0;
    background: #F5F5F5;
    height: 91px;
    .drop{
        position:absolute!important;
        right:10px !important;
    }
    box-shadow: 0px 10px 30px 0px #00000040;
`
export const TopFlex = styled.div`
    /* border:1px solid black; */
    height: inherit;
    margin: 0 auto;
    display:flex;
    justify-content: space-between;
    align-items: center;
    width:95%;
    .shake {
        @keyframes shakes {
                0%{
                    transform:rotateZ(-10deg);
                }40%{
                    transform:rotateZ(6deg);
                }100%{
                    transform:rotateZ(-10deg);
                }
        }
        &:hover {
            animation:shakes 1s ease forwards;
            opacity: 0.5;
        }
    }
`

export const Wrap = styled.div`
    display: flex;
    justify-content:center;
    align-items:center;
    img{
        margin-left:23px;
        &:hover{
            opacity:0.5;
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
        margin-top: 0px;
        margin-left: -40px !important;
        z-index:99 !important;
        position:absolute !important;
    }
    .profile {
        width:60px;
        height:60px;
        border:1px solid black;
        border-radius:50%;
        opacity:1 !important;
        cursor:pointer;
    }
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
export const Polyy = styled.div`
    position:absolute;
    right:150px;
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
            opacity:0.5;
        }
        100% {
            transform: translateX(60px)translateY(-30px);
            opacity:1;
        }
        }
    }
`
export const Specialdrop = styled.div`
    position: absolute;
    right:-40px;
`