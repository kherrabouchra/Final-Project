import React from 'react'
import NavBarInst from '../../components/NavBar/instructorNavbar'
import InstructorDash from '../../components/Dashboard/InstructorDashboard'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../api/api'
import { useState, useEffect } from 'react'
 import { useLocation } from 'react-router-dom'
import { useCookies } from 'react-cookie';

// Inside your functional component
const InstructorDashPage = () => {
  const [cookies] = useCookies(['token']);
  const token = cookies.token;
  const navigate= useNavigate();
  const {id}=useParams();
  console.log(id);
  const [data, setData]= useState(''); 
  const location = useLocation();
  const [user, setUser]= useState('')
      useEffect(() => {
        if (location.state) {
          setUser(location.state.user);  
        
        }
      }, [location.state]);
  useEffect(() => {
    api.get(`/instructor/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
  }})
      .then(res => {
        setData(prevData => ({ ...prevData, ...res.data.data[0] }));
        console.log(res.data.data[0]);
      })
      .catch(err =>{navigate("/");
       console.log(err)});
   
    api.get(`/instructor/${id}/courses`)
      .then(res => {
        setData(prevData => ({ ...prevData, courseCount: res.data.data }));
      })
      .catch(err => console.log(err));
  
    api.get(`/instructor/${id}/hackathons`)
      .then(res => {
        console.log(res.data.data);
        setData(prevData => ({ ...prevData, hackCount: res.data.data }));
      })
      .catch(err => console.log(err));
  }, []);
  console.log(data, location);
	 
  return (
    <>
    <NavBarInst data={data}/>
    <InstructorDash   data={data}/>
    </>
  )
}

export default InstructorDashPage
