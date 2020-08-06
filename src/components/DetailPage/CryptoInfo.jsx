import React from 'react';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import formatPercentage from '../../formatters/formatPercentage';

const LeftSide = styled.div`
  margin-left: 1rem;

  h2 {
    color: #888991;
  }
`;

const RightSide = styled.div`
  text-align: right;
  margin-left: auto;

  h2 {
    color: ${(props) => props.color};
  }
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  min-width: 11rem;

  svg {
    width: ${(props) => props.iconSize};
    height: ${(props) => props.iconSize};
  }

  ${LeftSide}, ${RightSide} {
    h1 {
      font-size: ${(props) => props.fontTop};
      color: #ffffff;
    }

    h2 {
      font-size: ${(props) => props.fontBottom};
    }
  }
`;

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
      active={name.full === pageName.toUpperCase()}
      fontTop={fontTop}
      fontBottom={fontBottom}
      iconSize={iconSize}
    >
      {icon}
      <LeftSide>
        <h1>{name.short}</h1>
        <h2>{name.full}</h2>
      </LeftSide>
      <RightSide color={readyToUse ? (changes < 0 ? '#de6e6e' : '#10c668') : '#ffffff'}>
        <h1>{coins}</h1>
        <h2>{readyToUse ? formatPercentage(changes) : 'Loading...'}</h2>
      </RightSide>
    </Info>
  );
}

export default CryptoInfo;
