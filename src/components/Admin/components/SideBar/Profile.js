import React from 'react'
import styled from 'styled-components'
import Image from '../../assets/images/profilelg.jpg'



const Container = styled.div`
    margin-top: 4rem;
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
        <Container>
           <h1 style={{color: 'white '}}>botsCompete</h1>
        </Container>
    )
}

export default Profile
