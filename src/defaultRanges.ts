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
import { LabeledStartEndDateGen, StartEndDateGen, SureStartEndDate, WeekStartsOn } from './types';

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

const staticRangeHandler = (withRangeGen: { range: StartEndDateGen; }) => ({
  ...withRangeGen,
  isSelected(range: SureStartEndDate) {
    const definedRange = this.range();
    return (
      isSameDay(range.startDate, definedRange.startDate) &&
      isSameDay(range.endDate, definedRange.endDate)
    );
  },
});

export function createStaticRanges(ranges: LabeledStartEndDateGen[]) {
  return ranges.map(staticRangeHandler);
}

export const defaultStaticRangesGen = (defineds: DefinedDates) =>
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

export const defaultStaticRanges = defaultStaticRangesGen(defineds);

export const defaultInputRangesGen = (defineds: DefinedDates) => [
  {
    label: 'days up to today',
    range(value: any) {
      return {
        startDate: addDays(defineds.startOfToday, (Math.max(Number(value), 1) - 1) * -1),
        endDate: defineds.endOfToday,
      };
    },
    getCurrentValue(range: SureStartEndDate) {
      if (!isSameDay(range.endDate, defineds.endOfToday)) return '-';
      if (!range.startDate) return '∞';
      return differenceInCalendarDays(defineds.endOfToday, range.startDate) + 1;
    },
  },
  {
    label: 'days starting today',
    range(value: any) {
      const today = new Date();
      return {
        startDate: today,
        endDate: addDays(today, Math.max(Number(value), 1) - 1),
      };
    },
    getCurrentValue(range: SureStartEndDate) {
      if (!isSameDay(range.startDate, defineds.startOfToday)) return '-';
      if (!range.endDate) return '∞';
      return differenceInCalendarDays(range.endDate, defineds.startOfToday) + 1;
    },
  },
];

export const defaultInputRanges = defaultInputRangesGen(defineds);
