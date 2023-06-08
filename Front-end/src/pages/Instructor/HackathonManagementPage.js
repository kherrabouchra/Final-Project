import React from 'react'
import NavBarInst from '../../components/NavBar/instructorNavbar'
import { HackathonTable } from '../../components/Dashboard/InstructorDashboard/InstructorDashboardElements' 
import HackTableList from '../../components/Global/TableElements/HackTable'
import { Banner, BlackBtn, Header, SubHeader, TextSub } from '../../components/Global/GlobalComponents'
import { Link } from 'react-router-dom'
import { TextWrapper } from '../../components/HeroSection/HeroElements'
import { useLocation } from 'react-router-dom'
const HackathonManagementPage = () => {
  const location= useLocation();
  const user= location.state;
  return (
    <div >
      <NavBarInst/>
  

      <div style={{padding:'60px 100px' , display: 'flex', flexDirection:'column', justifyContent:'flex-end'}}>
      <BlackBtn style={{alignSelf:'flex-end', width:'17%',margin:'20px'}}>   
         <Link  style={{ color:'white'}} to='/hackathons/new' state={user}>+ Create a new hackathon</Link></BlackBtn>
      <HackTableList/>
      </div>
    </div> 
  )
}

export default HackathonManagementPage
