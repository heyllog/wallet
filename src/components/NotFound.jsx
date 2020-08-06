import React from 'react';
import styled from '@emotion/styled';

const WrongRoute = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  
  span {
    color: #ffffff;
    font-size: 2rem;
    font-weight: 400;
  }
`;

function NotFound() {
  return (
    <WrongRoute>
      <span>404 Not Found</span>
    </WrongRoute>
  );
}

export default NotFound;
