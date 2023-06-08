import React from 'react'
import { GlobalStyles } from '../../components/Admin/styles/global';
import { lightTheme, darkTheme } from '../../components/Admin/styles/theme';
 
import { ThemeProvider } from 'styled-components';
 
import Nav from '../../components/Recruiter/Nav'; 
import SideBarRec from '../../components/Recruiter/SideBar/SideBar';
import { P, SubHeader } from '../../components/Global/GlobalComponents';
import { useLocation } from 'react-router-dom';
import Recdash from '../../components/Recruiter/Dashboard';

const RecruiterDashboard = () => {

    const loc=useLocation();
    const user = loc.state;
  return (
    <div>
         <ThemeProvider theme={lightTheme}>
      <GlobalStyles />
      <Nav/>
      <SideBarRec/>
      <div style={{marginLeft:"20%"}}>
        <SubHeader style={{margin:0, height:"2.5rem"}}>Dashboard</SubHeader>
        <P style={{margin:0}}>Welcome back! @{user.username}</P>
        <Recdash/>
      </div>
      
      </ThemeProvider>
    
    </div>
  )
}

export default RecruiterDashboard
