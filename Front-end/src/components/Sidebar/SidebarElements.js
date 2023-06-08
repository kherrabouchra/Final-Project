import styled from "styled-components";
import {FaTimes} from 'react-icons/fa';
import {Link as LinkR} from 'react-router-dom';
import {Link as LinkS} from 'react-scroll';

export const SidebarContainer = styled.aside`

position : fixed ;
z-index: 999;
width: 100%;
height: 100%; 
display: grid;
align-items: center;
top:0;
background: black; 
right: 0;
transition: 0.4s ease-in-out;
opacity: ${({ isOpen }) =>(isOpen? '100%': '0')};
right: ${({ isOpen })=> (isOpen ? '0': '-100%')};



`;
export const CloseIcon= styled(FaTimes)`
color : white;


`;

export const Icon = styled.div`
position : absolute;
right: 1.5rem;
top: 1.2rem;
background: transparent;
 
cursor: pointer;
outline: none;

`;


export const SidebarWrapper=styled.div`
color: white;
line-height:3rem;

`;

export const SidebarMenu=styled.ul`
display: grid;
grid-template-columns: 1fr;
grid-template-row: repeat(6, 100px);
@media screen (max-width 480px){


    grid-template-row: repeat(6,80px);
}
`;

export const SidebarLink= styled(LinkS)`
display: flex;
align-items: center;
justify-content: center;
text-decoration: none;
list-style: none;
font-size: 1.5rem;
transition: 0.2s ease-in-out;
color: white;
cursor: pointer;
text-decoration: none;
 &:hover {
    color: #f984e5;
    transition : 0.4s ease-in-out ;
 }
`;

export const SidebarWrap = styled.div`

display: inline-flex; 
justify-content: center;
 
`;

export const SidebarRoute = styled(LinkR)`
border-radius: 50px;
border : white solid 1px;
white-space: nowrap;
padding :4px 8px;
color: white;
outline : none ;
cursor: pointer;
transition : all 0.3s ease-in-out;
text-decoration: none;

&:hover {
    transition: all 0.2s ease-in-out;
    color: black;
    background: #E76B6B;
    border :none;
     }



`