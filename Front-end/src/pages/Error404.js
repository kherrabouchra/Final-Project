import React from 'react'
import { Btn } from '../components/Global/GlobalComponents'
import { NavLink } from 'react-router-dom'
const Error404 = () => {
  return (
    <div className='Error-container' >
    <div className='Error'>
      <div>
      <h1>Error 404</h1>
      <h2>Page not found.</h2></div>
      <Btn style={{background:"#3986FF",color:'white', padding:'15px', width:'80%' }} to="/">Go to home page </Btn>
    </div> 
    <img  className='Error-img' alt="Error404" src="../images/error.jpg"/>
    
    </div>
  )
}

export default Error404
