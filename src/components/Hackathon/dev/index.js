import React from 'react'
import { Banner, TextSub, Container,P, SubHeader, HorizontalSeparator, Arrow, Page } from '../../Global/GlobalComponents'
import { TextWrapper, CourseTitle } from '../../Course/Details/CourseElements'
import { CalendarIcon, ContainerWrapper, HackCardWrapper, HackathonCard } from './CompeteElements'
import { DashboardContainer } from '../../Dashboard/DashboardElements'
import { Badge, Grid } from "@nextui-org/react";
import axios from 'axios'
import { useEffect, useState } from 'react'
import api from '../../../api/api'
import { useLocation } from 'react-router-dom'

 const Compete = () => {

  const [data, setData]= useState('');
  const [id, setId]= useState('');
  function convertDateTimeToDate(datetime) {
    const dateObj = new Date(datetime);
    const date = dateObj.toLocaleDateString();
    return date;
  }

  const location= useLocation();
  const user = location.state;
  
	useEffect(( ) => { 
		 
	 	api.get('/hackathons', data)
		.then(res => {
      setData(res.data.data);
     console.log(res.data.data);
     setId(res.data.data.challengeID);
     })
		.catch(err => console.log(err));
	},[])
 

    let hackathonBanner = "radial-gradient(153.86% 1404.68% at 92.94% -34.87%, #000000 0%, #E7F58D 0.01%, #6FE9BB 21.7%, #2F80FF 100%)"
  return (
    < >
       <Banner color={hackathonBanner}>
        <TextWrapper style={{marginRight:'100px'}}>
      
            <CourseTitle  color={"white"} title={'Compete'}/>
            <TextSub style={{color:"white", margin: 0}}>Join hackathons to compete against other teams, build your
knowledge and gain experience. </TextSub>
         </TextWrapper>
         <img style={{margin:'40px'}} src='../images/trophy.png'/>
       </Banner>
       <Container>
        <ContainerWrapper>
        <SubHeader>Hackathons</SubHeader>
        <HorizontalSeparator/>
        <div style={{display:'flex', justifyContent:'space-between', width:'100%', margin:'auto',padding: "15px"}}>
          
          <P>Sort by: </P>
        </div>
        <HackCardWrapper>
         
        {data && data.map((hackathon, index)=>( 
          <>   <HackathonCard key={index}  to={`/Compete/hackathon/${hackathon.challenge}`} state={user}>
             <h1>{hackathon.name}</h1> 
          <Grid>
          <Badge variant="bordered" color={
                  hackathon.status === "open"
                    ? "success"
                    : hackathon.status === "closed"
                    ? "error"
                    : hackathon.status === "upcoming"
                    ? "warning"
                    : ""
                }>{hackathon.status}</Badge>
        </Grid> 
        <P> { hackathon.description <= 160
                ? hackathon.description
                : `${hackathon.description.slice(0, 160)}...`  
              }</P>
        <div style={{display:'flex', justifyContent:"space-between", alignItems:"center"}}>
        <P >    <CalendarIcon />     Ends: {convertDateTimeToDate(hackathon.endDate)}/</P>
        <Arrow style={{width:'30px', height: '30Px' }}/></div>
        </HackathonCard> </>)
           )

       

     }



 
       </HackCardWrapper>
       <Page/>
        </ContainerWrapper>
       </Container>
    </ >
  )
}
 

export default Compete;