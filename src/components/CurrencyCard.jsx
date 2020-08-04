import React from 'react';
import styled from '@emotion/styled';

const Card = styled.div`
  margin: 0.7rem 1rem 0 1rem;
  padding: 1rem 0.6rem;
  background-color: #363642;
  border-radius: 0.2rem;

  svg {
    width: 25px;
    height: 25px;
    margin-left: 0.5rem;
  }
`;

const TopSide = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 0.8rem;
  line-height: 1.2;
  border-bottom: 1px solid rgba(136, 137, 145, 0.15);

  div {
    margin-left: 0.4rem;

    p:nth-of-type(1) {
      font-size: 0.8rem;
      font-weight: 400;
      color: #ffffff;
    }

    p:nth-of-type(2) {
      font-size: 0.7rem;
      color: #888991;
    }
  }

  div:nth-of-type(2) {
    margin-left: auto;
    text-align: right;
  }
`;

const BottomSide = styled.div`
  display: flex;
  align-items: center;
  padding-top: 0.8rem;
  line-height: 1.3;

  div {
    margin-left: 0.5rem;

    p:nth-of-type(1) {
      font-size: 0.8rem;
      font-weight: 400;
      color: #ffffff;
    }

    p:nth-of-type(2) {
      font-size: 0.7rem;
      color: #888991;
    }
  }

  div:nth-of-type(2) {
    margin-left: auto;
    text-align: right;
    
    p:nth-of-type(1) {
      color: #10c668;
    }
  }
`;

function CurrencyCard({ children: icon }) {
  return (
    <Card>
      <TopSide>
        {icon}
        <div>
          <p>BTC</p>
          <p>Bitcoin</p>
        </div>
        <div>
          <p>0.241232341</p>
          <p>$1,238.62</p>
        </div>
      </TopSide>
      <BottomSide>
        <div>
          <p>$6,752.54</p>
          <p>Price</p>
        </div>
        <div>
          <p>+ 2.75%</p>
          <p>Profit/Loss</p>
        </div>
      </BottomSide>
    </Card>
  );
}

export default CurrencyCard;
