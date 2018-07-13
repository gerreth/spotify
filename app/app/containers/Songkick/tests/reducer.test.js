import { fromJS } from 'immutable';
import songkickReducer from '../reducer';

describe('songkickReducer', () => {
  it('returns the initial state', () => {
    expect(songkickReducer(undefined, {})).toEqual(fromJS({}));
  });
});
