/*
 *
 * Songkick reducer
 *
 */

import { fromJS } from 'immutable';
import { GET_FESTIVALS, GET_FESTIVALS_SUCCESS } from './constants';

export const initialState = fromJS({
  loading: false,
  error: false,
  festivals: [],
});

function songkickReducer(state = initialState, action) {
  switch (action.type) {
    case GET_FESTIVALS:
      return state
        .set('loading', true)
        .set('error', false)
        .set('festivals', [])
    case GET_FESTIVALS_SUCCESS:
      return state
        .set('festivals', action.festivals)
        .set('loading', false);
    default:
      return state;
  }
}

export default songkickReducer;
