import {
  addDays,
  endOfDay,
  startOfDay,
  startOfMonth,
  endOfMonth,
  addMonths,
  startOfWeek,
  endOfWeek,
} from 'date-fns';

export const defaultStaticRanges = [
  {
    label: 'Today',
    range() {
      return {
        startDate: startOfDay(new Date()),
        endDate: endOfDay(new Date()),
      };
    },
  },
  {
    label: 'Yesterday',
    range() {
      const yesterday = addDays(new Date(), -1);
      return {
        startDate: startOfDay(yesterday),
        endDate: endOfDay(yesterday),
      };
    },
  },

  {
    label: 'This Week',
    range() {
      return {
        startDate: startOfWeek(new Date()),
        endDate: endOfWeek(new Date()),
      };
    },
  },
  {
    label: 'Last Week',
    range() {
      const lastWeek = addDays(new Date(), -7);
      return {
        startDate: startOfWeek(lastWeek),
        endDate: endOfWeek(lastWeek),
      };
    },
  },
  {
    label: 'This Month',
    range() {
      return {
        startDate: startOfMonth(new Date()),
        endDate: endOfMonth(new Date()),
      };
    },
  },
  {
    label: 'Last Month',
    range() {
      const lastMonth = addMonths(new Date(), -1);
      return {
        startDate: startOfMonth(lastMonth),
        endDate: endOfMonth(lastMonth),
      };
    },
  },
];

export const defaultInputRanges = [
  {
    label: 'days up today',
    range(value) {
      const today = new Date();
      return {
        startDate: addDays(today, Number(value) * -1),
        endDate: today,
      };
    },
  },
  {
    label: 'days up yesterday',
    range(value) {
      const today = new Date();
      return {
        startDate: today,
        endDate: addDays(today, Number(value)),
      };
    },
  },
];
