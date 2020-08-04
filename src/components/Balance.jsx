import React from 'react';
import styled from '@emotion/styled';

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

function Balance() {
  return (
    <BalanceBadge>
      <p>Your total balance</p>
      <p>$ 1,632.95</p>
      <p>24h Changes</p>
      <p>+ $37.55 &uarr;</p>
    </BalanceBadge>
  );
}

export default Balance;
