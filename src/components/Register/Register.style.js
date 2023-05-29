import styled from 'styled-components';

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
        } to{
            background: rgba(0, 0, 0, 0.5);
        }
     }
`
export const Wrapper = styled.div`
    display:  ${props => (props.active === true? 'none' : 'block')};
    justify-content: center;
    align-items: center;
    position: fixed;
    background: white;
    z-index: 998;
    /* border:1px solid black; */
    border-radius: 100;
    width: 100vw;
    height: 100vh;
    background:none;

    .singup-cointainer {
        animation: ani 0.6s ease-out forwards;
        transition: 0.6s ease-out;
        background:#ffff;
        /* border:1px solid red; */
        /* background-position: 50%; */
        /* transform: skewY(-50%); */
        display: flex;
        width: 416px;
        height: 450px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: sticky;
        margin:0 auto;
        margin-top:50%;
        border-radius: 10px;
        @keyframes ani {
        0% {
            margin-top:50%;
        }
        100% {
            margin-top:10%;
        }
    }
        /* top: 0; */
        /* margin: 10px solid black; */
    }
    form {
        /* border:1px solid black; */
        display: flex;
        flex-direction: column;
        width: 90%;
        /* margin-top: 30%; */
        justify-self: center;
        align-items: center;
        position: sticky;
        gap:0.3rem;
    }
    form input {
        @import url('https://fonts.googleapis.com/css2?family=Abhaya+Libre:wght@800&family=Shippori+Antique+B1&display=swap');
        font-family: 'Shippori Antique B1', sans-serif;
        margin-bottom: 20px;
        /* background-color: transparent; */
        display: block;
        max-width: 350px;
        width: 100%;
        height: 50px;
        background: rgba(97, 61, 43, 0.25);
        border: 2px solid #D2D2D2;
        border-radius: 5px;
        padding-left: 5px;
        border: 2px solid  #613D2B;
        color: #613D2B
    }

    form input::placeholder {
        @import url('https://fonts.googleapis.com/css2?family=Abhaya+Libre:wght@800&family=Shippori+Antique+B1&display=swap');
        font-family: 'Shippori Antique B1', sans-serif;
        text-align: left;
        color: #613D2B;
        font-size: 18px;
    }
    h2 {
        @import url('https://fonts.googleapis.com/css2?family=Abhaya+Libre:wght@800&family=Shippori+Antique+B1&display=swap');
        font-family: 'Shippori Antique B1', sans-serif;
        font-style: normal;
        font-weight: 900;
        font-size: 36px;
        line-height: 49px;
        margin-right: 180px;
        color: #613D2B;
    }
    .singup-cointainer .x-button-singup2{
        cursor: pointer;
        /* filter: brightness(0) invert(1); */
        width: 5%;
        top: 2.5%;
        right: 5px;
        position: absolute;
        transform: translateZ(999);
    }
    .singup-cointainer .dont-have-acc {
        padding-top: 0px;
        color: black;
        cursor: default;
    }
    .singup-cointainer form .dont-have-acc .login-here {
        color: black !important;
        cursor: pointer;
        font-weight: bold;
    }
    .singup-cointainer button {
        
        margin-top: 3%;
        margin-bottom: 0px;
        width: 20vw;
    }

    .singup-cointainer button  {
    background: #613D2B;
    border: 1px solid #433434;
    border-radius: 6px;
    box-shadow: rgba(0, 0, 0, 0.1) 1px 2px 4px;
    box-sizing: border-box;
    color: #FFFFFF;
    cursor: pointer;
    display: inline-block;
    font-family: nunito,roboto,proxima-nova,"proxima nova",sans-serif;
    font-size: 16px;
    font-weight: 800;
    width:95%;
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

    .singup-cointainer button:hover, .singup .singup-cointainer button:active {
    background-color: initial;
    background-position: 0 0;
    color: #433434;
    }

    .singup-cointainer button:active {
    opacity: .5;
    }
`