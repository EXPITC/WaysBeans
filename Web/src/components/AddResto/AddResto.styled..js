import styled from "styled-components";


export const Wrappper = styled.div`
       width:84.8%;
    margin:0 auto;
    margin-top: 73px;
    h1 {
        padding-left: 25px;
        font-size: 36px;
    }
    input{
        font-family: 'Montserrat', sans-serif;
        border-radius: 5px;
        border: 2px solid #766C6C;
        background: rgba(210, 210, 210, 0.25);
        padding-left: 10px;
        max-width:100%;
        margin-bottom: 27px;
    }
    .first {
        max-width : 927px;
        width:100%;
        height:50px;
    }
    .firsts {
        max-width : 903px;
        width:100%;
        height:50px;
    }
    .second {
        font-family: 'Montserrat', sans-serif;
        max-width: 213px;
        width:100%;
        height: 50px;
        border-radius: 5px;
        border: 2px solid #766C6C;
        background: rgba(210, 210, 210, 0.25);
    }
    .secondbtn {
        padding:0px 40px;
        font-weight: bold;
        border:none;
        color:white;
        font-size: 14px;
        line-height: 19px;
        font-family: 'Montserrat', sans-serif;
        display:flex;
        justify-content: space-between;
        align-items: center;
        width: 222px;
        height: 50px;
        background: #433434;
        border-radius: 5px;
    }
    .third {
        width: 1157px;
        height: 50px;
    }
    label{
        display:flex;
        justify-content: space-between;
        align-items: center;
        padding:10px;
        img{
            height:30px;
        }
    }
`

export const Flexx = styled.div` 
    display:flex;
    ${props => props.btwn ? `
    justify-content:space-between;
    gap:1rem;
    `: null}
    /* margin-bottom: 27px; */
`