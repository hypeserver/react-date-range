"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _DefinedRange = _interopRequireDefault(require("../DefinedRange"));

var _dateFns = require("date-fns");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('DefinedRange tests', () => {
  test('Should call "renderStaticRangeLabel" callback correct amount of times according to the "hasCustomRendering" option', () => {
    const renderStaticRangeLabel = jest.fn();
    (0, _enzyme.mount)(_react.default.createElement(_DefinedRange.default, {
      staticRanges: [{
        label: 'Dynamic Label',
        range: {},

        isSelected(range) {
          const definedRange = this.range();
          return (0, _dateFns.isSameDay)(range.startDate, definedRange.startDate) && (0, _dateFns.isSameDay)(range.endDate, definedRange.endDate);
        },

        hasCustomRendering: true
      }, {
        label: 'Static Label',
        range: {},

        isSelected(range) {
          const definedRange = this.range();
          return (0, _dateFns.isSameDay)(range.startDate, definedRange.startDate) && (0, _dateFns.isSameDay)(range.endDate, definedRange.endDate);
        }

      }, {
        label: 'Hede',
        range: {},

        isSelected(range) {
          const definedRange = this.range();
          return (0, _dateFns.isSameDay)(range.startDate, definedRange.startDate) && (0, _dateFns.isSameDay)(range.endDate, definedRange.endDate);
        },

        hasCustomRendering: true
      }],
      renderStaticRangeLabel: renderStaticRangeLabel
    }));
    expect(renderStaticRangeLabel).toHaveBeenCalledTimes(2);
  });
  test('Should render dynamic static label contents correctly', () => {
    const renderItalicLabelContent = () => _react.default.createElement("i", {
      className: 'italic-label-content'
    }, 'Italic Content');

    const renderBoldLabelContent = () => _react.default.createElement("b", {
      className: 'bold-label-content'
    }, 'Bold Content');

    const renderSomethingElse = () => _react.default.createElement("img", {
      className: 'random-image'
    });

    const renderStaticRangeLabel = function (staticRange) {
      let result;

      if (staticRange.id === 'italic') {
        result = renderItalicLabelContent();
      } else if (staticRange.id === 'bold') {
        result = renderBoldLabelContent();
      } else {
        result = renderSomethingElse();
      }

      return result;
    };

    const wrapper = (0, _enzyme.shallow)(_react.default.createElement(_DefinedRange.default, {
      staticRanges: [{
        id: 'italic',
        range: {},

        isSelected(range) {
          const definedRange = this.range();
          return (0, _dateFns.isSameDay)(range.startDate, definedRange.startDate) && (0, _dateFns.isSameDay)(range.endDate, definedRange.endDate);
        },

        hasCustomRendering: true
      }, {
        label: 'Static Label',
        range: {},

        isSelected(range) {
          const definedRange = this.range();
          return (0, _dateFns.isSameDay)(range.startDate, definedRange.startDate) && (0, _dateFns.isSameDay)(range.endDate, definedRange.endDate);
        }

      }, {
        id: 'whatever',
        range: {},

        isSelected(range) {
          const definedRange = this.range();
          return (0, _dateFns.isSameDay)(range.startDate, definedRange.startDate) && (0, _dateFns.isSameDay)(range.endDate, definedRange.endDate);
        },

        hasCustomRendering: true
      }, {
        id: 'bold',
        range: {},

        isSelected(range) {
          const definedRange = this.range();
          return (0, _dateFns.isSameDay)(range.startDate, definedRange.startDate) && (0, _dateFns.isSameDay)(range.endDate, definedRange.endDate);
        },

        hasCustomRendering: true
      }],
      renderStaticRangeLabel: renderStaticRangeLabel
    }));
    expect(wrapper).toMatchSnapshot();
  });
});