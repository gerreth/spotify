/**
 *
 * Lastfm
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
import makeSelectLastfm from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class Lastfm extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Lastfm</title>
          <meta name="description" content="Description of Lastfm" />
        </Helmet>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

Lastfm.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  lastfm: makeSelectLastfm(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'lastfm', reducer });
const withSaga = injectSaga({ key: 'lastfm', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Lastfm);
