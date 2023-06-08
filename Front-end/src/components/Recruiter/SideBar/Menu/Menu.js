import React, { useEffect, useState } from 'react';
import MenuLink from './MenuLink';
import styled from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import api from '../../../../api/api';

const Container = styled.div`
  margin-top: 2rem;
  width: 100%;
`;
  
const Menu = () => {
  const [activeItem, setActiveItem] = useState('Dashboard');
  const navigate = useNavigate();
   const loc= useLocation();
   const user= loc.state;


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
 console.log(user);
  return (
    <Container>
      <MenuLink
        to="/recdashboard"
        title="Dashboard" state={user}
        onClick={() => handleItemClick('1')}
        active={activeItem === '1'}
      />

      <MenuLink
        to="/joboffers" state={user}
        onClick={() => handleItemClick('2')}
        title="Job offers"
        active={activeItem === '2'}
      />

      <MenuLink
        to="/Candidates" state={user}
        onClick={() => handleItemClick('3')}
        title="Candidates"
        active={activeItem === '3'}
      />

      <MenuLink
        to="/interviews" state={user}
        onClick={() => handleItemClick('4')}
        title="Interviews"
        active={activeItem === '4'}
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
