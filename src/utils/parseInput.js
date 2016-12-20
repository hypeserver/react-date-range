import moment from 'moment';

export default function parseInput(input, format, timeOfDay) {
  let output = null;

  if (typeof input === 'undefined' ||  typeof input === 'null' || !input || input === '') {
    output = moment()[timeOfDay]('day');
  } else if (typeof input === 'string') {
    output = moment(input, format)[timeOfDay]('day');
  } else if (typeof input === 'function') {
    output = parseInput( input(moment()[timeOfDay]('day')) , format, timeOfDay);
  } else if (input._isAMomentObject) {
    output = input[timeOfDay]('day').clone();
  }

  return output;
}
