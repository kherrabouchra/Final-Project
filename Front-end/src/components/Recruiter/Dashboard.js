import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { SubHeader, P } from '../Global/GlobalComponents';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import api from '../../api/api';
import { useLocation } from 'react-router-dom';
import dayjs from 'dayjs';
import { BlackRectangle } from '../Dashboard/DashboardElements';
import AOS from 'aos';
import 'aos/dist/aos.css';
const localizer = momentLocalizer(moment);

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
  background-color: #f1f1f1;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px;
  margin:20px;
  width: 94%;
  margin-left:-6px;
  background-color: white;
  border-radius: 20px;
`;

const JobOffersContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
`;

const JobOfferCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  border-radius: 10px;
  padding: 10px;
  margin: 20px 0;
`;

const JobOfferName = styled.p`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const JobOfferDescription = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
`;

const JobOfferParticipants = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
`;

const JobOfferDeleteButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  margin-right: 10px;
`;

const JobOfferUpdateButton = styled.button`
  background-color: blue;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
`;

const InterviewCard = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  width: 30%;
  margin-bottom: 20px;
`;

const InterviewTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const InterviewItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const InterviewDateTime = styled.p`
  font-size: 16px;
  font-weight: bold;
`;

const InterviewProfileName = styled.p`
  font-size: 16px;
`;

const TableContainer = styled.div`
  background-color: white;
  border-radius: 20px;
  border:1px solid grey;
  padding: 20px;
  width: 60%;
  height:100%;
  margin: 30px 10px;
`;

const TableTitle = styled.h2`
  font-size: 24px;
  font-weight:600;
  margin-bottom: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  font-size: 16px;
  font-weight: bold;
  text-align: left;
  padding: 12px;
  border-bottom: 1px solid #ccc;
`;

const TableRow = styled.tr`
 
`;

const TableCell = styled.td`
  font-size: 14px;
  padding: 10px;
  border-bottom: 1px solid #ccc;
`;

const CalendarContainer = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
  width: 30%;
`;
  const DashboardTitle = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  
`;

const AnalyticsContainer = styled.div`
  display: flex;
  width:100%;
  justify-content: space-evenly;
  align-items:flex-start;
`;

const AnalyticsCard = styled.div`
  width: 16rem;
  height: 15rem;
  margin:20px;
  padding: 1.5rem;
  background-color: ${({ theme }) => theme.colorWhite};
  border-radius: 20px;
`;

     const RecContainer=styled.div`
    background: #FFA8F6;
    border-radius: 20px;
    height:250px;
    width:670px;
    margin-top:20px;`
const CalendarTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

    

  const jobOffers = [
    {
      title: 'Frontend Developer',
      description: 'React, HTML, CSS',
      participants: '10 Participants',
    },
    {
      title: 'Backend Developer',
      description: 'Node.js, MongoDB',
      participants: '5 Participants',
    },
    {
      title: 'Full Stack Developer',
      description: 'React, Node.js, MongoDB',
      participants: '8 Participants',
    },
  ];
