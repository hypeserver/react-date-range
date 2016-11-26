'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = parseInput;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function parseInput(input, format, timeOfDay) {
  var output = null;

  if (typeof input === 'undefined' || typeof input === 'null' || !input || input === '') {
    output = (0, _moment2['default'])()[timeOfDay]('day');
  } else if (typeof input === 'string') {
    output = (0, _moment2['default'])(input, format)[timeOfDay]('day');
  } else if (typeof input === 'function') {
    output = parseInput(input((0, _moment2['default'])()[timeOfDay]('day')), format, timeOfDay);
  } else if (input._isAMomentObject) {
    output = input[timeOfDay]('day').clone();
  }

  return output;
}

module.exports = exports['default'];