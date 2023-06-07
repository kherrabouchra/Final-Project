import React, { useState , useEffect} from 'react' 
import BasicDateCalendar from './SideCalendar'
import Demo from './ScheduleElements'
import Nav from '../Admin/components/Nav'
import SideBar from '../Admin/components/SideBar/SideBar'
import api from '../../api/api'
const Schedule = () => {
  
  
  return (   <div style={{background:'#fafafa'}} >
    <Nav />
    <SideBar/> 
    <Demo />
   </div>
  )
}

export default Schedule