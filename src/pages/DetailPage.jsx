import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';

import Graph from '../components/DetailPage/Graph';
import NotFound from '../components/NotFound';
import DetailCryptoList from '../components/DetailPage/DetailCryptoList';
import ArrowBack from '../components/icons/ArrowBack';

const Info = styled.div`
  a svg {
    width: 1.8rem;
    height: 1.8rem;
    margin: 1.5rem 0 1rem 2rem;
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
  const [period, setPeriod] = useState(1);
  const { name: pageName } = useParams();
  const wallet = useSelector((state) => state.wallet);

  if (!wallet.cryptoWallet[pageName]) {
    return <NotFound />;
  }

  return (
    <Info>
      <Link to='/'>
        <ArrowBack />
      </Link>
      <DetailCryptoList pageName={pageName} />
      <Buttons period={period}>
        <Button onClick={() => setPeriod(1)}>Day</Button>
        <Button onClick={() => setPeriod(2)}>Week</Button>
        <Button onClick={() => setPeriod(3)}>Month</Button>
      </Buttons>
      <Graph name={pageName} period={period} />
    </Info>
  );
}

export default DetailPage;
