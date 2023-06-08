import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  background-color: #f7f7f7;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  //position: fixed;
  bottom: 0;        
  width: 100%;
  margin-top: 180px;
`;

const FooterText = styled.p`   
  font-size: 14px;
  margin-bottom: 10px;
`;

const FooterLink = styled.a`
  color: #333;
  font-size: 14px;
  margin: 0 10px;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>
        © {new Date().getFullYear()} BoTsCopm WebSite
      </FooterText>
      <div>
        <FooterLink href="#">About Us</FooterLink>
        <FooterLink href="#">Services</FooterLink>
        <FooterLink href="#">Contact Us</FooterLink>
      </div>
    </FooterContainer>
  );
};

export default Footer;
