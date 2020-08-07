export const LOAD_HISTORY = 'LOAD_HISTORY';
export const CANCEL_LOAD_HISTORY = 'CANCEL_LOAD_HISTORY';
export const PUT_HISTORY = 'PUT_HISTORY';
export const CHOOSE_CRYPTO = 'CHOOSE_CRYPTO';
export const SET_HISTORY_READY = 'SET_HISTORY_READY';
export const SET_HISTORY_PERIOD = 'SET_HISTORY_PERIOD';
export const SET_HISTORY_ERROR = 'SET_HISTORY_ERROR';

export const putHistory = (dataFromServer) => {
  return {
    type: PUT_HISTORY,
    payload: dataFromServer,
  };
};

export const loadHistory = () => {
  return {
    type: LOAD_HISTORY,
  };
};

export const cancelLoadHistory = () => {
  return {
    type: CANCEL_LOAD_HISTORY,
  };
};

export const chooseCrypto = (crypto) => {
  return {
    type: CHOOSE_CRYPTO,
    payload: crypto,
  };
};

export const setHistoryReady = (ready) => {
  return {
    type: SET_HISTORY_READY,
    payload: ready,
  };
};

export const setHistoryPeriod = (ready) => {
  return {
    type: SET_HISTORY_PERIOD,
    payload: ready,
  };
};

export const setHistoryError = (error) => {
  return {
    type: SET_HISTORY_ERROR,
    payload: error,
  };
};

const initialState = {
  selectedCrypto: null,
  period: 1,
  history: {},
  readyToUse: false,
  error: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PUT_HISTORY: {
      return {
        ...state,
        history: action.payload,
        readyToUse: true,
      };
    }
    case CHOOSE_CRYPTO:
      return {
        ...state,
        selectedCrypto: action.payload,
      };
    case SET_HISTORY_READY:
      return {
        ...state,
        readyToUse: action.payload,
      };
    case SET_HISTORY_PERIOD:
      return {
        ...state,
        period: action.payload,
      };
    case SET_HISTORY_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
