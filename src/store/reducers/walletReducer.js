import BitcoinIcon from '../../components/icons/BitcoinIcon';
import EthereumIcon from '../../components/icons/EthereumIcon';
import RippleIcon from '../../components/icons/RippleIcon';
import React from 'react';
import LitecoinIcon from '../../components/icons/LitecoinIcon';

export const LOAD_DATA = 'LOAD_DATA';
export const CANCEL_LOAD_DATA = 'CANCEL_LOAD_DATA';
export const PUT_DATA = 'PUT_DATA';

export const putData = (dataFromServer) => {
  return {
    type: PUT_DATA,
    payload: dataFromServer,
  };
};

export const loadData = () => {
  return {
    type: LOAD_DATA,
  };
};

export const cancelLoadData = () => {
  return {
    type: CANCEL_LOAD_DATA,
  };
};

const initialState = {
  cryptos: {
    BTC: { name: { short: 'BTC', full: 'Bitcoin' }, icon: <BitcoinIcon /> },
    ETH: { name: { short: 'ETH', full: 'Ethereum' }, icon: <EthereumIcon /> },
    XRP: { name: { short: 'XRP', full: 'Ripple' }, icon: <RippleIcon /> },
    LTC: { name: { short: 'LTC', full: 'Litecoin' }, icon: <LitecoinIcon /> },
  },
  cryptoWallet: { BTC: 0.2415263, ETH: 7.2415263, XRP: 165.24152, LTC: 3.27832 },
  dollarWallet: {},
  changeDollars: {},
  prices: {},
  changePercentage: {},
  readyToUse: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PUT_DATA: {
      const dollarWallet = {};
      const changePercentage = {};
      const changeDollars = {};
      const prices = {};

      Object.keys(state.cryptoWallet).forEach((crypto) => {
        prices[crypto] = action.payload[crypto]['USD']['PRICE'];
        dollarWallet[crypto] = prices[crypto] * state.cryptoWallet[crypto];
        changePercentage[crypto] = action.payload[crypto]['USD']['CHANGEPCT24HOUR'];
        changeDollars[crypto] = (changePercentage[crypto] * dollarWallet[crypto]) / 100;
      });

      return {
        ...state,
        prices,
        dollarWallet,
        changeDollars,
        changePercentage,
        readyToUse: true,
      };
    }
    default:
      return state;
  }
};
