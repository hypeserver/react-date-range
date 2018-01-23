import classnames from 'classnames';
import { addMonths, areIntervalsOverlapping, startOfMonth, endOfMonth } from 'date-fns';

export function calcFocusDate(currentFocusedDate, props) {
  const { shownDate, date, months, ranges, focusedRange, displayMode } = props;
  // find primary date according the props
  let targetInterval;
  if (displayMode === 'dateRange') {
    const range = ranges[focusedRange[0]] || {};
    targetInterval = {
      start: range.startDate,
      end: range.endDate,
    };
  } else {
    targetInterval = {
      start: date,
      end: date,
    };
  }
  targetInterval.start = startOfMonth(targetInterval.start || new Date());
  targetInterval.end = endOfMonth(targetInterval.end || targetInterval.start);

  const targetDate = targetInterval.start || targetInterval.end || shownDate || new Date();
  // initial focus
  if (!currentFocusedDate)
    return shownDate || targetInterval.start || targetInterval.end || new Date();
  const currentFocusInterval = {
    start: startOfMonth(currentFocusedDate),
    end: endOfMonth(addMonths(currentFocusedDate, months - 1)),
  };
  // don't change focused if new selection in view area
  if (areIntervalsOverlapping(targetInterval, currentFocusInterval)) {
    return currentFocusedDate;
  }
  return targetDate;
}

export function findNextRangeIndex(ranges, currentRangeIndex = -1) {
  const nextIndex = ranges.findIndex(
    (range, i) => i > currentRangeIndex && range.autoFocus !== false && !range.disabled
  );
  if (nextIndex !== -1) return nextIndex;
  return ranges.findIndex(range => range.autoFocus !== false && !range.disabled);
}

export function generateStyles(sources) {
  if (!sources.length) return {};
  const generatedStyles = sources
    .filter(source => Boolean(source))
    .reduce((styles, styleSource) => {
      Object.keys(styleSource).forEach(key => {
        styles[key] = classnames(styles[key], styleSource[key]);
      });
      return styles;
    }, {});
  return generatedStyles;
}