const DashMain = () => {
  
  const [interviews, setInterviews] = useState([]);
   const loc=useLocation()
   const user= loc.state;
  const [app, setApp]=useState([])

  useEffect(()=>{
    api.get(`/interview/all/${user.userID}`)
    .then((res)=>{
      if(res.data.status==='success'){
        console.log(res.data.data);
        setInterviews(res.data.data);
      }
    })
    api.get(`/job/${user.userID}/candidate/`)
    .then((res)=>{
      if(res.data.status==='success'){
        console.log(res.data.data);
        setApp(res.data.data)
      }
    }) 
    AOS.init({
      duration: 1000,
      once: true
    });
    
  },[])
  return (<>  <CardContainer className='shadow'>
  <AnalyticsContainer> <RecContainer data-aos="flip-up" >

<div style={{display:'flex', alignItems:'center'}}>
  <div style={{width:"100px",height:"100px", background:"white", borderRadius:"100%", margin:'30px 30px'}}>
    <img style={{width:"180px", position:'relative', marginTop:"-40px",marginLeft:"-40px"}} src='../images/calendar.png'/></div>
  <SubHeader style={{color:'white', width:"40%", margin:0}}>UPCOMING</SubHeader>
  </div>
  
   

   <div  style={{width:"70%", height:"50px", background:"#FDDFF8",marginLeft:"170px", borderRadius:"10px", flex:1, marginTop:"-20px", padding:"15px"}}>
    <div style={{display:"flex"}}>
   <h4>INTERVIEW :  </h4> <p>"{interviews[interviews.length-1].title}"  {dayjs(interviews[interviews.length-1].date).format('dd DD/MM/YYYY')}  with candidate @{app.find((c) => c.userID !== interviews[interviews.length - 1].developer)?.username}</p>
   </div>
   </div>
  
  </RecContainer>
      
        <AnalyticsCard className='shadow'>
        <DashboardTitle>Applications: </DashboardTitle>
          <div style={{margin:"30px "}}>

          <SubHeader style={{margin:0, padding:0}}>{app && app.length}</SubHeader><P style={{margin:0, padding:0}}>candidates.</P> 

          </div>
          

        </AnalyticsCard> </AnalyticsContainer>
    <AnalyticsContainer>

    <BlackRectangle/>
  <TableContainer data-aos="zoom-out-left">
  <SubHeader style={{width:'80%', margin:0}}>Latest candidates:</SubHeader>
  <Table>
    <thead>
      <tr>
        <TableHeader>candidate</TableHeader>
        <TableHeader>Job offer</TableHeader>

        <TableHeader>Date</TableHeader>
      </tr>
    </thead>
    <tbody>
      {app.map((a, index) => (
        <TableRow key={index}>
          <TableCell>{a.username}</TableCell>
          <TableCell>{a.title}</TableCell>

          <TableCell>{dayjs(a.date).format('DD/MM/YYYY')}</TableCell>

        </TableRow>
      ))}
    </tbody>
  </Table>
</TableContainer>
    </AnalyticsContainer>
    

        {/* <JobOffersContainer>
          {jobOffers.map((jobOffer, index) => (
            <JobOfferCard key={index}>
              <JobOfferName>{jobOffer.title}</JobOfferName>
              <JobOfferDescription>{jobOffer.description}</JobOfferDescription>
              <JobOfferParticipants>{jobOffer.participants}</JobOfferParticipants>
              <div>
                <JobOfferDeleteButton>Delete</JobOfferDeleteButton>
                <JobOfferUpdateButton>Update</JobOfferUpdateButton>
              </div>
            </JobOfferCard>
          ))}
        </JobOffersContainer> */}
        
      </CardContainer>
    
      {/* <CalendarContainer>
        <CalendarTitle>Calendar</CalendarTitle>
        <Calendar
          localizer={localizer}
          events={[
            {
              title: 'Interview with John Doe',
              start: new Date(2023, 4, 15, 10, 0),
              end: new Date(2023, 4, 15, 11, 0),
            },
            {
              title: 'Interview with Jane Doe',
              start: new Date(2023, 4, 16, 14, 0),
              end: new Date(2023, 4, 16, 15, 0),
            },
            {
              title: 'Interview with Bob Smith',
              start: new Date(2023, 4, 20, 15, 0),
              end: new Date(2023, 4, 20, 16, 0),
            },
          ]}
          style={{ height: '500px' }}
        />
      </CalendarContainer> */}
      </>
  );
};

export default DashMain;// import styled from 'styled-components'
// import React from 'react'
// import { Header } from '../Global/GlobalComponents'


//      const RecContainer=styled.div`
//     background: #FFA8F6;
//     border-radius: 20px;
//     height:200px;
//     width:600px;
//     margin-top:20px;
//     `
// const Recdash = () => {




//   return (
//     <div> 
//       <RecContainer>
//          dsknfndk
//       </RecContainer>
//       <Header>kdsnf</Header>
//     </div>
//   )
// }

// export default Recdash
