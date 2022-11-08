import { db } from '../../Firebase';
import { deleteDoc, doc } from 'firebase/firestore';
import React from 'react';
import { BsFillTrashFill } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const CommentList = ({ comment }) => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const isOwner = comment.commentAuthorId === userInfo.uid;
  const commentDbRef = doc(db, 'comments', `${comment.id}`);
  const deleteCommentHandler = async () => {
    // eslint-disable-next-line no-restricted-globals
    const ok = confirm('댓글을 삭제하기겠습니까?');
    if (ok) {
      await deleteDoc(commentDbRef);
    }
  };

  return (
    <CommentWrapper>
      <CommentLeft>
        <CommentAutherImage src={comment.commentAuthorAvatar} />
      </CommentLeft>
      <CommentCenter>
        <div>
          <CommentAuthor>{comment.commentAuthor}</CommentAuthor>
          <CommentDate>{comment.commentCreatedAt}</CommentDate>
        </div>
        <CommentText>{comment.comment}</CommentText>
      </CommentCenter>
      <CommentRight>
        {isOwner ? (
          <>
            <BsFillTrashFill onClick={deleteCommentHandler} />
          </>
        ) : null}
      </CommentRight>
    </CommentWrapper>
  );
};

export default CommentList;

const CommentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 8fr 1fr;
  grid-template-areas: 'profile content setting';
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
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
  div {
    display: flex;
    width: auto;
    align-items: center;
  }
`;

const CommentAuthor = styled.div`
  font-size: 0.8rem;
  width: auto;
  margin-right: 10px;
`;

const CommentDate = styled.div`
  font-size: 10px;
`;

const CommentText = styled.p`
  padding: 10px;
  padding-left: 0px;
`;

const CommentRight = styled.div`
  display: flex;
  align-items: center;
  grid-area: setting;
  font-size: 15px;
  * {
    cursor: pointer;
  }
`;
