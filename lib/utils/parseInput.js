'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = parseInput;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function parseInput(input, format) {
  var output = null;

  if (typeof input === 'undefined' || typeof input === 'null' || !input || input === '') {
    output = (0, _moment2['default'])().startOf('day');
  } else if (typeof input === 'string') {
    output = (0, _moment2['default'])(input, format).startOf('day');
  } else if (typeof input === 'function') {
    output = parseInput(input((0, _moment2['default'])().startOf('day')), format);
  } else if (input._isAMomentObject) {
    output = input.startOf('day').clone();
  }

  return output;
}

module.exports = exports['default'];