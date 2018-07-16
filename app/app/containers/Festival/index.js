/**
 *
 * Festival
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const FestivalWrapper = styled.div`
  line-height: 1.4;
  margin-top: 50px;
`;

const BandsWrapper = styled.div`

`;

const headlineStyle = {
  fontSize: '1.75em',
  padding: '6px',
};

const highlightStyle = {
  background: '#FEE837',
  cursor: 'pointer',
  fontSize: '1.1em',
  fontWeight: 600,
};

const similarStyle = {
  background: '#FEE837',
  cursor: 'pointer',
};

const spanStyle = {

}

const locationStyle = {
  color: '#999',
  fontSize: '.8em',
  fontWeight: 600,
}

const dateStyle = {
  color: '#999',
  fontSize: '.8em',
}

/* eslint-disable react/prefer-stateless-function */
class Festival extends React.Component {
  formatDate(date) {
    const newDate = date.split('-')
    return [newDate[2],newDate[1],newDate[0]].join('.')
  }

  render() {
    const {
      artists,
      date,
      highlight,
      highlightCount,
      location,
      name,
      similar,
      similarCount,
    } = this.props

    const count = 2*highlightCount + similarCount
    const bands = artists && artists.map((artist, index) => {
      const seperator = (index === artists.length-1) ? '' : ', '
      if (artist.highlight) {
        return <React.Fragment><span key={index} style={{ ...highlightStyle, ...spanStyle }}>{artist.name}</span>{ seperator } </React.Fragment>
      } else if (artist.similar) {
        return <React.Fragment><span key={index} style={{ ...similarStyle, ...spanStyle }}>{artist.name}</span>{ seperator } </React.Fragment>
      } else {
        return <React.Fragment><span key={index} style={ spanStyle }>{artist.name}</span>{ seperator } </React.Fragment>
      }
    })

    return (
      <FestivalWrapper>
        <div>
          <span style={ locationStyle }>{location}</span>
        </div>
        <div>
          <span style={ dateStyle }>{this.formatDate(date.start)} - {this.formatDate(date.end)}</span>
        </div>
        <h3 style={ headlineStyle }>{name}</h3>
        <BandsWrapper>
          {bands}
        </BandsWrapper>
      </FestivalWrapper>
    );
  }
}

Festival.propTypes = {
  artists: PropTypes.array,
  date: PropTypes.object,
  highlight: PropTypes.bool,
  highlightCount: PropTypes.number,
  location: PropTypes.string,
  name: PropTypes.string,
  similar: PropTypes.bool,
  similarCount: PropTypes.number,
};

export default Festival;
