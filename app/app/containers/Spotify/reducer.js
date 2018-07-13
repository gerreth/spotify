/*
 *
 * Spotify reducer
 *
 */

import { fromJS } from 'immutable';
import { LOAD_TOKEN, LOAD_TOKEN_SUCCESS } from './constants';
import { GET_TOP_BANDS, GET_TOP_BANDS_SUCCESS } from './constants';

export const initialState = fromJS({
  loading: false,
  error: false,
  similarBands: {},
  token: undefined,
  topBands: {},
});

function spotifyReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_TOKEN:
      return state
        .set('loading', true)
        .set('error', false)
        .set('token', undefined);
    case LOAD_TOKEN_SUCCESS:
      return state
        .set('token', action.token)
        .set('loading', false);
    case GET_TOP_BANDS:
      return state
        .set('loading', true)
        .set('error', false)
        .set('similarBands', {})
        .set('topBands', {});
    case GET_TOP_BANDS_SUCCESS:
      const {
        similarBands,
        topBands,
      } = action.bands
      return state
        .set('similarBands', similarBands)
        .set('topBands', topBands)
        .set('loading', false);
    default:
      return state;
  }
}

export default spotifyReducer;
