import moment from 'moment';

export default function parseInput(input, format) {
  let output = null;

  if (typeof input === 'undefined' ||  typeof input === 'null' || !input || input === '') {
    output = moment().startOf('day');
  } else if (typeof input === 'string') {
    output = moment(input, format).startOf('day');
  } else if (typeof input === 'function') {
    output = parseInput( input(moment().startOf('day')) , format);
  } else if (input._isAMomentObject) {
    output = input.startOf('day').clone();
  }

  return output;
}
