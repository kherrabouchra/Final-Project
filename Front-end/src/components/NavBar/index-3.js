import React from 'react'
import {Nav2, Navcontainer, Navlogo2,MobileIcon, NavItem,NavMenu, 

  NavLinks2,IconWrap, NavBtn, NavBtnLink,NavBtnLink2,NavBtnWrap , AccountMenu} from './NavBarElement.js'
  import DropdownNextui  from '../Global/DropdownNextui.js';
 import { useLocation } from 'react-router-dom';
import  { useContext } from 'react';
import { UserContext } from '../../hooks/userContext.js';
  import {FaBars} from 'react-icons/fa';
// import { Route } from 'react-router-dom';
 import { UserIcon, NotificationIcon } from '../Global/GlobalComponents.js';
 export const NavBarDev2 = (props) => {
  const { userId } = useContext(UserContext);
  const location = useLocation();
  console.log(location);
  const user=location.state;
  return (
    <Nav2>
      <Navcontainer>
      <NavMenu>
          <NavItem>
          <NavLinks2  to={"/dashboard"} state= {user}  activeClassName="active"> Home </NavLinks2>

            <NavLinks2  to={"/Learn"}  state= {user} activeClassName="active"> Learn</NavLinks2>
          </NavItem> 
      
        <Navlogo2 to="/ " >
        <img style={{width:'4rem', height:'4rem',padding:'0'  }} src='../images/blogo.png'/> 

        </Navlogo2>  
      
          <NavItem>
          <NavLinks2 to={"/Compete"} state= {user}  activeClassName="active"> Compete </NavLinks2>

            <NavLinks2 to={"/Jobs"} state= {user} activeClassName="active"> Jobs</NavLinks2>
          </NavItem>
        </NavMenu> 
        {/* <MobileIcon onClick={props.toggle}>
          <FaBars/>
        </MobileIcon> */}
        {/* <NavBtnWrap><NavBtn>
              <NavBtnLink to ="/">Login</NavBtnLink>
            </NavBtn>
         <NavBtn>
              <NavBtnLink2 to ="/">Sign-up</NavBtnLink2>
            </NavBtn>
        
           </NavBtnWrap> */} 
      </Navcontainer><IconWrap>  
        <DropdownNextui  data={user}  color={"white"}/></IconWrap>
    </Nav2>
    
    
    
    
    
  )
}
  