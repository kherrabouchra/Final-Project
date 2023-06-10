import React from "react";
import styled from "styled-components";

import { Banner , BlackBtn, Container, GoBack, Header, P, PinkBtn, PurpleBtn, SubHeader, TextSub} from "../../Global/GlobalComponents";
import { CourseTitle, TextWrapper } from '../../Course/Details/CourseElements'
import { NavLink, useLocation, useParams } from 'react-router-dom'
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
import dayjs from 'dayjs'
const Title= styled.h1`
font-size: normal;
font-weight:600;
padding:20px 30px;
`
const Parag = styled.p`
padding:20px ;


`
const JobsDetails = () => {
    const { id } = useParams();
    const [jobDetails, setJobDetails] = useState(null);
    const loc=useLocation();
    const user=loc.state;
    useEffect(() => {
      
  
   
      api.get(`/job/get/${id}`)
      .then((res)=>{

        if(res.data.status==="success"){
         setJobDetails(res.data.data) 
        }
      }).catch((e)=>console.log(e))
 
    }, [id]);
    
    console.log(jobDetails);
   

    function formatNumberToK(number) {
      if (number >= 1000) {
        const suffixes = ['', 'K', 'M', 'B', 'T'];
        const suffixIndex = Math.floor(Math.log10(number) / 3);
        const abbreviatedNumber = (number / Math.pow(1000, suffixIndex)).toFixed(0);
        return abbreviatedNumber + suffixes[suffixIndex];
      }
      return number.toString();
    }
    return (
      <>
      {jobDetails &&
        <>
      
      <Banner color={'#7FF2C5'}>
       <NavLink to={`/jobs`}><GoBack color={'white'} to={`/jobs`} state={user}/></NavLink> 
<TextWrapper style={{flex:1}} >      
 
    <CourseTitle color={'white'} title={jobDetails.title}/>
    <TextSub style={{color: 'white', margin:0}}>Company: {jobDetails.company }</TextSub>
</TextWrapper> 
      </Banner>



    <Container>
      <div style={{display:"flex",padding:"50px", marginRight:"30px"}}>

    <div style={{padding:"30px", width:"80%"}}>
  
    <div style={{display:'flex', flexDirection:"column", lineHeight:"1.8rem",  justifyContent:"space-around"}}>
          <Title>Description</Title>
          <Parag>{jobDetails.description}</Parag>
          
          <Title>Terms & Rules</Title>
          <Parag>{jobDetails.terms}</Parag>
         
          {jobDetails.additional_info && <>
           <Title>Additional informations</Title>
           <Parag>{jobDetails.additional_info}</Parag></>
          }
          <div style={{display:'flex', border:'1px solid black', borderRadius:"20px", padding:"20px ", justifyContent:'center'}}>
          <Title>Duration</Title>
          <Parag >{jobDetails.duration}</Parag>
          <Title>Experiense </Title>
          <Parag>{jobDetails.experience}</Parag>
          <Title>Required skills</Title>
          <Parag>{jobDetails.skills}</Parag> 

          </div>
        </div>
    </div>
    <div style={{display:"flex", flex:1,flexDirection:'column' , alignItems:'center', width:"100%"}}>
     
     
     <div>
     <p>Salary:</p>
     <Header style={{width:"100%"}}>{jobDetails.salary>=10000 ? formatNumberToK(jobDetails.salary) : jobDetails.salary} DA</Header>

     </div>
     <BlackBtn style={{ width:"100%"}} to={`/jobs/${id}/challenge`} state={user}>Apply</BlackBtn>

      <div  className='shadow' style={{background:"#fafafa",borderRadius:"25px",
       padding:"30px",width:"300px", margin: "20px auto ",lineHeight:"3rem"}}>
        <div style={{margin:'auto', fontWeight:600}}>
        <p>Publishing Date:  {dayjs(jobDetails.creationDate).format(' DD/MM/YY')} </p>
        <p>State:{jobDetails.state}</p>
        <p>{jobDetails.onSite}</p>
        {jobDetails.onSite=="onsite" &&
        <> <p>Country:{jobDetails.country}</p>
        <p>City:{jobDetails.city}</p></>
        }
       
        </div>
      </div>
    </div>
    </div>
    </Container>

  
            </>}</>
    )
}

export default JobsDetails;