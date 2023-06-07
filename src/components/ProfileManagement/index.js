import React from 'react'
import { Banner,P, BlackBtn, PurpleBtn, SubHeader, TextSub, Header } from '../Global/GlobalComponents'
import { Input } from '@nextui-org/react'
import { useState } from 'react'
import { IconGauge, IconFingerprint, IconActivity, IconChevronRight } from '@tabler/icons-react';
import { Box, NavLink } from '@mantine/core';
import api from '../../api/api';
const nav = [
  { icon: IconGauge, label: 'General', description: 'Update your personal informations' ,
  rightSection: <IconChevronRight size="1rem" stroke={1.5} />,
},
  {
    icon: IconFingerprint,
    label: 'Security', description:'Change your password',
    rightSection: <IconChevronRight size="1rem" stroke={1.5} />,
  },
  { icon: IconActivity, label: 'More',
  rightSection: <IconChevronRight size="1rem" stroke={1.5} />,
},
];
 
const AccountSettings = () => {
  const [active, setActive] = useState(0);
   const [id , setId]= useState('');
   const [error, setError]= useState('');
  const [data, setData]= useState({
    username:'', email:'', country:'', city:'', 
    education:'', workExperience:'', password:'', repeatPassword:''}
  )

  const validatePassword = () => {
    if (data.password !== data.repeatPassword) {
      return 'Password and repeated password do not match.';
    }
    return '';
  };
  const handleDelete = (event) => {
		event.preventDefault();
     
		api.delete(`/user/62`)
		.then(res => {
      if (res.data.Status === 'Success') { 
 

     console.log(res.data.Status);
 }else{
  setError(res.data.Error);

 } })
		.catch(err => console.log(err));
 
}
  const handleSubmit = (event) => {
		event.preventDefault();
    const validationError = validatePassword();
    if (validationError) {
      setError(validationError);
      return;}
    
		api.put(`/user/63`, data)
		.then(res => {
      if (res.data.Status === 'Success') { 

   
      console.log(data);
      setData('');

     console.log(res.data.Status);
 }else{
  setError(res.data.Error);

 } })
		.catch(err => console.log(err));
 
}
  const items = nav.map((item, index) => (
    <NavLink
      key={item.label}
      active={index === active}
      label={item.label} 
      description={item.description}
      rightSection={item.rightSection} 
      onClick={() => setActive(index)}
      color="violet" style={{background:'white' }}
      variant="subtle"
    />
  ));


 
  return ( 
    <div style={{display:'flex',background:'#F8F8F8', height: "100vh", padding:"160px"}}>   
 
    
    <div style={{marginRight:"60px"}}>  
    <SubHeader style={{margin: ' 0' , width:'100%'}}>Account settings</SubHeader>
     
    <Box w={300}>{items}</Box>
    </div>
     <div style={{flex:1, alignSelf:'baseline', marginRight:"60px"}}>
    {active===0 &&
   
<>
      <Input  bordered  fullWidth="true"
                size='lg' 
                label="username"  
                type="text"      value={data.username}
                onChange={(e) => setData({...data, username:e.target.value})}
              />
              <Input  bordered  fullWidth="true"
                size='lg' 
                label="email"  
                type="text"      value={data.email}
                onChange={(e) => setData({...data, email:e.target.value})}
              />
              <Input  bordered  fullWidth="true"
                size='lg' 
                label="country"  
                type="select"      value={data.country}
                onChange={(e) => setData({...data, country:e.target.value})}
              />
              <Input  bordered  fullWidth="true"
                size='lg' 
                label="city"  
                type="text"      value={data.city}
                onChange={(e) => setData({...data, city:e.target.value})}
              />
              <Input  bordered  fullWidth="true"
                size='lg' 
                label="work experience"  
                type="text"      value={data.workExperience}
                onChange={(e) => setData({...data, workExperience:e.target.value})}
              />
    </>}
            {active ===1 &&<>
          <Input  bordered  fullWidth="true"
            size='lg' 
            label="Password"    
            type="password"      value={data.password}
            onChange={(e) => setData({...data, password:e.target.value})}
          /> <Input  bordered  fullWidth="true"
          size='lg' 
          label="Confirm new password"  
          type="password"      value={data.repeatPassword}
          onChange={(e) => setData({...data, repeatPassword:e.target.value})}
        />
       
     </>}
     
     {active===2 && 
     <>
     <div>
     <SubHeader style={{margin:'0'}}  >Delete account?</SubHeader> 
     <P>All your data will be deleted permenetly.</P></div>
     
     </>}
     
     {active!==2 ?  <PurpleBtn onClick={handleSubmit} style={{margin :'40px 0 0 80%', padding:'14px' }}>Save changes</PurpleBtn> :<BlackBtn onClick={handleDelete}  style={{margin :'40px  70% 0 0', padding:'16px' }}>Delete my account</BlackBtn> }
</div></div> 
  )
}

export default AccountSettings
