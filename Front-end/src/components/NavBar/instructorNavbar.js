import React, { useEffect , useState} from 'react'
import {Nav, Navcontainer1, Navlogo,MobileIcon, NavItem,NavMenu,
  NavLinks,IconWrap, NavBtn, NavBtnLink,NavBtnLink2,NavBtnWrap , AccountMenu} from './NavBarElement.js'
import {FaBars} from 'react-icons/fa';
// import { Route } from 'react-router-dom';

 import { UserIcon, NotificationIcon } from '../Global/GlobalComponents.js';
 import DropdownNextui  from '../Global/DropdownNextui.js';
 import Cookies from 'universal-cookie';
 import { useLocation } from 'react-router-dom';
 
   const NavBarInst = (data) => {
    const [sessionUser, setSessionUser] = useState('');
 
   const location= useLocation();

   const user = location.state;
   console.log(user);
  return (
    <>
    <Nav>
      <Navcontainer1>
      <NavMenu>
          <NavItem>
          <NavLinks to={`/instructor/${user.userID}`}  state={user} activeclassname="active"> Home </NavLinks>
            <NavLinks to={"/invites"} state={user}  activeclassname="active"> Invites </NavLinks>
          </NavItem>
      
          <Navlogo to={""}   state= {user}>
        <img style={{width:'3rem', height:'3rem',padding:'0'  }} src='../images/logo.png'/> 
       </Navlogo>
      
          <NavItem>
          <NavLinks to={"/hackathons"} state={user}  activeclassname="active">Hackathons  </NavLinks>

            <NavLinks to={"/bank "} state={user}  activeclassname="active"> Bank</NavLinks>
          </NavItem>
        </NavMenu>  
        
      
      </Navcontainer1><IconWrap>  <DropdownNextui data={user} color={"white"}/></IconWrap>
    </Nav>
    
    
    
    
    
    </>
  )
}
  export default NavBarInst;