import styled from 'styled-components';

export const Wrapper = styled.div`
    display :flex !important;
    flex-direction :column !important;
    justify-content:space-between !important;
    align-items: center !important;
    padding-top:${props => props.h ? '35px':'45px'};
    padding-bottom:${props => props.h ? '35px' : '45px'};
    width:300px !important;
    background:white;
    max-height:${props => props.h ? '112px !important' : '272px !important'};
    /* top:10; */
    /* right:60px; */
    /* position:absolute; */
    /* z-index:999; */
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 4px 4px 20px rgba(0, 0, 0, 0.25);
    border-radius: 10px 10px 0 0;
    animation: h 1.3s ease-out forwards;
    @keyframes h {
        0%{
            height:0%;
        }
        100%{
            height:100%;
        }
    }
`
export const Wrapper2 = styled.div`
    /* border:1px solid black; */
    display :flex !important;
    flex-direction :column !important;
    justify-content:space-between !important;
    align-items: center !important;
    /* padding-top:32px; */
    /* padding-bottom:32px; */
    height: ${props => props.h? '218px' : '350px'};
    width:300px !important;
    background:transparent !important;
    top:10 !important;
    right:60px;
    position:absolute !important;
    z-index:999;
    /* box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 4px 4px 20px rgba(0, 0, 0, 0.25); */
    /* border-radius: 10px 10px 0 0; */
    animation: appear 1s ease-out;
    @keyframes appear {
        from{
            opacity:0;
        } to {
            opacity:1;
        }
    }

`
export const JustWrap = styled.div`
    /* border:1px solid black; */
    display:flex ;
    justify-content:space-between !important;
    align-items: center !important;
    height:40px !important;
    width:222px !important;
    opacity:0;
    animation: opc 2s linear forwards;
    animation-delay: 0.4s;
    p {
        background:none !important;
        font-family: 'Montserrat', sans-serif !important;
        font-weight: bolder !important;
        color:black !important;
        font-size: 20px !important;
        position:absolute !important;
        left:100px !important;
    }
    @keyframes opc {
        from {
            opacity: 0
        } to {
            opacity:1;
        }
    }
    &:hover {
        opacity: 0.5 !important;
        cursor: pointer;
    }
`
export const Logout = styled.div`
    display :flex;
    flex-direction :column;
    align-items: center;
    justify-content: center;
    width:300px;
    height: ${props => props.h ? '100px' : '75px'};
    opacity:0;
    position:absolute;
    background:white;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 4px 4px 20px rgba(0, 0, 0, 0.25);
    border-radius: 0 0 10px 10px;
    animation: slow 1s ease-out forwards;
    animation-delay: 0.4s;
    @keyframes slow {
        0% {
            bottom:150px;
            opacity:0;
            z-index:-1;
        }
        30%{
            opacity:0;
            z-index:-1;
        }
        90% {
            z-index: -1;
            opacity:1;
            bottom:-2px;
        }
        100% {
            opacity:1;
            bottom:-2px;
            /* margin-top:3px; */
        }
    }
`
export const Icon = styled.img` 
    width:40px !important;
    height:40px !important;
`