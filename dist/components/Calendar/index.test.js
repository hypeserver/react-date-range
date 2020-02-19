"use strict";

var _Calendar = _interopRequireDefault(require("../Calendar"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Calendar', () => {
  test('Should resolve', () => {
    expect(_Calendar.default).toEqual(expect.anything());
  });
});