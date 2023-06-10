import React from 'react'
import { Banner, TextSub, Container, SubHeader, HorizontalSeparator, Header, PurpleBtn } from '../Global/GlobalComponents'
import { TextWrapper, CourseTitle } from '../Course/Details/CourseElements'
import { JobCard, RecJobCard } from './JobsElements'
import { JobRow } from './JobsElements'
import { JobDetails1, JobDetails2, JobElement, JobState, JobTitle, JobsContainer, JobsList, Jobsalary, Paragraph, WhiteLink } from './styles'
import api from '../../api/api'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';







const Jobs = () => {
  let jobsList = "radial-gradient(228.87% 1055.55% at 100% 0%, #FFC8F8 0%, #C9C8FF 23.44%, #83B3FF 99.99%, #83B3FF 100%) "
  const loc= useLocation()
  const user= loc.state;
  const [jobs, setJobs] = useState([])
  const navigate = useNavigate();
useEffect(()=>{
api.get('/job')
  .then( 
      (res)=>{

        console.log(res.data);
        if (res.data.status === 'success') {
          setJobs(res.data.data)

  console.log(jobs)
      } 
      })
    .catch( (err)=>  console.log(`Error: ${err.message}`));
   
  const handleButtonClick = (id) => {
    navigate(`/jobs/${id}`, {state:user});
  };
}, [])
  

  return (
    < >
      <Banner color={jobsList}>
        <TextWrapper>
          <CourseTitle title={'Jobs board'} color={"black"} />
          <TextSub style={{ color: "black", margin: 0 }}>Explore jobs and apply to find your dream job.</TextSub>
        </TextWrapper>
      </Banner>
      <Container><SubHeader>Explore jobs:</SubHeader>
        <JobsList>
          {jobs.map((job) => (
            <JobElement key={job.jobOfferID} className='shadow'>
              <JobsContainer>
             <div style={{display:'flex', flexDirection:'column'}}><JobTitle>{job.title}</JobTitle>

                <JobDetails1>
                  <Paragraph>company: {job.company}</Paragraph>
                  <Paragraph>City: {job.city}</Paragraph>
                  <Paragraph>Duration: {job.duration}</Paragraph>
                  <Paragraph>{job.onSite}</Paragraph>
                </JobDetails1></div>
                <JobDetails2>
                   {job.state === 'closed' ? (
                    <JobState style={{ color: 'red' }}>{job.state}</JobState>
                  ) : (
                    <JobState style={{ color: '#36E171' }}>{job.state}</JobState>
                  )}<Jobsalary>{job.salary} DA</Jobsalary>
                 
                  <PurpleBtn style={{ width: "100px" }}>
                    <WhiteLink to={`/jobs/${job.jobOfferID}`} state={user}>See details
                    </WhiteLink>
                  </PurpleBtn>
                  {/* <PurpleBtn style={{ width: "100px" }} onClick={handleButtonClick}>
                    See details
                  </PurpleBtn> */}
                </JobDetails2>

              </JobsContainer>
            </JobElement>
          ))}
        </JobsList>

        <HorizontalSeparator />
        <SubHeader style={{ width: "100%" }}>Recommended for you</SubHeader>
        <HorizontalSeparator />
        <JobRow>
          <RecJobCard />
          <RecJobCard />
          <RecJobCard />
          <RecJobCard />

        </JobRow>


      </Container>
    </ >
  )
}

export default Jobs
