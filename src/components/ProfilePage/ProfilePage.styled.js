import styled from 'styled-components';

export const Wrapper = styled.div`
    /* border:1px solid black; */
    width:80%;
    margin:0 auto;
    display: flex;
    justify-content: space-between;
    margin-top: 73px;
    gap:1rem;
    flex-wrap: wrap;
`
export const FlexCollum = styled.div`
    display:flex;
    gap:5px;
    margin-bottom:50px;
    /* border: 1px solid red; */
    ${props => props.t ?  'align-items: center;': null}
    flex-direction: column;
    /* border:1px solid black; */
    ${props => props.btwn ? 'gap:1rem;' : null}
    ${props => props.i ?
    `img {Width:124px;Height:40px};`
    : null}
    .img {
        background:var(--mainYellow);
        width: 180px;
        height: 221.79px;
        border-radius:5px;
    }
    .icon {
        width: 73px;
        height: 22px;
    }
    button{
        border:none;
        &:hover{
            color:#433434;
            background:none;
            border:1px solid #433434;
        }
        color:white;
        font-weight: bold;
        font-size: 14px;
        line-height: 17px;
        text-align: center;
        font-family: 'Montserrat', sans-serif;
        margin-top:21.21px;
        width: 180px;
        height: 40px;
        background: #433434;
        border-radius: 5px;
        margin-right: 27px;
    }
    .h {
        display:flex;
        height:221.79px !important;
        margin-left:28px;
        gap:27px;
        /* justify-content: space-between; */
        div{
            flex-direction: column;
            /* border:1px solid red; */
        }
    }
    .split {
        flex-direction: column;
        h1 {
            font-size: 14px;
            color: #974A4A;
            margin:0px;
        }
        margin-bottom:20px;
    }
`
export const ButtonsC = styled.div`
        border:none;
        width: 112px !important;
        height: 19px !important;
        background: #f23535!important;
        border-radius: 2px !important;
        font-family: 'Montserrat', sans-serif;
        text-align: center !important;
        padding-top: 3px;
        line-height: 14px;
        font-size: 10px !important;
        color: #ffFF;
`
export const ButtonsS = styled.div`
        border:none;
        width: 112px !important;
        height: 19px !important;
        background: #E6FFF2!important;
        border-radius: 2px !important;
        font-family: 'Montserrat', sans-serif;
        text-align: center !important;
        padding-top: 3px;
        line-height: 14px;
        font-size: 10px !important;
        color: #00FF47!important;
`
export const ButtonsW = styled.div`
        border:none;
        background: rgb(252,212,172);
        width: 112px !important;
        height: 19px !important;
        border-radius: 2px !important;
        line-height: 14px;
`
export const TextW = styled.div`
        font-family: 'Montserrat', sans-serif;
        text-align: center !important;
        padding-top: 3px;
        font-size: 10px !important;
        color: #FF9900!important;
        opacity:1;
`
export const ButtonsComp = styled.div`
        border:none;
        background: #613D2B;
        mix-blend-mode: normal;
        opacity: 0.1;
        width: 112px !important;
        height: 19px !important;
        border-radius: 2px !important;
        font-family: 'Montserrat', sans-serif;
        text-align: center !important;
        padding-top: 3px;
        line-height: 14px;
        font-size: 10px !important;
        color: #ffff!important;
        opacity:1!important;
`

export const Pp = styled.p`
    @import url('https://fonts.googleapis.com/css2?family=Abhaya+Libre:wght@800&family=Montserrat:ital,wght@1,100&family=Shippori+Antique+B1&display=swap');
    font-family: 'Montserrat', sans-serif;
    color: ${props => props.c? '#613D2B !important' : 'black !important'};
    color: ${props => props.s? '#613D2B !important' : 'black !important'};
    color: ${props => props.bb? '#974A4A !important' : 'black !important'};
    font-size: ${props => props.bb? '10px' : '18px'};
    font-size: ${props => props.ft? '14px' : null};
    font-size: ${props => props.n ? '9px' : null};
    display:  ${props => props.n ? 'inline' : null};
    font-weight: ${props => props.b ? 'bold' : null};
    margin-top:0;
    margin-bottom:0;

`
export const Pp2 = styled.p`
    @import url('https://fonts.googleapis.com/css2?family=Abhaya+Libre:wght@800&family=Montserrat:ital,wght@1,100&family=Shippori+Antique+B1&display=swap');
    font-family: 'Montserrat', sans-serif;
    color: #974A4A;
    font-size: ${props => props.bb? '10px' : '10px'};
    display:  ${props => props.n ? 'inline' : null};
    font-weight: ${props => props.b ? 'bold' : null};
    margin-top: 0;
    margin-bottom: 0;
`

export const Flex = styled.div`
    display:flex;
    ${props => props.w ?
    (`
    width:419px;
    width: 524px;
    height: 145px;
     min-height: 101px;
     background: #F6E6DA;
     padding:16px 20px;
     cursor:pointer;
     margin-bottom:10px;
     justify-content: space-between;`)
    : null}
`
export const Preview = styled.img`
    width: ${props => props.I ? '73px' : '80px'};
    height: ${props => props.I ? '22px': '120px'};
    background: ${props => props.I ? 'transparent' : '#dddcdb'};
    border-radius:10px;
    box-shadow: ${props => props.I ? null : 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px'};
`
export const Spliter = styled.div`
    display:flex;
    gap:1rem;
`