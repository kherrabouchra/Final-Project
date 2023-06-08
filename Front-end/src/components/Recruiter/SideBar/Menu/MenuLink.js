import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Container = styled.div`
  
  width: 100%;
  height: 50px; 
  cursor: pointer;
  padding-left: 1rem;

  display: flex;
  flex-direction: row;
  align-items: center;
  transition: 0.2s all ease-in-out;
 
`;

const Title = styled.h1`
  font-size: 0.9rem;
  font-weight: 400;
  color: white;
  padding: 0.9rem;
  &:hover { 
    color : black;
    background-color:  white;
    border-radius: 30px 0 0 30px;
 
    width: 100%;
  transition: 0.2s all ease-in-out;
   
    height: 50px;}
`;
 


const MenuLink = ({ title, active, to , state}) => {
  return (
    <Link to={to} state={state} >
      <Container a={active}>
        <Title a={active}>{title}</Title>
      </Container>
    </Link>
  );
};

export default MenuLink;

 