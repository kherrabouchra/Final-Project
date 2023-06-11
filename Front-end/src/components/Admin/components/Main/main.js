import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import { Calendar, Table } from 'antd';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { HorizontalSeparator, P, SubHeader } from '../../../Global/GlobalComponents';
import api from '../../../../api/api'; 
import { SectionTextWrap } from '../../../Dashboard/DashboardElements';
import CollapseList from '../../../Global/CollapseNextui';
import { NotificationMantine } from '../../../Global/Notification';


const { Column } = Table;

const Container = styled.div`
  width: auto;
  margin-left: 14rem;
  position: relative;
  padding: 0 4rem;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 5rem;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colorGrayLight};
`;

const DashboardTitle = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  
`;

const AnalyticsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 2rem 3rem 5rem 3rem;
`;

const AnalyticsCard = styled.div`
  width: 30%;
  height: 14rem;
  padding: 1.5rem;
  background-color: ${({ theme }) => theme.colorWhite};
  border-radius: 20px;
`;

const MLProgressTable = styled(Table)`
  margin-top: 2rem;
  width: 100%;
`;

const Main = (props) => {
  const [users, setUsers]= useState('');
   const[jobs, setJobs]=useState('')
   const[hackathons,setHackathons]=useState('');
  const [notificationCount, setNotificationCount] = useState('');
  const [notifications, setNotifications] = useState('')
   const [courses, setCourses]= useState([])
  const [showDropdown, setShowDropdown] = useState(false);


  useEffect(()=>{

    api.get('/notifications/99')
  .then(res => {
      if(res.data.status === 'success') {
       setNotifications(res.data.data);
       setNotificationCount(res.data.length) ;
      }  
  }, [showDropdown])
  .catch(err => console.log(err));

  }, [])
  useEffect(() => {
    api.get('/user')
      .then((res) => {
        if (res.data.status === "success") {
          setUsers(res.data.length);
    
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  
  useEffect(() => {
    api.get('/job')
      .then((res) => {
        if (res.data.status === "success") {
          setJobs(res.data.data);
    
        }
      })
      .catch((err) => {
        console.log(err);
      });  
      api.get('/hackathons')
      .then((res) => {
        if (res.data.status === "success") {
          setHackathons(res.data.data);
    
        }
      })
      .catch((err) => {
        console.log(err);
      });

      api.get('/courses')
      .then((res) => {
        if (res.data.status === "success") {
          setCourses(res.data.data);
       console.log(courses);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []); 
  
   // <-- Empty dependency array to run the effect only once
  
  const MLprogressData = [
    { key: '1', name: 'User1', course: 'Introduction to Machine Learning', progress: '60%' },
    { key: '2', name: 'User2', course: 'Deep Learning', progress: '80%' },
    { key: '3', name: 'User3', course: 'Data Science Fundamentals', progress: '45%' },
    { key: '4', name: 'User4', course: 'Computer Vision', progress: '90%' },
    { key: '5', name: 'User5', course: 'Natural Language Processing', progress: '70%' },
  ];
  const data = [
    { name: 'Jan', value: 10 },
    { name: 'Feb', value: 20 },
    { name: 'Mar', value: 15 },
    { name: 'Apr', value: 25 },
    { name: 'May', value: 30 },
    { name: 'Jun', value: 35 },
    { name: 'Jul', value: 40 },
  ];
  // const pieData = [
  //   { name: 'Development Rate', value: 75, percentage: '75%' },
  //   { name: 'Remaining', value: 25, percentage: '25%' },
  // ];
  const websiteData = [
    { month: 'Jan', visitors: 200, pages: 400, bounceRate: '25%' },
    { month: 'Feb', visitors: 350, pages: 600, bounceRate: '20%' },
    { month: 'Mar', visitors: 500, pages: 800, bounceRate: '18%' },
    { month: 'Apr', visitors: 700, pages: 1000, bounceRate: '15%' },
    { month: 'May', visitors: 900, pages: 1200, bounceRate: '12%' },
  ]; 
  const [totalCourses, setTotalCourses] = useState(0);
const [completedCourses, setCompletedCourses] = useState(0);
const [completionPercentage, setCompletionPercentage] = useState(0);

useEffect(() => {
  setTotalCourses(courses.length);
  setCompletedCourses(courses?.filter(course => course.status === 'completed').length);
}, [courses]);

useEffect(() => {
  const percentage = (completedCourses / totalCourses) * 100;
  setCompletionPercentage(isNaN(percentage) ? 0 : percentage);
}, [completedCourses, totalCourses]);

const pieData = [
  { name: 'Development Rate', value: completionPercentage },
  { name: 'Remaining', value: 100 - completionPercentage }
];


  return (
    <Container>
    
      <TopBar>
        <SubHeader style={{margin:0}}>Dashboard</SubHeader>
      </TopBar>
      <AnalyticsContainer>






      <AnalyticsCard className='shadow'>
        
          <DashboardTitle>User count </DashboardTitle>
          <div style={{margin:"30px "}}>

          <SubHeader style={{margin:0, padding:0}}>{users}</SubHeader><P style={{margin:0, padding:0}}>Users</P> 

          </div>

        </AnalyticsCard>  
        <AnalyticsCard className='shadow'>
        <DashboardTitle>Hackathons </DashboardTitle>
          <div style={{margin:"30px "}}>

          <SubHeader style={{margin:0, padding:0}}>{hackathons.length}</SubHeader><P style={{margin:0, padding:0}}>hackathons</P> 

          </div>


        </AnalyticsCard> 

        <AnalyticsCard className='shadow'>
        <DashboardTitle>Job offers </DashboardTitle>
          <div style={{margin:"30px "}}>

          <SubHeader style={{margin:0, padding:0}}>{jobs.length}</SubHeader><P style={{margin:0, padding:0}}>job offers</P> 

          </div>
          

        </AnalyticsCard> 
        {/* <AnalyticsCard className='shadow'>
          <h3>Website Development Statistics</h3>
          <LineChart width={297} height={150} data={data} style={{ marginLeft: '-40px' }}>
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
          </LineChart>
        </AnalyticsCard>
       

        <AnalyticsCard className='shadow'>
          <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>Development of visitors</h3>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <BarChart width={320} height={149} data={websiteData}>
              <Bar dataKey="visitors" fill="#8884d8" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
            </BarChart>
          </div>
        </AnalyticsCard> */}
       
      </AnalyticsContainer>  
      
   
      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
    
        {/* <div style={{ width: '60%' }}>
          <h2>User Progress</h2>
          <MLProgressTable dataSource={MLprogressData}>
            <Column title="Name" dataIndex="name" key="name" />
            <Column title="Course" dataIndex="course" key="course" />
            <Column title="Progress" dataIndex="progress" key="progress" />
          </MLProgressTable>
        </div> */}
           <div style={{display:'flex', flexDirection:'column', width:"60%", justifyContent:'flex-end', margin:"0 2rem 6rem 2rem", }}>
                              <SectionTextWrap style={{ display: 'flex' }}>
                      <h1>Notifications</h1>
                      <HorizontalSeparator width={"60%"} />
                    </SectionTextWrap>

                    {notifications ? (
                      notifications.map((n) => (
                        <NotificationMantine notification={n} id={n.content} />
                      ))
                    ) : (
                      <div style={{ margin: "40px auto", display: 'flex', flexDirection: "column", alignItems: "center" }}>
                        <img alt='notifications' style={{ width: "150px", margin: "auto" }} src="../images/mynotification.png" />
                        <p>No Notifications.</p>
                      </div>
                    )} </div>


                     
        <AnalyticsCard className='shadow'  style={{ width : '260px', height:'280px', margin:"0"}}>
    <h3>Course completion</h3>
    <h2>{completedCourses}/{totalCourses}</h2>

    <PieChart width={200} height={210}>
      <Pie
        data={pieData}
        dataKey="value"
        nameKey="name"
        innerRadius={40}
        outerRadius={60}
        fill="#F989E6"
        paddingAngle={2}
        label={completionPercentage}
        labelLine={false}
        startAngle={90}
        endAngle={-270}
      >
              <Cell key="Development Rate" fill="#F989E6" />
              <Cell key="Remaining" fill="#ccc" />
            </Pie>
          </PieChart>
</AnalyticsCard>  
      </div>
    </Container>
  );
};

export default Main;
