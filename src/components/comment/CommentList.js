import React from 'react';
import { BsFillTrashFill } from 'react-icons/bs';
import styled from 'styled-components';

const CommentList = () => {
  return (
    <CommentWrapper>
      <CommentLeft>
        <CommentAutherImage />
      </CommentLeft>
      <CommentCenter>
        <CommentAuthor>Bohongu</CommentAuthor>
        <CommentText>
          orem ipsum dolor sit amet consectetur, adipisicing elit. Dolore ipsa
          iusto, tempora quisquam vero dignissimos, adipisci optio, asperiores
          enim quia autem aspernatur
        </CommentText>
      </CommentCenter>
      <CommentRight>
        <>
          <BsFillTrashFill style={{ marginBottom: '1rem' }} />
        </>
      </CommentRight>
    </CommentWrapper>
  );
};

export default CommentList;

const CommentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 8fr 1fr;
  grid-template-areas: 'profile content setting';
  grid-area: comment;
`;

const CommentLeft = styled.div`
  grid-area: profile;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
`;

const CommentAutherImage = styled.img`
  border: 1px solid black;
  height: 45px;
  width: 45px;
  border-radius: 50%;
`;

const CommentCenter = styled.div`
  grid-area: content;
  padding: 0.5rem;
`;

const CommentAuthor = styled.div`
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
`;

const CommentText = styled.p``;

const CommentRight = styled.div`
  padding: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-area: setting;
  font-size: 20px;
`;
