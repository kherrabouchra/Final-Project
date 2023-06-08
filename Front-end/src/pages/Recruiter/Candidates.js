import React from 'react'
import { GlobalStyles } from '../../components/Admin/styles/global';
import { lightTheme, darkTheme } from '../../components/Admin/styles/theme';
 
import { ThemeProvider } from 'styled-components';
import { Calendar, Table } from 'antd';
 import styled from 'styled-components';
import Nav from '../../components/Recruiter/Nav'; 
import SideBarRec from '../../components/Recruiter/SideBar/SideBar';
import { P, SubHeader } from '../../components/Global/GlobalComponents';
import { useLocation } from 'react-router-dom';
import Recdash from '../../components/Recruiter/Dashboard';
const MLProgressTable = styled(Table)`
  margin-top: 2rem;
  width: 100%;
`;
const MLprogressData = [
  { key: '1', name: 'User1', course: 'Introduction to Machine Learning', progress: '60%' },
  { key: '2', name: 'User2', course: 'Deep Learning', progress: '80%' },
  { key: '3', name: 'User3', course: 'Data Science Fundamentals', progress: '45%' },
  { key: '4', name: 'User4', course: 'Computer Vision', progress: '90%' },
  { key: '5', name: 'User5', course: 'Natural Language Processing', progress: '70%' },
];


const { Column } = Table;

const CandidatesPage = () => {

    const loc=useLocation();
    const user = loc.state;
  return (
    <div>
         <ThemeProvider theme={lightTheme}>
      <GlobalStyles />
      <Nav/>
      <SideBarRec/>
      <div style={{marginLeft:"20%"}}>
        <SubHeader style={{margin:0, height:"2.5rem"}}>Candidates</SubHeader>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ width: '80%', margin:"50px" }}>
         
          <MLProgressTable dataSource={MLprogressData}>
            <Column title="Name" dataIndex="name" key="name" />
            <Column title="Course" dataIndex="course" key="course" />
            <Column title="Progress" dataIndex="progress" key="progress" />
          </MLProgressTable>
        </div>
       
      </div>
      </div>
    
      </ThemeProvider>
    
    </div>
  )
}

export default CandidatesPage;
