import React from 'react';
import { useSelector } from 'react-redux';

import Header from '../components/Header';
import Balance from '../components/Balance';
import CurrencyCard from '../components/CurrencyCard';

function MainPage() {
  const wallet = useSelector((state) => state.wallet);

  return (
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
  );
}

export default MainPage;
