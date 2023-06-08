import React from 'react'
import { Banner, TextSub, Container, SubHeader, HorizontalSeparator, Header } from '../Global/GlobalComponents'
import { TextWrapper, CourseTitle } from '../Course/Details/CourseElements'
import { JobCard, RecJobCard } from './JobsElements'
import { JobRow } from './JobsElements'
const Jobs = () => {
    let jobsList = "radial-gradient(228.87% 1055.55% at 100% 0%, #FFC8F8 0%, #C9C8FF 23.44%, #83B3FF 99.99%, #83B3FF 100%) "
  return (
    < >
       <Banner color={jobsList}>
        <TextWrapper>
        <CourseTitle title={'Jobs board'} color={"black"}/>
        <TextSub style={{color:"black", margin: 0}}>Explore jobs and apply to find your dream job.</TextSub>
        </TextWrapper>
       </Banner>
       <Container><SubHeader>Explore jobs:</SubHeader>
       <HorizontalSeparator/>
       <SubHeader style={{width:"100%"}}>Recommended for you</SubHeader>
       <HorizontalSeparator/>
       <JobRow>
        <RecJobCard/>
        <RecJobCard/>
        <RecJobCard/>
        <RecJobCard/>

       </JobRow>
       
       
       </Container>
    </ >
  )
}

export default Jobs
