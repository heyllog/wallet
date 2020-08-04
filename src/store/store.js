import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

// Reducers

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({
    // Reducers
  }),
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export default store;
