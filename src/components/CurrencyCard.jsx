import React from 'react';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Card = styled.div`
  margin: 0.7rem 1rem 0 1rem;
  padding: 1rem 0.6rem;
  background-color: #363642;
  border-radius: 0.2rem;

  a {
    text-decoration: none;
  }

  svg {
    width: 1.6rem;
    height: 1.6rem;
    margin-left: 0.5rem;
  }
`;

const TopSide = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 0.8rem;
  line-height: 1.2;
  border-bottom: 1px solid rgba(136, 137, 145, 0.15);

  section {
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

  section:nth-of-type(2) {
    margin-left: auto;
    text-align: right;
  }
`;

const BottomSide = styled.div`
  display: flex;
  align-items: center;
  padding-top: 0.8rem;
  line-height: 1.3;

  section {
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

  section:nth-of-type(2) {
    margin-left: auto;
    text-align: right;

    p:nth-of-type(1) {
      color: ${(props) => props.color};
    }
  }
`;

const formatBalance = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const formatPercentage = (value) => {
  let formattedValue = value.toFixed(2).split('');
  if (value >= 0) {
    formattedValue.unshift('+');
  }
  formattedValue.splice(1, 0, ' ');
  return formattedValue.join('');
};

function CurrencyCard({ children: icon, name, price, coins, dollars, changes }) {
  const wallet = useSelector((state) => state.wallet);


  return (
    <Card>
      <Link to={name.short}>
        <TopSide>
          {icon}
          <section>
            <p>{name.short}</p>
            <p>{name.full}</p>
          </section>
          <section>
            <p>{coins}</p>
            <p>{wallet.readyToUse ? formatBalance.format(dollars) : 'Loading...'}</p>
          </section>
        </TopSide>
        <BottomSide color={wallet.readyToUse ? (changes < 0 ? '#de6e6e' : '#10c668') : '#ffffff'}>
          <section>
            <p>{wallet.readyToUse ? formatBalance.format(price) : 'Loading...'}</p>
            <p>Price</p>
          </section>
          <section>
            <p>{wallet.readyToUse ? `${formatPercentage(changes)}%` : 'Loading...'}</p>
            <p>Profit/Loss</p>
          </section>
        </BottomSide>
      </Link>
    </Card>
  );
}

export default CurrencyCard;
