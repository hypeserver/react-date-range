"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _DefinedRange = _interopRequireDefault(require("../DefinedRange"));

var _isSameDay = _interopRequireDefault(require("date-fns/isSameDay"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('DefinedRange tests', function () {
  test('Should call "renderStaticRangeLabel" callback correct amount of times according to the "hasCustomRendering" option', function () {
    var renderStaticRangeLabel = jest.fn();
    (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_DefinedRange.default, {
      staticRanges: [{
        label: 'Dynamic Label',
        range: {},
        isSelected: function isSelected(range) {
          var definedRange = this.range();
          return (0, _isSameDay.default)(range.startDate, definedRange.startDate) && (0, _isSameDay.default)(range.endDate, definedRange.endDate);
        },
        hasCustomRendering: true
      }, {
        label: 'Static Label',
        range: {},
        isSelected: function isSelected(range) {
          var definedRange = this.range();
          return (0, _isSameDay.default)(range.startDate, definedRange.startDate) && (0, _isSameDay.default)(range.endDate, definedRange.endDate);
        }
      }, {
        label: 'Hede',
        range: {},
        isSelected: function isSelected(range) {
          var definedRange = this.range();
          return (0, _isSameDay.default)(range.startDate, definedRange.startDate) && (0, _isSameDay.default)(range.endDate, definedRange.endDate);
        },
        hasCustomRendering: true
      }],
      renderStaticRangeLabel: renderStaticRangeLabel
    }));
    expect(renderStaticRangeLabel).toHaveBeenCalledTimes(2);
  });
  test('Should render dynamic static label contents correctly', function () {
    var renderItalicLabelContent = function renderItalicLabelContent() {
      return /*#__PURE__*/_react.default.createElement("i", {
        className: 'italic-label-content'
      }, 'Italic Content');
    };

    var renderBoldLabelContent = function renderBoldLabelContent() {
      return /*#__PURE__*/_react.default.createElement("b", {
        className: 'bold-label-content'
      }, 'Bold Content');
    };

    var renderSomethingElse = function renderSomethingElse() {
      return /*#__PURE__*/_react.default.createElement("img", {
        className: 'random-image'
      });
    };

    var renderStaticRangeLabel = function renderStaticRangeLabel(staticRange) {
      var result;

      if (staticRange.id === 'italic') {
        result = renderItalicLabelContent();
      } else if (staticRange.id === 'bold') {
        result = renderBoldLabelContent();
      } else {
        result = renderSomethingElse();
      }

      return result;
    };

    var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_DefinedRange.default, {
      staticRanges: [{
        id: 'italic',
        range: {},
        isSelected: function isSelected(range) {
          var definedRange = this.range();
          return (0, _isSameDay.default)(range.startDate, definedRange.startDate) && (0, _isSameDay.default)(range.endDate, definedRange.endDate);
        },
        hasCustomRendering: true
      }, {
        label: 'Static Label',
        range: {},
        isSelected: function isSelected(range) {
          var definedRange = this.range();
          return (0, _isSameDay.default)(range.startDate, definedRange.startDate) && (0, _isSameDay.default)(range.endDate, definedRange.endDate);
        }
      }, {
        id: 'whatever',
        range: {},
        isSelected: function isSelected(range) {
          var definedRange = this.range();
          return (0, _isSameDay.default)(range.startDate, definedRange.startDate) && (0, _isSameDay.default)(range.endDate, definedRange.endDate);
        },
        hasCustomRendering: true
      }, {
        id: 'bold',
        range: {},
        isSelected: function isSelected(range) {
          var definedRange = this.range();
          return (0, _isSameDay.default)(range.startDate, definedRange.startDate) && (0, _isSameDay.default)(range.endDate, definedRange.endDate);
        },
        hasCustomRendering: true
      }],
      renderStaticRangeLabel: renderStaticRangeLabel
    }));
    expect(wrapper).toMatchSnapshot();
  });
});