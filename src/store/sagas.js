import {
  all,
  put,
  call,
  take,
  takeLatest,
  fork,
  cancel,
  cancelled,
  select,
} from 'redux-saga/effects';
import { LOAD_RATES, CANCEL_LOAD_RATES, putRates, setWalletReady } from './reducers/walletReducer';
import {
  CANCEL_LOAD_HISTORY,
  LOAD_HISTORY,
  putHistory,
  setHistoryReady,
} from './reducers/historyReducer';

// Wallet sagas
function* workerLoadRates() {
  let cryptos = yield select((state) => state.wallet.cryptoWallet);
  cryptos = Object.keys(cryptos).join(',');
  const controller = new AbortController();
  yield put(setWalletReady(false));

  try {
    const response = yield call(
      fetch,
      // 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,XRP&tsyms=USD',
      `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptos}&tsyms=USD`,
      {
        signal: controller.signal,
      }
    );

    if (response.ok) {
      const json = yield response.json();
      yield put(putRates(json['RAW']));
    }
  } catch (e) {
    // TODO обработка ошибок
    console.error(e);
  } finally {
    if (yield cancelled()) {
      controller.abort();
    }
  }
}

function* watchLoadRates() {
  while (true) {
    const bgSyncTask = yield takeLatest(LOAD_RATES, workerLoadRates);
    yield take(CANCEL_LOAD_RATES);
    yield cancel(bgSyncTask);
  }
}

// History sagas
function* workerLoadHistory() {
  let crypto = yield select((state) => state.history.selectedCrypto);
  let period = yield select((state) => state.history.period);
  const controller = new AbortController();
  yield put(setHistoryReady(false));

  let response;

  try {
    switch (period) {
      case 1:
        response = yield call(
          fetch,
          `https://min-api.cryptocompare.com/data/v2/histohour?fsym=${crypto}&tsym=USD&limit=6`,
          {
            signal: controller.signal,
          }
        );
        break;
      case 2:
        response = yield call(
          fetch,
          `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${crypto}&tsym=USD&limit=6`,
          {
            signal: controller.signal,
          }
        );
        break;
      case 3:
        response = yield call(
          fetch,
          `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${crypto}&tsym=USD&limit=30`,
          {
            signal: controller.signal,
          }
        );
        break;
    }

    if (response.ok) {
      const json = yield response.json();
      yield json['Data']['Data'].forEach((data, index) => {
        let formattedTime;

        switch (period) {
          case 1:
            formattedTime = new Date(json['Data']['Data'][index]['time'] * 1000).getHours();
            break;
          case 2:
            formattedTime = new Intl.DateTimeFormat('ru', {
              day: '2-digit',
              month: '2-digit',
            }).format(new Date(json['Data']['Data'][index]['time'] * 1000));
            break;
        }

        json['Data']['Data'][index] = {
          close: json['Data']['Data'][index]['close'],
          time: formattedTime || json['Data']['Data'][index]['time'],
        };
      });
      yield put(putHistory(json['Data']['Data']));
    }
  } catch (e) {
    // TODO обработка ошибок
    console.error(e);
  } finally {
    if (yield cancelled()) {
      controller.abort();
    }
  }
}

function* watchLoadHistory() {
  while (true) {
    const bgSyncTask = yield takeLatest(LOAD_HISTORY, workerLoadHistory);
    yield take(CANCEL_LOAD_HISTORY);
    yield cancel(bgSyncTask);
  }
}

export default function* rootSaga() {
  yield all([fork(watchLoadRates), fork(watchLoadHistory)]);
}
