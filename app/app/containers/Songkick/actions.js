/*
 *
 * Songkick actions
 *
 */

import { GET_FESTIVALS, GET_FESTIVALS_SUCCESS } from './constants';

export function getFestivals() {
  return {
    type: GET_FESTIVALS,
  };
}

export function setFestivals(festivals) {
  return {
    type: GET_FESTIVALS_SUCCESS,
    festivals,
  };
}
