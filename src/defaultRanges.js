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

const defineds = {
  startOfWeek: startOfWeek(new Date()),
  endOfWeek: endOfWeek(new Date()),
  startOfLastWeek: startOfWeek(addDays(new Date(), -7)),
  endOfLastWeek: endOfWeek(addDays(new Date(), -7)),
  startOfToday: startOfDay(new Date()),
  endOfToday: endOfDay(new Date()),
  startOfYesterday: startOfDay(addDays(new Date(), -1)),
  endOfYesterday: endOfDay(addDays(new Date(), -1)),
  startOfMonth: startOfMonth(new Date()),
  endOfMonth: endOfMonth(new Date()),
  startOfLastMonth: startOfMonth(addMonths(new Date(), -1)),
  endOfLastMonth: endOfMonth(addMonths(new Date(), -1)),
};

export const defaultStaticRanges = [
  {
    label: 'Today',
    range: () => ({
      startDate: defineds.startOfToday,
      endDate: defineds.endOfToday,
    }),
    isSelected: range =>
      isSameDay(range.startDate, defineds.startOfToday) &&
      isSameDay(range.endDate, defineds.endOfToday),
  },
  {
    label: 'Yesterday',
    range: () => ({
      startDate: defineds.startOfYesterday,
      endDate: defineds.endOfYesterday,
    }),
    isSelected: range =>
      isSameDay(range.startDate, defineds.startOfYesterday) &&
      isSameDay(range.endDate, defineds.endOfYesterday),
  },

  {
    label: 'This Week',
    range: () => ({
      startDate: defineds.startOfWeek,
      endDate: defineds.endOfWeek,
    }),
    isSelected: range =>
      isSameDay(range.startDate, defineds.startOfWeek) &&
      isSameDay(range.endDate, defineds.endOfWeek),
  },
  {
    label: 'Last Week',
    range: () => ({
      startDate: defineds.startOfLastWeek,
      endDate: defineds.endOfLastWeek,
    }),
    isSelected: range =>
      isSameDay(range.startDate, defineds.startOfLastWeek) &&
      isSameDay(range.endDate, defineds.endOfLastWeek),
  },
  {
    label: 'This Month',
    range: () => ({
      startDate: defineds.startOfMonth,
      endDate: defineds.endOfMonth,
    }),
    isSelected: range =>
      isSameDay(range.startDate, defineds.startOfMonth) &&
      isSameDay(range.endDate, defineds.endOfMonth),
  },
  {
    label: 'Last Month',
    range: () => ({
      startDate: defineds.startOfLastMonth,
      endDate: defineds.endOfLastMonth,
    }),
    isSelected: range =>
      isSameDay(range.startDate, defineds.startOfLastMonth) &&
      isSameDay(range.endDate, defineds.endOfLastMonth),
  },
];

export const defaultInputRanges = [
  {
    label: 'days up to today',
    range(value) {
      return {
        startDate: addDays(defineds.startOfToday, Number(value) * -1),
        endDate: defineds.endOfToday,
      };
    },
    getCurrentValue(range) {
      if (!isSameDay(range.endDate, defineds.endOfToday)) return '-';
      if (!range.startDate) return '∞';
      return differenceInCalendarDays(defineds.endOfToday, range.startDate);
    },
  },
  {
    label: 'days starting today',
    range(value) {
      const today = new Date();
      return {
        startDate: today,
        endDate: addDays(today, Number(value)),
      };
    },
    getCurrentValue(range) {
      if (!isSameDay(range.startDate, defineds.startOfToday)) return '-';
      if (!range.endDate) return '∞';
      return differenceInCalendarDays(range.endDate, defineds.startOfToday);
    },
  },
];
