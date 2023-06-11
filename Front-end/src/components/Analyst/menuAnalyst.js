import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Navigate } from 'react-router-dom';
import api from '../../api/api';
import MenuLink from './menuLinkAnalyst';


const Container = styled.div`
 
  
width: 100%;
height: 50px; 
cursor: pointer;
padding-left: 1rem;
 margin-top:3rem;
display: flex;
flex-direction: column;
align-items: flex-start;
transition: 0.2s all ease-in-out;


`;

const MenuAnalyst = () => {
  const [activeItem, setActiveItem] = useState('');

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  const handleLogout = () => {
    api.get('/logout')
      .then((res) => {
        console.log(res.status);
        if (res.data.status === 'success') Navigate('/');
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container>
      <img style={{width:'5rem', height:'5rem',marginLeft:'26px'  }} src='../images/logo2.png'/>
      <MenuLink
        to="/analystDAsh"
        title="Dashboard"
        onClick={() => handleItemClick('1')}
        active={activeItem === '1'}
      />

      <MenuLink
        to="/Leaderboard"
        onClick={() => handleItemClick('2')}
        title="Leaderboard"
        active={activeItem === '2'}
      />

      <MenuLink
        to="/Recomandation"
        onClick={() => handleItemClick('3')}
        title="Recomandation"
        active={activeItem === '3'}
      />

      <MenuLink
        to="/claims"
        onClick={() => handleItemClick('4')}
        title="Claims"
        active={activeItem === '5'}
      />

      <MenuLink
        to="/"
        onClick={handleLogout}
        title="Logout"
        active={activeItem === 'Logout'}
      />
    </Container>
  );
};

export default MenuAnalyst;
