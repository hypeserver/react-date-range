import React from 'react';
import dateFns from 'date-fns';
import DateRange from '../DateRange';
import renderer from 'react-test-renderer';

let testRenderer = null;
let instance = null;
const endDate = new Date();
const startDate = dateFns.subDays(endDate, 7);

const commonProps = {
  ranges: [{ startDate, endDate, key: 'selection' }],
  onChange: () => {},
  moveRangeOnFirstSelection: false,
};

const compareRanges = (newRange, assertionRange) => {
  ['startDate', 'endDate'].forEach(key => {
    if (!newRange[key] || !assertionRange[key]) {
      return expect(newRange[key]).toEqual(assertionRange[key]);
    }
    return expect(dateFns.isSameDay(newRange[key], assertionRange[key])).toEqual(true);
  });
};

beforeEach(() => {
  testRenderer = renderer.create(<DateRange {...commonProps} />);
  instance = testRenderer.getInstance();
});

describe('DateRange', () => {
  test('Should resolve', () => {
    expect(DateRange).toEqual(expect.anything());
  });

  test('calculate new selection by resetting end date', () => {
    const methodResult = instance.calcNewSelection(dateFns.subDays(endDate, 10), true);
    compareRanges(methodResult.range, {
      startDate: dateFns.subDays(endDate, 10),
      endDate: dateFns.subDays(endDate, 10),
    });
  });

  test('calculate new selection by resetting end date if start date is not before', () => {
    const methodResult = instance.calcNewSelection(dateFns.addDays(endDate, 2), true);
    compareRanges(methodResult.range, {
      startDate: dateFns.addDays(endDate, 2),
      endDate: dateFns.addDays(endDate, 2),
    });
  });

  test('calculate new selection based on moveRangeOnFirstSelection prop', () => {
    testRenderer.update(<DateRange {...commonProps} moveRangeOnFirstSelection />);
    const methodResult = instance.calcNewSelection(dateFns.subDays(endDate, 10), true);
    compareRanges(methodResult.range, {
      startDate: dateFns.subDays(endDate, 10),
      endDate: dateFns.subDays(endDate, 3),
    });
  });

  test('calculate new selection by retaining end date, based on retainEndDateOnFirstSelection prop', () => {
    testRenderer.update(<DateRange {...commonProps} retainEndDateOnFirstSelection />);
    const methodResult = instance.calcNewSelection(dateFns.subDays(endDate, 10), true);
    compareRanges(methodResult.range, {
      startDate: dateFns.subDays(endDate, 10),
      endDate,
    });
  });

  test('calculate new selection by retaining the unset end date, based on retainEndDateOnFirstSelection prop', () => {
    testRenderer.update(
      <DateRange
        {...commonProps}
        ranges={[{ ...commonProps.ranges[0], endDate: null }]}
        retainEndDateOnFirstSelection
      />
    );
    const methodResult = instance.calcNewSelection(dateFns.subDays(endDate, 10), true);
    compareRanges(methodResult.range, {
      startDate: dateFns.subDays(endDate, 10),
      endDate: null,
    });
  });
});
