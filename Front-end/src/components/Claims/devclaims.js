import React, { useEffect, useState } from 'react'
import { NavBarDev } from '../NavBar/index-2'
import { Input } from '@nextui-org/react'
import { BlackBtn, CheckBox, HorizontalSeparator, P, PinkBtn, SubHeader } from '../Global/GlobalComponents'
import api from '../../api/api'
import dayjs from 'dayjs'
const DevClaims = () => {
    const[claims, setClaims]= useState('')
    const [claim, setClaim]=useState({
        user: 91, 
        content:'',
        creationDate:  dayjs(new Date()).format('YYYY-MM-DD hh:mm:ss')
    });
    const [error, setError]= useState('')
    const [success, setSuccess]= useState('')
    const [ deleted , setDeleted]= useState('')
      useEffect(()=>{
   

    api.get('/claims/user/91')
    .then(
        (res)=>{
            if(res.data.status='success'){
                setClaims(res.data.data)
                console.log(res.data.data);
            }
        }
    ).catch((err)=>console.log(err))
  }, [])


   const handleSubmit =()=>{ 
 if (!claim.content){
       setError('Please fill write your claim message')
        return;
    } 
    else{
    api.post('/claims', claim)
    .then((res)=>
    {
        if(res.data.status="success"){
            console.log(res.data.message);
            setSuccess(true)
            setError('')

        }
    }).catch((err)=>console.log(err))
    }}
    const handleDelete=(id)=>{
    
        api.delete(`/claims/${id}`)
    .then(res => {
      if(res.data.status="success"){ 
       setDeleted(id);
     console.log(res.data.message);}
    })
    .catch(err => console.log(err));
 
 }

  return (
    <div>
        <NavBarDev/>
        <div style={{display:'flex', width:'100%', color:'black', padding:'150px'}}>
           
           
           
        <div style={{flex:1 , display:'flex', flexDirection:'column'}}> 
   {!success ?     <>
                <SubHeader color={'black'} style={{margin:0}} >Do you have a claim? </SubHeader> 
                <Input value={claim.content} onChange={(e)=>setClaim({...claim , content :e.target.value})}  label='your claim :' fullWidth bordered />
                    <div style={{display:'flex'}}><PinkBtn style={{alignSelf:'flex-end', margin:'20px'}} onClick={handleSubmit}>Send</PinkBtn>
                    {error && <div className='errmsg'>{error}</div>}
                  </div> </>
                    : <><SubHeader>Claim successfully sent !</SubHeader> 
                    <CheckBox style={{padding:0}}/> 
                    <BlackBtn onClick={()=>setSuccess(false)} style={{margin:'60px', alignSelf:'center'}}>Send more </BlackBtn></> } </div>
                 
          
          
            <div style={{ width:"40%", margin:'30px'}}>
                <h2>My claims:</h2>
                  <div style={{background:'#fafafa', borderRadius:'20px',}}>
                    <ul style={{listStyle:'none'}}>  
                     
                     
                   { claims &&  claims.map((c) => (
                    <li key={c.claimID} className='lihover' style={{padding:'15px'}}  >
                       <div style={{display:'flex' , alignItems:'center',}}> <h2>{c.content}</h2>  <P>({c.state})</P></div>
                        <P>{dayjs(c.creationDate).format('YYYY-MM-DD hh:mm:ss')}</P>
                    </li>
                    ))}
                       </ul>
                  </div>
            </div>
        </div>
      
    </div> 
  )
}
export default DevClaims
