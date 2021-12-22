import styled from 'styled-components';

export const Wrapper = styled.div`
    /* position: fixed;
    top:15%; */
    max-width: 1346px !important;
    max-height: 495px !important;
    border-radius: 5px 5px 0px 0px;
    animation: animap 1s linear forwards;
    transition: width 0.3s ease,height 0.3s ease,left 0.3s ease,top 0.3s ease;
    @keyframes animap {
        0%{
            width: 0%;
            height: 0%;
        }50%{
            background: #FFFFFF;
            width: 0%;
            height: 100%;
        }100%{
            padding: 20px 14px;
            background: #FFFFFF;
            width: 100%;
            height: 100%;
        }

    }
    .x {
        width:25px;
        height:25px;
        margin-top:-60px;
        right:15px;
        position: absolute;
        z-index: 999;
        cursor: pointer;
        opacity:0;
        animation: x 1s ease forwards;
        animation-delay: 1s;
        @keyframes x {
            to {opacity:1;margin-top:0;}
        }
    }

`
export const Card = styled.div`
  width: 419px;
 height: ${props => props.h ? '295px' : '185px' };
 z-index: 999;
 background: #FFFFFF;
 box-shadow: 10px -12px 11px -6px rgba(0, 0, 0, 0.25);
 border-radius: 5px 5px 0px 0px;
/* position: absolute; */
 position:absolute;
 opacity:0;
${props => props.h ? `top : 93px; right: 23px;` : ` bottom:80px;
 left:35%;`}
 animation: appear 2s ease-out forwards;
 animation-delay: ${props => props.h? '1s' :null};
 @keyframes appear {
     from{
         opacity:0;
     } to {
         opacity:1;
     }
 }
 
 padding-right:10px;
 padding-left:10px;
 h3{
    font-family: 'Montserrat', sans-serif;
    ${props => props.h ? `margin-top : 43px; margin-bottom:17px` : null}
 }
 p{
    font-family: 'Montserrat', sans-serif;
    font-size: 12px;
    margin:0;
    margin-top:3px;
    width: 100%;
 }
 h5{
    font-size: 13px;
    margin:0;
 }
 img {
    position:relative;
    width: 55px;
    height: 55px;
}
.adasdasfaw{
    /* border: 1px solid black; */
    display: flex;
    height: 55px;
    div{
        width: 100%;
        /* border: 1px solid black; */
        margin-left: 24px;
    }
 }
 button {
    margin-top: 25px;
    width: 395px;
    height: 30px;
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    background: #433434;
    border-radius: 5px;
    background: #433434;
    color:white;
    border:none;
    &:hover{
        background: none;
        color:#433434;
        border:1px solid #433434;
    }
 }
`
export const Bg = styled.div`
    display: flex;
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