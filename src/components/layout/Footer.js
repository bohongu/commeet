import React from 'react';
import styled from 'styled-components';
import { lighten } from 'polished';

const Footer = () => {
  return (
    <FooterWrapper>&copy;{new Date().getFullYear()} Commeet</FooterWrapper>
  );
};

export default Footer;

const FooterWrapper = styled.footer`
  position: fixed;
  height: 5rem;
  padding: 10px 0;
  width: 100%;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${lighten(0.7, 'black')};
  background: ${(props) => props.theme.bgColor};
`;
