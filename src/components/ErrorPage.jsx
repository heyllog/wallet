import React from 'react';
import styled from '@emotion/styled';

const WrongRoute = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  p {
    color: #ffffff;
    font-size: 1.8rem;
    font-weight: 400;
  }
`;

function ErrorPage({ children }) {
  return <WrongRoute>{children}</WrongRoute>;
}

export default ErrorPage;
