import React from 'react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom' 
import { BookLayer, Header, SubHeader, TextSub, P,HorizontalSeparator , Banner, TiltedArrow, CircleDoodle, UnCheckBox} from '../Global/GlobalComponents'
import { DashboardContainer, JobsLinkContainer, LevelContainer, LevelWrap, Points, SectionTextWrap } from './DashboardElements'
import { NavBarDev } from '../NavBar/index-2'
import { DashboardTextWrapper, StreakContainer ,Streak, 
  Section1,Section2,SectionWrap,StreakDay,StreakDayWrap,
  StreakIcon, Xppoint, BlackRectangle,PurpleRectangle, trophyicon} from './DashboardElements'
import TableList from '../Global/TableElements/TableNexui'
import { DeleteIcon } from '../Global/TableElements/Delete'
import CollapseList from '../Global/CollapseNextui'
import { ProgressC } from '../Global/ProgressCircle'
import CircularStatic from '../Global/CircularProgress'
import ProgressBar from '../Global/ProgressBar'
import { useEffect } from 'react' 
import { useFetch } from '../useFetch'
import axios from 'axios'
import { dark } from '@mui/material/styles/createPalette'
import api from '../../api/api'
const Dashboard = (props) => {

  const [courses, setCourses] = useState([]);
  const [hackathons, setHackathons] = useState(["es"]);
  const [notifications, setNotifications] = useState([]);
const [user , setUser]=useState('')
  // Assuming that the `courses` state is updated with the list of courses
  const coursesExist = courses && courses.length > 0;
  const hackathonsExist = hackathons && hackathons.length > 0;
  const notificationsExist = notifications &&  notifications.length > 0;
  const location = useLocation();
  const state = location.state;   
console.log(state);

  useEffect(()=>{



api.get(`/user/${state.userID}`)
.then((res)=>{
  if(res.data.status==="success"){
     setUser(res.data.data[0])
  }
}).catch((err)=>console.log(err))

  }, [state])

 

function calculatePercentageToNextLevel( data) {
  const currentLevel=  user.level;
const currentPoints =  user.points;
  const levelThresholds =[125, 225, 350, 500, 700, 950, 1250, 1600, 2000, 2500, 3100, 3800, 4600, 5500, 6500, 7600, 8800, 10100, 11500, 13000]; // level thresholds in points
  const nextLevelThreshold = levelThresholds[currentLevel]; // points needed for next level
  const pointsNeeded = nextLevelThreshold - currentPoints; // points needed to reach next level
 const percentage =parseInt((pointsNeeded / nextLevelThreshold) * 100); // percentage of points needed
 return  percentage;
}  
 
  return (
    <div style={{background:"#F1F1F1" , height:"1800px"}}>
      <Banner color={"black"} style={{flexDirection:'column'}}>
        <h1 style={{color:"white", padding:"30px", margin:"70px 0 0 70px  "}}>Dashboard</h1>
      
       <DashboardContainer>
        
        <SectionWrap>
        <Section1>
           <DashboardTextWrapper>
        <h1>Welcome back !</h1>
        <P>@{user&& user.username}</P>
        </DashboardTextWrapper>
        <SectionTextWrap >
            <h1>Notifications</h1><HorizontalSeparator  width={"60%"}/></SectionTextWrap>
               {notificationsExist ? ( <CollapseList/> ) : (<div style={{margin: "20px auto", display:'flex', flexDirection:"column", 
              alignItems:"center"}}><img alt='my courses' style={{width:"150px",margin: "auto"}} src="../images/mynotification.png"/> 
            <P>No Notifications.</P></div>)}
            <SectionTextWrap >   <h1>My courses</h1><HorizontalSeparator  width={"60%"}/></SectionTextWrap>
            
            
            {coursesExist ? ( <CollapseList/> ) : (<div style={{margin: "20px auto", display:'flex', flexDirection:"column",
           alignItems:"center"}}><img alt='my courses' style={{width:"150px",margin: "auto"}} src="../images/mycourses.png"/> 
            <P>No enrolled courses. Check out available courses <Link to="/Learn"> here.</Link></P> </div>)}
           
            <SectionTextWrap >
            <h1>My hackathons</h1><HorizontalSeparator  width={"60%"}/></SectionTextWrap> 
            {hackathonsExist ? ( <CollapseList/> ) : (<div style={{margin: "20px auto", display:'flex', flexDirection:"column",
           alignItems:"center"}}><img alt='my courses' style={{width:"150px",margin: "auto"}} src="../images/myhackathons.png"/> 
            <P>Participate in hackathons <Link to="/Compete"> here.</Link></P></div>)}
            <Xppoint/></Section1>
        <Section2>  
          <LevelContainer>
            <Points> <img style={{width:"45px"}} src="../images/xppoint.png"/>
            <h3>{user&&  user.points}XP</h3>
            </Points>

            <LevelWrap>
              <h3>LEVEL {user&& user.level}</h3><ProgressBar  variant="determinate" value={100-calculatePercentageToNextLevel(user)} />
            <P>{calculatePercentageToNextLevel(user)}% more points to level up !</P>
             </LevelWrap>


        </LevelContainer>
        <StreakContainer><DashboardTextWrapper><P style={{marginLeft: '80%'}}> {user&&  7- user.streak} days left.</P><h1>Daily streak</h1>
        <P>Stay active to maintain your streak.</P></DashboardTextWrapper>
        <Streak>
          <StreakDayWrap><StreakDay><P>sat</P><StreakIcon><UnCheckBox/></StreakIcon></StreakDay>  </StreakDayWrap>
          <StreakDayWrap><StreakDay><P>sun</P><StreakIcon><UnCheckBox/></StreakIcon></StreakDay>  </StreakDayWrap>

          <StreakDayWrap><StreakDay><P>mon</P><StreakIcon><UnCheckBox/></StreakIcon></StreakDay>  </StreakDayWrap>

          <StreakDayWrap><StreakDay><P>tue</P><StreakIcon><UnCheckBox/></StreakIcon></StreakDay>  </StreakDayWrap>

          <StreakDayWrap><StreakDay><P>wed</P><StreakIcon><UnCheckBox/></StreakIcon></StreakDay>  </StreakDayWrap>

          <StreakDayWrap><StreakDay><P>thu</P><StreakIcon><UnCheckBox/></StreakIcon></StreakDay>  </StreakDayWrap>

          <StreakDayWrap><StreakDay><P>fri</P><StreakIcon><UnCheckBox/></StreakIcon></StreakDay>  </StreakDayWrap>


          </Streak></StreakContainer> 

          <JobsLinkContainer to='/jobs'>
            <h1 style={{color:'white', flex:1, alignSelf:'flex-end',position:'relative', fontWeight:500, padding:'8px'}}>Pick a job offer according to
            your skillset and start  
            building your career. </h1>
            <TiltedArrow   color={'white'}/>

            </JobsLinkContainer>


         <div style={{display:'flex',  justifyContent:"space-between"}}>
         
          <Link style={{textDecoration:"none"}} to="/Leaderboard" state={user}>
            <BlackRectangle style={{color:"white", display:"flex", flexDirection:"column",justifyContent:"flex-start"}}>  
                  <Header style={{margin:'0'}}>🏆</Header>
          <h3>My ranking</h3>
          <Header  style={{margin:'30px 0', color:"white"}}>{user.rank} 23</Header>
          </BlackRectangle> 
          </Link>
          <PurpleRectangle style={{color:"white", display:"flex", flexDirection:"column",justifyContent:"flex-end" }}>

          </PurpleRectangle>
          </div>
          <Link style={{textDecoration:"none",color:"black"}} to="/Recommendations">
          <StreakContainer>
            <div style={{display:"flex", alignItems: "center", justifyContent:" space-between", margin:"0 20px"}}>
            <h1 style={{margin:"20px"}}>Recommended for you</h1>
          <TiltedArrow color={'black'}/></div>
          </StreakContainer>
          </Link>
          </Section2>
                  </SectionWrap>
                </DashboardContainer>  </Banner>
              </div>
            )
          }

          export default Dashboard 

