import React from "react";
import styled from "styled-components";

import { Banner , Container, GoBack, Header, P, PinkBtn, PurpleBtn, SubHeader, TextSub} from "../../Global/GlobalComponents";
import { CourseTitle, TextWrapper } from '../../Course/Details/CourseElements'
import { NavLink, useParams } from 'react-router-dom'
import  { useEffect, useState } from 'react';
import { RichTextEditor } from '@mantine/rte'; 
import { renderToString } from 'react-dom/server';
import ReactDOMServer from 'react-dom/server';
import { Code } from '@mantine/core';
import { Tabs } from '@mantine/core';
import { IconPhoto, IconMessageCircle, IconSettings } from '@tabler/icons-react';
import api from '../../../api/api';
import { Prism } from '@mantine/prism';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { JobsList } from "../styles";

const Title= styled.h1`
font-size: normal;
font-weight:600;
padding:20px 30px;
`
const Parag = styled.p`
padding:20px 30px;


`
const JobsDetails = () => {
    const { id } = useParams();
    const [jobDetails, setJobDetails] = useState(null);
  
    useEffect(() => {
      const fetchJobDetails = async () => {
        try {
          const jobDetails = await api.get(`/jobs/${id}`);
          console.log(jobDetails);
          if (jobDetails.data.status === 'success') {
            setJobDetails(jobDetails.data.data);
            console.log(jobDetails);
          }
        } catch (err) {
          console.error('Error fetching job details:', err);
        }
      };
  
      fetchJobDetails();
    }, [id]);
    
  
    if (!jobDetails) {
      return <div>Loading...</div>;
    }
    return (
        <>
      
      <Banner color={JobsList}>
       <NavLink to="/jobs/:id"><GoBack color={'white'}/></NavLink> 
<TextWrapper style={{flex:1}} >      
 
    <CourseTitle color={'white'} title={jobDetails.title}/>
    <TextSub style={{color: 'white', margin:0}}>Welcome To My Job Offer </TextSub>
</TextWrapper>  <PurpleBtn style={{alignSelf:"center"}}>Aplly</PurpleBtn>
      </Banner>



    <Container>
      <div style={{display:"flex",padding:"40px"}}>

    <div style={{padding:"30px", width:"80%"}}>
    <Tabs color="grape" radius="md" orientation="vertical" defaultValue="overview">
      <Tabs.List>
        <Tabs.Tab value="overview"  >Description</Tabs.Tab>
        <Tabs.Tab value="questions" >Terms and condition</Tabs.Tab>
        <Tabs.Tab value="howto" >Additionale information</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="overview" pl="lg">
          <div style={{display:'flex', flexDirection:"column", lineHeight:"1.8rem",  justifyContent:"space-around"}}>
          <Title>Description</Title>
          <Parag>{jobDetails.Description}</Parag>
        </div>
      </Tabs.Panel>

      <Tabs.Panel value="questions" pl="lg">
      
      </Tabs.Panel>
{/* 
      <Tabs.Panel value="howto" pl="lg">
       <div style={{padding:"0 30px", lineHeight:"2rem",}}> 
    <SubHeader style={{margin:0}}>Participation</SubHeader>
<ul style={{listStyle:"numbers"}}>
  <li>Get familiar with the problem on the Problem Description and About page.</li>
  <li>Click the "Register" button on the banner to enroll in the competition.</li>
  <li>Download the data from the Data.</li>
  <li>Create and train your own model.</li>
  <li>
Use your model to generate predictions that match the submission format. Click “Submit” in the sidebar, and then “Make new submission”. You’re in!
  </li>
  <li>
Bonus: share your work! Click the "+" icon on the Submissions page and add a link to your approach.

  </li>

</ul>
       </div>
      </Tabs.Panel> */}
    </Tabs>
    </div>
    <div style={{display:"flex", flex:1,flexDirection:'column' , alignItems:'center', width:"100%"}}>
     
     
  
      <div  className='shadow' style={{background:"#fafafa",borderRadius:"25px", height:'300px', padding:"20px",width:"100%", margin: "20px auto ",lineHeight:"3rem"}}>
        <div style={{margin:'auto'}}>
        <p>Creation Date::{jobDetails.onSite} </p>
        <p>OnSite:{jobDetails.onSite}</p>
        <p>Salary:{jobDetails.salary}</p>
        <p>Duration:{jobDetails.duration}</p>
        <p>Experiense:{jobDetails.Experiense}</p>
        <p>State:{jobDetails.state}</p>
        </div>
      </div>
    </div>
    </div>
    </Container>

  
            </>
    )
}

export default JobsDetails;