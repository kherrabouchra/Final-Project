import React from 'react'
import {Nav, Navcontainer, Navlogo,MobileIcon, NavItem,NavMenu,
  NavLinks,IconWrap, NavBtn, NavBtnLink,NavBtnLink2,NavBtnWrap , AccountMenu} from './NavBarElement.js'
import {FaBars} from 'react-icons/fa';
// import { Route } from 'react-router-dom';
import  { useContext } from 'react';
import { UserContext } from '../../hooks/userContext.js';
 import { UserIcon, NotificationIcon } from '../Global/GlobalComponents.js';
 import DropdownNextui  from '../Global/DropdownNextui.js';
import { useLocation } from 'react-router-dom';


  export const NavBarDev = ( props) => {
  const { userId } = useContext(UserContext);
  console.log(props);
  const location = useLocation(); 
  const user=location.state;
console.log(user);
  return (
    <>
    <Nav>
      <Navcontainer style={{background:'black', width:"100vw"}}>
      <NavMenu>
          <NavItem>
          <NavLinks to={""}   state= {user}  activeClassName="active" > Home </NavLinks>

            <NavLinks to={"/Learn"}  state= {user}  activeClassName="active"> Learn</NavLinks>
          </NavItem>
       
        <Navlogo to={""}   state= {user}>
          botsCompete
        </Navlogo> 
      
          <NavItem>
          <NavLinks to={"/Compete"}state= {user}  activeClassName="active"> Compete </NavLinks>

            <NavLinks to={"/Learn" } state= {user}  activeClassName="active"> Jobs</NavLinks>
          </NavItem>
        </NavMenu> 
        {/* <MobileIcon onClick={props.toggle}>
          <FaBars/>
        </MobileIcon> */}
      
      </Navcontainer><IconWrap>
          <DropdownNextui  data={user}  color={"white"}/></IconWrap>
    </Nav>
    
    
    
    
    
    </>
  )
}
   