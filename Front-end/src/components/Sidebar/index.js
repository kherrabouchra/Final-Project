import React from 'react'
import { NavBtnLink2, NavBtnLink} from '../NavBar/NavBarElement'
import { SidebarContainer, CloseIcon,Icon,   SidebarLink,SidebarWrap,SidebarWrapper,SidebarMenu} from './SidebarElements'
 

export const Sidebar = ({isOpen, toggle}) => {
  return (
    <>
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
     <Icon onClick={toggle}>
        <CloseIcon/>
     </Icon>
     <SidebarWrapper>
        <SidebarMenu>
            <SidebarLink to="/">Hire.</SidebarLink>
            <SidebarLink to="/">Learn.</SidebarLink>
            <SidebarLink to="/">About.</SidebarLink>
        </SidebarMenu>
     </SidebarWrapper>
     <SidebarWrap>
     <NavBtnLink to="/Login">Login</NavBtnLink>
        <NavBtnLink2 to="/Signup">Sign-in</NavBtnLink2>
     </SidebarWrap>
    </SidebarContainer>
    
    
    </>
  )
}
 
