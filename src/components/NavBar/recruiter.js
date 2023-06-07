import React, { useEffect , useState} from 'react'
import {Nav, Navcontainer1, Navlogo,MobileIcon, NavItem,NavMenu,
  NavLinks,IconWrap, NavBtn, NavBtnLink,NavBtnLink2,NavBtnWrap , AccountMenu} from './NavBarElement.js'
import {FaBars} from 'react-icons/fa';
// import { Route } from 'react-router-dom';

 import { UserIcon, NotificationIcon } from '../Global/GlobalComponents.js';
 import DropdownNextui  from '../Global/DropdownNextui.js';
 import Cookies from 'universal-cookie';
 import { useLocation } from 'react-router-dom';
 
   const NavBarRec = (data) => {
    const [sessionUser, setSessionUser] = useState('');
 
  
    useEffect(() => {
      const cookies = new Cookies();
      const sessionUser = cookies.get('connect.sid');
      setSessionUser(sessionUser);
      console.log(cookies);
    }, []); 
  return (
    <>
    <Nav>
      <Navcontainer1>
      <NavMenu>
          <NavItem>
          <NavLinks to={`/instructor/${data.userID}`} activeclassname="active"> Home </NavLinks>
            <NavLinks to="/invites" activeclassname="active"> Job offers </NavLinks>
          </NavItem>
      
        <Navlogo to="/">
          botsCompete
        </Navlogo> 
      
          <NavItem>
          <NavLinks to="/hackathons" activeclassname="active">Challenges  </NavLinks>

            <NavLinks to="/bank " activeclassname="active"> Interviews</NavLinks>
          </NavItem>
        </NavMenu>  
        
      
      </Navcontainer1><IconWrap>  <DropdownNextui data={data} color={"white"}/></IconWrap>
    </Nav>
    
    
    
    
    
    </>
  )
}
  export default NavBarRec;