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

const makeSelectSpotify = () =>
  createSelector(selectSpotifyDomain, substate => substate.toJS());

const makeSelectSpotifyToken = () =>
  createSelector(selectSpotifyDomain, substate => substate.get('token'));

const makeSelectSpotifyTopBands = () =>
  createSelector(selectSpotifyDomain, substate => substate.get('topBands'));

  const makeSelectSpotifySimilarBands = () =>
    createSelector(selectSpotifyDomain, substate => substate.get('similarBands'));

export default makeSelectSpotify;
export {
  makeSelectSpotify,
  makeSelectSpotifyToken,
  makeSelectSpotifyTopBands,
  makeSelectSpotifySimilarBands,
};
