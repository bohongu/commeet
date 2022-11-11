import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NotFound = () => {
  return (
    <>
      <FourOFour>404 Not Found</FourOFour>
    </>
  );
};

export default NotFound;

const FourOFour = styled.div`
  text-align: center;
  font-size: 1.5rem;
`;
