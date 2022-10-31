import React from 'react';
import styled from 'styled-components';

const Main = ({ children }) => {
  return <MainWrapper>{children}</MainWrapper>;
};

export default Main;

const MainWrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.5rem;
`;
