import React from 'react';
import styled from 'styled-components';

const StyledLoadingSpinner = styled.div`
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid teal;
  border-color: teal transparent teal transparent;
  animation: spinner 1.2s linear infinite;

  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoadingSpinner = () => {
  return <StyledLoadingSpinner />;
};

export default LoadingSpinner;
