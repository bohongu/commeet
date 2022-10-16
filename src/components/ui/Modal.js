import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 20;
  background-color: rgba(0, 0, 0, 0.75);
`;

const ModalBackdrop = (props) => {
  return <Backdrop />;
};

const ModalOverlay = (props) => {
  return <div>{props.children}</div>;
};

const portal = document.getElementById('modal');

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop />, portal)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portal,
      )}
    </>
  );
};

export default Modal;
