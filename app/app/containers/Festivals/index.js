/**
 *
 * Festivals
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const FestivalsWrapper = styled.div`

`;

import Festival from 'containers/Festival/index';

/* eslint-disable react/prefer-stateless-function */
class Festivals extends React.Component {
  render() {
    const {
      festivals
    } = this.props

    const topFestivals = festivals && festivals.map((festival) => {
      return <Festival
        artists={festival.artists}
        date={festival.date}
        name={festival.name}
        highlight={festival.highlight}
        similar={festival.similar}
      />;
    })

    return (
      <FestivalsWrapper>
        {topFestivals}
      </FestivalsWrapper>
    );
  }
}

Festivals.propTypes = {
  festivals: PropTypes.array.isRequired,
};

export default Festivals;
