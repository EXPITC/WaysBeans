import styled from 'styled-components';

export const Bg = styled.div`
     z-index: 999;
     width: 100%;
     height: 100%;
     position: fixed;
     display: flex;
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
    /* justify-content: center;
    align-items: center; */
    position: fixed;
    background: none;
    z-index: 1000;
    /* border:1px solid black; */
    animation: regAni 0.5s ease-out forwards;
        @keyframes regAni {
            from{
                top:80%;
            }to {
                top:5%;
            }
        }
    
    h2 {
        @import url('https://fonts.googleapis.com/css2?family=Abhaya+Libre:wght@800&family=Shippori+Antique+B1&display=swap');
        font-family: 'Shippori Antique B1', sans-serif;
        font-style: normal;
        font-weight: 900;
        font-size: 36px;
        line-height: 49px;
        margin-right: 40%;
        color: #FFC700;
    }
    @media only screen and (max-width:1450px) {
        h2 {
        @import url('https://fonts.googleapis.com/css2?family=Abhaya+Libre:wght@800&family=Shippori+Antique+B1&display=swap');
        font-family: 'Shippori Antique B1', sans-serif;
        font-style: normal;
        font-weight: 900;
        margin-top:60px;
        font-size: 36px;
        line-height: 19px;
        margin-right: 40%;
        color: #FFC700;
        }
            .singup2-cointainer {
            background:white;
            display: flex;
            width: 416px;
            height: 584px;
            border-radius: 10px;
            flex-direction: column;
            align-items: center;
            border:1px solid green;
            flex-wrap: wrap;
        
            /* margin: 10px solid black; */
        }
            form {
            @import url('https://fonts.googleapis.com/css2?family=Abhaya+Libre:wght@800&family=Shippori+Antique+B1&display=swap');
            font-family: 'Shippori Antique B1', sans-serif;
            height: 284% !important;
            /* overflow: auto; */
            /* gap: 1rem */
            width: 80%;
            justify-self: center;
            align-items: center;
            position: sticky;
            
            /* border:1px solid black; */
        }
        form input {
            @import url('https://fonts.googleapis.com/css2?family=Abhaya+Libre:wght@800&family=Shippori+Antique+B1&display=swap');
            font-family: 'Shippori Antique B1', sans-serif;
            margin-bottom: 10px;
            background-color: transparent;
            display: block;
            width: 100%;
            background: rgba(210, 210, 210, 0.25);
            border: 2px solid #D2D2D2;
            border-radius: 5px;
            height: 50px !important;
            padding-left: 5px;
            outline: none;
            color: black;
        }
        form select {
            @import url('https://fonts.googleapis.com/css2?family=Abhaya+Libre:wght@800&family=Shippori+Antique+B1&display=swap');
            font-family: 'Shippori Antique B1', sans-serif;
            margin-bottom: 10px;
            background-color: transparent;
            display: block;
            width: 100%;
            background: rgba(210, 210, 210, 0.25);
            border: 2px solid #D2D2D2;
            border-radius: 5px;
            height: 50px;
            padding-left: 5px;
            outline: none;
            color: #B1B1B1;
            text-align: left;
            text-align-last: left;
        }
    }
    p {
                margin-top:0px;
                text-align: center;
        }
    @media only screen and (min-width:1451px) {
        .singup2-cointainer {
        background:white;
        display: flex;
        width: 416px;
        height: 694px;
        border-radius: 10px;
        flex-direction: column;
        align-items: center;
       
        /* margin: 10px solid black; */
    }
        form {
                /* @import url('https://fonts.googleapis.com/css2?family=Abhaya+Libre:wght@800&family=Shippori+Antique+B1&display=swap'); */
                /* font-family: 'Shippori Antique B1', sans-serif; */
                /* display: flex; */
                /* flex-direction: column; */
                /* margin-top: 5%; */
                /* height: 444px; */
                /* gap: 1rem */
                width: 80% !important;
                /* justify-self: center; */
                /* align-items: center; */
                /* position: sticky; */
                
                /* border:1px solid black; */
            }
        form input {
            @import url('https://fonts.googleapis.com/css2?family=Abhaya+Libre:wght@800&family=Shippori+Antique+B1&display=swap');
            font-family: 'Shippori Antique B1', sans-serif;
            margin-bottom: 30px;
            background-color: transparent;
            display: block;
            width: 100%;
            background: rgba(210, 210, 210, 0.25);
            border: 2px solid #D2D2D2;
            border-radius: 5px;
            height: 50px !important;
            padding-left: 5px;
            outline: none;
            color: black;
        }
        form select {
            @import url('https://fonts.googleapis.com/css2?family=Abhaya+Libre:wght@800&family=Shippori+Antique+B1&display=swap');
            font-family: 'Shippori Antique B1', sans-serif;
            margin-bottom: 20px;
            background-color: transparent;
            display: block;
            width: 100%;
            background: rgba(210, 210, 210, 0.25);
            border: 2px solid #D2D2D2;
            border-radius: 5px;
            height: 50px;
            padding-left: 5px;
            outline: none;
            color: #B1B1B1;
            text-align: center;
            text-align-last: center;
        }
    }
    form input::placeholder {
        @import url('https://fonts.googleapis.com/css2?family=Abhaya+Libre:wght@800&family=Shippori+Antique+B1&display=swap');
        font-family: 'Shippori Antique B1', sans-serif;
        text-align: left;
        color: #B1B1B1;
    }
    .singup2-cointainer .x-button-singup2{
        cursor: pointer;
        /* filter: brightness(0) invert(1); */
        width: 5%;
        top: 3%;
        right: 3%;
        position: absolute;
        transform: translateZ(999);
    }
    .singup2-cointainer .already-have-acc {
        padding-top: 10px;
        color: #B1B1B1;
        cursor: default;
    }
    .singup2-cointainer .login-here{
        font-weight:bold;
        color:#B1B1B1 !important;
        cursor: pointer;
    }
    .singup2-cointainer button {
        margin-top: 3%;
        width: 20vw;
    }

    .singup2-cointainer button  {
    background: #433434;
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
    line-height: 16px;
    min-height: 40px;
    outline: 0;
    width: 100%;
    padding: 12px 14px;
    text-align: center;
    text-rendering: geometricprecision;
    text-transform: none;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    vertical-align: middle;
    }

    .singup2-cointainer button:hover, .singup2-cointainer button:active {
    background-color: initial;
    background-position: 0 0;
    color: #433434;
    }

    .singup2-cointainer button:active {
    opacity: .5;
    }
`