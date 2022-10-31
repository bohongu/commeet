import { commeetActions } from 'components/store/commeet';
import React, { useEffect } from 'react';
import { db } from '../../Firebase';
import { useDispatch, useSelector } from 'react-redux';
import CommeetList from '../commeet/CommeetList';
import Main from 'components/layout/Main';
import styled from 'styled-components';
const {
  collection,
  orderBy,
  onSnapshot,
  query,
} = require('firebase/firestore');

const Home = () => {
  const commeets = useSelector((state) => state.commeet.commeets);
  const dispatch = useDispatch();

  useEffect(() => {
    const q = query(collection(db, 'commeets'), orderBy('createdAt', 'desc'));
    onSnapshot(q, (querySnapshot) => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      const updateCommeet = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch(commeetActions.initCommeet(updateCommeet));
    });
  }, [dispatch]);

  return (
    <HomeWrapper>
      {commeets.map((commeet) => (
        <CommeetList key={commeet.id} commeet={commeet} />
      ))}
    </HomeWrapper>
  );
};

export default Home;

const HomeWrapper = styled.div`
  margin-top: 5rem;
`;
