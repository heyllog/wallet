import React from 'react';
import { useRoutes } from 'react-router';
import styled from '@emotion/styled';
import { Global, css } from '@emotion/core';
import Main from './pages/Main';

const routesConfig = [
  {
    path: '/',
    element: <Main />,
  },
];

const GLOBAL = css`
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-size: 16px;
  }

  body {
    font-family: 'Open Sans', sans-serif;
    font-weight: 300;
    background-color: rgba(31, 31, 43, 1);
    //background: linear-gradient(135deg, rgba(31, 31, 43, 1) 0%, rgba(66, 68, 81, 1) 100%);
  }
`;

const Wallet = styled.div`
  min-height: 100vh;
`;

function App() {
  let routes = useRoutes(routesConfig);

  return (
    <Wallet>
      <Global styles={GLOBAL} />
      {routes}
    </Wallet>
  );
}

export default App;
