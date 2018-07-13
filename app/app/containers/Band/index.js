/**
 *
 * Band
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const BandWrapper = styled.div`
  position: relative;
  width: 25%;

  :before {
  	content: "";
  	display: block;
  	padding-top: 100%; 	/* initial ratio of 1:1*/
  }

  img {
    height: 100%;
    width: 100%;
  }
`;

const BandInnerWrapper = styled.div`
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
`;

const BandName = styled.div`
  background: rgba(255,255,255,1);
  bottom: 0;
  font-weight: 600;
  padding: 2px 10px;
  position: absolute;
  right: 0;
`;

const BandImage = styled.div`
  height: 100%;
  width: 100%;
`;

/* eslint-disable react/prefer-stateless-function */
class Band extends React.Component {
  render() {
    const {
      image,
      name,
    } = this.props

    return (
      <BandWrapper>
        <BandInnerWrapper>
          <BandName>
            <span>{name}</span>
          </BandName>
          <BandImage>
            <img src={image} />
          </BandImage>
        </BandInnerWrapper>
      </BandWrapper>
    );
  }
}

Band.propTypes = {
  key: PropTypes.string,
  image: PropTypes.string,
  name: PropTypes.string.isRequired,
};

export default Band;
