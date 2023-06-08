
import styled, { keyframes } from 'styled-components';


export const Spark=()=>{

  return ( <img alt='spark' src= "./images/sparkle.svg" className="svg"/>)
}

const mymove =  keyframes` 


from {transform: translateX(100%) }
   to{transform: translateX(-100%)}`;

export const ScrollContainer = styled.div`
overflow: hidden;
background-color: #8d8afd;
width: 100%;
padding : 20px 0;
  transform: rotate(2deg); 
  position : absolute ;
  top:767px;   
  height: 70px;
 z-index:0;
 @media screen (max-width:480px){
   
 }
`
 

export const Scroll = styled.h2`

animation: ${mymove} 10s infinite;
animation-timing-function: linear;
   color : black;
   
`;