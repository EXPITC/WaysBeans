import styled from 'styled-components';

export const Wrapper = styled.div`
    /* border:1px solid black; */
    margin:0 auto;
    display:flex;
    flex-direction:column;
    width:80%;
    h1 {
        margin-top: 73px;
        font-size: 36px;
        color:black;
        margin-bottom:30px;
    }
    h2 {
        font-size: 18px;
        line-height: 25px;
        color: #613D2B;
        margin-bottom: 15px;
    }
`

export const WrapContent = styled.div`
    width: 100%;
    height: 47px;
    display:flex;
    gap:1rem;
    justify-content: space-between;
    button {
        @import url('https://fonts.googleapis.com/css2?family=Abhaya+Libre:wght@800&family=Shippori+Antique+B1&display=swap');
        font-family: 'Shippori Antique B1', sans-serif;
        width: 222px;
        height: 47px;
        background: #433434;
        border-radius: 5px;
        border:none;
        color:white;
        text-align:justify;
        text-align:center;
        font-weight: 800;
        font-size: 14px;
        line-height: 19px;
        img {
            margin-left:11px;
        }
    }
    div {
        width: 77%;
        height: 47px;
        background:white;
        border-radius: 5px;
        text-align:justify;
        p{
            @import url('https://fonts.googleapis.com/css2?family=Abhaya+Libre:wght@800&family=Shippori+Antique+B1&display=swap');
            font-family: 'Abhaya Libre', serif;
            padding-left: 10px;
            font-weight: normal;
            font-size: 14px;
            line-height: 19px;
        }
    }
`
export const WrapOrder = styled.div`
    display:flex;
    /* border:1px solid black; */
    justify-content: space-between;
    width: 100%;
    gap:1rem;
    height:433px;
    .over {
        padding-right: 10px;
        /* border:1px solid black; */
        overflow-x: hidden;
        overflow-y: auto;
        max-width: 660px;
        width:100%;
        height: 433px;
        &::-webkit-scrollbar-track
        {
            box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
            background-color: #F5F5F5;
        }

        &::-webkit-scrollbar
        {
            width: 6px;
            background-color: #F5F5F5;
        }

        &::-webkit-scrollbar-thumb
        {
            background-color: #000000;
        }

    }
`
export const WrapOrder2 = styled.table` 
    display:flex;
    flex-direction: column;
    border-collapse: collapse;
    border-bottom: 0.1mm  solid black;
    border-top: 0.1mm  solid black;
    border-collapse: collapse;
`
export const Flex = styled.td`
    display:flex;
    max-width: 660px;
    width:100%;
    height: 119px;
    border-bottom: 0.1mm  solid black;
    border-top: 0.1mm solid black;
    border-collapse: collapse;
`
export const Wrap1 = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
        width: 80px;
        height: 80px;
    }
`
export const Wrap2 = styled.div`
    margin-left: 13px ;
    display:flex;
    flex-direction: column;
    /* border:1px solid black; */
    width: 550px;
    /* width:100%; */
    @media only screen and (max-width: 1000px) {
        width:450px;
    }
    @media only screen and (max-width: 800px) {
        width:350px;
    }
    @media only screen and (max-width: 700px) {
        width:250px;
    }
    @media only screen and (max-width: 600px) {
        width:100%;
    }
    height:80px;
    justify-content: space-between;
`
export const Wrap3 = styled.div`
    flex:100%;
    /* border:1px solid red; */
    width: 100%;
    height: 30px;
    display:flex;
    padding-top: 10px;
    align-items: center;
    gap:1rem;
    justify-content: space-between;
    p {
        padding-bottom: 10px;
        color:red;
    }
    div {
        display: flex;
    }
    button {
        background: none;
        border: none;
        color:#4F3D31;
        cursor: pointer;
        img {
            height:25px;
            width:12px;
        }
    }
    img {
        height:20px;
        width:20px;
    }
    .pinkBg{
        /* padding-top: 2px;
        margin: 0 auto; */
        text-align: center;
        width: 30px;
        height: 20px;
        background: #F6E6DA;
        border-radius: 5px;
    }
`


export const FlexCollum = styled.div`
    /* border:1px solid black; */
    display:flex;
    flex-direction: column;
    width: 30%;
    tb {
        display:flex;
        flex-direction: column;
        justify-content: space-evenly;
        height: 119px;
        border-bottom: 2px  solid black;
        border-top: 2px  solid black;
        border-collapse: collapse;
    }
`
export const Pp = styled.p`
    @import url('https://fonts.googleapis.com/css2?family=Abhaya+Libre:wght@800&family=Montserrat:ital,wght@1,100&family=Shippori+Antique+B1&display=swap');
    font-family: 'Montserrat', sans-serif;
    color: ${props => props.r? 'red !important' : 'black !important'};
    font-size: 14px;
    font-weight: ${props => props.b? 'bold' : null};
`

export const Orderbtn = styled.div`
    /* border:1px solid black; */
    width:auto;
    margin-top:76px;
    margin-bottom:126px;
    display: flex;
    justify-content: flex-end;
    button {
        width: 260px;
        height: 40px;
        background: #433434;
        border-radius: 5px;
        border:none;
        color: #FFFFFF;
        font-weight: bold;
        font-size: 14px;
        line-height: 17px;
        font-family: 'Montserrat', sans-serif;
        &:hover {
            color: #433434;
            background: none;
            border:1px solid #433434;
        }
    }
   
`
