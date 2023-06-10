import React, { useState, useEffect } from 'react'
import Admindashboard from '../../components/Admin/containers/Dashboard'
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from '../../components/Admin/styles/global';
import { lightTheme, darkTheme } from '../../components/Admin/styles/theme';
import  SideBar from '../../components/Admin/components/SideBar/SideBar'
 import api from '../../api/api';
import Nav  from '../../components/Admin/components/Nav'; 
import Claims from '../../components/Admin/containers/Claims';
import { DashboardContainer } from '../../components/Dashboard/DashboardElements';
import { BlackBtn, GoBack, P, SubHeader } from '../../components/Global/GlobalComponents';
import { Link, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { Parag } from '../../components/Hackathon/dev/Details/HackathonDetails';
import { Input, Textarea } from '@nextui-org/react';
const ClaimDetails= () => {
    const {id}= useParams();
   const [claim, setClaims]= useState('');
     const [reply, setReply]= useState('');
     const [input , setInput]= useState('');
     const [success, setSuccess]= useState('');
	useEffect(( ) => { 
		 setReply('');
        api.get(`/claims/${id}`)
       .then(res => {
     setClaims(res.data.data) ;
   })
       .catch(err => console.log(err));

        

   },[]) 
 const handleReply=()=>{
    api.post(`/claims/reply/${claim.claimID}`, reply)
    .then(
        (res)=>{
            if(res.data.status==="success"){
                console.log(res.data.message);
		 setReply('');
         setInput('');
        setSuccess(res.data.message);

            }
        }
    ).catch((err)=>console.log(err))
 }

 
  return (
    <div>
       <ThemeProvider theme={lightTheme}>
      <GlobalStyles />
      <Nav/>
      <SideBar/> 

       <div style={{marginLeft:"25%" , marginTop:"130Px"}}>
        <div style={{margin:" 5% 0 0 18%" , padding:0,left:0,top:0, position:"absolute"}}>
       <Link to="/claims"> <GoBack style={{margin:0}} color={'black'}/> </Link>
</div>
        <SubHeader style={{margin:"50px 0 0 0"}}>Claim overview</SubHeader>
        <p>Sent by user: <Link to={`/profile/${claim.user}`}>  @{claim.username} </Link> </p>
         <P>{dayjs(claim.creationDate).format('DD/MM/YYYY')}</P>
        <div style={{background:"white", borderRadius:"20px", padding:"30px", margin:"30px 50px auto auto", height:"100%"}} className='shadow'>

        <h3>content:</h3>
        <Parag>{claim.content}</Parag>
         {input &&
         
         <Textarea bordered value={reply} onChange={(e)=>setReply(e.target.value)} fullWidth style={{ margin:"20px"}} ></Textarea>
         } {success && <div>
            <h1>{success}</h1>
            </div>}
        <BlackBtn style={{width:"90px", margin : "50px auto auto 10px"}} onClick={!reply ? (()=> setInput(true)) : handleReply }>Reply</BlackBtn>
        
        </div>
       
       {success &&
       <div>
        
        
        
        </div>}

       </div>
      </ThemeProvider>
    </div>
  )
}

export default ClaimDetails
