import React, { useEffect, useState } from 'react';
import MenuLink from './MenuLink';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../../../../api/api';

const Container = styled.div`
  margin-top: 2rem;
  width: 100%;
`;

const Menu = () => {
  const [activeItem, setActiveItem] = useState('Dashboard');
  const navigate = useNavigate();

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  api.defaults.withCredentials= true;
  const handleLogout=()=>{

    console.log('logged out!');

    api.get(`/logout`)
    .then(res=>{ 
      console.log('logged out!');
      window.location.reload();
      navigate('');
         
   } )
   .catch(err => console.log(err));
  } 

  return (
    <Container>
      <MenuLink
        to="/admin"
        title="Dashboard"
        onClick={() => handleItemClick('1')}
        active={activeItem === '1'}
      />

      <MenuLink
        to="/User-management"
        onClick={() => handleItemClick('2')}
        title="User management"
        active={activeItem === '2'}
      />

      <MenuLink
        to="/Course-management"
        onClick={() => handleItemClick('3')}
        title="Course management"
        active={activeItem === '3'}
      />

      <MenuLink
        to="/schedule"
        onClick={() => handleItemClick('4')}
        title="Schedule"
        active={activeItem === '4'}
      />

      <MenuLink
        to="/claims"
        onClick={() => handleItemClick('5')}
        title="Claims"
        active={activeItem === '5'}
      />

        <button style={{background:"none",border:'none', width:"100%", margin:0,  }}
        onClick={() =>  handleLogout()}>
      <MenuLink
        title="Logout"
        active={activeItem === 'Logout'}
      >

      </MenuLink>
      
      </button>
    </Container>
  );
};

export default Menu;
