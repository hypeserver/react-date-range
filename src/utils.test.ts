import { isValid, subDays } from "date-fns";
import { calcFocusDate, CalcFocusDateProps, findNextRangeIndex, getMonthDisplayRange } from "./utils";

describe('Utils:getMonthDisplayRange', () => {
  test('should have all properties with proper value types', () => {
    const now = new Date();
    const range = getMonthDisplayRange(now, { weekStartsOn: 0 });
    expect(range).toMatchObject({ end: expect.any(Date), endDateOfMonth: expect.any(Date), start: expect.any(Date), startDateOfMonth: expect.any(Date), });
  });
});

describe('Utils:calcFocusDateRangeMode', () => {
  test('should run calcFocusDate in displayMode="date" by default', () => {
    const endDate = new Date();
    const startDate = subDays(endDate, 7);
    const props = {
      shownDate: undefined,
      months: 1,
      ranges: [
        {
          startDate,
          endDate,
          key: 'selection'
        }
      ],
      focusedRange: [ 0, 0 ]
    }
    const calcDate = calcFocusDate(null, props);
    expect(calcDate).toBeInstanceOf(Date);
    expect(isValid(calcDate)).toBeTruthy();
  });

  test('should run calcFocusDate in displayMode="dateRange" when provided', () => {
    const endDate = new Date();
    const startDate = subDays(endDate, 7);
    const props: CalcFocusDateProps = {
      displayMode: 'dateRange',
      shownDate: undefined,
      months: 1,
      ranges: [
        {
          startDate,
          endDate,
          key: 'selection'
        }
      ],
      focusedRange: [ 0, 0 ]
    }
    const calcDate = calcFocusDate(null, props);
    expect(calcDate).toBeInstanceOf(Date);
    expect(isValid(calcDate)).toEqual(true);
  });
});

describe('Utils:findNextRangeIndex', () => {
  test('should get the first range when range.autoFocus and range.disabled is not expliciitely put to "false"', () => {
    const endDate = new Date();
    const startDate = subDays(endDate, 7);

    const ranges = [{ startDate, endDate, key: 'selection' }];
    const nextRangeIndex = findNextRangeIndex(ranges);

    expect(nextRangeIndex).toEqual(0);
  });
});