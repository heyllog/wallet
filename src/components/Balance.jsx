import React, { useEffect } from 'react';
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
    color: #10c668;
  }
`;

const formatBalance = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

function Balance() {
  const wallet = useSelector((state) => state.wallet);

  return (
    <BalanceBadge>
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
      <p>+ $37.55 &uarr;</p>
    </BalanceBadge>
  );
}

export default Balance;
