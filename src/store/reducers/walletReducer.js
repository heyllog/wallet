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
  cryptoWallet: { BTC: 0.2415263, ETH: 7.2415263, XRP: 165.24152 },
  dollarWallet: { BTC: null, ETH: null, XRP: null },
  changeDollars: { BTC: null, ETH: null, XRP: null },
  prices: { BTC: null, ETH: null, XRP: null },
  changePercentage: { BTC: null, ETH: null, XRP: null },
  readyToUse: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PUT_DATA: {
      const dollarWallet = {
        BTC: action.payload['BTC']['USD']['PRICE'] * state.cryptoWallet['BTC'],
        ETH: action.payload['ETH']['USD']['PRICE'] * state.cryptoWallet['ETH'],
        XRP: action.payload['XRP']['USD']['PRICE'] * state.cryptoWallet['XRP'],
      };

      const changePercentage = {
        BTC: action.payload['BTC']['USD']['CHANGEPCT24HOUR'],
        ETH: action.payload['ETH']['USD']['CHANGEPCT24HOUR'],
        XRP: action.payload['XRP']['USD']['CHANGEPCT24HOUR'],
      };

      const changeDollars = {
        BTC: (changePercentage['BTC'] * dollarWallet['BTC']) / 100,
        ETH: (changePercentage['ETH'] * dollarWallet['ETH']) / 100,
        XRP: (changePercentage['XRP'] * dollarWallet['XRP']) / 100,
      };

      return {
        ...state,
        prices: {
          BTC: action.payload['BTC']['USD']['PRICE'],
          ETH: action.payload['ETH']['USD']['PRICE'],
          XRP: action.payload['XRP']['USD']['PRICE'],
        },
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
