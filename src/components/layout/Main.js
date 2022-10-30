import React from 'react';
import styled from 'styled-components';

const Main = ({ children }) => {
  return <MainWrapper>{children}</MainWrapper>;
};

export default Main;

const MainWrapper = styled.main`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.bgColor};
`;
