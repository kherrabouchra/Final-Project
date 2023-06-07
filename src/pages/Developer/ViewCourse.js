import React from 'react'
import {CourseDetails} from '../../components/Course/Details'
import {NavBarDev2} from '../../components/NavBar/index-3';
import { coursedata } from '../../components/Course/Courses/data';
import Footer from '../../components/Footer';
import { UserProvider } from '../../hooks/userContext';
import { useState, useEffect } from 'react'
import api from '../../api/api';
import { useLocation } from 'react-router-dom';
import { useParams } from "react-router-dom";
import axios from 'axios';



const ViewCourse = ( props ) => {
  const location = useLocation();
console.log(location, " useLocation Hook");

  const color = ( location.state?.colorid); 
 
   
  const { id, type } = useParams();
 
  useEffect(() => {
    window.scrollTo(0,0);
  }, []);

// 	useEffect(( ) => { 
		 
//     axios.get(`http://localhost:3000/user/${id}`, data)
//    .then(res => {
//      setData(res.data.data[0])
//     console.log(res.data.data[0]);
//    })
//    .catch(err => console.log(err));
//  },[])
  return (
  <>  <NavBarDev2 />  
    <CourseDetails    />
  
  <Footer/></>
  )
}

export default ViewCourse
