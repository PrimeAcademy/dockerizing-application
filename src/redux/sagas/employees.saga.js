import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "LOGIN" actions
function* getEmployees(action) {
  try {
    const employeesResponse = yield axios.get('/api/employees');
    yield put({
        type: 'SET_EMPLOYEES',
        payload: employeesResponse.data,
    });
  } catch (error) {
    console.log('Error getting employees:', error);
  }
}

function* employeesSaga() {
  yield takeLatest('GET_EMPLOYEES', getEmployees);
}

export default employeesSaga;
