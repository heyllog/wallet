import React from 'react';
import styled from '@emotion/styled';

import SearchIcon from './icons/SearchIcon';
import NotificationIcon from './icons/NotificationIcon';

const TopBar = styled.header`
  margin: 2rem 2rem 1.4rem 2rem;
  display: flex;
  justify-content: space-between;

  svg {
    width: 1rem;
    height: 1rem;
    fill: white;
  }
`;

function Header() {
  return (
    <TopBar>
      <SearchIcon />
      <NotificationIcon />
    </TopBar>
  );
}

export default Header;
