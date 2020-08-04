import { all, put, call, take, takeLatest, fork, cancel, cancelled } from 'redux-saga/effects';
import { LOAD_DATA, CANCEL_LOAD_DATA, putData } from './reducers/walletReducer';

function* workerLoadData() {
  const controller = new AbortController();
  try {
    const response = yield call(
      fetch,
      // 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,XRP&tsyms=USD',
      'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,XRP&tsyms=USD',
      {
        signal: controller.signal,
      }
    );

    if (response.ok) {
      const json = yield response.json();
      yield put(putData(json['RAW']));
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

function* watchLoadData() {
  while (true) {
    const bgSyncTask = yield takeLatest(LOAD_DATA, workerLoadData);
    yield take(CANCEL_LOAD_DATA);
    yield cancel(bgSyncTask);
  }
}

export default function* rootSaga() {
  yield all([fork(watchLoadData)]);
}
