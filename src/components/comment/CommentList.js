import { db } from '../../Firebase';

import React from 'react';
import { BsFillTrashFill } from 'react-icons/bs';
import styled from 'styled-components';

const CommentList = ({ comment }) => {
  console.log(comment);
  return (
    <CommentWrapper>
      <CommentLeft>
        <CommentAutherImage src={comment.commentAuthorAvatar} />
      </CommentLeft>
      <CommentCenter>
        <CommentAuthor>{comment.commentAuthor}</CommentAuthor>
        <CommentText>{comment.comment}</CommentText>
      </CommentCenter>
      <CommentRight>
        <>
          <BsFillTrashFill />
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
