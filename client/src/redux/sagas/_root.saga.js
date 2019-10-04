import { all } from 'redux-saga/effects';
// INDIVIDUAL SAGAS
import fruitsSaga from './fruits.saga';
import employeesSaga from './employees.saga';

// USED TO REGISTER THE INDIVIDUAL SAGAS
export default function* rootSaga() {
  yield all([
    fruitsSaga(),
    employeesSaga(),
  ]);
}
