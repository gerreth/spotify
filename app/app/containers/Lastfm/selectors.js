import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the lastfm state domain
 */

const selectLastfmDomain = state => state.get('lastfm', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Lastfm
 */

const makeSelectLastfm = () =>
  createSelector(selectLastfmDomain, substate => substate.toJS());

export default makeSelectLastfm;
export { selectLastfmDomain };
