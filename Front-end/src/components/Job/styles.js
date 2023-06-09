import { Link } from "react-router-dom";
import styled from "styled-components";

export const JobsList = styled.ul`
    list-style: none;
    width: 86%;
    margin:  auto;
`

export const JobElement = styled.li`
    border-radius: 15px;
    padding: 1.5rem;
    margin: 2rem;
    
`
export const JobTitle = styled.h1`
    font-size: 2rem;
    

`
export const JobDetails1 = styled.div`
    display:flex;
    font-size:32 px;
`
export const Paragraph = styled.p`
       margin: 1rem;
       color: gray;
       
`
export const JobDetails2 = styled.div`


`
export const JobsContainer = styled.div`
        display:flex;
        justify-content: space-between;

`
export const Jobsalary = styled.p`
        font-size: 1.3rem;
        font-weight: bold;
        margin: 0 auto;
        text-align: center;

`
export const JobState = styled.p`
         font-size: 1rem;
        font-weight: bold;
        margin: 9px auto;
        text-align: center;

`

export const WhiteLink = styled(Link)`
    color: white;
`