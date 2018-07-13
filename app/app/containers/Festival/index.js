/**
 *
 * Festival
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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

const dateStyle = {
  color: '#999',
  fontSize: '.8em',
}

/* eslint-disable react/prefer-stateless-function */
class Festival extends React.Component {
  render() {
    const {
      artists,
      date,
      highlight,
      name,
      similar,
    } = this.props

    const bands = artists && artists.map((artist, index) => {
      const seperator = (index === artists.length-1) ? '' : ', '
      if (artist.highlight) {
        return <React.Fragment><span style={{ ...highlightStyle, ...spanStyle }}>{artist.name}</span>{ seperator } </React.Fragment>
      } else if (artist.similar) {
        return <React.Fragment><span style={{ ...similarStyle, ...spanStyle }}>{artist.name}</span>{ seperator } </React.Fragment>
      } else {
        return <React.Fragment><span style={ spanStyle }>{artist.name}</span>{ seperator } </React.Fragment>
      }
    })

    return (
      <div>
        <div>
          <div>
            <span style={ dateStyle }>{date.start} - {date.end}</span>
            <h3>{name}</h3>
            <div>
              {bands}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Festival.propTypes = {
  artists: PropTypes.array,
  date: PropTypes.object,
  highlight: PropTypes.bool,
  name: PropTypes.string,
  similar: PropTypes.bool,
};

export default Festival;
