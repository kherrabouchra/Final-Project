import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  
  width: 20%;
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
  font-weight: 20;
  color: gray;
  padding: 0.9rem;
  &:hover { 
    color : black;
    background-color:  red;
    border-radius: 30px 0 0 30px;
 
    width: 10%;
  transition: 0.2s all ease-in-out;
   
    height: 50px;}
`;

const MenuLink = ({ to, title, onClick, active }) => {
  return (
    <Container onClick={onClick} active={active}>
      <Title>{title}</Title>
    </Container>
  );
};

export default MenuLink;