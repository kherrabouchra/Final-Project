import React from 'react'
import {Nav, Navcontainer1, Navlogo,MobileIcon, NavItem,NavMenu,
  NavLinks, NavBtn, NavBtnLink,NavBtnLink2,NavBtnWrap } from './NavBarElement.js'
import {FaBars} from 'react-icons/fa';
// import { Route } from 'react-router-dom';
import SpringModal from '../Signup/SignupModal.js';
import { useOpen } from '../Signup/useOpen.js';
import { Route } from 'react-router-dom';
import { Button } from 'react-scroll';

import { useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
 export const NavBar = ({toggle}) => { 
 
  const location = useLocation();

  return (
    <>
    <Nav>
      <Navcontainer1>
      {/* <NavMenu>
          <NavItem>
            <NavLinks to="/Learn"> Learn.</NavLinks>
            <NavLinks to="/Hire"> Hire. </NavLinks>
            <NavLinks to="/About">   About. </NavLinks>
          </NavItem>
        </NavMenu>  */}
        <Navlogo to="/"  >
         <img style={{width:'3.5rem', margin:0}} src='../images/logo.png'/> 
        </Navlogo> 
        <MobileIcon onClick={toggle}>
          <FaBars/>
        </MobileIcon>
        <NavBtnWrap>
          <NavBtn>
              <NavBtnLink to ="/Login">Login</NavBtnLink>
            </NavBtn>
         <NavBtn > 
               <NavBtnLink2   to ="/Signup" state={{ background: location }}>Sign-up  </NavBtnLink2>
               
             </NavBtn>
             <Outlet/>
   
           </NavBtnWrap>
      </Navcontainer1>
    </Nav>
    
    
    
    
    
    </>
  )
}
  