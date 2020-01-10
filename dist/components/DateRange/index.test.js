"use strict";

var _DateRange = _interopRequireDefault(require("../DateRange"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('DateRange', () => {
  test('Should resolve', () => {
    expect(_DateRange.default).toEqual(expect.anything());
  });
});