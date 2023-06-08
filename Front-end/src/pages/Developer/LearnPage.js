import React from 'react'
import { Learn } from '../../components/Course/Courses/index'
import { NavBarDev2 } from '../../components/NavBar/index-3'

import Footer from '../../components/Footer'
import { useState, useEffect  } from 'react'
import axios from 'axios'
import { UserContext, UserProvider } from '../../hooks/userContext';
import { useLocation } from 'react-router-dom'

const LearnPage = () => {

  const location=useLocation()
  console.log(location);
  const [data, setData]= useState('');
  const [id, setId] = useState(''); 
 
  return (
 
         <>
          <NavBarDev2  data={data}/>
      <Learn/>
      <Footer/>
   </>  
  )
}

export default LearnPage
