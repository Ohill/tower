import { delay } from 'redux-saga';
import { put } from 'redux-saga/effects';
import { alertData, alertDelete, AlertPush } from '../actions';

export function* handleAlertSaga(action: AlertPush) {
    yield put(alertData(action.payload));
    yield delay(3000);
    yield put(alertDelete());
}
