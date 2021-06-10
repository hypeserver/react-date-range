"use strict";

var _DateRange = _interopRequireDefault(require("../DateRange"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('DateRange', function () {
  test('Should resolve', function () {
    expect(_DateRange.default).toEqual(expect.anything());
  });
});