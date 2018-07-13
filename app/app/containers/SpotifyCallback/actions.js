/*
 *
 * Spotify actions
 *
 */

import { SET_TOKEN, SET_TOKEN_SUCCESS } from './constants';

export function setToken() {
  return {
    type: SET_TOKEN,
  };
}

export function setTokenSuccess(token) {
  return {
    type: SET_TOKEN_SUCCESS,
    token,
  };
}
