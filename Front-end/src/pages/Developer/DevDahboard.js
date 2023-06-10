import {React,useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import api from '../../api/api';
import Dashboard from '../../components/Dashboard'
import Footer from '../../components/Footer';
import { NavBarDev } from '../../components/NavBar/index-2';
const DevDahboard = () => {
    const location = useLocation();
    const [data, setData]= useState(''); 
    const [id, setId] = useState('');   
    const user= location.state;
  
   
	  
  return (
    <div>
   <NavBarDev data={user} />
    
    <Dashboard  />
    <Footer/>   
    </div>
  )
}

export default DevDahboard
