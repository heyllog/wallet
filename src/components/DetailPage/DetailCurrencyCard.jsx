import React from 'react';
import styled from '@emotion/styled';
import { useNavigate, useParams } from 'react-router-dom';

import CryptoInfo from './CryptoInfo';

const Card = styled.div`
  margin-right: 0.5rem;
  padding: 0.5rem 0.7rem;
  font-weight: 400;
  line-height: 1.3;
  background-color: ${(props) => (props.active ? 'rgba(69,71,84, 0.4)' : 'none')};
  border: ${(props) =>
    props.active ? '2px solid rgba(69,71,84, 0)' : '2px solid rgba(69,71,84, 0.4)'};
  border-radius: 5px;

  a {
    text-decoration: none;
  }
`;

function DetailCurrencyCard({ children: icon, name, coins, changes }) {
  const { name: pageName } = useParams();
  const navigate = useNavigate();

  return (
    <Card active={name.short === pageName} onClick={() => navigate(`/${name.short}`)}>
      <CryptoInfo name={name} coins={coins} changes={changes}>
        {icon}
      </CryptoInfo>
    </Card>
  );
}

export default DetailCurrencyCard;
