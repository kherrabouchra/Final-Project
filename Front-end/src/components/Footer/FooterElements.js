import { Link } from "react-router-dom";
import styled from "styled-components";


export const  FooterContainer= styled.div`
height: 260px;
display: flex; 
flex-direction: column;
align-items:center;
justify-content:flex-end;
background: black;
@media screen and (max-width: 768px){
  height:100px;
  flex-direction:  column;
  padding: 0 40px;
margin:auto;
}
`

export const Footertext=styled.p`
color: white ;
font-weight: 200;
margin:6px;
font-size:14px;

`


export const Footerlink= styled(Link)`
color: white ;
font-weight: 200;
margin:6px;
&:hover{
  color: #8D8AFD;
}
`