import dateFns from 'date-fns';
import DateRange from '../DateRange';
import { calcNewSelection, findNextRangeIndex } from '../../utils';

const endDate = new Date();
const startDate = dateFns.subDays(endDate, 7);

const commonProps = {
  ranges: [{ startDate, endDate, key: 'selection' }],
  onChange: () => {},
  moveRangeOnFirstSelection: false,
  focusedRange: [findNextRangeIndex([{ startDate, endDate, key: 'selection' }]), 0],
  disabledDates: [],
};

const compareRanges = (newRange, assertionRange) => {
  ['startDate', 'endDate'].forEach(key => {
    if (!newRange[key] || !assertionRange[key]) {
      return expect(newRange[key]).toEqual(assertionRange[key]);
    }
    return expect(dateFns.isSameDay(newRange[key], assertionRange[key])).toEqual(true);
  });
};

describe('DateRange', () => {
  test('Should resolve', () => {
    expect(DateRange).toEqual(expect.anything());
  });

  test('calculate new selection by resetting end date', () => {
    const methodResult = calcNewSelection(
      dateFns.subDays(endDate, 10),
      true,
      commonProps.focusedRange,
      commonProps.ranges,
      commonProps.onChange,
      undefined,
      commonProps.moveRangeOnFirstSelection,
      false,
      commonProps.disabledDates
    );
    compareRanges(methodResult.range, {
      startDate: dateFns.subDays(endDate, 10),
      endDate: dateFns.subDays(endDate, 10),
    });
  });

  test('calculate new selection by resetting end date if start date is not before', () => {
    const methodResult = calcNewSelection(
      dateFns.addDays(endDate, 2),
      true,
      commonProps.focusedRange,
      commonProps.ranges,
      commonProps.onChange,
      undefined,
      commonProps.moveRangeOnFirstSelection,
      false,
      commonProps.disabledDates
    );
    compareRanges(methodResult.range, {
      startDate: dateFns.addDays(endDate, 2),
      endDate: dateFns.addDays(endDate, 2),
    });
  });

  test('calculate new selection based on moveRangeOnFirstSelection prop', () => {
    const methodResult = calcNewSelection(
      dateFns.subDays(endDate, 10),
      true,
      commonProps.focusedRange,
      commonProps.ranges,
      commonProps.onChange,
      undefined,
      true,
      false,
      commonProps.disabledDates
    );
    compareRanges(methodResult.range, {
      startDate: dateFns.subDays(endDate, 10),
      endDate: dateFns.subDays(endDate, 3),
    });
  });

  test('calculate new selection by retaining end date, based on retainEndDateOnFirstSelection prop', () => {
    const methodResult = calcNewSelection(
      dateFns.subDays(endDate, 10),
      true,
      commonProps.focusedRange,
      commonProps.ranges,
      commonProps.onChange,
      undefined,
      commonProps.moveRangeOnFirstSelection,
      true,
      commonProps.disabledDates
    );
    compareRanges(methodResult.range, {
      startDate: dateFns.subDays(endDate, 10),
      endDate,
    });
  });

  test('calculate new selection by retaining the unset end date, based on retainEndDateOnFirstSelection prop', () => {
    const methodResult = calcNewSelection(
      dateFns.subDays(endDate, 10),
      true,
      [findNextRangeIndex([{ ...commonProps.ranges[0], endDate: null }]), 0],
      [{ ...commonProps.ranges[0], endDate: null }],
      commonProps.onChange,
      undefined,
      commonProps.moveRangeOnFirstSelection,
      true,
      commonProps.disabledDates
    );
    compareRanges(methodResult.range, {
      startDate: dateFns.subDays(endDate, 10),
      endDate: null,
    });
  });
});
