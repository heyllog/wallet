import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';

import Graph from '../components/DetailPage/Graph';
import NotFound from '../components/NotFound';
import DetailCryptoList from '../components/DetailPage/DetailCryptoList';
import ArrowBack from '../components/icons/ArrowBack';
import {
  cancelLoadHistory,
  chooseCrypto,
  loadHistory,
  setHistoryPeriod,
} from '../store/reducers/historyReducer';
import Loader from '../components/DetailPage/Loader';

const Info = styled.div`
  a svg {
    width: 1.8rem;
    height: 1.8rem;
    margin: 1.5rem 0 1rem 2rem;
  }

  ${Loader} {
    margin-top: 10rem;
  }
`;

const Buttons = styled.div`
  display: flex;
  margin-left: 2rem;

  ${(props) => `div:nth-of-type(${props.period}) {  background-color: rgba(69, 71, 84, 0.4);}`}
`;

const Button = styled.div`
  margin-bottom: 2rem;
  padding: 0.2rem 1.7rem;
  border: none;
  border-radius: 3px;
  font-weight: 200;
  font-size: 0.9rem;
  color: #ffffff;
`;

function DetailPage() {
  const { name: pageName } = useParams();
  const dispatch = useDispatch();
  const wallet = useSelector((state) => state.wallet);
  const history = useSelector((state) => state.history);

  if (!wallet.cryptoWallet[pageName]) {
    return <NotFound />;
  }

  useEffect(() => {
    dispatch(chooseCrypto(pageName));
    // dispatch(setHistoryPeriod(1));
    dispatch(loadHistory());
    return () => dispatch(cancelLoadHistory());
  }, [dispatch, pageName]);

  const handleClick = (value) => {
    dispatch(setHistoryPeriod(value));
    dispatch(loadHistory());
  };

  return (
    <Info>
      <Link to='/'>
        <ArrowBack />
      </Link>
      <DetailCryptoList pageName={pageName} />
      <Buttons period={history.period}>
        <Button onClick={() => handleClick(1)}>Day</Button>
        <Button onClick={() => handleClick(2)}>Week</Button>
        <Button onClick={() => handleClick(3)}>Month</Button>
      </Buttons>
      {history.readyToUse ? (
        <Graph period={history.period} data={history.history} />
      ) : (
        <Loader size='12px' />
      )}
    </Info>
  );
}

export default DetailPage;
