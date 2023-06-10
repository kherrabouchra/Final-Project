import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Navigate } from 'react-router-dom';
import api from '../../api/api';
import MenuLink from './menuLinkAnalyst';


const Container = styled.div`
  margin-top: 2rem;
  width: 100%;
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
