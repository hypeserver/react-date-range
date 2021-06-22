"use strict";

var _react = _interopRequireDefault(require("react"));

var _isSameDay = _interopRequireDefault(require("date-fns/isSameDay"));

var _addDays = _interopRequireDefault(require("date-fns/addDays"));

var _subDays = _interopRequireDefault(require("date-fns/subDays"));

var _DateRange = _interopRequireDefault(require("../DateRange"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var testRenderer = null;
var instance = null;
var endDate = new Date();
var startDate = (0, _subDays.default)(endDate, 7);
var commonProps = {
  ranges: [{
    startDate: startDate,
    endDate: endDate,
    key: 'selection'
  }],
  onChange: function onChange() {},
  moveRangeOnFirstSelection: false
};

var compareRanges = function compareRanges(newRange, assertionRange) {
  ['startDate', 'endDate'].forEach(function (key) {
    if (!newRange[key] || !assertionRange[key]) {
      return expect(newRange[key]).toEqual(assertionRange[key]);
    }

    return expect((0, _isSameDay.default)(newRange[key], assertionRange[key])).toEqual(true);
  });
};

beforeEach(function () {
  testRenderer = _reactTestRenderer.default.create( /*#__PURE__*/_react.default.createElement(_DateRange.default, commonProps));
  instance = testRenderer.getInstance();
});
describe('DateRange', function () {
  test('Should resolve', function () {
    expect(_DateRange.default).toEqual(expect.anything());
  });
  test('calculate new selection by resetting end date', function () {
    var methodResult = instance.calcNewSelection((0, _subDays.default)(endDate, 10), true);
    compareRanges(methodResult.range, {
      startDate: (0, _subDays.default)(endDate, 10),
      endDate: (0, _subDays.default)(endDate, 10)
    });
  });
  test('calculate new selection by resetting end date if start date is not before', function () {
    var methodResult = instance.calcNewSelection((0, _addDays.default)(endDate, 2), true);
    compareRanges(methodResult.range, {
      startDate: (0, _addDays.default)(endDate, 2),
      endDate: (0, _addDays.default)(endDate, 2)
    });
  });
  test('calculate new selection based on moveRangeOnFirstSelection prop', function () {
    testRenderer.update( /*#__PURE__*/_react.default.createElement(_DateRange.default, _extends({}, commonProps, {
      moveRangeOnFirstSelection: true
    })));
    var methodResult = instance.calcNewSelection((0, _subDays.default)(endDate, 10), true);
    compareRanges(methodResult.range, {
      startDate: (0, _subDays.default)(endDate, 10),
      endDate: (0, _subDays.default)(endDate, 3)
    });
  });
  test('calculate new selection by retaining end date, based on retainEndDateOnFirstSelection prop', function () {
    testRenderer.update( /*#__PURE__*/_react.default.createElement(_DateRange.default, _extends({}, commonProps, {
      retainEndDateOnFirstSelection: true
    })));
    var methodResult = instance.calcNewSelection((0, _subDays.default)(endDate, 10), true);
    compareRanges(methodResult.range, {
      startDate: (0, _subDays.default)(endDate, 10),
      endDate: endDate
    });
  });
  test('calculate new selection by retaining the unset end date, based on retainEndDateOnFirstSelection prop', function () {
    testRenderer.update( /*#__PURE__*/_react.default.createElement(_DateRange.default, _extends({}, commonProps, {
      ranges: [_objectSpread(_objectSpread({}, commonProps.ranges[0]), {}, {
        endDate: null
      })],
      retainEndDateOnFirstSelection: true
    })));
    var methodResult = instance.calcNewSelection((0, _subDays.default)(endDate, 10), true);
    compareRanges(methodResult.range, {
      startDate: (0, _subDays.default)(endDate, 10),
      endDate: null
    });
  });
});