import { takeLatest, call, put, select } from 'redux-saga/effects';
import querystring from 'querystring'

import { setTokenSuccess } from './actions'

import { SET_TOKEN } from './constants';

function getHashParams() {
  let hashParams = {};
  let e, r = /([^&;=]+)=?([^&;]*)/g
  let q = window.location.hash.substring(1);
  while ( e = r.exec(q)) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams
}

export function* setToken() {
  const hashParams = getHashParams()
  if (hashParams.access_token) {
    yield put(setTokenSuccess(hashParams.access_token))
  }
}

// Individual exports for testing
export default function* saga() {
  yield takeLatest(SET_TOKEN, setToken);
}
