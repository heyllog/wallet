import React from 'react';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const Info = styled.div`
  display: flex;
  align-items: center;
  min-width: 11rem;

  svg {
    width: ${(props) => props.iconSize};
    height: ${(props) => props.iconSize};
  }

  section {
    margin-left: 1rem;

    p:nth-of-type(1) {
      font-size: ${(props) => props.fontTop};
      color: #ffffff;
    }

    p:nth-of-type(2) {
      font-size: ${(props) => props.fontBottom};
      color: #888991;
    }
  }

  section:nth-of-type(2) {
    text-align: right;
    margin-left: auto;

    p:nth-of-type(2) {
      color: ${(props) => props.color};
    }
  }
`;

const formatPercentage = (value) => {
  let formattedValue = value.toFixed(2).split('');
  if (value >= 0) {
    formattedValue.unshift('+');
  }
  formattedValue.splice(1, 0, ' ');
  return formattedValue.join('') + '%';
};

function CryptoInfo({
  children: icon,
  name,
  coins,
  changes,
  fontTop = '0.9rem',
  fontBottom = '0.8rem',
  iconSize = '1.3rem',
}) {
  const readyToUse = useSelector((state) => state.wallet.readyToUse);
  const { name: pageName } = useParams();

  return (
    <Info
      color={readyToUse ? (changes < 0 ? '#de6e6e' : '#10c668') : '#ffffff'}
      active={name.full === pageName.toUpperCase()}
      fontTop={fontTop}
      fontBottom={fontBottom}
      iconSize={iconSize}
    >
      {icon}
      <section>
        <p>{name.short}</p>
        <p>{name.full}</p>
      </section>
      <section>
        <p>{coins}</p>
        <p>{readyToUse ? formatPercentage(changes) : 'Loading...'}</p>
      </section>
    </Info>
  );
}

export default CryptoInfo;
