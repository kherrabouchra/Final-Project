import styled from 'styled-components';
import Spline from '@splinetool/react-spline';

import { useInView } from 'react-intersection-observer';
import React, { useState } from 'react';

// data-aos:slide-up;

export const Card= styled.div` box-sizing: border-box;

position: absolute;
width: 629px;
height: 759.35px;
left: 736px;
top: 900.09px;

background: #F1F1F1;
mix-blend-mode: normal;
border: 0.4px solid #FFFFFF;
box-shadow: 0px 2px 7px rgba(0, 0, 0, 0.25);
border-radius: 80px;
@media screen and (max-width: 768px)
{width: 300px;
  height: 344.35px; left: 50%; 
border-radius: 40px;}
`
export const Card1=  styled.div`
box-sizing: border-box;

position: absolute;
width: 428px;
height: 759.35px;
left: 51px;
top: 1864.37px;
background: radial-gradient(63.87% 63.87% at 32.14% 36.13%, #FFA8F6 0%, #F1F1F1 81.35%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
mix-blend-mode: normal;
border: 0.4px solid #FFFFFF;
box-shadow: 0px 2px 7px rgba(0, 0, 0, 0.25);
border-radius: 60px;
 
`

export const Card2=  styled.div`


position: absolute;
width: 428px;
height: 759.35px;
left: 506px;
top: 1983.07px;

background:#F1F1F1;
mix-blend-mode: normal;
border: 0.4px solid #FFFFFF;
box-shadow: 0px 2px 7px rgba(0, 0, 0, 0.25);
border-radius: 60px;



`
export const Card3=  styled.div`

position: absolute;
width: 428px;
height: 759.35px;
left: 961px;
top: 2108.24px;
overflow: hidden;
background: #F1F1F1;
mix-blend-mode: normal;
box-shadow: 0px 2px 7px rgba(0, 0, 0, 0.25);
border-radius: 60px;
`
export const Sprinkle = ()=>{
  return(
    <svg width="61" height="90" viewBox="0 0 61 90" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22.104 1.06357C23.2183 8.76414 24.4939 16.3393 28.1478 23.1814C32.3279 31.0089 39.1028 37.0014 46.4314 40.2267C49.7055 41.6676 53.0232 42.7149 56.3523 43.8952C57.2023 44.1965 57.3443 44.3106 56.4622 44.7925C53.6206 46.3446 50.4426 47.7423 48.1728 50.3236C44.686 54.2892 43.777 60.6399 43.0868 66.0914C42.4475 71.14 42.5803 76.4178 43.1396 81.5369C43.2942 82.9514 43.7774 84.5465 43.7409 85.9688C43.7332 86.268 43.2513 85.6936 43.0859 85.4548C41.6783 83.4222 40.2978 81.4026 38.777 79.4756C34.2998 73.8029 29.6767 69.3002 24.125 65.1126C19.6356 61.7263 14.8599 57.9297 9.55141 56.8258C8.08097 56.52 6.62376 56.4502 5.15679 56.6188C5.10073 56.6253 3.76975 56.7554 3.80998 56.7201C7.25924 53.6956 10.0904 51.1721 12.5901 46.8332C17.0936 39.0163 20.7594 29.8942 22.3158 20.5133C23.2003 15.1822 23.1171 10.5551 22.3484 5.24271" stroke="#FBA7EC" stroke-width="7"/>
</svg>

  )
}

