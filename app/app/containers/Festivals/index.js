/**
 *
 * Festivals
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const FestivalsWrapper = styled.div`
  margin: 0 auto;
  text-align: center;
  width: 800px;
`;

const MonthSeperator = styled.div`
  font-size: 2.75em;
  margin-bottom: 75px;
  margin-top: 75px;
  text-transform: uppercase;
`;

import Festival from 'containers/Festival/index';

/* eslint-disable react/prefer-stateless-function */
class Festivals extends React.Component {
  sortByDate(a,b) {
    if (a.date.start < b.date.start)
      return -1;
    if (a.date.start > b.date.start)
      return 1;
    return 0;
  }

  getMonth(date) {
    return date.split('-')[1]
  }

  getMonthName(month) {
    const months = {
      '01': 'Januar',
      '02': 'Februar',
      '03': 'März',
      '04': 'April',
      '05': 'Mai',
      '06': 'Juni',
      '07': 'Juli',
      '08': 'August',
      '09': 'September',
      '10': 'Oktober',
      '11': 'November',
      '12': 'Dazember',
    }

    return months[month]
  }

  render() {
    const {
      festivals
    } = this.props
    //
    let month = '01'

    const topFestivals = festivals && festivals.sort(this.sortByDate).map((festival, index) => {
      if (2*festival.highlightCount + festival.similarCount > 3) {
        if (this.getMonth(festival.date.start) !== month) {
          month = this.getMonth(festival.date.start)
          return <React.Fragment key={`Fragment_${index}`}>
            <MonthSeperator key={`MonthSeperator_${index}`}>:: {this.getMonthName(month)} ::</MonthSeperator>
            <Festival
              key={index}
              artists={festival.artists}
              date={festival.date}
              name={festival.name}
              location={festival.location}
              highlight={festival.highlight}
              highlightCount={festival.highlightCount}
              similar={festival.similar}
              similarCount={festival.similarCount}
            />
          </React.Fragment>;
        } else {
          return <Festival
            key={index}
            artists={festival.artists}
            date={festival.date}
            location={festival.location}
            name={festival.name}
            highlight={festival.highlight}
            highlightCount={festival.highlightCount}
            similar={festival.similar}
            similarCount={festival.similarCount}
          />;
        }
      }
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
