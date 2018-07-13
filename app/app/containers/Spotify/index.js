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
    const {
      spotify: {
        token,
        topBands,
      }
    } = this.props

    if (token === undefined) this.props.getToken()
    if (token !== undefined && (Object.keys(topBands).length === 0 && topBands.constructor === Object)) this.props.getTopBands()
    this.props.getTopBands()
	}

  render() {
    const {
      spotify: {
        token,
        topBands,
      },
    } = this.props

    const loggedIn = token !== undefined

    return (
      <div>
        <Helmet>
          <title>Spotify</title>
          <meta name="description" content="Description of Spotify" />
        </Helmet>
        {topBands &&
          <Bands topBands={topBands} />
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
    similarBands: PropTypes.object,
    token: PropTypes.string,
    topBands: PropTypes.object,
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
