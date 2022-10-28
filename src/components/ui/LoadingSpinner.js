import React from 'react';
import styled from 'styled-components';

const LoadingSpinner = () => {
  return (
    <LoadingSpinnerWrapper>
      <div></div>
      <div></div>
    </LoadingSpinnerWrapper>
  );
};

export default LoadingSpinner;

const LoadingSpinnerWrapper = styled.div`
  width: 80px;
  height: 80px;

  position: relative;
  margin: 100px auto;

  & div {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: pink;
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;
    animation: sk-bounce 2s infinite ease-in-out;
  }

  & div:last-child {
    animation-delay: -1s;
  }

  @keyframes sk-bounce {
    0%,
    100% {
      transform: scale(0);
      -webkit-transform: scale(0);
    }
    50% {
      transform: scale(1);
      -webkit-transform: scale(1);
    }
  }
`;
