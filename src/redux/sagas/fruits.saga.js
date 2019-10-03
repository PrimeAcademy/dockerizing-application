import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "LOGIN" actions
function* getFruits(action) {
  try {
    const fruitsResponse = yield axios.get('/api/fruits');
    yield put({
        type: 'SET_FRUITS',
        payload: fruitsResponse.data,
    });
  } catch (error) {
    console.log('Error getting fruits:', error);
  }
}

function* fruitsSaga() {
  yield takeLatest('GET_FRUITS', getFruits);
}

export default fruitsSaga;
