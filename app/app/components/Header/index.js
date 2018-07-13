/**
 *
 * Header
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';

import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import messages from './messages';

const HeaderWrapper = styled.div`
  background: #FEE837;
  line-height: 30px;
  padding: 20px;

  a {
    color: #333;
    font-weight: 600;
    padding: 0 10px;
    text-decoration: none;
    text-transform: uppercase;
  }
`;

/* eslint-disable react/prefer-stateless-function */
class Header extends React.Component {
  render() {
    return (
      <HeaderWrapper>
        <Link to="/">Home</Link>
        <Link to="/lastfm">Lastfm</Link>
        <Link to="/songkick">Songkick</Link>
        <Link to="/spotify">Spotify</Link>
      </HeaderWrapper>
    );
  }
}

Header.propTypes = {};

export default Header;
