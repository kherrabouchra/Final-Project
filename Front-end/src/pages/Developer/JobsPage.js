import React from 'react'
import { NavBarDev2 } from '../../components/NavBar/index-3'
import Jobs from '../../components/Job'
import Footer from '../../components/Footer'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import { duration } from '@mui/material'
import { UserProvider } from '../../hooks/userContext'
const JobsPage = () => {

  const [data, setData]= useState('');
  const [id, setId] = useState(2);

  
	useEffect(( ) => { 
		 
	 	axios.get('http://localhost:3000/user/', data)
		.then(res => {
      setData(res.data.data[0])
     console.log(res.data.data[0]);
    })
		.catch(err => console.log(err));
	},[])
  return (
    

<UserProvider> <NavBarDev2  data={data}/> 
       <Jobs/>
       <Footer/>  </UserProvider>
  )
}

export default JobsPage

// import React from 'react'
// import { NavBarDev2 } from '../../components/NavBar/index-3'
// import Jobs from '../../components/Job'
// import Footer from '../../components/Footer'
// import { useState, useEffect } from 'react'
// import axios from 'axios'
// import { motion } from 'framer-motion'
// import { duration } from '@mui/material'
// import { UserProvider } from '../../hooks/userContext'
// const JobsPage = () => {

//   const [data, setData]= useState('');
//   const [id, setId] = useState(2);

  
// 	useEffect(( ) => { 
		 
// 	 	axios.get('http://localhost:3000/user/1', data)
// 		.then(res => {
//       setData(res.data.data[0])
//      console.log(res.data.data[0]);
//     })
// 		.catch(err => console.log(err));
// 	},[])
//   return (
    

// <UserProvider> <NavBarDev2  data={data}/> 
//        <Jobs/>
//        <Footer/>  </UserProvider>
//   )
// }

// export default JobsPage
