import { PostHeader } from 'components/commeet/CommeetForm';
import Modal from 'components/ui/Modal';
import React from 'react';
import { BsImage } from 'react-icons/bs';
import { MdOutlineCancel } from 'react-icons/md';
import styled from 'styled-components';

const UpdateImageForm = ({
  file,
  onBack,
  onSubmit,
  onFileClear,
  onImageChange,
}) => {
  return (
    <Modal update>
      <PostHeader>
        <div onClick={onBack}>&larr;</div>
        <h1 style={{ width: '600px' }}>Replace Profile</h1>
        <div></div>
      </PostHeader>
      <Form onSubmit={onSubmit}>
        <ImageSection>
          {file ? (
            <>
              <PreviewNewImage src={file} alt="commeet-pic" />
              <DeleteButton onClick={onFileClear}>
                <MdOutlineCancel />
              </DeleteButton>
            </>
          ) : (
            <UpdatingImage>
              <label htmlFor="update-image">
                <BsImage />
                <div>Attach a new image</div>
              </label>
              <input
                type="file"
                id="update-image"
                onChange={onImageChange}
                required
              />
            </UpdatingImage>
          )}
        </ImageSection>
        <ButtonsSection>
          <button>수정완료</button>
        </ButtonsSection>
      </Form>
    </Modal>
  );
};

export default UpdateImageForm;

const Form = styled.form`
  display: grid;
  grid-template-columns: 2fr 1fr;
  height: 12rem;
  width: 18rem;
`;

const Sections = styled.div``;

const ImageSection = styled(Sections)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: 1px solid black;
`;

const PreviewNewImage = styled.img`
  width: 11rem;
  height: 11rem;
  border-radius: 50%;
`;

const DeleteButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  height: 30px;
  width: 30px;
  border: none;
  background: none;
  color: red;
  font-size: 30px;
  top: -5px;
  right: -5px;
  cursor: pointer;
`;

const UpdatingImage = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1.125rem;
  label {
    font-size: 2rem;
    cursor: pointer;
  }
  div {
    display: flex;
    justify-content: center;
    margin-top: 0.5rem;
    font-size: 0.875rem;
  }
  input {
    display: none;
  }
`;

const ButtonsSection = styled(Sections)`
  display: flex;
  align-items: flex-end;
  padding-left: 5px;
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    border-radius: 5px;
    font-size: 15px;
    cursor: pointer;
  }
`;
