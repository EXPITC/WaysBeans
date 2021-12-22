import styled from "styled-components";

export const Wrapper = styled.div`
    margin:0 auto;
    margin-top: 73px;
    /* border:1px solid black; */
    max-width: 80%;
    width:100%;
    h1 {
        font-size: 36px;
        line-height: 42px;
        padding-left: 40px;
        color:black;
    }
    th{
        border-collapse: collapse;
        border:1px solid black;
    }
    table {
        border:1px solid black;
        border-collapse: collapse;
    }
    
`
export const Tab = styled.table`
    margin:0 auto;
`
export const Head = styled.th`
    height: 40px;
    padding-left: 10px;
    font-size: 14px;
    color:black;
    ${props => props.n ? ' min-width:72px': null};
    ${props => props.n2 ? 'min-width:183px': null};
    ${props => props.a ? ' min-width:280px': null};
    ${props => props.p ? ' min-width:191px': null};
    ${props => props.s ? ' min-width:160px' : null};
    width:100%;
    font-family: 'Montserrat', sans-serif;
    text-align: ${props => props.m ? 'center' : 'left'};
`

export const Special = styled.th`
    background:white;
    ${props => props.w ? 'color:#FF9900;':null}
    ${props => props.s ? 'color:#78A85A;':null}
    ${props => props.c ? 'color:#E83939;':null}
    ${props => props.o ? 'color:#00D1FF;' : null}
    text-align:start;
    padding-left: 10px;
    ${props => props.bt ? `
    padding:9px;
    justify-content:space-between;
    button{
        margin:3px;
    }
    `: null}
    img {
        margin:0 auto;
        margin-left:74.5px;
    }
`
export const TwoB = styled.button`
    border:none;
    color:white;
    background: ${props => props.a ? '#FF0742 !important' : '#0ACF83 !important'};
    max-width: 80px;
    width:100%;
    height: 20px;
    border-radius: 5px;
    &:hover{
        color:${props => props.a ? '#FF0742 !important' : '#0ACF83 !important'};
        background:transparent !important;
        border:1px solid ${props => props.a ? '#FF0742 !important' : '#0ACF83 !important'};
    }
`