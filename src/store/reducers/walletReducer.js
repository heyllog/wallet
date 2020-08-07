import BitcoinIcon from '../../components/icons/BitcoinIcon';
import EthereumIcon from '../../components/icons/EthereumIcon';
import RippleIcon from '../../components/icons/RippleIcon';
import LitecoinIcon from '../../components/icons/LitecoinIcon';

export const LOAD_RATES = 'LOAD_RATES';
export const CANCEL_LOAD_RATES = 'CANCEL_LOAD_RATES';
export const PUT_RATES = 'PUT_RATES';
export const SET_WALLET_READY = 'SET_WALLET_READY';
export const SET_WALLET_ERROR = 'SET_WALLET_ERROR';

export const putRates = (dataFromServer) => {
  return {
    type: PUT_RATES,
    payload: dataFromServer,
  };
};

export const loadRates = () => {
  return {
    type: LOAD_RATES,
  };
};

export const cancelLoadRates = () => {
  return {
    type: CANCEL_LOAD_RATES,
  };
};

export const setWalletReady = (ready) => {
  return {
    type: SET_WALLET_READY,
    payload: ready,
  };
};

export const setWalletError = (error) => {
  return {
    type: SET_WALLET_ERROR,
    payload: error,
  };
};

const initialState = {
  cryptos: {
    BTC: { name: { short: 'BTC', full: 'Bitcoin' }, icon: BitcoinIcon() },
    ETH: { name: { short: 'ETH', full: 'Ethereum' }, icon: EthereumIcon() },
    XRP: { name: { short: 'XRP', full: 'Ripple' }, icon: RippleIcon() },
    LTC: { name: { short: 'LTC', full: 'Litecoin' }, icon: LitecoinIcon() },
  },
  cryptoWallet: { BTC: 0.2415263, ETH: 7.2415263, XRP: 165.24152, LTC: 3.27832 },
  dollarWallet: {},
  prices: {},
  changePercentage: {},
  readyToUse: false,
  error: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PUT_RATES: {
      const dollarWallet = {};
      const changePercentage = {};
      const prices = {};

      Object.keys(state.cryptoWallet).forEach((crypto) => {
        prices[crypto] = action.payload[crypto]['USD']['PRICE'];
        dollarWallet[crypto] = prices[crypto] * state.cryptoWallet[crypto];
        changePercentage[crypto] = action.payload[crypto]['USD']['CHANGEPCT24HOUR'];
      });

      return {
        ...state,
        prices,
        dollarWallet,
        changePercentage,
        readyToUse: true,
      };
    }
    case SET_WALLET_READY:
      return {
        ...state,
        readyToUse: action.payload,
      };
    case SET_WALLET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
