import moment from 'moment';

export default function parseInput(input, format) {
  let output = null;

  if (typeof input === 'undefined' ||  typeof input === 'null' || !input || input === '') {
    output = moment().hours(12);
  } else if (typeof input === 'string') {
    output = moment(input, format).hours(12);
  } else if (typeof input === 'function') {
    output = parseInput( input(moment().hours(12)) , format);
  } else if (input._isAMomentObject) {
    output = input.hours(12).clone();
  }

  return output;
}
