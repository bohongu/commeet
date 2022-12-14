import { modalActions } from 'components/store/modal';
import React from 'react';
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';

const Backdrop = () => {
  const dispatch = useDispatch();
  const onCloseModal = () => {
    dispatch(modalActions.setCloseModal());
  };
  return <BackdropStyled onClick={onCloseModal} />;
};

const ModalOverlay = ({ children, update }) => {
  return <ModalWrapper update={update}>{children}</ModalWrapper>;
};

const portalElement = document.getElementById('modal');

const Modal = ({ children, update }) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay update={update}>{children}</ModalOverlay>,
        portalElement,
      )}
    </>
  );
};

export default Modal;

const BackdropStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 20;
  background-color: rgba(0, 0, 0, 0.75);
`;

const ModalWrapper = styled.div`
  position: fixed;
  top: 3rem;
  width: 35rem;
  background-color: ${(props) => props.theme.pointBgColor};
  padding: 1rem;
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  z-index: 30;
  animation: slide-down 300ms ease-out forwards;
  ${(props) =>
    props.update &&
    css`
      width: 20rem;
    `}

  @keyframes slide-down {
    from {
      opacity: 0;
      transform: translateY(-3rem);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
