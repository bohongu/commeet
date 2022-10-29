import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterWrapper>&copy;{new Date().getFullYear()} Commeet</FooterWrapper>
  );
};

export default Footer;

const FooterWrapper = styled.footer`
  height: 60px;
  position: fixed;
  padding: 10px 0;
  width: 100%;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
