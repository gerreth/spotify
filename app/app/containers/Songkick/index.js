/**
 *
 * Songkick
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
import { makeSelectSongkick, makeSelectSongkickTopFestivals } from './selectors';

import reducer from './reducer';
import { saga } from './saga';

import { getFestivals } from './actions'

import messages from './messages';

import Festivals from 'containers/Festivals';


/* eslint-disable react/prefer-stateless-function */
export class Songkick extends React.Component {
  componentDidMount() {
    this.props.getFestivals()
	}

  render() {
    const {
      songkick: {
        festivals,
      },
      topFestivals,
    } = this.props

    return (
      <div>
        <Helmet>
          <title>Songkick</title>
          <meta name="description" content="Description of Songkick" />
        </Helmet>
        {topFestivals &&
          <Festivals festivals={topFestivals} />
        }
      </div>
    );
  }
}

Songkick.propTypes = {
  getFestivals: PropTypes.func,
  songkick: PropTypes.object,
  topFestivals: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  songkick: makeSelectSongkick(),
  topFestivals: makeSelectSongkickTopFestivals(),
});

function mapDispatchToProps(dispatch) {
  return {
    getFestivals: () => dispatch(getFestivals()),
  };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'songkick', reducer });
const withSaga = injectSaga({ key: 'songkick', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Songkick);
