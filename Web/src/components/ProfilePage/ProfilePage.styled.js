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
    gap:1rem;
    flex-direction: column;
    /* border:1px solid black; */
    ${props => props.btwn ? 'justify-content: space-between;' : null}
    ${props => props.i ?
    `img {Width:124px;Height:40px};

    `
    : null}
    .img {
        background:var(--mainYellow);
        width: 180px;
        height: 221.79px;
        border-radius:5px;
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
        height:221.79px !important;
        justify-content: space-between;
        div{
            flex-direction: column;
            /* border:1px solid red; */
        }
    }
`
export const Buttons = styled.div`
        border:none;
        width: 112px !important;
        height: 19px !important;
        background: ${props => props.c ? '#f23535!important;' : '#E6FFF2!important;'}
        border-radius: 2px !important;
        font-family: 'Montserrat', sans-serif;
        text-align: center !important;
        padding-top: 3px;
        line-height: 14px;
        font-size: 10px !important;
        color: ${props => props.c ? '#ffFF!important;': '#00FF47!important;'}
        margin-left:10%;
`
export const Pp = styled.p`
    @import url('https://fonts.googleapis.com/css2?family=Abhaya+Libre:wght@800&family=Montserrat:ital,wght@1,100&family=Shippori+Antique+B1&display=swap');
    font-family: 'Montserrat', sans-serif;
    color: ${props => props.c? '#613D2B !important' : 'black !important'};
    color: ${props => props.bb? '#974A4A !important' : null};
    font-size: ${props => props.bb? '10px' : '18px'};
    font-size: ${props => props.ft? '14px' : null};
    font-size: ${props => props.n ? '9px' : null};
    display:  ${props => props.n ? 'inline' : null};
    font-weight: ${props => props.b ? 'bold' : null};
    margin:0;
`
export const Flex = styled.div`
    display:flex;
    
    ${props => props.w ?
    (`
    width:419px;
     min-height: 101px;
     background: #FFFFFF;
     padding:16px 20px;
     justify-content: space-between;`)
    : null}
`