import React from 'react';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';

import Header from '../components/Header';
import Balance from '../components/Balance';
import CurrencyCard from '../components/CurrencyCard';
import BitcoinIcon from '../components/icons/BitcoinIcon';
import EthereumIcon from '../components/icons/EthereumIcon';
import RippleIcon from '../components/icons/RippleIcon';

const BalanceMain = styled.div``;

function Main() {
  const cryptos = [
    { name: { short: 'BTC', full: 'Bitcoin' }, icon: <BitcoinIcon /> },
    { name: { short: 'ETH', full: 'Ethereum' }, icon: <EthereumIcon /> },
    { name: { short: 'XRP', full: 'Ripple' }, icon: <RippleIcon /> },
  ];

  return (
    <BalanceMain>
      <Header />
      <Balance />
      {cryptos.map((crypto, index) => (
        <CurrencyCard key={index} name={crypto.name}>
          {crypto.icon}
        </CurrencyCard>
      ))}
    </BalanceMain>
  );
}

export default Main;
