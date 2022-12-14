import Main from 'components/layout/Main';
import React, { useEffect, useState } from 'react';
import { TbUserCircle } from 'react-icons/tb';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import CommentList from 'components/comment/CommentList';
import { deleteDoc, doc } from 'firebase/firestore';
import { db, storage } from '../../Firebase';
import { BsPencilFill, BsFillTrashFill } from 'react-icons/bs';
import { deleteObject, ref } from 'firebase/storage';
import CommeetUpdate from './CommeetUpdate';
import CommentForm from 'components/comment/CommentForm';
import { TbMessageCircle2, TbMessageCircleOff } from 'react-icons/tb';
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';

const CommeetList = ({ commeet }) => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const dbRef = doc(db, 'commeets', `${commeet.id}`);
  const isOwner = commeet.authorId === userInfo.uid;
  const [rightComments, setRightComments] = useState([]);
  const onToggleComment = () => {
    setShowComment((prev) => !prev);
  };
  const onDeleteClick = async () => {
    // eslint-disable-next-line no-restricted-globals
    const ok = confirm('삭제하시겠습니까?');
    if (ok) {
      await deleteDoc(dbRef);
      await deleteObject(ref(storage, commeet.fileUrl));
    }
  };
  const onUpdateClick = () => {
    setShowUpdateForm(true);
  };

  useEffect(() => {
    const q = query(
      collection(db, 'comments'),
      where('commeetId', '==', commeet.id),
      orderBy('commentCreatedAt', 'desc'),
    );

    onSnapshot(q, (querySnapshot) => {
      const updateComment = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRightComments(updateComment);
    });
  }, [commeet.id]);

  return (
    <>
      <Main>
        <CommeetWrapper>
          <CommeetLeft>
            {commeet.authorImage ? (
              <CommeetAuthorImage src={commeet.authorImage} />
            ) : (
              <TbUserCircle
                style={{
                  borderRadius: '50%',
                  height: '46px',
                  width: '46px',
                }}
              />
            )}
          </CommeetLeft>
          <CommeetCenter>
            <CommeetAuthor>{commeet.author}</CommeetAuthor>
            <CommeetCommeet>{commeet.commeet}</CommeetCommeet>
            <CommeetDate>{commeet.recordCreatedAt}</CommeetDate>
            {commeet.fileUrl ? (
              <CommeetImage src={commeet.fileUrl} />
            ) : (
              <NoImage />
            )}
          </CommeetCenter>
          <CommeetRight>
            {isOwner ? (
              <>
                <BsFillTrashFill onClick={onDeleteClick} />
                <BsPencilFill onClick={onUpdateClick} />
              </>
            ) : null}
          </CommeetRight>
          <CommentButtons>
            {!showComment ? (
              <CommentButton>
                <TbMessageCircle2 onClick={onToggleComment} />
              </CommentButton>
            ) : (
              <CommentButton>
                <TbMessageCircleOff onClick={onToggleComment} />
              </CommentButton>
            )}
          </CommentButtons>
          {showComment ? (
            <CommentSection>
              {rightComments.map((comment) => (
                <CommentList key={comment.id} comment={comment} />
              ))}
              <CommentForm commeetId={commeet.id} />
            </CommentSection>
          ) : null}
        </CommeetWrapper>
      </Main>
      {showUpdateForm ? (
        <CommeetUpdate dbRef={dbRef} setShowUpdateForm={setShowUpdateForm} />
      ) : null}
    </>
  );
};

export default CommeetList;

const CommeetSections = styled.div`
  padding: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CommeetWrapper = styled.section`
  background: ${(props) => props.theme.pointBgColor};
  border-radius: 15px;
  padding: 5px;
  width: 45rem;
  display: grid;
  grid-template-columns: 1fr 8fr 1fr;
  grid-template-areas:
    'left center right'
    'button button button'
    'comment comment comment';
`;

const CommeetLeft = styled(CommeetSections)`
  grid-area: left;
  color: ${(props) => props.theme.accentColor};
`;

const CommeetAuthorImage = styled.img`
  height: 46px;
  width: 46px;
  border-radius: 50%;
`;

const CommeetCenter = styled(CommeetSections)`
  grid-area: center;
`;

const CommeetAuthor = styled.div`
  font-weight: bold;
  font-size: 1rem;
  margin-bottom: 0.7rem;
`;

const CommeetCommeet = styled.p`
  font-size: 1rem;
  margin-bottom: 0.7rem;
`;

const CommeetDate = styled.div`
  font-size: 0.8rem;
  color: ${(props) => props.theme.textColor};
  margin-bottom: 0.7rem;
`;

const CommeetImage = styled.img`
  height: 30rem;
  width: 30rem;
  border-radius: 10px;
`;

const NoImage = styled.div`
  width: 24rem;
`;

const CommeetRight = styled(CommeetSections)`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-evenly;
  padding-top: 20px;
  grid-area: right;
  font-size: 15px;
  * {
    color: ${(props) => props.theme.accentColor};
    cursor: pointer;
    width: auto;
  }
`;

const CommentButtons = styled.div`
  width: 100%;
  grid-area: button;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CommentButton = styled.div`
  font-size: 30px;
  width: auto;
  color: ${(props) => props.theme.accentColor};
  cursor: pointer;
`;

const CommentSection = styled.div`
  grid-area: comment;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
