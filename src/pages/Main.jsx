import React from 'react';
import styled from '@emotion/styled';

import Header from '../components/Header';
import Balance from '../components/Balance';
import CurrencyCard from '../components/CurrencyCard';
import BitcoinIcon from '../components/icons/BitcoinIcon';
import EthereumIcon from '../components/icons/EthereumIcon';
import RippleIcon from '../components/icons/RippleIcon';

const BalanceMain = styled.div``;

function Main() {
  return (
    <BalanceMain>
      <Header />
      <Balance />
      <CurrencyCard>
        <BitcoinIcon />
      </CurrencyCard>
      <CurrencyCard>
        <EthereumIcon />
      </CurrencyCard>
      <CurrencyCard>
        <RippleIcon />
      </CurrencyCard>
    </BalanceMain>
  );
}

export default Main;
