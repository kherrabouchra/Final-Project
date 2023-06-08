import React, { useEffect, useState } from 'react'
import { GlobalStyles } from '../../components/Admin/styles/global';
import { lightTheme, darkTheme } from '../../components/Admin/styles/theme';
 
import { ThemeProvider } from 'styled-components';
 
import { Calendar, Table } from 'antd';
import styled from 'styled-components';
import Nav from '../../components/Recruiter/Nav'; 
import SideBarRec from '../../components/Recruiter/SideBar/SideBar';
import { BlackBtn, P, SubHeader } from '../../components/Global/GlobalComponents';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Recdash from '../../components/Recruiter/Dashboard';
import api from '../../api/api';




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

const JobOfferManage = () => {
    const navigate= useNavigate()
    const loc=useLocation();
    const user = loc.state;
    const [offers, setOffers]=useState()
 
   useEffect(()=>{
    api.get(`/job/${user.userID}`)
    .then((res)=>{
      if(res.data.status==='success'){
        console.log(res.data.data);
        setOffers(res.data.data);
      }
    }).catch((err)=>console.log(err))
   })

// useEffect(()=>{
 
//   offers.map((o)=>{
//     setOffers({...o, participants: 0})
//   })
// }, [offers])

console.log(offers);
  return (
    <div>
         <ThemeProvider theme={lightTheme}>
      <GlobalStyles />
      <Nav/>
      <SideBarRec/>
      <div style={{marginLeft:"20%"}}>
        <SubHeader style={{margin:0, height:"2.5rem"}}>Job offers</SubHeader>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ width: '80%', margin:"50px" }}>
       <BlackBtn to={'/joboffers/new'} state={user} style={{width:'150px'}}>+ Create a job offer</BlackBtn>
         
          <MLProgressTable dataSource={offers}>
            <Column title="Title" dataIndex="title" key="title" />
            <Column title="Creation Date" dataIndex="creationDate" key="creationDate" />

            <Column title="Participants" dataIndex="participants" key="participants" />
            <Column title="Status" dataIndex="state" key="state" />
          </MLProgressTable>
        </div>
       
      </div></div>
       
       

      </ThemeProvider>
    
    </div>
  )
}

export default JobOfferManage
