 
import styled from 'styled-components';
import Spline from '@splinetool/react-spline';



export const Ml = ()=>{
  return (
    <Spline className='ML'scene="https://prod.spline.design/EBIUg1ZW3yX6bn-w/scene.splinecode" />
    );
}

export const InfoContainer = styled.div `
  height : 750px;
  display: flex;
  align-items: center ;
  justify-content: center;
  padding : 0 30px; 
background: black;
 color: white;
 `;
 

 export const InfoRow = styled.div`
 display: flex;
 flex-wrap: wrap;
 flex-direction : ${({imgStart})=>(imgStart)? 'row-reverse': 'row'}
 margin-left:-10px;
 margin-right:-10px;
 margin-bottom:-10px;
 margin-top:-50px;

 jusify-content: center;
 align-items: center;
 
 @media screen and (max-width: 768px){
  { 
  }`
 ;


 export const InfoColumn = styled.div`
 padding-right: 15px;
 padding-left: 15px; 
 max-width:50%;  

 color:white;
 @media screen and (max-width: 768px){
  max-width: 50%;
  display: flex;
  justify-content: center;  
  margin-top: 370px;
 }
`;

 export const TextWrapper= styled.div`
 max-width: 550px;
 padding-top:0; 
margin-left:30px;
flex:1;
margin-right:0;
 padding-bottom:  60px;
 @media screen (max-width: 768px){
  padding-bottom : 65px;
 }

 `;
export const ImgWrapper= styled.div`
 width:50vw;
 height: 130vh;
 `
// export const TopLine = styled.div`

// color: ${({lightTopLine})=>(lightTopLine)? 'red ': 'green'};
// font-size: 18px;
// line-height:16px;
// margin-bottom:16px;

// `;

// export const Heading = styled.div`
// marfin-bottom:  24px;
// font-size : 64px;
// line-height:1.1;
// color:${({lightText})=>(lightText)? 'blue': 'green'};

// `
// export const Subtitle=styled.div`
// max-width: 440px;
// margin-bottom:35px;
// font-size : 18px;
// line-height: 24px;
// color:${({lightTextDesc})=>(lightTextDesc)?'blue': 'red'};

// ` ;

export const Headline= styled.h1`
font-size: 64px;
font-weight: 700;
position: relative;
margin: 20px 0;
@media screen and (max-width: 768px){
  font-size: 36px;}
`
