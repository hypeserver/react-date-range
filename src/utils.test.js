import { endOfMonth, startOfMonth } from 'date-fns';
import { calcFocusDate } from './utils';

describe('calcFocusDate', () => {
  const ranges = [
    {
      startDate: new Date(2021, 0, 10),
      endDate: new Date(2022, 10, 20),
    },
  ];

  describe('when focusedRange[1] equals 0', () => {
    test('should return startDate', () => {
      expect(
        calcFocusDate(new Date(), {
          ranges,
          focusedRange: [0, 0],
          displayMode: 'dateRange',
        })
      ).toEqual(startOfMonth(ranges[0].startDate));
    });
  });

  describe('when focusedRange[1] equals 1', () => {
    test('should return endDate', () => {
      expect(
        calcFocusDate(new Date(), {
          ranges,
          focusedRange: [0, 1],
          displayMode: 'dateRange',
        })
      ).toEqual(endOfMonth(ranges[0].endDate));
    });
  });
});
