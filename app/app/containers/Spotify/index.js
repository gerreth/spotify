/**
 *
 * Spotify
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import {
  makeSelectSpotify,
  makeSelectSpotifyToken,
  makeSelectSpotifyTopBands,
} from './selectors';

import {
  getToken,
  getTopBands,
} from './actions'

import reducer from './reducer';
import {
  saga,
  topBandsSaga,
} from './saga';

import messages from './messages';

import Bands from 'containers/Bands';

/* eslint-disable react/prefer-stateless-function */
export class Spotify extends React.Component {
  componentDidMount() {
    if (this.props.spotify.token === undefined) this.props.getToken()
    // if (token !== undefined && (Object.keys(topBands).length === 0 && topBands.constructor === Object)) this.props.getTopBands()
	}

  render() {
    const {
      spotify: {
        token,
        topBands,
      },
    } = this.props

    const loggedIn = token !== undefined
    const bands = (Object.keys(topBands).length === 0 && topBands.constructor === Object) ? undefined : topBands

    return (
      <div>
        <Helmet>
          <title>Spotify</title>
          <meta name="description" content="Description of Spotify" />
        </Helmet>
        {bands &&
          <Bands topBands={bands} />
        }

        {!bands &&
          <input type="button" value="Submit" onClick={this.props.getTopBands} />
        }
      </div>
    );
  }
}

Spotify.propTypes = {
  getToken: PropTypes.func,
  getTopBands: PropTypes.func,
  // spotify: PropTypes.object,
  spotify: PropTypes.shape({
    similarBands: PropTypes.array,
    token: PropTypes.string,
    topBands: PropTypes.shape({
      short_term: PropTypes.array,
      medium_term: PropTypes.array,
      long_term: PropTypes.array,
      all: PropTypes.array,
    })
  }),
};

const mapStateToProps = createStructuredSelector({
  spotify: makeSelectSpotify(),
});

function mapDispatchToProps(dispatch) {
  return {
    getToken: () => dispatch(getToken()),
    getTopBands: () => dispatch(getTopBands()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'spotify', reducer });
const withSaga = injectSaga({ key: 'spotify', saga });

const topBands = injectSaga({ key: 'bands', saga: topBandsSaga });

export default compose(
  topBands,
  withReducer,
  withSaga,
  withConnect,
)(Spotify);
