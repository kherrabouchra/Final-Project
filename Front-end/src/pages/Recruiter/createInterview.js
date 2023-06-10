import React from 'react'
import { GlobalStyles } from '../../components/Admin/styles/global';
import { lightTheme } from '../../components/Admin/styles/theme';
 
import { ThemeProvider } from 'styled-components';
 
import Nav from '../../components/Recruiter/Nav'; 
import SideBarRec from '../../components/Recruiter/SideBar/SideBar';
import InterviewForm from '../../components/Recruiter/InterviwForm'
const CreateInterview = () => {
  return (
    <div>
        <ThemeProvider theme={lightTheme}>
      <GlobalStyles />
      <SideBarRec/>
     <InterviewForm/></ThemeProvider>
    </div>
  )
}

export default CreateInterview
