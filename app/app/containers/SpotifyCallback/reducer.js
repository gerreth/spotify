/*
 *
 * SpotifyCallback reducer
 *
 */

import { fromJS } from 'immutable';
import { SET_TOKEN, SET_TOKEN_SUCCESS } from './constants';
import { setToken } from './actions'

export const initialState = fromJS({
  loading: false,
  error: false,
  token: undefined,
  topBands: {},
});

function spotifyCallbackReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TOKEN:
      return state
        .set('loading', true)
        .set('error', false)
        .set('token', undefined);
    case SET_TOKEN_SUCCESS:
      return state
        .set('token', action.token)
        .set('loading', false);
    default:
      return state;
  }
}

export default spotifyCallbackReducer;
