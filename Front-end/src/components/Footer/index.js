import React from 'react'
import { FooterContainer, Footerlink, Footertext } from './FooterElements'
import { Header } from '../Global/GlobalComponents'
const Footer = () => {
  return (
    < >
      <FooterContainer>

        <div style={{display:'flex', justifyContent:'center'}}> 
        <div style={{padding:'50px 10px', display:'flex'}}>
        <img style={{width:'7rem', height:'7rem' }} src='../images/logo.png'/><p style={{color:'white'}}> © </p>
</div>

        <div style={{display:'flex', flexDirection:'column', alignSelf:'flex-end',  flex:1 ,justifySelf:'flex-start', margin:'40px 30%', justifyContent:'space-around'}}>
        <h2 style={{color:"white", margin:"10Px"}}>Ressources</h2>
         <Footerlink>Courses</Footerlink>
         <Footerlink>Learning paths</Footerlink>
         <Footerlink>Hackathons</Footerlink>
        </div>
        <div style={{display:'flex', flexDirection:'column', alignSelf:'flex-end', justifySelf:'flex-start', margin:'40px 30%', justifyContent:'space-around'}}>
        <h2 style={{color:"white", margin:"10Px"}}>Links</h2>
         <Footerlink>Discord</Footerlink>
         <Footerlink>Terms</Footerlink>
         <Footerlink>About</Footerlink>
        </div>
        </div>
       <Footertext>©️BotsCompete copyright 2023. All rights reserved. </Footertext>

      </FooterContainer>
    </ >
  )
}

export default Footer
