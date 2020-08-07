import React from 'react';
import { useSelector } from 'react-redux';

import Header from '../components/Header';
import Balance from '../components/Balance';
import CurrencyCard from '../components/CurrencyCard';
import styled from '@emotion/styled';

const LoadingError = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    font-size: 1.5rem;
    font-weight: 400;
    color: #ffffff;
  }
`;

function MainPage() {
  const wallet = useSelector((state) => state.wallet);

  return (
    <>
      {!wallet.error ? (
        <>
          <Header />
          <Balance />
          {Object.keys(wallet.cryptoWallet).map((crypto, index) => (
            <CurrencyCard
              key={index}
              name={wallet.cryptos[crypto].name}
              price={wallet.readyToUse && wallet.prices[crypto]}
              coins={wallet.cryptoWallet[crypto]}
              dollars={wallet.dollarWallet[crypto]}
              changes={wallet.readyToUse && wallet.changePercentage[crypto]}
            >
              {wallet.cryptos[crypto].icon}
            </CurrencyCard>
          ))}
        </>
      ) : (
        <LoadingError>
          <p>Server Error</p>
          <p>Reload page, please</p>
        </LoadingError>
      )}
    </>
  );
}

export default MainPage;
