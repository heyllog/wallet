import React from 'react';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import formatBalance from '../formatters/formatBalance';
import formatPercentage from '../formatters/formatPercentage';

const LeftSide = styled.div`
  margin-left: 0.5rem;
`;

const RightSide = styled.div`
  margin-left: auto;
  text-align: right;
`;

const TopSide = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 0.8rem;
  border-bottom: 1px solid rgba(136, 137, 145, 0.15);
`;

const BottomSide = styled.div`
  display: flex;
  align-items: center;
  padding-top: 0.8rem;

  ${RightSide} {
    h1 {
      color: ${(props) => props.color};
    }
  }
`;

const Card = styled.div`
  margin: 0.7rem 1rem 0 1rem;
  padding: 1rem 0.6rem;
  background-color: #363642;
  border-radius: 0.2rem;
  line-height: 1.2;

  a {
    text-decoration: none;
  }

  svg {
    width: 1.6rem;
    height: 1.6rem;
    margin-left: 0.5rem;
  }

  ${TopSide}, ${BottomSide} {
    h1 {
      font-weight: 400;
      color: #ffffff;
    }

    h2 {
      font-size: 0.8rem;
      color: #888991;
    }
  }
`;

function CurrencyCard({ children: icon, name, price, coins, dollars, changes }) {
  const wallet = useSelector((state) => state.wallet);

  return (
    <Card>
      <Link to={name.short}>
        <TopSide>
          {icon}
          <LeftSide>
            <h1>{name.short}</h1>
            <h2>{name.full}</h2>
          </LeftSide>
          <RightSide>
            <h1>{coins}</h1>
            <h2>{wallet.readyToUse ? formatBalance(dollars) : 'Loading...'}</h2>
          </RightSide>
        </TopSide>
        <BottomSide color={wallet.readyToUse ? (changes < 0 ? '#de6e6e' : '#10c668') : '#ffffff'}>
          <LeftSide>
            <h1>{wallet.readyToUse ? formatBalance(price) : 'Loading...'}</h1>
            <h2>Price</h2>
          </LeftSide>
          <RightSide>
            <h1>{wallet.readyToUse ? formatPercentage(changes) : 'Loading...'}</h1>
            <h2>Profit/Loss</h2>
          </RightSide>
        </BottomSide>
      </Link>
    </Card>
  );
}

export default CurrencyCard;
