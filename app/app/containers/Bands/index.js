/**
 *
 * Bands
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const BandsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

import Band from 'containers/Band/index';

/* eslint-disable react/prefer-stateless-function */
class Bands extends React.Component {
  render() {
    const {
      topBands
    } = this.props

    const bands = topBands.all && topBands.all.map((band) => {
      return <Band
        genres={band.genres}
        image={band.image}
        key={band.id}
        name={band.name}
      />;
    })

    return (
      <BandsWrapper>
        {bands}
      </BandsWrapper>
    );
  }
}

Bands.propTypes = {
  topBands: PropTypes.object.isRequired,
};

export default Bands;
