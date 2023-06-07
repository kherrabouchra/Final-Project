import React from 'react'
import {  InfoContainer,Headline,TextWrapper,
  InfoColumn,InfoRow, Ml} from './HeroElements';
  import { NavBtnLink } from '../NavBar/NavBarElement';
import { CircleDoodle, Arrow } from '../Global/GlobalComponents';
  // import { CircleDoodle } from '../Global/GlobalComponents';
//   import AOS from "aos";
// import "aos/dist/aos.css";
import { ImgWrapper } from './HeroElements';
 

export const Hero = ( ) => {
  
// AOS.init({
//   duration: 1800,
// })
  return (
    <> 

   <InfoContainer id="home"> 

         <InfoRow >
          <InfoColumn>  
             <TextWrapper>   Start today !  
              <Headline >
              YOUR MACHINE LEARNING JOURNEY STARTS<CircleDoodle  style={{top:'80%', left:'25%'}}/> HERE ! 
         
              </Headline>  
            <NavBtnLink to="Login" style={{  marginTop:"20px", fontSize:"large",  padding:'  8px 14px'}}> Get started !  <Arrow/></NavBtnLink>
            </TextWrapper>  
          </InfoColumn> 
          
      
         <InfoColumn><ImgWrapper> <Ml/> </ImgWrapper></InfoColumn>   </InfoRow> 
    </InfoContainer>  
     
 </>
  )
};
