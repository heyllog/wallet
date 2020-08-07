import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

// Reducers
import walletReducer from './reducers/walletReducer';
import historyReducer from './reducers/historyReducer';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({
    wallet: walletReducer,
    history: historyReducer,
  }),
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export default store;
