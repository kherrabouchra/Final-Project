import React from 'react'
import Hackathon from '../../components/Hackathon/dev/Details'
import {NavBarDev} from '../../components/NavBar/index-2'
import { useParams } from 'react-router-dom'
import { useState , useEffect} from 'react'
import api from '../../api/api'
import axios from 'axios'

const HackathonDetails = () => {
  const {id} = useParams();
  const [data, setData] = useState('');
	useEffect(( ) => { 
    api.get(`/hackathons/${id}`)
   .then(res => { console.log(res.data);
     setData(res.data  )
   })
   .catch(err => console.log(err));
 },[id])


  return (
    <div>
        <NavBarDev/>
      <Hackathon data={data}/>
    </div>
  )
}

export default HackathonDetails
