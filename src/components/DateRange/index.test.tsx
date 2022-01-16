import React from 'react';
import { subDays, addDays, isSameDay } from 'date-fns';
import DateRange, { calcNewSelectionGen, DateRangeCP, DateRangeDCP, defaultProps, getInitialFocusedRange } from '.';
import renderer, { ReactTestRenderer } from 'react-test-renderer';
import { isSureRange, NotFullyEmptyRange, SureStartEndDate } from '../../types';
import { combineProps } from '../../utils';

type DateRange = typeof DateRange;
let testRenderer: ReactTestRenderer;
const endDate = new Date();
const startDate = subDays(endDate, 7);

function getCalcNewSelection(componentProps: DateRangeCP) {
  const allProps = combineProps<DateRangeDCP, DateRangeCP>(defaultProps, componentProps);
  const calcNewSelection = calcNewSelectionGen(allProps, getInitialFocusedRange(allProps?.initialFocusedRange, allProps.ranges));
  return calcNewSelection;
}

const commonProps = {
  ranges: [{ startDate, endDate, key: 'selection' }],
  onChange: () => {},
  moveRangeOnFirstSelection: false,
};

const compareRanges = (assertionRange: NotFullyEmptyRange, newRange?: NotFullyEmptyRange) => {
  if (!newRange) {
    return expect(typeof newRange).toEqual(typeof assertionRange);
  }
  (['startDate', 'endDate'] as (keyof SureStartEndDate)[]).forEach(key => {
    if (!isSureRange(assertionRange) || !isSureRange(newRange)) {
      return expect(newRange[key]).toEqual(assertionRange[key]);
    }
    return expect(isSameDay(newRange[key], assertionRange[key])).toEqual(true);
  });
};

beforeEach(() => {
  testRenderer = renderer.create(<DateRange {...commonProps} />);
});

describe('DateRange', () => {
  test('Should resolve', () => {
    expect(DateRange).toEqual(expect.anything());
  });

  test('calculate new selection by resetting end date', () => {
    const calcNewSelection = getCalcNewSelection(commonProps);
    const methodResult = calcNewSelection(subDays(endDate, 10));
    compareRanges({
      startDate: subDays(endDate, 10),
      endDate: subDays(endDate, 10),
    }, methodResult?.range);
  });

  test('calculate new selection by resetting end date if start date is not before', () => {
    const calcNewSelection = getCalcNewSelection(commonProps);
    const methodResult = calcNewSelection(addDays(endDate, 2));
    compareRanges({
      startDate: addDays(endDate, 2),
      endDate: addDays(endDate, 2),
    }, methodResult?.range);
  });

  test('calculate new selection based on moveRangeOnFirstSelection prop', () => {
    const componentProps: DateRangeCP = {
      ...commonProps,
      moveRangeOnFirstSelection: true,
    };
    testRenderer.update(<DateRange {...componentProps} />);
    const calcNewSelection = getCalcNewSelection(componentProps);
    const methodResult = calcNewSelection(subDays(endDate, 10));
    compareRanges({
      startDate: subDays(endDate, 10),
      endDate: subDays(endDate, 3),
    }, methodResult?.range);
  });

  test('calculate new selection by retaining end date, based on retainEndDateOnFirstSelection prop', () => {
    const componentProps: DateRangeCP = {
      ...commonProps,
      retainEndDateOnFirstSelection: true,
    };
    testRenderer.update(<DateRange {...componentProps} />);
    const calcNewSelection = getCalcNewSelection(componentProps);
    const methodResult = calcNewSelection(subDays(endDate, 10));
    compareRanges({
      startDate: subDays(endDate, 10),
      endDate,
    }, methodResult?.range);
  });

  test('calculate new selection by retaining the unset end date, based on retainEndDateOnFirstSelection prop', () => {
    const componentProps: DateRangeCP = {
      ...commonProps,
      ranges: [{ ...commonProps.ranges[0], endDate: null }],
      retainEndDateOnFirstSelection: true,
    };
    testRenderer.update(<DateRange {...componentProps} />);
    const calcNewSelection = getCalcNewSelection(componentProps);
    const methodResult = calcNewSelection(subDays(endDate, 10));
    compareRanges({
      startDate: subDays(endDate, 10),
      endDate: null,
    }, methodResult?.range);
  });
});
