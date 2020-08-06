import React from 'react';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';

import CryptoInfo from './CryptoInfo';
import DetailCurrencyCard from './DetailCurrencyCard';

const List = styled.div``;
const Info = styled.div``;

const DetailCrypto = styled.div`
  ${Info}, ${List} {
    margin: 0 2rem 3rem 2rem;
    line-height: 1.2;
    font-weight: 400;
  }

  ${List} {
    display: flex;
    margin-right: 0;
    margin-bottom: 2rem;
    overflow-x: scroll;
  }
`;

function DetailCryptoList({ pageName }) {
  const wallet = useSelector((state) => state.wallet);

  return (
    <DetailCrypto>
      <List>
        {Object.keys(wallet.cryptoWallet).map((crypto, index) => (
          <DetailCurrencyCard
            key={index}
            name={wallet.cryptos[crypto].name}
            price={wallet.readyToUse && wallet.prices[crypto]}
            coins={wallet.cryptoWallet[crypto]}
            dollars={wallet.dollarWallet[crypto]}
            changes={wallet.readyToUse && wallet.changePercentage[crypto]}
          >
            {wallet.cryptos[crypto].icon}
          </DetailCurrencyCard>
        ))}
      </List>
      <Info>
        <CryptoInfo
          name={wallet.cryptos[pageName].name}
          price={wallet.readyToUse && wallet.prices[pageName]}
          coins={wallet.cryptoWallet[pageName]}
          dollars={wallet.dollarWallet[pageName]}
          changes={wallet.readyToUse && wallet.changePercentage[pageName]}
          fontTop='1.4rem'
          fontBottom='0.9rem'
          iconSize='2.2rem'
        >
          {wallet.cryptos[pageName].icon}
        </CryptoInfo>
      </Info>
    </DetailCrypto>
  );
}

export default DetailCryptoList;
