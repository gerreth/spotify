import { fromJS } from 'immutable';
import spotifyReducer from '../reducer';

describe('spotifyReducer', () => {
  it('returns the initial state', () => {
    expect(spotifyReducer(undefined, {})).toEqual(fromJS({}));
  });
});
