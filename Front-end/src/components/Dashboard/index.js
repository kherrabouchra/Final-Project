import React from 'react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom' 
import { BookLayer, Header, SubHeader, TextSub, P,HorizontalSeparator , Banner, TiltedArrow, CircleDoodle, UnCheckBox, CheckBox, Checked} from '../Global/GlobalComponents'
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
import axios, { all } from 'axios'
import { dark } from '@mui/material/styles/createPalette'
import api from '../../api/api'
const Dashboard = () => {

  const [courses, setCourses] = useState([]);
  const[lessons, setLessons]=useState('')
  const[allLessons, setAllLessons]=useState([])

  const [hackathons, setHackathons] = useState([]);
  const [notifications, setNotifications] = useState([]);
const [user , setUser]=useState('')
  // Assuming that the `courses` state is updated with the list of courses
  const coursesExist = courses && courses.length > 0;
  const hackathonsExist = hackathons && hackathons.length > 0;
  const notificationsExist = notifications &&  notifications.length > 0;
  const [enrolled, setEnrolled]=useState([])
  const[streak, setStreak]=useState(0)
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
  
  
  useEffect(() => {
    api.get(`/courses/enrolled/${user.userID}`)
      .then((res) => {
        console.log(res.data);
        if (res.data.status === "success") {
          setEnrolled(res.data.data);
  
       
        }
      })
      .catch((err) => console.log(err));

      api.get(`/user/dev/streak/${user.userID}`)
      .then((res)=>{ console.log(res.data);
        if(res.data.status==="success"){
         
          setStreak(res.data.data[0].streak)
      console.log("streak",streak);

        }
      })
  }, [user]);
  

  useEffect(()=>{

  const fetchCoursePromises = enrolled.map((e) =>
  api.get(`/courses/${e.course}`)
);
Promise.all(fetchCoursePromises)
  .then((results) => {
    const newCourses = results.map((result) => result.data.data);
    const filteredCourses = newCourses.filter(
      (newCourse) => !courses.find((course) => course.courseID === newCourse.courseID)
    );
    setCourses([...courses, ...filteredCourses]);
  })
  .catch((err) => console.log(err));

    const fetchLessonPromises = enrolled.map((e) =>
    api.get(`/courses/lessons/get/${e.currentMaterial}`)
  );

  Promise.all(fetchLessonPromises)
    .then((lessonResults) => { 
      const newLessons = lessonResults.map(
        (lessonResult) => lessonResult.data.data
      );
      setLessons([...lessons, ...newLessons]);
    })
    .catch((err) => console.log(err));

 
  }, [enrolled])
         
  


  useEffect(() => {
    const fetchCourseLessons = async () => {
      try {
        const fetchCourseLessonsPromises = enrolled.map((e) =>
          api.get(`/courses/lessons/getAll/course/${e.course}`)
        );
        const results = await Promise.all(fetchCourseLessonsPromises);
        console.log(results);
  
        const newCourseLessons = results.map((result) => result.data.data);
        setAllLessons([...allLessons, ...newCourseLessons]);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchCourseLessons();
  }, [enrolled]);

  const [allPerc, setAllPerc]=useState([])

               
    const calculateCompletionPercentage = () => {
      if (allLessons.length === 0) {
        return 0;
      }
       const allPer=[];
      let totalLessonCount = 0;
      let completedLessonCount = 0;
      
      enrolled.forEach((enrollment) => {
        const course = courses.find((course) => course.courseID === enrollment.course);
        if (!course) {
          console.log(`Course not found for enrollment: ${JSON.stringify(enrollment)}`);
          return;
   
       }
        const courseLessons = allLessons.find((lessons) => lessons[0].courseID === course.courseID);
        if (!courseLessons) {
          console.log(`Lessons not found for course: ${JSON.stringify(course)}`);
          return;
        }
        console.log(courseLessons);
  
        totalLessonCount += courseLessons.length;
           console.log(totalLessonCount);
        if (courseLessons.map((lesson) => lesson.id === enrollment.currentMaterial)) {
        
          completedLessonCount += 1;
        }
    const percentage = (completedLessonCount / totalLessonCount) * 100;
      console.log(percentage, completedLessonCount, totalLessonCount);
       
      allPerc.push( percentage.toFixed(2));
    

      });  
      return allPerc;
      
    };

  
      console.log(calculateCompletionPercentage(),"sdc");
   
  
                        
 console.log(enrolled);
 console.log(courses);
console.log(lessons);
console.log(allLessons);

function calculatePercentageToNextLevel( data) {
  const currentLevel=  user.level;
const currentPoints =  user.points;
  const levelThresholds =[125, 225, 350, 500, 700, 950, 1250, 1600, 2000, 2500, 3100, 3800, 4600, 5500, 6500, 7600, 8800, 10100, 11500, 13000]; // level thresholds in points
  const nextLevelThreshold = levelThresholds[currentLevel-1]; // points needed for next level
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
            
            
            {coursesExist ? ( <CollapseList courses={courses} lessons={lessons} percentage={calculateCompletionPercentage()}/> ) : (<div style={{margin: "20px auto", display:'flex', flexDirection:"column",
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
          
          <StreakDayWrap>
  <StreakDay>
    <P>sat</P>
    <StreakIcon>{streak && streak>= 1 ? <Checked /> : <UnCheckBox />}</StreakIcon>
  </StreakDay>
</StreakDayWrap>
<StreakDayWrap>
  <StreakDay>
    <P>sun</P>
    <StreakIcon>{streak && streak >= 2 ? <Checked /> : <UnCheckBox />}</StreakIcon>
  </StreakDay>
</StreakDayWrap>
<StreakDayWrap>
  <StreakDay>
    <P>mon</P>
    <StreakIcon>{streak && streak >= 3 ? <Checked /> : <UnCheckBox />}</StreakIcon>
  </StreakDay>
</StreakDayWrap>
<StreakDayWrap>
  <StreakDay>
    <P>tue</P>
    <StreakIcon>{streak && streak >= 4 ? <Checked /> : <UnCheckBox />}</StreakIcon>
  </StreakDay>
</StreakDayWrap>
<StreakDayWrap>
  <StreakDay>
    <P>wed</P>
    <StreakIcon>{ streak && streak >= 5 ? <Checked /> : <UnCheckBox />}</StreakIcon>
  </StreakDay>
</StreakDayWrap>
<StreakDayWrap>
  <StreakDay>
    <P>thu</P>
    <StreakIcon>{ streak && streak >= 6 ? <Checked /> : <UnCheckBox />}</StreakIcon>
  </StreakDay>
</StreakDayWrap>
<StreakDayWrap>
  <StreakDay>
    <P>fri</P>
    <StreakIcon>{ streak && streak >= 7 ? <Checked /> : <UnCheckBox />}</StreakIcon>
  </StreakDay>
</StreakDayWrap>

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

