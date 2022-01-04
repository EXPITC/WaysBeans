import styled from "styled-components";

export const Wrapper = styled.div`
    width: 100%;
    border:1px solid black;
`

export const InputSection = styled.textarea`
    width:400px;
    padding-bottom:30px;
    height:0;
    overflow:hidden;
    margin-top:10px;
    margin-left:25px;
    display: block;
    background:none;
    border-top:none;
    border-left:none;
    border-right:none;
    border-bottom: 2px solid #613D2B;
    color: #613D2B;
    font-family: "Helvetica Neue",Helvetica;
    font-weight: bold;
    font-size: 14px;
    &:focus{
        outline:none;
        border-bottom: 2px solid #613D2B;
    }
    &::placeholder{
        color: #613D2B;
        opacity: 0.8;
    }
`

export const Rate = styled.img`
    width:${props => props.R ? '30px' : '60px'};
    ${props => props.R? 'padding-top:4px;':  'cursor:pointer;'}
   
`

export const ReviewsWrapper = styled.div`
    padding:10px;
    border:1px solid red;
    display:flex;
    flex-direction:column;
    h1 {
        padding-left: 10px;
        margin-right: 27%;
        border-bottom: 3px solid #613D2B;
        margin-bottom: 0;
    }
`

export const RatingComments = styled.div`
    margin-top:0;
    border:1px solid blue;
    overflow-y: auto;
    height:433px;
    &::-webkit-scrollbar-track{
            box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
            background-color: #F5F5F5;
        }
    &::-webkit-scrollbar{
            width: 4px;
            background-color: #F5F5F5;
        }
    &::-webkit-scrollbar-thumb{
            background-color: var(--lightGrey);
        }
`
export const Comments = styled.div`
    padding-left:4px;
    padding-right:4px;
    border-radius: 5px;
    border:1px solid #613D2B;;
    color: var(--lightGrey);
    font-family: "Helvetica Neue",Helvetica;
    font-weight: bold;
    border-bottom: 3px solid #613D2B;
    border-right: 3px solid #613D2B;
`
export const AutoComments = styled.div`
    margin-left:15px;
    display:flex;
`