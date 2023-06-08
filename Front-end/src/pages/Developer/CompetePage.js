import React from 'react'
import Compete from '../../components/Hackathon/dev'
import { NavBarDev2 } from '../../components/NavBar/index-3'
import Footer from '../../components/Footer'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import { UserProvider } from '../../hooks/userContext';
import { NotificationMantine } from '../../components/Global/Notification'
import { Snackbar, Alert, Button } from '@mui/material';
const CompetePage = () => {
 
  const [data, setData]= useState('');
  const [id, setId] = useState(2);

  
	useEffect(( ) => { 
		 
	 	axios.get('http://localhost:3000/user/91', data)
		.then(res => {
      if(res.data.status="success"){

      setData(res.data.data[0])
      }
     })
		.catch(err => console.log(err));
	},[])
  return ( <>
       <NavBarDev2  data={data}/>
       <Compete/>
         <Footer/> 
     </>
  )
}

export default CompetePage
