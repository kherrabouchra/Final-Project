import React, { useEffect, useState } from 'react'
import { CreateHackRec, HackContainer, HackWrap, HackathonTable, InstDashContainer, InstRec, PlusIcon } from './InstructorDashboardElements'
import { SubHeader,SubSubHeader, P, Arrow, HorizontalSeparator } from '../../Global/GlobalComponents'
import { DashboardTextWrapper, SectionTextWrap } from '../DashboardElements'
import { Link } from 'react-router-dom'
import { Timeline, Text } from '@mantine/core';
import api from '../../../api/api'

 
const InstructorDash = (props) => {
  const {data}= props
  const [schedule, setSchedule]= useState('');
  
  useEffect(()=>{
   api.get(`/instructor/${data.userID}/schedule`)
   .then((res)=>{console.log("sched", res.data);
    if(res.data.status==="success"){
      setSchedule(res.data.data)
    }
   }).catch((err)=>console.log(err))
  },[data])
  const currentDate = new Date().toISOString();
  console.log(schedule, currentDate);
  return (
    <HackContainer >
      <HackWrap>
         <InstDashContainer>
      <DashboardTextWrapper>
      
        <h1>Welcome back !</h1>
        <P>@{data.username}</P></DashboardTextWrapper>
        <div style={{display:'flex'}}>
       <Link to='/instdash/courses'  state={data}> <InstRec><SubSubHeader style={{margin:'15px'}}>My <br/>Courses({data.courseCount})  </SubSubHeader></InstRec></Link>
       <Link to='/hackathons' state={data}> <InstRec><SubSubHeader style={{margin:'15px' , textDecoration:'none'}}>My hackathons({data.hackCount}) </SubSubHeader>
      </InstRec></Link>

        </div> 
        <HorizontalSeparator style={{margin:'30px'}}/> 
        <DashboardTextWrapper>
           <h1>Today</h1>
           <Timeline sx={{margin : '20px auto'}} color="indigo" active={1} lineWidth={5} bulletSize={24}>
               
                    {schedule.length ? (
            schedule.map((s, index) => {
              if (s.startDate === currentDate) {
                return (
                  <Timeline.Item key={index} title={s.name}>
                    <Text color="dimmed" size="sm">{s.type}</Text>
                    <Text size="xs" mt={{schedule}.length}>starts at: {s.start}</Text>
                  </Timeline.Item>
                );
              } else { console.log("no");
                return schedule.length=0; // Return null for non-matching schedule items
              }
            })
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', alignSelf: 'center', justifyContent: 'center' }}>
              <img style={{ width: '200px' }} src="../images/calendar.png" alt="no schedule" />
              <P>No schedule available.</P>
            </div>
          )}

      
            {/* <Timeline.Item   title="New branch">
              <Text color="dimmed" size="sm">You&apos;ve created new branch <Text variant="link" component="span" inherit>fix-notifications</Text> from master</Text>
              <Text size="xs" mt={4}>2 hours ago</Text>
            </Timeline.Item>
            <Timeline.Item   title="New branch">
              <Text color="dimmed" size="sm">You&apos;ve created new branch <Text variant="link" component="span" inherit>fix-notifications</Text> from master</Text>
              <Text size="xs" mt={4}>2 hours ago</Text>
            </Timeline.Item>
            <Timeline.Item   title="New branch">
              <Text color="dimmed" size="sm">You&apos;ve created new branch <Text variant="link" component="span" inherit>fix-notifications</Text> from master</Text>
              <Text size="xs" mt={4}>2 hours ago</Text>
            </Timeline.Item> */}
    </Timeline>
    </DashboardTextWrapper>
        </InstDashContainer>
      </HackWrap>


    <Link to="/hackathons/new" state={data} >   
    <CreateHackRec> 
        <div style={{display:'flex',flexDirection:'column', alignItems:'center',   height:'100%', padding:'15px'}}>
         <SubHeader  style={{color:'white'}}>Create a new hackathon</SubHeader><PlusIcon/></div>
</CreateHackRec>
</Link>
    </HackContainer>
  )
}

export default InstructorDash
