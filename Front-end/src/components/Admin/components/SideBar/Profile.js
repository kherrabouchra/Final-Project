import React from 'react'
import styled from 'styled-components'
import Image from '../../assets/images/profilelg.jpg'



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
        <img style={{width:'4rem'}} src='../images/logo.png'/>
     </Container>
    )
}

export default Profile
