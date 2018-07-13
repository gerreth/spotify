/*
 *
 * Spotify actions
 *
 */

import { LOAD_TOKEN, LOAD_TOKEN_SUCCESS } from './constants';
import { GET_TOP_BANDS, GET_TOP_BANDS_SUCCESS } from './constants';

export function getToken() {
  return {
    type: LOAD_TOKEN
  };
}

export function tokenLoaded(token) {
  return {
    type: LOAD_TOKEN_SUCCESS,
    token,
  };
}

export function getTopBands() {
  return {
    type: GET_TOP_BANDS
  };
}

export function setTopBands(bands) {
  return {
    type: GET_TOP_BANDS_SUCCESS,
    bands,
  };
}
