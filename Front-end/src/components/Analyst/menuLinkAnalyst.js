import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  
  width: 16%;
  height: 50px; 
  cursor: pointer;
  padding-left: 1rem;

  display: flex;
  flex-direction: row;
  align-items: center;
  transition: 1s all ease-in-out;
 
  
`;

const Title = styled.h1`
  font-size: 0.9rem;
  font-weight: 20;
  color: gray;
  padding: 0.9rem 3rem;
  margin-left:-36px;
  transition: 1s all ease-in-out;
  &:hover { 
    color : black;
    background-color:  #F989F5;
    border-radius:  0 30px 30px 0;
 
    width: 100%;
  transition: 1s all ease-in-out;
   
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