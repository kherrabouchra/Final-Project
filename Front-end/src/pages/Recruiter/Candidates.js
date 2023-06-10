import React, { useEffect, useState } from 'react'
import { GlobalStyles } from '../../components/Admin/styles/global';
import { lightTheme, darkTheme } from '../../components/Admin/styles/theme';
 
import { ThemeProvider } from 'styled-components';
import { Calendar, Table } from 'antd';
 import styled from 'styled-components';
import Nav from '../../components/Recruiter/Nav'; 
import SideBarRec from '../../components/Recruiter/SideBar/SideBar';
import { P, PinkBtn, SubHeader } from '../../components/Global/GlobalComponents';
import { useLocation, useNavigate } from 'react-router-dom';
import Recdash from '../../components/Recruiter/Dashboard';
import api from '../../api/api';
import dayjs from 'dayjs';
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
    const navigate=useNavigate();
    const loc=useLocation();
    const user = loc.state;
    const [candidate, setCandidate]=useState([]);

    useEffect(()=>{

      api.get(`/job/${user.userID}/candidate/`)
    .then((res)=>{
      if(res.data.status==='success'){
        console.log(res.data.data);
        setCandidate(res.data.data)
      }
    })
    
    },[])

    function format_time(seconds) {
      let hours = Math.floor(seconds / 3600);
      let minutes = Math.floor((seconds % 3600) / 60);
      let remainingSeconds = seconds % 60;
    
      let timeString = '';
      if (hours > 0) {
        timeString += hours + ' hour' + (hours > 1 ? 's' : '') + ' ';
      }
      if (minutes > 0) {
        timeString += minutes + ' minute' + (minutes > 1 ? 's' : '') + ' ';
      }
      if (remainingSeconds > 0) {
        timeString += remainingSeconds + ' second' + (remainingSeconds > 1 ? 's' : '');
      }
    
      return timeString.trim();
    }
    const handleButtonClick=(e,id, job)=>{
      e.preventDefault()
      console.log(id);
      navigate(`/candidates/${id}/interview`, { state: {user: user, job: job} })
    }
    
    
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
         
          <MLProgressTable dataSource={candidate}>
            <Column title="Username" dataIndex="username" key="name" />
            <Column title="Email" dataIndex="email" key="course" />
            <Column title="Job offer" dataIndex="title" key="progress" />
            <Column title="Date" dataIndex="date" key="course"   render={(date) => dayjs(date).format('YYYY-MM-DD')}/>

            <Column title="Score" dataIndex="score" key="progress" />
            <Column title="Time Record" dataIndex="time" key="progress"      render={(time) => format_time(time)} />
            <Column
            title="Action"
            key="action"
            render={(text, record) => (
              <PinkBtn onClick={(e) => handleButtonClick(e,record.userID, record.jobOfferID)}>interview</PinkBtn>
            )}/>

          </MLProgressTable>
        </div>
       
      </div>
      </div>
    
      </ThemeProvider>
    
    </div>
  )
}

export default CandidatesPage;
