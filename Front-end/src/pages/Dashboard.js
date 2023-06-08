import React from 'react'
import Dashboard from '../components/Dashboard'
import Footer from '../components/Footer'
import { NavBarDev } from '../components/NavBar/index-2'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom' 
import { UserProvider } from '../hooks/userContext'
import { useContext } from 'react'
import { UserContext } from '../hooks/userContext'
import api from '../api/api'

import { Loading, Grid } from "@nextui-org/react"; 
 
const DashboardPage= ({user, log} ) => {
console.log('this user:', user);
const location = useLocation();
  const [data, setData]= useState(''); 
  const [id, setId] = useState('');  
   const {login, userIdProvider}= useContext(UserContext);
   const [loading, setLoading] = useState(true);

   const navigate = useNavigate()



  useEffect(() => {
    if (location.state) {
      setId(location.state.id.userID);  
    }
  }, [location.state]);

   
   useEffect(()=>{ 
      
     api.get('/dashboard')
     .then(res => {
       if(res.data.Status === "Success") {
        console.log(res.data);
        if(!user){window.location.reload()}
        else{
         if(res.data.role === "developer") {
          
          setTimeout(() => {
          if(!log){navigate('')}
          setLoading(false); 
           navigate('/dashboard',{state:  user})
          }, 2000);
         } 
         if(res.data.role === "admin") {
          if(!log){navigate('')}

          setTimeout(() => {
            
          setLoading(false);
          navigate('/admin',{state: user})
          }, 2000);
        }  
        if(res.data.role === "recruiter") {
          if(!log){navigate('')}

          setTimeout(() => {
            
          setLoading(false);
          navigate('/recdashboard',{state: user})
          }, 2000);
        } 
          if(res.data.role === "instructor") {
            
                  setTimeout(() => {

            setLoading(false);  
           navigate(`/instructor/${user.userID}`,{state: user});
          }, 2000);
      
        }
      

         } 
        
       } else {
        setLoading(false);
         navigate('');
       }
     })  
     .catch(err => {console.log(err);
      setLoading(false);}) 
    

   }, [user, log])


 
  return (    
  <>
    {loading && (
    <Grid>
      <div style={{margin:'25% 50%'}}>
    <Loading color="primary" textColor="black" >

    </Loading></div>
  </Grid>) }

</>
  
  )
}

export default DashboardPage