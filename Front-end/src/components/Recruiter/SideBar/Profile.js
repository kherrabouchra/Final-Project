import React from 'react'
import styled from 'styled-components' 


const Container = styled.div`
    margin-top: 1rem;
`
const ProfileImg = styled.img`
    height: 4rem;
`
const ProfileName = styled.h1`
    font-size: 1rem;
    font-weight: 300;
    margin-left: 10px;
    color: white;
`


const Profile = () => {
    return (
        <Container style={{display:'flex', alignItems:'center'}}>
           <img style={{width:'4rem'}} src='../images/wlogo.png'/><p style={{color: 'white ', fontWeight:800, fontFamily:"Lexend Mega, sans-serif"}}>BOTS<br/>COMPETE</p>
        </Container>
    )
}

export default Profile
