import {
  addDays,
  endOfDay,
  startOfDay,
  startOfMonth,
  endOfMonth,
  addMonths,
  startOfWeek,
  endOfWeek,
  isSameDay,
  differenceInCalendarDays,
} from 'date-fns';
import { compose } from 'ramda';
import { InputRangeWihLabel, isWithRangeGen, MaybeMaybeRange, Range, SureStartEndDate, WeekStartsOn, WithIsSelected, WithRangeOrRangeGen } from './types';

type GenProps = { weekStartsOn: WeekStartsOn; }
const definedsGen = ({ weekStartsOn }: GenProps): DefinedDates => ({
  startOfWeek: startOfWeek(new Date(), { weekStartsOn }),
  endOfWeek: endOfWeek(new Date(), { weekStartsOn }),
  startOfLastWeek: startOfWeek(addDays(new Date(), -7), { weekStartsOn }),
  endOfLastWeek: endOfWeek(addDays(new Date(), -7), { weekStartsOn }),
  startOfToday: startOfDay(new Date()),
  endOfToday: endOfDay(new Date()),
  startOfYesterday: startOfDay(addDays(new Date(), -1)),
  endOfYesterday: endOfDay(addDays(new Date(), -1)),
  startOfMonth: startOfMonth(new Date()),
  endOfMonth: endOfMonth(new Date()),
  startOfLastMonth: startOfMonth(addMonths(new Date(), -1)),
  endOfLastMonth: endOfMonth(addMonths(new Date(), -1)),
});

type DefinedDates = {
  startOfWeek: Date;
  endOfWeek: Date;
  startOfLastWeek: Date;
  endOfLastWeek: Date;
  startOfToday: Date;
  endOfToday: Date;
  startOfYesterday: Date;
  endOfYesterday: Date;
  startOfMonth: Date;
  endOfMonth: Date;
  startOfLastMonth: Date;
  endOfLastMonth: Date;
};

const defineds: DefinedDates = definedsGen({ weekStartsOn: 0 });

export function getEmptyRange(startDate: Date | number = 0, endDate: Date | number = 0): SureStartEndDate<Date | number> {
  return {
    startDate,
    endDate,
  }
}

export function isSameRangeDay(someRange: Range, otherRange: Range): boolean {
  const isSameStart = (someRange.startDate && otherRange.startDate && isSameDay(someRange.startDate, otherRange.startDate))
    || (!someRange.startDate && !otherRange.startDate);
  const isSameEnd = (someRange.endDate && otherRange.endDate && isSameDay(someRange.endDate, otherRange.endDate))
    || (!someRange.endDate && !otherRange.endDate);
  return isSameStart && isSameEnd;
}

export function extractRange(wr: WithRangeOrRangeGen): Range {
  if (isWithRangeGen(wr)) {
    return wr.range();
  }
  return wr.range as Range;
}

const staticRangeHandler = <B, U extends { [k: PropertyKey]: B; }, T extends WithRangeOrRangeGen & U>(withRangeOrRangeGen: T): T & WithIsSelected => ({
  ...withRangeOrRangeGen,
  isSelected(range: SureStartEndDate) {
    return isSameRangeDay(range, extractRange(this));
  },
});

export function createStaticRanges<B, U extends { [k: PropertyKey]: B; }, T extends WithRangeOrRangeGen & U>(ranges: T[]) {
  return ranges.map(staticRangeHandler);
}

export const defaultStaticRangesGenerator = (defineds: DefinedDates) =>
  createStaticRanges([
    {
      label: 'Last Month',
      range: () => ({
        startDate: defineds.startOfLastMonth,
        endDate: defineds.endOfLastMonth,
      }),
    },
    {
      label: 'Last Week',
      range: () => ({
        startDate: defineds.startOfLastWeek,
        endDate: defineds.endOfLastWeek,
      }),
    },
    {
      label: 'Yesterday',
      range: () => ({
        startDate: defineds.startOfYesterday,
        endDate: defineds.endOfYesterday,
      }),
    },
    {
      label: 'Today',
      range: () => ({
        startDate: defineds.startOfToday,
        endDate: defineds.endOfToday,
      }),
    },
    {
      label: 'This Week',
      range: () => ({
        startDate: defineds.startOfWeek,
        endDate: defineds.endOfWeek,
      }),
    },
    {
      label: 'This Month',
      range: () => ({
        startDate: defineds.startOfMonth,
        endDate: defineds.endOfMonth,
      }),
    },
  ]);

export const defaultStaticRangesGen = compose(defaultStaticRangesGenerator, definedsGen);
export const defaultStaticRanges = defaultStaticRangesGenerator(defineds);

export const defaultInputRangesGenerator = (defineds: DefinedDates): InputRangeWihLabel[] => [
  {
    label: 'days up to today',
    range(value: Date | number) {
      return {
        startDate: addDays(defineds.startOfToday, (Math.max(Number(value), 1) - 1) * -1),
        endDate: defineds.endOfToday,
      };
    },
    getCurrentValue(range: Range) {
      if (!range.startDate || !isSameDay(range.startDate, defineds.startOfToday)) return '-';
      if (!range.startDate) return '∞';
      return differenceInCalendarDays(defineds.endOfToday, range.startDate) + 1;
    },
  },
  {
    label: 'days starting today',
    range(value: Date | number) {
      const today = new Date();
      return {
        startDate: today,
        endDate: addDays(today, Math.max(Number(value), 1) - 1),
      };
    },
    getCurrentValue(range: Range) {
      if (!range.startDate || !isSameDay(range.startDate, defineds.startOfToday)) return '-';
      if (!range.endDate) return '∞';
      return differenceInCalendarDays(range.endDate, defineds.startOfToday) + 1;
    },
  },
];

export const defaultInputRangesGen = compose(defaultInputRangesGenerator, definedsGen);
export const defaultInputRanges = defaultInputRangesGenerator(defineds);
