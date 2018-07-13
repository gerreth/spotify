import { fromJS } from 'immutable';
import lastfmReducer from '../reducer';

describe('lastfmReducer', () => {
  it('returns the initial state', () => {
    expect(lastfmReducer(undefined, {})).toEqual(fromJS({}));
  });
});
