import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import reducer from './reducer';
import saga from './saga';
import { makeSelectSpotifyToken } from './selectors';

import { setToken } from './actions'

class SpotifyCallback extends React.Component {
  componentWillMount() {
    this.props.setToken()
	}

  render () {
     return <Redirect to='/spotify' />;
   }
}

SpotifyCallback.propTypes = {
  setToken: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    setToken: () => dispatch(setToken()),
  };
}

const mapStateToProps = createStructuredSelector({
  token: makeSelectSpotifyToken(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'spotify', reducer });
const withSaga = injectSaga({ key: 'spotify', saga });

export default compose(
  withConnect,
  withReducer,
  withSaga,
)(SpotifyCallback);
// <Redirect to='/spotify' />;
