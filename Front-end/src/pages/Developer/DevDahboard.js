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

  useEffect(() => {
    if (location.state) {
      setId(location.state.id);
    }
  }, [location.state]);

   
	useEffect(( ) => {   
	 	api.get(`/user/${id}`) 
  
		.then(res => {
      setData(res.data.data[0]);
    }
    )
		.catch(err => console.log(err));
	},[ id]

  )
  return (
    <div>
   <NavBarDev data={data} />
    
    <Dashboard data={data}/>
    <Footer/>   
    </div>
  )
}

export default DevDahboard
