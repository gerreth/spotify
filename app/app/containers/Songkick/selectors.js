import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the songkick state domain
 */

const selectGlobal = state => state;
const selectSongkickDomain = state => state.get('songkick', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Songkick
 */

const makeSelectSongkick = () =>
  createSelector(selectSongkickDomain, substate => substate.toJS());

const makeSelectSongkickTopFestivals = () =>
  createSelector(selectGlobal, state => {
    let songkickFestivals = state.toJS().songkick.festivals
    songkickFestivals = songkickFestivals.map(festival => {
      festival.highlight = false
      festival.similar = false
      festival.artists = festival.artists.map(artist => {
        const returnArtists = {
          highlight: false,
          name: (typeof artist === 'string') ? artist : artist.name,
          similar: false,
        }
        return returnArtists
      })
      return festival
    })

    // Return without highlighting
    if (state.toJS().spotify === undefined) {
      return songkickFestivals
    }

    const spotifyTopBands = state.toJS().spotify.topBands.all
    const spotifySimilarBands = state.toJS().spotify.similarBands

    // Highlight similar and favorite bands
    songkickFestivals = songkickFestivals.map(festival => {
      festival.highlight = false
      festival.similar = false
      festival.artists = festival.artists.map(artist => {
        const returnArtists = {
          highlight: false,
          name: artist.name,
          similar: false,
        }

        if (spotifyTopBands.filter(_ => _.name === artist.name).length > 0) {
          returnArtists.highlight = true
          festival.highlight = true
        }

        if (spotifySimilarBands.filter(_ => _.name === artist.name).length > 0) {
          returnArtists.similar = true
          festival.similar = true
        }

        return returnArtists
      })

      return festival
    })

    return songkickFestivals.filter(_ => _.highlight || _.similar)
  });

export default makeSelectSongkick;
export {
  selectSongkickDomain,
  makeSelectSongkick,
  makeSelectSongkickTopFestivals
};
