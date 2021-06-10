"use strict";

var _Calendar = _interopRequireDefault(require("../Calendar"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Calendar', function () {
  test('Should resolve', function () {
    expect(_Calendar.default).toEqual(expect.anything());
  });
});