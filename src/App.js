import './App.css';
import React , {useState,useEffect}from 'react'
import {Route,Routes} from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import {Landing} from './pages/LandingPage';
import ViewCourse from './pages/Developer/ViewCourse';
import Error404 from './pages/Error404';
import { NavBar } from './components/NavBar';
import Login from './pages/Login';
import SpringModal from './components/Signup/SignupModal';
import { useLocation } from 'react-router-dom';
import LearnPage from './pages/Developer/LearnPage';
import DashboardPage from './pages/Dashboard';
import CompetePage from './pages/Developer/CompetePage';
import JobsPage from './pages/Developer/JobsPage';
import ForgotPassword from './pages/ForgotPassword';
import Signup from './components/Signup';
import { AnimatePresence } from 'framer-motion';
import Schedule from './components/Schedule/index'; 
import InstructorDashPage from './pages/Instructor/InstructorDashPage';
import HackathonManagementPage from './pages/Instructor/HackathonManagementPage';
import Createhackathon from './pages/Instructor/Createhackathon';
import ManageAccountPage from './pages/ManageAccountPage';
import HackathonDetails from './pages/Developer/HackathonDetails';
import EnrollCourse from './pages/Developer/EnrollCourse'; 
import AdminDashboard from './pages/Administrator/AdminDashboard';
import AdminSettings from './pages/Administrator/AdminSettings'
import Leaderboard from './components/Admin/containers/LeaderBoard';
import AdminUserManage from './pages/Administrator/AdminUserManagement';
import DevDahboard from './pages/Developer/DevDahboard';
import Dashboard from './components/Dashboard'; 
import { Outlet } from "react-router-dom"; 
import CreateAccount from './pages/Administrator/CreateAccount';
import AdminCourseManage from './pages/Administrator/AdminCourseManage';
import AdminClaims from './pages/Administrator/AdminClaims';
import ClaimDetails from './pages/Administrator/AdminViewClaim';
import CreateCourse from "./pages/CreateCourse";
import CreateCourseContent from './pages/CreateCourseContent';
// import UpdateCoursePage from './pages/UpdateCoursePage';
// import ParticipateCourse from "./pages/PrtcptCourse";
import AdminCreatePath from './pages/Administrator/AdminCreatePath';
import DevClaims from './components/Claims/devclaims';
// import CourseManagement from "./pages/CourseManagement";
import UpdateCoursePage from './pages/Instructor/UpdateCoursePage';
import CourseManagamentPage from './pages/CourseManagement';
import PrtcptCourse from './pages/PrtcptCourse';
 import { useNavigate } from 'react-router-dom';
import api from './api/api';
import axios, { Axios } from 'axios';
import { Loading, Grid } from "@nextui-org/react"; 
import LeaderboardPage from './pages/Developer/LeaderboardPage';
import HackathonLobby from './pages/Developer/HackathonLobby';

function App( ) {
  const [loginStatus, setLoginStatus]=useState('')
  api.defaults.withCredentials = true;
  const navigate = useNavigate();
  const location = useLocation(); 
  const [isOpen, setOpen] = useState(false);
  const toggle =( )=>{

    setOpen(!isOpen);
  };

  const [user, setUser] = useState('');
  
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/login');
        setLoginStatus(res.data);
        setUser(res.data.user);
        setLoading(false)
      } catch (error) {
        console.error('Error fetching login status:', error);
        setLoading(false)
      
      }
    };

    fetchData();
  }, []);



  useEffect(() => {
    if (!loginStatus.loggedIn) {
      navigate('');
    }
  }, [loginStatus]);

 
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const checkUserToken = () => {
  //     const userToken = localStorage.getItem('user-token');
  //     if (!userToken || userToken === 'undefined') {
  //         setIsLoggedIn(false);
  //     }
  //     setIsLoggedIn(true);
  // }
  // useEffect(() => {
  //     checkUserToken();
  // }, [isLoggedIn]);
  const background = location.state && location.state.background; 
 
   
  console.log(loginStatus);

 
if (loading) {
  return (
    <Grid>
      <div style={{ margin: '25% 50%' }}>
        <Loading color="primary" textColor="black">
          {/* Content of the loading spinner */}
        </Loading>
      </div>
    </Grid>
  );
}



  return (
 <> 
  <AnimatePresence>
 
  <Routes location={background || location} key={location.pathname}>

    {loginStatus.loggedIn  ?(
      <>
        <Route path="/Learn" element={<LearnPage />} />
        <Route path="/Learn/:type/:id" element={<ViewCourse />} />
        <Route path="/Compete" element={<CompetePage />} />
        <Route path="/Jobs" element={<JobsPage />} />
        <Route path="/dashboard" element={<DevDahboard />} />
        <Route path="/instructor/:id" element={<InstructorDashPage />} />
        <Route path="/instdash/courses" element={<CourseManagamentPage />} />
        <Route path="/instdash/courses/new/:id" element={<CreateCourseContent />} />
        <Route path="/instdash/courses/update/:id" element={<UpdateCoursePage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/Schedule" element={<Schedule />} />
        <Route path="/account" element={<ManageAccountPage />} />
        <Route path="/hackathons" element={<HackathonManagementPage />} />
        <Route path="/hackathons/new" element={<Createhackathon />} />
        <Route path="/courses/new" element={<CreateCourse />} />
        <Route path="/dashboard/courses/lesson/:id" element={<PrtcptCourse user={loginStatus.user} log={loginStatus.loggedIn}/>} />
        <Route path='/dashboard/hackathon-lobby/:id' element={<HackathonLobby />} />
        <Route path="/Compete/hackathon/:id" element={<HackathonDetails />} />
        <Route path="/Course-management" element={<AdminCourseManage />} />
        <Route path="/Course-management/learning_path" element={<AdminCreatePath />} />
        <Route path="/Claims" element={<AdminClaims />} />
        <Route path="/Claims/:id" element={<ClaimDetails />} />
        <Route path="/Claims/new" element={<DevClaims />} />
        <Route path="/LeaderBoard" element={<LeaderboardPage />} />
        <Route path="/User-management" element={<AdminUserManage />} />
        <Route path="/User-management/Create-Account" element={<CreateAccount />} />
        <Route path="/DashboardRedirect" element={<DashboardPage user={loginStatus.user} log={loginStatus.loggedIn}/>} />
        <Route exact path="/" element={<DashboardPage user={loginStatus.user} log={loginStatus.loggedIn} />} />
        
        </>
    )  : (<>

        <Route path="/DashboardRedirect" element={<DashboardPage user={loginStatus.user} />} />
        <Route exact path="" element={<Landing />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Forgot_Password" element={<ForgotPassword />} />

     </>
    )
    } 
        <Route path="*" element={<Error404 />} />
 </Routes>
    {background && (
      <Routes>
        <Route path="/Signup" element={<Signup />} />
      </Routes>
    )}
  </AnimatePresence>
</>
  );
}

export default App;
 