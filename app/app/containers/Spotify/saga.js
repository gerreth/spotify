import { takeLatest, call, put, select } from 'redux-saga/effects';

import querystring from 'querystring'
// import request from 'request'
import 'whatwg-fetch';

import {
  setTopBands,
  tokenLoaded,
} from './actions'

import { makeSelectSpotifyToken } from 'containers/Spotify/selectors';

import { LOAD_TOKEN, GET_TOP_BANDS } from './constants';

export function* getToken() {
  const config = {
    client_id: 'b7c40a45f58849a2a33c90b70ca8a222', // Your client id
    redirect_uri: 'http://localhost:8000/spotify/callback', // Your redirect uri
    response_type: 'token',
    scope: 'user-read-private user-read-email user-top-read user-modify-playback-state user-read-playback-state playlist-modify-public playlist-modify-private',
    show_dialog: true,
  }
  const url = `https://accounts.spotify.com/authorize?${querystring.stringify(config)}`
  window.location.href = url;
}

function requestBands(time_range, token) {
  const base_url = 'https://api.spotify.com/v1/me'
  const type = 'artists'
  const url = `${base_url}/top/${type}?time_range=${time_range}&limit=100&offset=0`

  const options = {
    json: true,
    method: 'GET',
  }

  return fetch(`http://localhost:8001/spotify/top-bands?${querystring.stringify({ url, token })}`, options).then(response => {
    return response.json()
  }).catch(error => {
    console.log(error.body)
  })
}

function requestSimilarBands(bands, token) {
  const ids = bands.reduce((carry, band) => {
    return (carry === '') ? band.id : `${carry}-${band.id}`
  }, '')

  const options = {
    json: true,
    method: 'GET',
  }

  return fetch(`http://localhost:8001/spotify/similar-bands?${querystring.stringify({ ids, token })}`, options).then(response => {
    return response.json()
  }).catch(error => {
    console.log(error.body)
  })
}

export function* getTopBands() {
  const token = yield select(makeSelectSpotifyToken());

  // Get top bands for different time horizons (TO DO: Handle this on backend and give one result here)
  const short_term = yield call(requestBands, 'short_term', token)
  const medium_term = yield call(requestBands,'medium_term', token)
  const long_term = yield call(requestBands, 'long_term', token)
  // Return an 'all-time' list without duplicates
  const all = [...short_term, ...medium_term, ...long_term].reduce((carry, band) => {
    if (!carry.filter(_ => _.name === band.name).length) carry.push(band)

    return carry
  }, [])

  let similarBands = yield call(requestSimilarBands, all, token)

  // Remove duplicates in top and similar bands
  similarBands = similarBands.reduce((carry, band) => {
    if (all.filter(_ => _.name === band.name).length > 0) {
      return carry
    } else {
      return [...carry, band]
    }
  }, [])

  const bands = {
    similarBands,
    topBands: {
      short_term,
      medium_term,
      long_term,
      all,
    }
  }

  yield put(setTopBands(bands))
}

// Individual exports for testing
export function* saga() {
  yield takeLatest(LOAD_TOKEN, getToken);
}

export function* topBandsSaga() {
  yield takeLatest(GET_TOP_BANDS, getTopBands);
}
