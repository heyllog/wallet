import React, { useEffect } from 'react';
import { useRoutes } from 'react-router';
import styled from '@emotion/styled';
import { Global, css } from '@emotion/core';
import Main from './pages/Main';
import { useDispatch } from 'react-redux';
import { cancelLoadData, loadData } from './store/reducers/walletReducer';

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
    background-color: rgb(42,42,52);
  }
`;

const Wallet = styled.div`
  min-height: 100vh;
`;

function App() {
  let routes = useRoutes(routesConfig);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadData());
    return () => dispatch(cancelLoadData());
  }, [dispatch]);

  return (
    <Wallet>
      <Global styles={GLOBAL} />
      {routes}
    </Wallet>
  );
}

export default App;
