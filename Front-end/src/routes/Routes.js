import {React, useContext} from 'react'
import AuthApi from '../utils/AuthApi';
import { Route , useLocation, redirect as Redirect} from 'react-router-dom'
import ViewCourse from '../pages/Developer/ViewCourse';
import Error404 from '../pages/Error404';
import Login from '../pages/Login';
import LearnPage from '../pages/Developer/LearnPage';
import DashboardPage from '../pages/Dashboard';
import CompetePage from '../pages/Developer/CompetePage';
import JobsPage from '../pages/Developer/JobsPage';
import ForgotPassword from '../pages/ForgotPassword';
import Signup from '../components/Signup';
import Schedule from '../components/Schedule/index';
import InstructorDashPage from '../pages/Instructor/InstructorDashPage';
import HackathonManagementPage from '../pages/Instructor/HackathonManagementPage';
import Createhackathon from '../pages/Instructor/Createhackathon';
import ManageAccountPage from '../pages/ManageAccountPage';
import HackathonDetails from '../pages/Developer/HackathonDetails';
import EnrollCourse from '../pages/Developer/EnrollCourse'; 
import AdminDashboard from '../pages/Administrator/AdminDashboard';
import Leaderboard from '../components/Admin/containers/LeaderBoard';
import AdminUserManage from '../pages/Administrator/AdminUserManagement';
import DevDahboard from '../pages/Developer/DevDahboard';
import {Landing} from '../pages/LandingPage';  
import CreateAccount from '../pages/Administrator/CreateAccount';
import AdminCourseManage from '../pages/Administrator/AdminCourseManage';
import AdminClaims from '../pages/Administrator/AdminClaims';
import ClaimDetails from '../pages/Administrator/AdminViewClaim';

const RouteRegisteration = ({ auth, component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={(props) =>
          !auth ? <Component {...props} /> : <Redirect to="/DashboardRedirect" />
        }
      />
    );
  };
  
  const RouteProtected = ({ auth, component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={(props) =>
          auth ? <Component {...props} /> : <Redirect to="/login" />
        }
      />
    );
  }; 


export const Routes = () => {

    const authApi = useContext(AuthApi);
  const location = useLocation(); 
  // const [isOpen, setOpen] = useState(false);
  // const toggle =( )=>{

  //   setOpen(!isOpen);
  // };

  
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
   
  return (
    <div>
           <Routes  location={background || location} key={location.pathname}>
      
      <Route exact path="/" element={  <Landing  />}>
      
      <RouteRegisteration path="/Signup" element ={<Signup/>}   auth={authApi.auth}/>
     </Route>
     <RouteRegisteration   path="/Login" element={ <Login/>   }    auth={authApi.auth}/>
     <Route path='/Forgot_Password' element = {<ForgotPassword/>} ></Route>

      <Route    path="/Learn" element={ <LearnPage/>   }/>     
      <Route path="/Learn/:type/:id" element={<ViewCourse  />} />
      <Route    path="/Compete" element={ <CompetePage/>   }/>
      <Route    path="/Jobs" element={ <JobsPage/>   }/>

      <Route path="/DashboardRedirect" element={<DashboardPage/>}  />
      
       <RouteProtected path="/Dashboard" element={<DevDahboard/>}    auth={authApi.auth}  />
      <Route path="/instructor/:id" element={<InstructorDashPage/>}/> 
      <Route  path="/admin" element={<AdminDashboard />} /> 
      <Route    path="/Schedule" element={ <Schedule/>   }/>
      <Route path="account" element={<ManageAccountPage/>}/>
      <Route path="/hackathons" element= {<HackathonManagementPage/>}/>
      <Route path='/hackathons/new' element={<Createhackathon/>}/>
      <Route path="/Compete/hackathon/:id" element= {<HackathonDetails/>}/>
          <Route path="/Dashboard/courses/:id" element={<EnrollCourse />}></Route>
          <Route  path="/Course-management" element={<AdminCourseManage/>} />
      
            <Route  path="/User-management" element={<AdminUserManage />} />
            <Route  path="/Claims" element={<AdminClaims/>} />
            <Route  path="/Claims/:id" element={<ClaimDetails/>} />

            <Route  path="/LeaderBoard" element={<Leaderboard/>} />
            <Route  path="/User-management/Create-Account" element={<CreateAccount/>} />

      <Route   path="*" element={ <Error404/>   }> </Route> 

     </Routes>

     <Routes>
     {background && (   
         <Route path="/Signup" element ={<Signup/>}/>)}</Routes> 
    </div>
  )
} 