import React from 'react';
import { subDays, addDays, isSameDay } from 'date-fns';
import DateRange from '../DateRange';
import renderer from 'react-test-renderer';

let testRenderer = null;
const endDate = new Date();
const startDate = subDays(endDate, 7);

const commonProps = {
  ranges: [{ startDate, endDate, key: 'selection' }],
  onChange: () => {},
  moveRangeOnFirstSelection: false,
};

const compareRanges = (newRange, assertionRange) => {
  expect(isSameDay(newRange.startDate, assertionRange.startDate)).toEqual(true);
  expect(isSameDay(newRange.endDate, assertionRange.endDate)).toEqual(true);
};

beforeEach(() => {
  testRenderer = renderer.create(<DateRange {...commonProps} />);
});

describe('DateRange', () => {
  test('Should resolve', () => {
    expect(DateRange).toEqual(expect.anything());
  });

  test('calculate new selection without moving end date', () => {
    const instance = testRenderer.getInstance();
    const methodResult = instance.calcNewSelection(subDays(endDate, 10), true);
    compareRanges(methodResult.range, {
      startDate: subDays(endDate, 10),
      endDate,
    });
  });

  test('calculate new selection by resetting end date if start date is not before', () => {
    const instance = testRenderer.getInstance();
    const methodResult = instance.calcNewSelection(addDays(endDate, 2), true);
    compareRanges(methodResult.range, {
      startDate: addDays(endDate, 2),
      endDate: addDays(endDate, 2),
    });
  });

  test('calculate new selection based on moveRangeOnFirstSelection prop', () => {
    testRenderer.update(<DateRange {...commonProps} moveRangeOnFirstSelection />);
    const instance = testRenderer.getInstance();
    const methodResult = instance.calcNewSelection(subDays(endDate, 10), true);
    compareRanges(methodResult.range, {
      startDate: subDays(endDate, 10),
      endDate: subDays(endDate, 3),
    });
  });
});