export const DoodleArrow =()=>{
  return(<svg width="135" height="63" viewBox="0 0 135 63" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M2 4.86292C4.45894 30.3382 36.3445 36.5482 57.8884 34.4687C68.5076 33.4437 81.7446 30.409 87.5836 20.4071C89.7913 16.6254 93.1428 7.54718 87.578 5.08763C69.2399 -3.01748 58.7412 11.6722 59.6939 28.7557C60.2734 39.1472 65.1533 48.8375 73.2346 55.4961C81.9215 62.6536 94.4966 61.1726 104.846 59.4567C115.799 57.6408 126.094 52.3325 131.29 42.2325C133.109 38.697 129.995 40.6639 127.511 41.5366C123.685 42.8805 118.613 43.5227 115.182 45.6727C111.222 48.155 124.025 42.5961 128.567 41.4936C135.696 39.7631 131.352 56.7615 130.387 60.3501" stroke="#FA6EE1" stroke-width="4"/>
  </svg>
  
  )
}
export const Underline =()=>{ 
  return(<svg style={{position: "absolute" , top:'60px'}} width="164" height="15" viewBox="0 0 164 15" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M143.473 10.9522C112.049 8.59964 80.6249 6.24706 49.2008 3.89449C36.9625 2.97826 24.9735 2.38594 12.7381 3.01721C11.3997 3.08627 3.25268 4.4128 2.65972 3.18896" stroke="#FBA7EC" stroke-width="4"/>
  <path d="M163.537 5.68457C130.237 5.68457 96.9366 5.68457 63.6367 5.68457C50.6678 5.68457 37.9872 5.98896 25.1434 7.53192C23.7385 7.7007 15.258 9.63176 14.5366 8.4556" stroke="#FBA7EC" stroke-width="4"/>
  </svg>
  )
}
export const Trophy =(  )=>{

  return  <img src="./images/trophy.png"  alt='trophy'  style={{ width:'60%',
   position:'absolute', left: '200px',top:'410Px', transform : "rotate(-1.93deg)"}}
     />};


export const Section = ()=>{
  return <svg style = {{position: 'absolute',
  color:"white",
  left: '0px',
  top: '2555.85px',
  margin:0, zIndex:'-100'}} width="100%"   viewBox="0 0 1440 1694" fill="none" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="729" cy="1201.35" rx="875" ry="492.5" fill="#0D0D0D"/>
  <path d="M0 0.847412H1458V1003.85H0V0.847412Z" fill="#0D0D0D"/>
  </svg> 
}
export const Coin=()=>{

  return  (<img style={{position: 'absolute',
    width: '645.18px',
    height: '820px',
    left: '0.71px' ,
    top: '2477.4px' , 
    background: 'url(xppoints.png)' ,
transform: 'rotate(7.75deg)' , zIndex:'11'
   }} alt="xppoints" src="./images/xppoints.png" className='coin' />);
}
export const Mac =( )=>  {

   
  //   const [isAnimated, setIsAnimated] = useState(false);
  
  //   const { ref, inView } = useInView({
  //     threshold: 0,
  //     triggerOnce: true,
  //   });
  // play={isAnimated}ref={ref}
  //   if (inView) {
  //     setIsAnimated(true);
  //   } 
  
  return ( 
     
   <Spline style={{ zIndex:'1', overflow:'hidden'}} scene="https://prod.spline.design/lec3HqvwcEYs1hBU/scene.splinecode" />

    )};  
     {/* //<Spline scene="https://prod.spline.design/pVXXJbAe77aFZc31/scene.splinecode" /> */}
  
    export const Noise = ()=>{

  return      <Spline style={{position:"absolute", top:'75px',left:'5%', zIndex:'1', overflow:'visible', }}scene= "https://prod.spline.design/pVXXJbAe77aFZc31/scene.splinecode" />
}
    export const Earth =()=>{    

      return(   <Spline  style={{position:"relative", top:'1000px'  }}  scene="https://prod.spline.design/emJFXQpaoUmWu086/scene.splinecode" />
      )
    }; 
export const Glass= styled.div`
z-index:100;
background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));
backdrop-filter: blur(6px);
-webkit-backdrop-filter: blur(10px);
border-radius: 20px;
border:0.5px solid rgba(255, 255, 255, 0.18);
box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);

`;


export const LargeText = styled.h1`
 
 padding:40px;
 
font-family: 'Inter';
font-style: normal;
font-weight: 700;
font-size: 100px;
line-height: 109.2%;
/* or 109px */


color: #000000;
`


export const SmallText = styled.h4`
 
width: 458px;
height: 105px;
 padding: 10px 70px;

font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 24px;
line-height: 146.52%;
/* or 35px */


color: #000000;




`

export const LandingP = styled.p`

font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 20px;
line-height: 24px;
text-align: center;
width: 516px;
margin: auto;
color: #8F8F8F;

`
export const JobSection= styled.div`

margin : 20px 0 0 40px;
 display: flex;
 flex-direction: column;
 align-items: flex-start;
`