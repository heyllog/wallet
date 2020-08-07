import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';

import formatBalance from '../formatters/formatBalance';
import formatChanges from '../formatters/formatChanges';
import ArrowUp from './icons/ArrowUp';
import ArrowDown from './icons/ArrowDown';

const BalanceBadge = styled.div`
  margin-bottom: 1.5rem;
  text-align: center;
  line-height: 1.4;
  font-weight: 400;
`;

const Changes = styled.p`
  font-size: 0.9rem;
  color: ${(props) => props.color};

  svg {
    width: 0.68rem;
    height: 0.68rem;
    margin-left: 0.3rem;
    stroke: ${(props) => props.color};
  }
`;

const TotalValue = styled.p`
  margin-top: 0.1rem;
  margin-bottom: 0.6rem;
  font-size: 2.3rem;
  color: white;
`;

const NormalText = styled.p`
  font-size: 0.8rem;
  color: #888991;
`;

function Balance() {
  const [changes, setChanges] = useState(null);
  const wallet = useSelector((state) => state.wallet);

  useEffect(() => {
    if (wallet.readyToUse) {
      let balance = 0;

      for (let key in wallet.dollarWallet) {
        balance += (wallet.dollarWallet[key] * wallet.changePercentage[key]) / 100;
      }

      setChanges(balance);
    }
  }, [wallet]);

  return (
    <BalanceBadge>
      <NormalText>Your total balance</NormalText>
      <TotalValue>
        {wallet.readyToUse
          ? formatBalance(
              Object.values(wallet.dollarWallet).reduce(
                (accumulator, currentValue) => accumulator + currentValue
              )
            )
          : 'Loading...'}
      </TotalValue>
      <NormalText>24h Changes</NormalText>
      <Changes color={wallet.readyToUse ? (changes < 0 ? '#de6e6e' : '#10c668') : '#ffffff'}>
        {changes ? formatChanges(changes) : 'Loading...'}
        {wallet.readyToUse && (changes > 0 ? <ArrowUp /> : <ArrowDown />)}
      </Changes>
    </BalanceBadge>
  );
}

export default Balance;
