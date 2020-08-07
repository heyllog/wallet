import React, { useEffect } from 'react';
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

const ErrorMessage = styled.div`
  margin-top: 6rem;

  p {
    text-align: center;
    color: #ffffff;
    font-size: 1.3rem;
  }
`;

function DetailPage() {
  const { name: pageName } = useParams();
  const dispatch = useDispatch();
  const wallet = useSelector((state) => state.wallet);
  const history = useSelector((state) => state.history);

  useEffect(() => {
    if (!wallet.cryptoWallet[pageName]) {
      return <NotFound />;
    }

    dispatch(chooseCrypto(pageName));
    dispatch(loadHistory());
    return () => dispatch(cancelLoadHistory());
  }, [dispatch, pageName, wallet.cryptoWallet]);

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
      {!history.error ? (
        history.readyToUse ? (
          <Graph period={history.period} data={history.history} />
        ) : (
          <Loader size='12px' />
        )
      ) : (
        <ErrorMessage>
          <p>This information is unavailable now</p>
          <p>Please, try again later</p>
        </ErrorMessage>
      )}
    </Info>
  );
}

export default DetailPage;
