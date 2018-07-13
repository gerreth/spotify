import { takeLatest, call, put, select } from 'redux-saga/effects';

import { GET_FESTIVALS } from './constants';

import {
  setFestivals,
} from './actions'

function requestFestivals() {
  const options = {
    json: true,
    method: 'GET',
  }

  return fetch(`http://localhost:8001/songkick/festivals`, options).then(response => {
    return response.json()
  }).catch(error => {
    console.log(error)
  })
}

export function* getFestivals() {
  const festivals = yield call(requestFestivals)
  yield put(setFestivals(festivals))
}

// Individual exports for testing
export function* saga() {
  yield takeLatest(GET_FESTIVALS, getFestivals);
}
