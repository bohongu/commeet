import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const CommeetList = ({ commeet }) => {
  return (
    <>
      <CommeetListWrapper>
        <CommeetLists>
          <img
            src={commeet.fileUrl}
            alt="commeet-pic"
            width="100px"
            height="100px"
          />
          <title>
            <Link to={`commeets/${commeet.id}`}>{commeet.title}</Link>
          </title>
          <h3>{commeet.author}</h3>
          <h3>{commeet.createdAt}</h3>
        </CommeetLists>
      </CommeetListWrapper>
    </>
  );
};

export default CommeetList;

const CommeetListWrapper = styled.div`
  padding: 0 20%;
`;

const CommeetLists = styled.div`
  display: grid;
  height: 80px;
  grid-template-columns: 12.5% 62.5% 12.5% 12.5%;
  margin: 2% 0;

  * {
    border: 1px solid black;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  title {
    justify-content: start;
    padding-left: 5px;
  }
`;
