import Main from 'components/layout/Main';
import React, { useState } from 'react';
import { TbUserCircle, TbLineDotted } from 'react-icons/tb';
import { GoComment } from 'react-icons/go';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import CommentList from 'components/comment/CommentList';

const CommeetList = ({ commeet }) => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const [showComment, setShowComment] = useState(false);
  const onToggleComment = () => {
    setShowComment((prev) => !prev);
  };
  return (
    <Main>
      <CommeetWrapper>
        <CommeetLeft>
          {userInfo.photoURL ? (
            <CommeetAuthorImage src={userInfo.photoURL} />
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
          <CommeetDate>{commeet.createdAt}</CommeetDate>
          <CommeetImage src={commeet.fileUrl} />
        </CommeetCenter>
        <CommeetRight>
          <TbLineDotted
            style={{
              height: '25px',
              width: '25px',
            }}
          />
        </CommeetRight>
        <CommentButton>
          <GoComment
            style={{ height: '25px', width: '25px' }}
            onClick={onToggleComment}
          />
        </CommentButton>
        {showComment ? <CommentList /> : null}
      </CommeetWrapper>
    </Main>
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
  padding: 5px;
  width: 32rem;
  display: grid;
  grid-template-areas:
    'left center right'
    'button button button'
    'comment comment comment';
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
`;

const CommeetLeft = styled(CommeetSections)`
  grid-area: left;
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
  height: 24rem;
  width: 24rem;
  border-radius: 10px;
`;

const CommeetRight = styled(CommeetSections)`
  grid-area: right;
`;

const CommentButton = styled.div`
  width: 100%;
  grid-area: button;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
