import React from 'react'
import Admindashboard from '../../components/Admin/containers/Dashboard'
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from '../../components/Admin/styles/global';
import { lightTheme, darkTheme } from '../../components/Admin/styles/theme';
import  SideBar from '../../components/Admin/components/SideBar/SideBar'
 
import Nav  from '../../components/Admin/components/Nav'; 
import Claims from '../../components/Admin/containers/Claims';

const AdminClaims= () => {
  return (
    <div>
       <ThemeProvider theme={lightTheme}>
      <GlobalStyles />
      <Nav/>
      <SideBar/>
      <Claims/>
      </ThemeProvider>
    </div>
  )
}

export default AdminClaims
