import dateFns from 'date-fns';

const defineds = {
  startOfWeek: dateFns.startOfWeek(new Date()),
  endOfWeek: dateFns.endOfWeek(new Date()),
  startOfLastWeek: dateFns.startOfWeek(dateFns.addDays(new Date(), -7)),
  endOfLastWeek: dateFns.endOfWeek(dateFns.addDays(new Date(), -7)),
  startOfToday: dateFns.startOfDay(new Date()),
  endOfToday: dateFns.endOfDay(new Date()),
  startOfYesterday: dateFns.startOfDay(dateFns.addDays(new Date(), -1)),
  endOfYesterday: dateFns.endOfDay(dateFns.addDays(new Date(), -1)),
  startOfMonth: dateFns.startOfMonth(new Date()),
  endOfMonth: dateFns.endOfMonth(new Date()),
  startOfLastMonth: dateFns.startOfMonth(dateFns.addMonths(new Date(), -1)),
  endOfLastMonth: dateFns.endOfMonth(dateFns.addMonths(new Date(), -1)),
};

const staticRangeHandler = {
  range: {},
  isSelected(range) {
    const definedRange = this.range();
    return (
      dateFns.isSameDay(range.startDate, definedRange.startDate) &&
      dateFns.isSameDay(range.endDate, definedRange.endDate)
    );
  },
};

export function createStaticRanges(ranges) {
  return ranges.map(range => ({ ...staticRangeHandler, ...range }));
}

export const defaultStaticRanges = createStaticRanges([
  {
    label: 'Today',
    range: () => ({
      startDate: defineds.startOfToday,
      endDate: defineds.endOfToday,
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
    label: 'This Week',
    range: () => ({
      startDate: defineds.startOfWeek,
      endDate: defineds.endOfWeek,
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
    label: 'This Month',
    range: () => ({
      startDate: defineds.startOfMonth,
      endDate: defineds.endOfMonth,
    }),
  },
  {
    label: 'Last Month',
    range: () => ({
      startDate: defineds.startOfLastMonth,
      endDate: defineds.endOfLastMonth,
    }),
  },
]);

export const defaultInputRanges = [
  {
    label: 'days up to today',
    range(value) {
      return {
        startDate: dateFns.addDays(defineds.startOfToday, (Math.max(Number(value), 1) - 1) * -1),
        endDate: defineds.endOfToday,
      };
    },
    getCurrentValue(range) {
      if (!dateFns.isSameDay(range.endDate, defineds.endOfToday)) return '-';
      if (!range.startDate) return '∞';
      return dateFns.differenceInCalendarDays(defineds.endOfToday, range.startDate) + 1;
    },
  },
  {
    label: 'days starting today',
    range(value) {
      const today = new Date();
      return {
        startDate: today,
        endDate: dateFns.addDays(today, Math.max(Number(value), 1) - 1),
      };
    },
    getCurrentValue(range) {
      if (!dateFns.isSameDay(range.startDate, defineds.startOfToday)) return '-';
      if (!range.endDate) return '∞';
      return dateFns.differenceInCalendarDays(range.endDate, defineds.startOfToday) + 1;
    },
  },
];
