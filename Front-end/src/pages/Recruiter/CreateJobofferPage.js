import React from 'react'
import { GlobalStyles } from '../../components/Admin/styles/global';
import { lightTheme, darkTheme } from '../../components/Admin/styles/theme';
 
import { ThemeProvider } from 'styled-components';
 
import Nav from '../../components/Recruiter/Nav'; 
import SideBarRec from '../../components/Recruiter/SideBar/SideBar';
import { P, SubHeader } from '../../components/Global/GlobalComponents';
import { useLocation } from 'react-router-dom';
import Recdash from '../../components/Recruiter/Dashboard';
import CreateJobeOffer from '../../components/Recruiter/CreateJobeOffer';

const Createjoboffer = () => {

    const loc=useLocation();
    const user = loc.state;
  return (
    <div style={{height:"100%"}}>
         <ThemeProvider theme={lightTheme}>
      <GlobalStyles />
      <SideBarRec/>
      <div style={{ background:'rgb(238 238 238)', height:"100%"}}>
      <div style={{marginLeft:"20%", background:'rgb(238 238 238)',height:"100%"}}>
        <SubHeader style={{padding:"30px 0 0 0" ,marginLeft:0, height:"2.5rem"}}>Create a new job offer</SubHeader>
        <CreateJobeOffer/>
      </div>
      </div>
      </ThemeProvider>
    
    </div>
  )
}

export default Createjoboffer;
