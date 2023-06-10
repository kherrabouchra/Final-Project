 
  import styled from 'styled-components';
  import { MdArrowForward} from 'react-icons/md';
import {Link, Link as LinkR} from 'react-router-dom';
 
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import * as React from 'react';


export const Blur = styled.div`

-webkit-backdrop-filter:  blur(8px);
backdrop-filter: blur(8px);
pointer-events: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
z-index:-100;
`
export const AccountType = styled.div `

box-sizing: border-box;

width: 296px;
height: 310px;
  
border: 4px solid #FA6EE1;
border-radius: 53px;
`
export const NotificationIcon = (props)=>{

  return(<svg className='icon' width="20" height="20" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M17.513 7.40398C17.513 5.70553 16.8171 4.07666 15.5783 2.87569C14.3396 1.6747 12.6596 1 10.9078 1C9.15597 1 7.47592 1.6747 6.2372 2.87569C4.99849 4.07666 4.30259 5.70553 4.30259 7.40398C4.30259 14.8753 1 17.0099 1 17.0099H20.8155C20.8155 17.0099 17.513 14.8753 17.513 7.40398Z" stroke={props.color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M12.8129 19.9998C12.6194 20.3041 12.3416 20.5566 12.0073 20.7321C11.6731 20.9076 11.2941 21 10.9084 21C10.5227 21 10.1437 20.9076 9.80952 20.7321C9.4753 20.5566 9.19744 20.3041 9.00391 19.9998" stroke={props.color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  )
}
export const UserIcon = (props)=>{
  return(<svg className='icon'  height="34" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M9.75 29V27.25C9.75 22.4175 13.6675 18.5 18.5 18.5C23.3324 18.5 27.25 22.4175 27.25 27.25V29" stroke={props.color} stroke-width="1.5" stroke-linecap="round"/>
  <path d="M18.499 18.4998C21.3986 18.4998 23.749 16.1494 23.749 13.2498C23.749 10.3504 21.3986 7.99985 18.499 7.99985C15.5994 7.99985 13.249 10.3504 13.249 13.2498C13.249 16.1494 15.5994 18.4998 18.499 18.4998Z"
   stroke={props.color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M18.5 36C28.165 36 36 28.165 36 18.5C36 8.83502 28.165 1 18.5 1C8.83502 1 1 8.83502 1 18.5C1 28.165 8.83502 36 18.5 36Z" stroke={props.color} stroke-width="1.5"/>
  </svg>
  )
}
 export const VerticalSeparator = styled.div`
 border-left: 1px solid grey;
   
  height: ${(props)=>(props.height)}  ;
  
  
  @media screen and (max-width: 768px){ ${(props)=>(props.separator)} ? display:none : display: block;}`


  export const HorizontalSeparator = styled.hr`
  
  width: ${(props)=>(props.width)}`
export const GoBack = (props) =>{

  return(<i className='svgbtn courses'> <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M22.2446 14.6364H13.3625L16.443 11.4478C16.9051 10.9773 16.9051 10.2455 16.443 9.77505C15.9809 9.3046 15.2622 9.3046 14.8001 9.77505L9.81995 14.95C9.35787 15.4205 9.35787 16.1523 9.81995 16.6228L14.8001 21.7978C15.0055 22.0068 15.3135 22.1637 15.6216 22.1637C15.9296 22.1637 16.1863 22.0591 16.443 21.85C16.9051 21.3796 16.9051 20.6478 16.443 20.1773L13.3625 16.9887H22.2446C22.8607 16.9887 23.3741 16.4659 23.3741 15.8387C23.4255 15.1591 22.9121 14.6364 22.2446 14.6364Z" fill={props.color}/>
  <path d="M16.4435 0C7.86943 0 0.886963 7.05681 0.886963 15.7863C0.886963 24.5159 7.86943 31.5727 16.4435 31.5727C25.0176 31.5727 32 24.5159 32 15.7863C32 7.05681 25.0176 0 16.4435 0ZM16.4435 29.2727C9.15297 29.2727 3.19734 23.2091 3.19734 15.7863C3.19734 8.36363 9.15297 2.3 16.4435 2.3C23.734 2.3 29.6896 8.36363 29.6896 15.7863C29.6896 23.2091 23.734 29.2727 16.4435 29.2727Z" fill={props.color}/>
  </svg> 
  </i>
  )
}
export const CircleDoodle = ()=>{
    return( <svg width="199" height="92" style={{position: 'absolute' ,zIndex: 100}}  viewBox="0 0 199 92" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.5603 73.1227C62.452 73.1227 118.203 80.8566 163.705 66.7718C187.657 59.3577 195.665 56.0147 195.665 33.4295C195.665 8.59568 118.766 3.26261 99.786 3.26261C75.164 3.26261 -9.33788 -2.46742 4.10436 39.604C6.88463 48.3056 25.572 65.6948 33.8939 69.9472C50.2729 78.3167 71.2156 79.3651 85.5817 89" stroke="#FA6EE1" stroke-width="5" stroke-linecap="round"/>
    </svg>
    )
};

export const Btn = styled(LinkR)`
 border-radius:50px;
 color: black;
 white-space: nowrap;
 padding: 4px 8px; 
 margin: 0 5px;
 outline: none;
 border: 2px solid rgba(0, 0, 0, 1)
 align-content: center;
 cursor: pointer;
 transition: all 0.3s ease-in-out;
 text-decoration: none;
 z-index: 12;
 font-size: normall ;
 &:hover {
transition: all 0.4s ease-in-out;
color: black;
background: #8D8AFD;
border :none;
 }`

export const BlackBtn = styled(LinkR)`
border-radius:50px;
color: white;
white-space: nowrap;
padding: 8px 14px; 
margin: 0 5px;  
outline: none;
background: black;  
text-align: center;
display: flex;
justify-content: center;
align-items: center;
cursor: pointer;
transition: all 0.3s ease-in-out;
text-decoration: none;
z-index: 12;
font-size: normall ;
&:hover {
transition: all 0.4s ease-in-out;
box-shadow: 0px 0px 22px rgba(0, 0, 0, 0.25);

 padding: 8px 15px;
}`


export const PinkBtn = styled(LinkR)`
border-radius:50px;
color: white;
white-space: nowrap;
padding: 8px 14px; 
margin: 0 5px;  
outline: none;
background: #F989E6;  
text-align: center;
display: flex;
justify-content: center;
align-items: center;
cursor: pointer;
transition: all 0.3s ease-in-out;
text-decoration: none;
z-index: 12;
font-size: normall ;
&:hover {
transition: all 0.4s ease-in-out;
box-shadow: 0px 0px 22px rgba(0, 0, 0, 0.25);
background:#f479e0;
 padding: 11px 15px;
}`

export const PurpleBtn = styled(LinkR)`
border-radius:25px;
color: white;
white-space: nowrap;
padding: 8px 14px; 
font-weight:500;
margin: 0 5px;  
outline: none;
background: #8D8AFD;  
text-align: center;
display: flex;
justify-content: center;
align-items: center;
cursor: pointer;
transition: all 0.3s ease-in-out;
text-decoration: none;
z-index: 12;
font-size: normall ;
&:hover {
transition: all 0.4s ease-in-out;
box-shadow: 0px 0px 22px rgba(0, 0, 0, 0.25);

 padding: 8px 15px;
}`

export const WhiteBtn = styled.button`
border-radius:50px;
border: 2px black solid;
color: black;
white-space: nowrap; 
margin: 6px 8px;
outline: none;
background: white;
text-align: center;
display: flex;
justify-content: center;
align-items: center;
padding: 10px 12px;
transition: all 0.3s ease-in-out;
text-decoration: none;
z-index: 12;
font-size: large; 
cursor: pointer;
&:hover {
transition: all 0.4s ease-in-out;
padding: 11px 13px;
 background-color:black;
 color: white; 
box-shadow: 0px 0px 18px rgba(0, 0, 0, 0.2);

}`
export const WhiteBtn2 = styled.button`
border-radius:50px;
border: 2px black solid;
color: black;
white-space: nowrap; 
padding:5px 10px;
outline: none;
background: white;
text-align: center;
display: flex;
justify-content: center;
align-items: center; 
transition: all 0.3s ease-in-out;
text-decoration: none;
z-index: 12; 
cursor: pointer;
&:hover {
transition: all 0.4s ease-in-out;
padding: 8px 11px;
 background-color:black;
 color: white; 
box-shadow: 0px 0px 22px rgba(0, 0, 0, 0.25);

}`


export const CloseBtn = ( )=>{
return(
<a>
  <svg className='close' width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="20.668" cy="20.1733" r="20" fill="black" fill-opacity="0.24"/>
<path d="M12.5586 28.6733C12.168 28.6733 11.9492 28.4975 11.9023 28.1459C11.9023 27.9741 11.9844 27.7827 12.1484 27.5717L18.0547 20.0366L12.4883 12.9819C12.3242 12.7787 12.2422 12.5873 12.2422 12.4077C12.2422 12.0483 12.457 11.8686 12.8867 11.8686H15.4062C16.1875 11.8686 16.8711 12.2397 17.457 12.9819L20.668 17.06L23.8789 12.9819C24.457 12.2475 25.1406 11.8764 25.9297 11.8686H28.4492C28.8789 11.8686 29.0938 12.0483 29.0938 12.4077C29.0938 12.5795 29.0117 12.7709 28.8477 12.9819L23.2812 20.0366L29.1875 27.5717C29.3516 27.7748 29.4336 27.9389 29.4336 28.0639C29.4336 28.1889 29.418 28.2787 29.3867 28.3334C29.3008 28.56 29.0977 28.6733 28.7773 28.6733H26.2812C25.5 28.6733 24.8203 28.3061 24.2422 27.5717L20.668 23.0131L17.0938 27.5717C16.5156 28.3061 15.8359 28.6733 15.0547 28.6733H12.5586Z" fill="white"/>
</svg>
</a>
)
}


export const TextSub = styled.p`
width: 80%;
margin:auto ;
font-family: 'inter';
font-weight: 300;
font-size: 16px;
line-height: 23px;
color: rgba(0, 0, 0, 0.53);` 

export const  Header= styled.h1`
width:85%;
height: 70px; 
margin:5px  auto;
font-family: 'Inter';
font-style: normal;
font-weight: 900;
font-size: 60px;
line-height: 109.2%;
/* identical to box height, or 70px */


color: rgba(0, 0, 0, 0.9);

`


export const  SubHeader= styled.h1`
width:80%;
height: 70px; 
margin:5px 100px;
font-family: 'Inter';
font-style: normal;
font-weight: 900;
font-size: 40px;
line-height: 109.2%;
/* identical to box height, or 70px */


color: rgba(0, 0, 0, 0.9);

`

export const  SubSubHeader= styled.h1`
width:80%;
height: 70px; 
font-family: 'Inter';
font-style: normal;
font-weight: 900;
font-size: 30px;
line-height: 109.2%;
/* identical to box height, or 70px */


color: rgba(0, 0, 0, 0.9);

`
export const P = styled.p`
color:rgba(0, 0, 0, 0.54);
`

export const Arrow=styled(MdArrowForward)`

margin-left: 8px;

font-size: 16px;  
 
`; 
export const TiltedArrow =  (props)=>{
  return(<svg width="38" height="38" viewBox="0 0 42 41" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M33.7538 23.0736L30.8704 22.9884L31.203 12.9578L9.16549 33.6136L7.14498 31.4579L29.1825 10.8021L19.1436 10.4772L19.2528 7.6026L34.2388 8.08762L33.7538 23.0736Z" fill= {props.color}/>
  </svg>
  )
}
export const  Banner= styled.div`
height: 405.3px;
display: flex; 


background: ${(props)=>(props.color)};
@media screen and (max-width: 768px){
  height:600px;
  flex-direction:  column;
  width:100%;

}
`

 export const CheckBox= ()=>{

  return(<svg style={{margin:'60px auto'}} width="77" height="78" viewBox="0 0 47 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="23.5" cy="24.1758" r="23.5" fill="#F989E6"/>
  <path d="M14.3999 25.5624L19.5999 31.1094L32.5999 17.2419" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  
  )
 }

 export const Checked= ()=>{

  return(<svg  width="37" height="38" viewBox="0 0 47 48" fill="none"  xmlns="http://www.w3.org/2000/svg">
  <circle cx="23.5" cy="24.1758" r="23.5" fill="#F989E6"/>
  <path d="M14.3999 25.5624L19.5999 31.1094L32.5999 17.2419" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  
  )
 }

 export const UnCheckBox= ()=>{
  return(
<svg width="37" height="38" viewBox="0 0 47 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="23.5" cy="24.1758" r="21" stroke="#F989E6" stroke-width="5"/>
</svg>
 )}
export const Container = styled.div`

width: 100%;
height: 100%;
margin-top:-60px  ;
padding: 30px 40px;
background: #FFFFFF;
box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.25);
border-radius: 50px;
`

export const Page=()=> {
  return (
    <Stack style={{ alignItems:'center'}} spacing={2}>
      <Pagination
        count={10}
        renderItem={(item) => (
          <PaginationItem
            slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
            {...item}
          />
        )}
      />
    </Stack>
  );
 }
 

 export const DeleteButton=()=>{
  return(<Link>
    <svg width="44" height="44" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M31.626 61.5967C47.9184 61.5967 61.126 48.3891 61.126 32.0967C61.126 15.8043 47.9184 2.59668 31.626 2.59668C15.3336 2.59668 2.12598 15.8043 2.12598 32.0967C2.12598 48.3891 15.3336 61.5967 31.626 61.5967Z" stroke="black" stroke-width="4" stroke-linecap="round"/>
<path d="M21.795 22.2585L41.4617 41.9252M41.4617 22.2585L21.795 41.9252" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

  </Link>)
 }     


 