import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Navigation = () => {
  return (
    <NavWrapper>
      <div>
        <Link to="/">Commeet</Link>
      </div>
    </NavWrapper>
  );
};

export default Navigation;

const NavWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 5rem;
  color: ${(props) => props.theme.textColor};
  background: ${(props) => props.theme.bgColor};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10%;
  z-index: 10;
  div {
    font-weight: bold;
    font-size: 3rem;
    color: ${(props) => props.theme.textColor};
    text-align: center;
  }
`;
