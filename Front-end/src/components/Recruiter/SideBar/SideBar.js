import React from 'react'
import styled from 'styled-components'
import Profile from './Profile'
import Menu from './Menu/Menu'
// import ToggleSwitch from './ToggleSwitch'

const Container = styled.div`
  background-color: rgb(21 21 21);
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: 14rem;
    display: flex;
    flex-direction: column;
    align-items: center;

`

const SideBarRec = () => {
  return (
    <Container>
      <Profile/>
      <Menu/>
     
    </Container>
  )
}

export default SideBarRec
