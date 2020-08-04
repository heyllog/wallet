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
  exchange: null,
  cryptoWallet: { BTC: 0.2415263, ETH: 7.2415263, XRP: 165.24152 },
  dollarWallet: { BTC: null, ETH: null, XRP: null },
  readyToUse: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PUT_DATA: {
      const dollarWallet = {
        BTC: action.payload['BTC']['USD'] * state.cryptoWallet['BTC'],
        ETH: action.payload['ETH']['USD'] * state.cryptoWallet['ETH'],
        XRP: action.payload['XRP']['USD'] * state.cryptoWallet['XRP'],
      }

      return {
        ...state,
        exchange: action.payload,
        dollarWallet,
        readyToUse: true,
      };
    }
    default:
      return state;
  }
};
