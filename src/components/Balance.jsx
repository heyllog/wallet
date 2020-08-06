import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';

const BalanceBadge = styled.div`
  margin-bottom: 1.5rem;
  text-align: center;
  line-height: 1.4;

  p:nth-of-type(1) {
    font-size: 0.7rem;
    color: #888991;
  }

  p:nth-of-type(2) {
    margin-bottom: 0.6rem;
    font-size: 2rem;
    font-weight: 400;
    color: white;
  }

  p:nth-of-type(3) {
    margin-bottom: 0.1rem;
    font-size: 0.8rem;
    color: #888991;
  }

  p:nth-of-type(4) {
    font-size: 0.8rem;
    font-weight: 400;
    color: ${(props) => props.color};
  }
`;

const formatBalance = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

const formatChanges = (value) => {
  let formattedValue = formatBalance.format(value.toFixed(2));
  formattedValue = formattedValue.split('');

  if (value >= 0) formattedValue.unshift('+');

  formattedValue.splice(1, 0, ' ');
  return formattedValue;
};

function Balance() {
  const wallet = useSelector((state) => state.wallet);

  const [changes, setChanges] = useState(null);

  useEffect(() => {
    // TODO как-то полегче это реализовать
    if (wallet.readyToUse) {
      setChanges(
        Object.values(
          Object.fromEntries(
            Object.entries(wallet.dollarWallet).map(([key, value]) => [
              key,
              (value * wallet.changePercentage[key]) / 100,
            ])
          )
        ).reduce((accumulator, currentValue) => accumulator + currentValue)
      );
    }
  }, [wallet]);

  return (
    <BalanceBadge color={wallet.readyToUse ? (changes < 0 ? '#de6e6e' : '#10c668') : '#ffffff'}>
      <p>Your total balance</p>
      <p>
        {wallet.readyToUse
          ? formatBalance.format(
              Object.values(wallet.dollarWallet).reduce(
                (accumulator, currentValue) => accumulator + currentValue
              )
            )
          : 'Loading...'}
      </p>
      <p>24h Changes</p>
      <p>
        {changes ? formatChanges(changes) : 'Loading...'}
        {wallet.readyToUse && (changes > 0 ? <span> &uarr;</span> : <span> &darr;</span>)}
      </p>
    </BalanceBadge>
  );
}

export default Balance;
