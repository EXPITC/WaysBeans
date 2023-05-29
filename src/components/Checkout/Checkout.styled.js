import styled from "styled-components";

export const Wrapper = styled.div`
    /* border:1px solid black; */
    z-index:-1;
    display:block;
    width:85%;
    margin:0 auto;
    display:flex;
    gap:53px;
    flex-wrap:wrap;
    align-items: center;
    margin-top: 92px;
    margin-bottom: 77px;
    justify-content:center;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    padding-top: 30px;
    padding-bottom: 50px;
    border-radius: 20px;
` 
export const Preview = styled.img`
    width: ${props => props.I ? '73px' : '80px'};
    height: ${props => props.I ? '22px': '120px'};
    background: ${props => props.I ? 'transparent' : '#dddcdb'};
    border-radius:10px;
    box-shadow: ${props => props.I ? null : 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px'};
`
export const InputSide = styled.div` 
    /* margin-top: 40px; */
    /* border:1px solid black; */
    width: 472px;
    img {
        width:20px;
        height:auto;
    }
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
        width: 261px;
        left: 195px;
        background: rgba(97, 61, 43, 0.25);
    }
    
`
export const Flex = styled.div` 
    display: flex;
    gap:1rem;
    /* border:1px solid black; */
    justify-content: center;
    flex-direction: column;
    button {
        width: 100%;
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
    justify-content:space-between;
    ${props => props.w ?
    (`
    flex-direction: row;
    width:419px;
    min-height: 101px;
    background: #F6E6DA;
    padding:16px 20px;
    gap:1rem;
    border-top-left-radius: 30px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 20px;
    border-bottom-left-radius: 5x;
     
    `)
    : null}
`
export const FlexCollum = styled.div`
    display:flex;
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
    div{
        flex-direction: column;
        h1 {
            font-size: 14px;
            color: #974A4A;
            margin:0px;
        }
        margin-bottom:20px;
    }
`
export const Pp = styled.p`
    @import url('https://fonts.googleapis.com/css2?family=Abhaya+Libre:wght@800&family=Montserrat:ital,wght@1,100&family=Shippori+Antique+B1&display=swap');
    font-family: 'Montserrat', sans-serif;
    color: #974A4A;
    font-size: ${props => props.bb? '10px' : '10px'};
    display:  ${props => props.n ? 'inline' : null};
    font-weight: ${props => props.b ? 'bold' : null};
    margin-top: 0;
    margin-bottom: 0;
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

export const WrapperFlex = styled.div`
    /* border:1px solid black; */
    min-height:500px;
    height:100%;
`