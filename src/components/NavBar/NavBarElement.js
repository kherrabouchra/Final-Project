import styled from 'styled-components';
import {Link as LinkR} from 'react-router-dom';
import {Link as LinkS} from 'react-scroll';
import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { UserIcon } from '../Global/GlobalComponents';
import { useState } from 'react';

export const Nav = styled.nav`
background : black;
height: 55 px; 
display: flex;
justify-content: center;
align-items: center;
 
z-index: 10;

@media screen and (max-width: 960px){
    transition : 0.8s all ease;
 
`;

export const Nav2 = styled.nav`
background-color : none;
color: black;
height: 55 px; 
display: flex;
justify-content: center;
align-items: center;
 poition: absolute;
 top:0;
z-index: 10;

@media screen and (max-width: 960px){
    transition : 0.8s all ease;
 
`;

export const Navcontainer1= styled.div`
display: flex;
justify-content: center ;
 
align-items: center;
height:55px;
z-index: 1;
posistion: relative;
width:70%;
padding: 0 24px;
margin: auto;
`

export const Navcontainer= styled.div`
display: flex;
justify-content: center ;
position: absolute;
top:1px;
align-items: center;
height:55px;
z-index: 1; 
width:70%;
padding: 0 24px;
margin: auto;
`

export const Navlogo = styled(LinkR)
`
cursor: pointer;
  justify-content: center; 
  display: flex;
  align-items: center;
  color : white;
  font-weight: bold;
  text-decoration: none;
  padding: 0px 20px;
 
 `

export const Navlogo2 = styled(LinkR)
`
cursor: pointer;
  justify-content: center; 
  display: flex;
  align-items: center;
  color : black;
  font-weight: bold;
  text-decoration: none;
  padding: 0px 20px;
 
 `

 export const MobileIcon = styled.div`
 display: none;
 @media screen and (max-width: 768px){

    display: block;
    position: absolute ;
    top:0;
    right: 0;
    transform: translate(-100%, 60%);
    font-size: 1.4rem;
    cursor : pointer;
    color: white;
 }
 `
export const NavMenu = styled.ul`
display: flex;
flex-direction: row;
align-items: center;
list-style: none;
text-align: center;
@media screen and (max-width: 768px){
    display: none;
}
`; 
export const NavItem = styled.li`
 
 
`;

export const NavLinks = styled(LinkR)`

color: white;
 display: inline-block;
align-items: center;
text-decoration: none;
padding : 0 35px;
height : 100%;
cursor: pointer;

&:hover {  
transition: all 0.3s ease-in-out;
color:#8D8AFD;
}

&.active{
  background-color: black;

}

`;

export const NavLinks2 = styled(LinkR)`

color: black;
 display: inline-block;
align-items: center;
text-decoration: none;
padding : 0 35px;
height : 100%;
cursor: pointer;

&:hover {  
transition: all 0.3s ease-in-out;
color:white;
}

&.active{
  color: white;

}


`;

export  const NavBtn = styled.nav`
display: flex;

align-self:center;
 
@media screen and (max-width: 768px){
    display:none;
}

`;


export const NavBtnLink = styled(LinkR)`
 border-radius:50px;
 color: white;
 white-space: nowrap;
 padding: 8px 14px; 
 margin: 0 5px;
 outline: none;
 border: none;
 align-content: center;
 cursor: pointer;
 transition: all 0.3s ease-in-out;
 text-decoration: none;
 border : white solid 1px;
 font-size: small;
 &:hover {
transition: all 0.4s ease-in-out;
color: black;
background: #8D8AFD;
border :none;

 }
`;
export const NavBtnLink2 = styled(LinkR)`
 border-radius:50px;
 white-space: nowrap;
 margin: 0 5px;
 padding: 8px 14px; 
 
 font-size: small; 
 outline: none;
 border: none;
 cursor: pointer;
 transition: all 0.3s ease-in-out;
 text-decoration: none;
 color: black;
background: #8D8AFD;

border :none;
 &:hover {
transition: all 0.4s ease-in-out;
background: #9B98FF;

 }


`;
export const NavBtnWrap = styled.div`
display: flex; 
position : absolute;
right : 5%;
 
`;
export const IconWrap = styled.div`
display: flex;
justify-content: space-between;
align-items: center ;
position: absolute;    
right: 3%;
top:1px;
`

/*background: rgb(149,18,71);
background: linear-gradient(141deg, rgba(149,18,71,1) 0%, rgba(154,152,255,1) 70%, rgba(195,231,255,1) 100%);

background: rgb(149,18,71);
background: linear-gradient(141deg, rgba(149,18,71,1) 0%, rgba(231,107,107,1) 0%, rgba(145,157,255,1) 100%);
*/


export const AccountMenu=(props) =>{
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logout = () => {
    setIsLoggedin(false);
  };
 
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <UserIcon color={props.color} sx={{ width: 32, height: 32 }}>M</UserIcon>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar /> Profile
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <Logout  fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}