import classnames from "classnames";
import { isValid, subDays } from "date-fns";
import coreStyles from "./styles";
import { calcFocusDate, CalcFocusDateProps, findNextRangeIndex, generateStyles, getMonthDisplayRange, isStylesMap } from "./utils";

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

describe('Utils:generateStyles', () => {
  test('should return a coreStyles on empty augmentation', () => {
    const generated = generateStyles([coreStyles, {}]);
    expect(generated).toEqual(coreStyles);
  });
  test('should return a combination of default classes and user classes', () => {
    const augmentation = { dateRangePickerWrapper: "hello" };
    const generated = generateStyles([coreStyles, augmentation]);
    const combined = {
      ...coreStyles,
      dateRangePickerWrapper: `${coreStyles.dateRangePickerWrapper} ${augmentation.dateRangePickerWrapper}`,
    };
    expect(generated).toEqual(combined);
  });
});

describe('Utils:isStyleMap', () => {
  test('should categorize coreStyles as a stylemap', () => {
    expect(isStylesMap(coreStyles)).toEqual(true);
  });
  test('should deem an empty object as a stylemap', () => {
    expect(isStylesMap({})).toEqual(true);
  });
});

describe('Utils:classnames()', () => {
  test('what does it look like?', () => {
    expect(classnames([], [])).toEqual("");
  });
  test('what does it look like [a] []?', () => {
    expect(classnames(['a'], [])).toEqual("a");
  });
  test('what does it look like [a] [b]?', () => {
    expect(classnames(['a'], ['b'])).toEqual("a b");
  });
  test('what does it look like [a] [b,c]?', () => {
    expect(classnames(['a'], ['b', 'c'])).toEqual("a b c");
  });
  test('what does it look like [a] [b c]?', () => {
    expect(classnames(['a'], ['b c'])).toEqual("a b c");
  });
});