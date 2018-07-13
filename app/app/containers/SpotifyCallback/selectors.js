import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the spotify state domain
 */

const selectSpotifyDomain = state => state.get('spotify', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Spotify
 */

const makeSelectSpotifyToken = (() => {
  return createSelector(selectSpotifyDomain, substate => substate.get('token'));
})


export default makeSelectSpotifyToken;

export {
  makeSelectSpotifyToken,
};
